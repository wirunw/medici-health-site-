import { useMemo, useState } from 'react'

type Msg = { id: string; author: string; role: 'แพทย์'|'เภสัชกร'|'พยาบาล'; text: string; ts: number }

export default function TeamChat(){
  const [input, setInput] = useState('สรุปผู้ป่วย: ไข้ต่ำ แนะนำยาลดไข้และพักผ่อน')
  const [msgs, setMsgs] = useState<Msg[]>([{
    id: 'm1', author: 'นพ. ก้องภพ', role: 'แพทย์', text: 'สวัสดีทีม ขอรีวิวเคสผู้ป่วย A', ts: Date.now()-600000
  }])
  const sorted = useMemo(()=>[...msgs].sort((a,b)=>a.ts-b.ts),[msgs])

  const send = () => {
    const id = Math.random().toString(36).slice(2)
    setMsgs(m => [...m, { id, author: 'ฉัน', role: 'แพทย์', text: input, ts: Date.now() }])
    setInput('')
  }

  return (
    <div className="card p-5 space-y-3">
      <h3 className="text-lg font-semibold">ตัวอย่าง: แชททีมดูแลผู้ป่วย</h3>
      <div className="h-48 overflow-auto rounded-lg border p-3 bg-slate-50">
        <ul className="space-y-2 text-sm">
          {sorted.map(m => (
            <li key={m.id} className="flex gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-brand-600 text-white text-xs">
                {m.role === 'แพทย์' ? 'Dr' : m.role === 'เภสัชกร' ? 'Rx' : 'Rn'}
              </span>
              <div>
                <p className="font-medium">{m.author} <span className="text-xs text-slate-500">{new Date(m.ts).toLocaleTimeString('th-TH')}</span></p>
                <p className="text-slate-700">{m.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-2">
        <input className="flex-1 rounded-lg border p-2" value={input} onChange={e=>setInput(e.target.value)} placeholder="พิมพ์ข้อความ" />
        <button className="btn btn-primary" onClick={send} disabled={!input.trim()}>ส่ง</button>
      </div>
    </div>
  )
}
