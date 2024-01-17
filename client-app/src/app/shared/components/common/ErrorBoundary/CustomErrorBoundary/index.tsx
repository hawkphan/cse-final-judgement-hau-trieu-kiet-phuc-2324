import React, { PropsWithChildren } from 'react';
import { Callback } from 'src/redux/types';
import DefaultErrorFallback from '../DefaultErrorBoundaryFallback';

export interface FallbackProps {
  showErrorMessage?: boolean;
  error: Error | null;
  resetErrorBoundary: (...args: Array<unknown>) => void;
}

type ErrorBoundaryState = { error: Error | null; hasError: boolean };

const initialState: ErrorBoundaryState = { error: null, hasError: false };

/**
 * @params showErrorMessage?: boolean;
 * @params error: Error | null;
 * @params resetErrorBoundary: (...args: Array<unknown>) => void;
 */
class CustomErrorBoundary extends React.Component<PropsWithChildren<Props>> {
  public declare state: Readonly<ErrorBoundaryState>;

  constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: any) {
    return {
      hasError: true,
      error,
    };
  }

  resetErrorBoundary = (...args: Array<unknown>) => {
    this.props.onReset?.(...args);
    this.reset();
  };

  reset() {
    this.setState(initialState);
  }

  render() {
    const { error } = this.state;

    const { FallbackComponent, fallback, showErrorMessage } = this.props;

    if (this.state.hasError) {
      const props = {
        error,
        showErrorMessage,
        resetErrorBoundary: this.resetErrorBoundary,
      };

      if (React.isValidElement(fallback)) {
        return fallback;
      }

      if (FallbackComponent) {
        return <FallbackComponent {...props} />;
      }

      // default error fallback
      return <DefaultErrorFallback {...props} />;
    }

    return this.props.children;
  }
}

type Props = {
  showErrorMessage?: boolean; // works with default error fallback only
  fallback?: React.ReactNode;
  FallbackComponent?: any & React.ComponentType<Partial<FallbackProps>>;
  onReset?: Callback; // reset the state of your app so the error doesn't happen again
};

export default CustomErrorBoundary;
