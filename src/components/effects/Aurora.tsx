/**
 * Aurora backdrop for the hero. Four large, blurred, blended color blobs
 * that drift slowly. All-CSS animation; no JS cost.
 */
export default function Aurora({ className = '' }: { className?: string }) {
  return (
    <div className={`aurora-wrap ${className}`} aria-hidden="true">
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />
      <div className="aurora-blob aurora-blob-4" />
    </div>
  )
}
