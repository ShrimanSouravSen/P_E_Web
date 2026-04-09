import { useState } from 'react'
import Button from './Button'

export default function QuoteModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ name: '', company: '', requirement: '' })

  if (!isOpen) return null

  const handleSubmit = (event) => {
    event.preventDefault()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 px-4">
      <div className="panel w-full max-w-xl p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-2xl text-text">Quick Quote</h3>
          <button type="button" onClick={onClose} className="text-muted hover:text-text" aria-label="Close">
            x
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            required
            className="w-full rounded-tokenMd border border-line bg-elevated px-3 py-2 text-sm text-text placeholder:text-muted"
            placeholder="Name"
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          />
          <input
            required
            className="w-full rounded-tokenMd border border-line bg-elevated px-3 py-2 text-sm text-text placeholder:text-muted"
            placeholder="Company"
            value={form.company}
            onChange={(event) => setForm((prev) => ({ ...prev, company: event.target.value }))}
          />
          <textarea
            required
            rows={4}
            className="w-full rounded-tokenMd border border-line bg-elevated px-3 py-2 text-sm text-text placeholder:text-muted"
            placeholder="Tell us your monthly scrap volume and purity target."
            value={form.requirement}
            onChange={(event) => setForm((prev) => ({ ...prev, requirement: event.target.value }))}
          />
          <div className="flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
