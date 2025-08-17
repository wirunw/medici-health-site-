import { useState } from 'react'
import { routePrescription } from '../../lib/fakeApi'

export default function PrescriptionRouter() {
  const [meds, setMeds] = useState<string>('Paracetamol 500mg, Cetirizine 10mg')
  const [loading, setLoading] = useState(false)
  const [res, setRes] = useState<{pharmacy:string; etaHours:number; tracking:string} | null>(null)

  const onRoute = async () => {
    setLoading(true)
    const r = await routePrescription(meds.split(',').map(m=>m.trim()).filter(Boolean))
    setRes(r)
    setLoading(false)
  }

  return (
    <div className="card p-5 space-y-3">
      <h3 className="text-lg font-semibold">ตัวอย่าง: ส่งใบสั่งยาไปยัง e-Pharmacy</h3>
      <input className="w-full rounded-lg border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-brand-400" value={meds} onChange={e=>setMeds(e.target.value)} />
      <button className="btn btn-primary" onClick={onRoute} disabled={loading}>{loading ? 'กำลังส่ง...' : 'ส่งใบสั่งยา'}</button>
      {res && (
        <div className="rounded-lg border p-3 text-sm">
          <p>ร้านยา: <span className="font-medium">{res.pharmacy}</span></p>
          <p>จัดส่งภายใน ~{res.etaHours} ชม. · Tracking: {res.tracking}</p>
        </div>
      )}
    </div>
  )
}
