export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-4 text-sm text-muted md:px-10">
      <div className="grid grid-cols-2 items-center gap-4">
        <p className="text-left">Copyright &copy; {new Date().getFullYear()} Parbati Enterprises - Urban Mining and Copper Refining</p>
        <p className="text-right">Built for transparent, traceable global supply chains</p>
      </div>
    </footer>
  )
}
