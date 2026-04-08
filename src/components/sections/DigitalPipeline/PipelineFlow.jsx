export default function PipelineFlow() {
  return (
    <svg viewBox="0 0 800 140" className="w-full" fill="none" aria-label="Pipeline flow line">
      <path d="M10 70 C130 15, 240 15, 360 70 S600 125, 790 70" stroke="var(--color-accent)" strokeWidth="2" opacity="0.8" />
      <circle cx="10" cy="70" r="4" fill="var(--color-accent)" />
      <circle cx="790" cy="70" r="4" fill="var(--color-accent)" />
    </svg>
  )
}
