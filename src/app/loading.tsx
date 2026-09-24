export default function Loading() {
  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-2 border-brand-500/20" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-brand-500 animate-spin" />
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-brand-500/20 to-accent-500/20" />
        </div>
        <span className="font-display font-500 text-sm gradient-text">Loading...</span>
      </div>
    </div>
  )
}
