import { Component } from "react";
import { Link } from "@tanstack/react-router";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught some stupid error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className="error-boundary">
        <h2> Uh oh!</h2>
        <p>There was an error with this page. <Link to="/">Click here </Link> to go home page </p>
        </div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;