export default function PipelineStep({ title, subtitle, active }) {
  return (
    <article
      className={`rounded-tokenMd border p-4 transition ${
        active
          ? 'border-accent bg-accentSoft/50 shadow-copper'
          : 'border-line bg-surface/80 hover:border-accent/70'
      }`}
    >
      <h4 className="font-heading text-lg text-text">{title}</h4>
      <p className="mt-1 text-sm text-muted">{subtitle}</p>
    </article>
  )
}
