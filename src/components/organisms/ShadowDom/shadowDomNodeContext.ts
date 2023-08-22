import { MutableRefObject, RefObject } from 'react';

export type ShadowRootNode = MutableRefObject<HTMLDivElement> | null;

// Beware, singletons ahead
export class ShadowDomInstance {
  // But why such an obsolete pattern? Well, due to the nature of Confirm (Confirm(msg), not <Confirm />)
  // being a class and not a React class component not a FC, it cannot access Reacts' Context
  // and we don't have a global data storage such as Redux in the project.
  private static instance: ShadowDomInstance;

  private rootNodeRef: RefObject<HTMLDivElement> | undefined;

  public static getInstance(): ShadowDomInstance {
    if (!ShadowDomInstance.instance) {
      ShadowDomInstance.instance = new ShadowDomInstance();
    }

    return ShadowDomInstance.instance;
  }

  public setRootNodeRef(node: RefObject<HTMLDivElement>): void {
    this.rootNodeRef = node;
  }

  public getRootNodeRef(): RefObject<HTMLDivElement> | undefined {
    return this.rootNodeRef;
  }
}
