export default function AdminLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border-2 border-brand-500/20" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-brand-500 animate-spin" />
        </div>
        <span className="text-slate-400 text-sm">Loading...</span>
      </div>
    </div>
  )
}
