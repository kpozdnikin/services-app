/* eslint-disable react/no-find-dom-node */
import ReactDOM, { findDOMNode, render, unmountComponentAtNode } from 'react-dom';

import { ShadowDomInstance } from '@app/components/organisms';

import { ButtonType } from './types';
import { HidingDialogWrapper } from './HidingDialogWrapper';

type ResolveFunc = ((v: boolean) => void) | undefined;

const noop = (v: boolean) => v;

class ConfirmClass {
  public targetDomNode: HTMLElement;

  private node: Node | undefined;
  private outerWrappingNode: HTMLElement;

  // The container node is the guy who holds the context (inside the shadow dom, for example).
  // Normal case it'd be just 'document'. This is where we will mount our dialog.
  private containerNode: HTMLElement | undefined | null;

  resolvePromise: ResolveFunc = noop;
  rejectPromise: ResolveFunc = noop;

  // We're gonna refer to a promise when this class is created, to see if the user has confirmed the modal
  // or not. This promise is public, but to resolve it we'll need to capture its resolve/reject functions
  // so we can refer to those when the buttons are clicked.
  public promise: Promise<boolean> = new Promise((resolve, reject) => {
    this.resolvePromise = resolve;
    this.rejectPromise = reject;
  });

  // Because in this project we're in the shadow dom realm, we need to juggle target nodes.
  // If we we're a regular app (no shadow-dom), none of this bamboozling would be necessary
  getMountingNode = (): Node | undefined => {
    const ref = ShadowDomInstance.getInstance().getRootNodeRef();

    return ref?.current?.getRootNode();
  };

  // Constructor is where the magic happens. The use case is as standard JS confirm, so we'd:
  // const userConfirmation = await new Confirm("Are you sure?").promise
  // w/out touching anything else.
  constructor(
    message: string,
    title?: string,
    buttons?: [ButtonType, ButtonType] | [ButtonType],
  ) {
    this.node = this.getMountingNode();

    // Setup new elements to contain our modal
    this.targetDomNode = document.createElement('div');
    this.targetDomNode.id = `confirm-${Math.random()}`;

    this.containerNode = (this.node as Document).getElementById('containerID');

    // Setup new elements that will house both the modal container, as well as
    // the stylesheet manager
    this.outerWrappingNode = document.createElement('div');
    this.outerWrappingNode.appendChild(this.targetDomNode);

    // Unlikely situation when we're calling this constructor when the app hasn't rendered yet
    // and the singleton with mounting points doesn't have them set. Such case, just ignore.
    if (!this.node) {
      return;
    }

    // Once setup, inject this dual wrapper into our real dom tree
    this.containerNode?.appendChild(this.outerWrappingNode);

    // Capture key presses for Enter and Esc for improved accessiblity
    window.addEventListener('keyup', this.handleKeyUp);

    // React.CreatePortal will do nothing, if its output isn't rendered
    render(
      ReactDOM.createPortal(
        <HidingDialogWrapper
          containerNode={this.outerWrappingNode}
          close={this.close}
          message={message}
          title={title}
          buttons={buttons}
        />,
        this.targetDomNode,
      ),
      this.targetDomNode,
    );
  }

  unmount = () => {
    // We need to explicitly unmount the component, so lifecycle hooks of children
    // would be triggered. This isn't super important right here, but will be
    // in case of more complex components (ex if we were to add a spinner or another callback)
    if (this.targetDomNode) {
      const node = findDOMNode(this.targetDomNode);
      unmountComponentAtNode(node as Element);
      this.containerNode?.removeChild(this.outerWrappingNode);
    }
  };

  close = (value: boolean) => {
    // Prevent multiple key clicks while the modal is animating out
    window.removeEventListener('keyup', this.handleKeyUp);
    this.resolvePromise?.(value);

    // More bamboozling! This is calling a 'startClosing' func from the modal, so it can close itself
    // with a fancy animation, and then proceed to remove the component gracefully.

    // Please pay attention how we're resolving the promise first, so there can be some background
    // server request already doing its thing in the background, while the modal fades out nicely.
    // This should make the app feel more responsive.

    // We need to unmount the component to trigger all the lifecycle events.
    setTimeout(() => {
      this.unmount();
    }, 500 * 0.75);
  };

  handleKeyUp = (e: KeyboardEvent) => {
    if (e.which === 27) {
      // escape key
      this.close(false);
      e.preventDefault();
      e.stopPropagation();
    } else if (e.which === 13) {
      // enter key
      this.close(true);
      e.preventDefault();
      e.stopPropagation();
    }
  };
}

// Utility function for nicer interaction with code
export const Confirm = (
  message: string,
  title?: string,
  buttons?: [ButtonType, ButtonType] | [ButtonType],
): Promise<boolean> => new ConfirmClass(message, title, buttons).promise;
