import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.error('Erreur capturée par ErrorBoundary :', error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Détails de l\'erreur capturée :', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Une erreur est survenue. Veuillez réessayer plus tard.</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
