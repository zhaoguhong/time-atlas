export default function ReadingStatus({
  loading,
  failed,
  retry,
}: {
  loading: boolean
  failed: boolean
  retry: () => void
}) {
  if (!loading && !failed) return null
  return (
    <div className="reading-status" role={failed ? 'alert' : 'status'}>
      <p>{failed ? '正文暂未加载，摘要仍可阅读。' : '正在加载正文与参考资料…'}</p>
      {failed && (
        <button className="outline-action" onClick={retry}>
          重新加载正文
        </button>
      )}
    </div>
  )
}
