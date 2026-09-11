'use client';
import { Component, ErrorInfo, ReactNode } from 'react';

export default class ClientErrorBoundary extends Component<{children: ReactNode}, {hasError: boolean}> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(_error: Error, _info: ErrorInfo) {}
  render() {
    if (this.state.hasError) return <div className="error-fallback"><div><b>JOKER YAZILIM</b><h1>Bir şeyler ters gitti.</h1><p>Sayfayı yenileyerek tekrar deneyebilirsiniz.</p><button onClick={() => window.location.reload()}>Yenile</button></div></div>;
    return this.props.children;
  }
}
