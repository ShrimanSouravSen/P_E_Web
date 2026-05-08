import logo from '../../assets/logo.png'

export default function SubFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <section className="w-full border-t border-line bg-bg px-4 py-4 md:px-6 lg:px-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col items-center justify-center gap-2">
          {/* <a href="/" className="focus:outline-none">
            <img
              src={logo}
              alt="Parbati Enterprises"
              className="h-7 w-auto"
            />
          </a> */}
          <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted/40">
            © {currentYear} Parbati Enterprises. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  )
}
