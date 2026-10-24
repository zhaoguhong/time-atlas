import { Component, type ReactNode } from 'react'

export default class CanvasBoundary extends Component<
  {
    children: ReactNode
    onRetry: () => void
  },
  { failed: boolean; retrying: boolean }
> {
  state = { failed: false, retrying: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  retry = async () => {
    this.setState({ retrying: true })
    // WebKit can retain a failed module-preload response across a normal reload.
    // Revalidate the page's own chunk resources before creating a fresh module graph.
    const resources = [
      ...document.querySelectorAll<HTMLLinkElement>(
        'link[rel="modulepreload"], link[rel="stylesheet"]',
      ),
    ].filter((link) => new URL(link.href).origin === window.location.origin)
    await Promise.allSettled(
      resources.map(async (link) => {
        const response = await fetch(link.href, {
          cache: 'reload',
          signal: AbortSignal.timeout(8000),
        })
        await response.arrayBuffer()
      }),
    )
    this.props.onRetry()
  }
  render() {
    if (!this.state.failed) return this.props.children
    return (
      <div className="canvas-error" role="alert">
        <h2>画布暂未加载</h2>
        <p>历史资料仍可阅读，请检查网络后重试。</p>
        <button className="outline-action" disabled={this.state.retrying} onClick={this.retry}>
          {this.state.retrying ? '正在重新加载…' : '重新加载画布'}
        </button>
      </div>
    )
  }
}
