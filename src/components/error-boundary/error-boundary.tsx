import React, { Component, ErrorInfo, ReactNode } from "react";


const Error = (): JSX.Element => {
  return (
    <section>
      <h1>
        Что-то пошло не так
      </h1>
      <p>
        В приложении произошла ошибка. Пожалуйста, перезагрузите страницу.
      </p>
    </section>
  );
};

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, info: ErrorInfo) {
    console.log("Возникла ошибка!", error, info);
  }

  public render() {
    if (this.state.hasError) {
      return <Error />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;