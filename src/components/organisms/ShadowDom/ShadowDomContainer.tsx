import { ReactElement, useEffect, useRef, useState } from 'react';

import { PortalApp } from './PortalApp';

interface Props {
  children: Element | Element[] | ReactElement | ReactElement[];
}

export const ShadowDomContainer = (props: Props) => {
  // We hold ref to our div, into which (in place) we'd render our app
  // and a reference to Shadow Root element
  const containerRef = useRef<HTMLDivElement>(null);
  const [shadowRootElement, setSRElement] = useState<ShadowRoot | null>(null);

  // Upon hydrating the ref (first time) we create a shadow root element
  // and capture its value
  useEffect(() => {
    if (shadowRootElement || !containerRef.current) {
      return;
    }

    const shadowRoot = containerRef.current.attachShadow({ mode: 'open' });
    window.__tcs_web_services_shadow_styles?.map((style) => shadowRoot.append(style));
    setSRElement(shadowRoot);
  }, [containerRef, shadowRootElement]);

  // We render the div (first) and then once its registered, we render
  // the whole app into the portal inside the shadow root. We're using the portal
  // as rendering the app 'via tsx' yields problems with content being lost
  // inside SR children upon .attachShadow
  return (
    <>
      <div ref={containerRef} />
      {shadowRootElement && (
        <PortalApp target={(shadowRootElement as never) as HTMLElement}>
          {props.children}
        </PortalApp>
      )}
    </>
  );
};
