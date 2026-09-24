'use client'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { uploadImage } from '@/lib/images'

/**
 * Photo field for admin forms: upload a file (stored in Firestore) or paste a
 * link. Shows a preview and a remove button.
 */
export default function ImageUpload({
  value,
  onChange,
  maxSide = 1200,
  round = false,
}: {
  value: string
  onChange: (url: string) => void
  maxSide?: number
  round?: boolean
}) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const handleFile = async (file?: File) => {
    if (!file) return
    setUploading(true)
    try {
      onChange(await uploadImage(file, maxSide))
      toast.success('Photo uploaded. Click Save to keep it.')
    } catch (err: any) {
      toast.error(err?.message || 'Upload failed')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  return (
    <div className="flex items-start gap-4">
      <div className={`w-20 h-20 shrink-0 overflow-hidden bg-space-800 border border-white/[0.08] flex items-center justify-center ${round ? 'rounded-full' : 'rounded-xl'}`}>
        {value
          // eslint-disable-next-line @next/next/no-img-element
          ? <img src={value} alt="" className="w-full h-full object-cover" />
          : <span className="text-[10px] text-slate-600">No photo</span>}
      </div>
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="text-xs px-3 py-1.5 rounded-lg bg-aurora-cyan/10 border border-aurora-cyan/25 text-aurora-cyan hover:bg-aurora-cyan/20 transition-colors disabled:opacity-50"
          >
            {uploading ? 'Uploading…' : value ? 'Change photo' : 'Upload photo'}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="text-xs px-3 py-1.5 rounded-lg border border-white/[0.08] text-slate-400 hover:text-red-400 transition-colors"
            >
              Remove
            </button>
          )}
        </div>
        <input
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="or paste an image link (https://...)"
          className="w-full bg-space-800 border border-aurora-cyan/20 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-aurora-cyan/60 placeholder-slate-600"
        />
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => handleFile(e.target.files?.[0])} />
      </div>
    </div>
  )
}
