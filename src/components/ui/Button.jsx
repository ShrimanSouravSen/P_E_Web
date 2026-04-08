export default function Button({ children, variant = 'primary', ...props }) {
  const baseClasses =
    'rounded-full px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/80'

  const variants = {
    primary:
      'bg-accent text-[#1a120a] shadow-copper hover:brightness-110 active:translate-y-px',
    ghost:
      'border border-line bg-transparent text-text hover:bg-elevated',
  }

  return (
    <button className={`${baseClasses} ${variants[variant]}`} {...props}>
      {children}
    </button>
  )
}
