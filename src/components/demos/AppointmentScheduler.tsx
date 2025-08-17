import { useEffect, useState } from 'react'
import { bookSlot, fetchSlots, Slot } from '../../lib/fakeApi'

export default function AppointmentScheduler() {
  const [slots, setSlots] = useState<Slot[]>([])
  const [loading, setLoading] = useState(true)
  const [booking, setBooking] = useState<string | null>(null)
  const [meet, setMeet] = useState<string | null>(null)

  useEffect(() => {
    fetchSlots().then(s => { setSlots(s); setLoading(false) })
  }, [])

  const onBook = async (id: string) => {
    setBooking(id)
    const r = await bookSlot(id)
    setMeet(r.meetingUrl)
    setBooking(null)
  }

  return (
    <div className="card p-5 space-y-3">
      <h3 className="text-lg font-semibold">ตัวอย่าง: จองปรึกษาออนไลน์</h3>
      {loading ? <p className="text-sm text-slate-600">กำลังโหลดช่วงเวลา…</p> : (
        <ul className="space-y-2">
          {slots.map(s => (
            <li key={s.id} className="flex items-center justify-between gap-3 border p-3 rounded-lg">
              <div>
                <p className="font-medium">{new Date(s.start).toLocaleString('th-TH')}</p>
                <p className="text-sm text-slate-600">{s.clinician} • {s.role}</p>
              </div>
              <button className="btn btn-primary" onClick={() => onBook(s.id)} disabled={!!booking}>{booking===s.id ? 'กำลังจอง…' : 'จอง'}</button>
            </li>
          ))}
        </ul>
      )}
      {meet && (
        <div className="rounded-lg border p-3 text-sm">
          <p className="font-medium">การจองสำเร็จ</p>
          <a className="text-brand-700 underline" href={meet} target="_blank" rel="noreferrer">เข้าห้องปรึกษา</a>
        </div>
      )}
    </div>
  )
}
