interface PageHeaderProps {
  eyebrow?: string
  title: string
  highlight?: string
  description?: string
}

export default function PageHeader({ eyebrow, title, highlight, description }: PageHeaderProps) {
  return (
    <div className="text-center mb-16 md:mb-20">
      {eyebrow && (
        <span className="text-aurora-cyan text-sm font-500 uppercase tracking-widest mb-3 block">
          {eyebrow}
        </span>
      )}
      <h1 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl text-white mb-4 leading-tight">
        {title}{' '}
        {highlight && <span className="gradient-text">{highlight}</span>}
      </h1>
      {description && (
        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
