import { Button, Columns, P, Spacer } from '@getsquire/glue-ui';
import { Component, ErrorInfo, PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';

import { LocaleContext } from '@app/contexts';

import { ContentWrapper } from './styled';

type ErrorBoundaryProps = PropsWithChildren<{}>;

class ErrorBoundary extends Component<ErrorBoundaryProps, { hasError: boolean }> {
  static contextType = LocaleContext;

  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {}

  componentWillUnmount() {
    this.setState({ hasError: false });
  }

  render() {
    const { t } = this.context;

    if (this.state.hasError) {
      return (
        <Columns cols={[1, 1, 1]}>
          <div />
          <ContentWrapper fullwidth>
            <P>{t('common.generalError.title')}</P>
            <Spacer />
            <Button variant="primary" onClick={() => this.setState({ hasError: false })}>
              {t('common.generalError.tryAgain')}
            </Button>
          </ContentWrapper>
          <div />
        </Columns>
      );
    }

    return this.props.children;
  }
}

const ErrorBoundaryRoute = () => (
  <ErrorBoundary>
    <Outlet />
  </ErrorBoundary>
);

export { ErrorBoundary, ErrorBoundaryRoute };
