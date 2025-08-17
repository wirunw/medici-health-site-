import { useState } from 'react'

type Form = { name: string; age: number | ''; conditions: string[]; consents: boolean }

const conditions = ['เบาหวาน','ความดัน','ไมเกรน','ภูมิแพ้','หอบหืด'] as const

export default function OnboardingForm(){
  const [f, setF] = useState<Form>({ name: '', age: '', conditions: [], consents: false })
  const toggleCond = (c: string) => setF(v=> ({...v, conditions: v.conditions.includes(c) ? v.conditions.filter(x=>x!==c) : [...v.conditions, c]}))
  const summary = f.name && f.age && f.consents
  return (
    <div className="card p-5 space-y-3">
      <h3 className="text-lg font-semibold">ตัวอย่าง: แบบฟอร์มลงทะเบียนผู้ป่วย</h3>
      <div className="grid md:grid-cols-2 gap-3">
        <input className="rounded-lg border p-2" placeholder="ชื่อ-สกุล" value={f.name} onChange={e=>setF(v=>({...v, name: e.target.value}))} />
        <input className="rounded-lg border p-2" placeholder="อายุ" type="number" value={f.age} onChange={e=>setF(v=>({...v, age: e.target.value? Number(e.target.value): ''}))} />
      </div>
      <div>
        <p className="text-sm font-medium mb-1">โรคประจำตัว</p>
        <div className="flex flex-wrap gap-2">
          {conditions.map(c => (
            <button key={c} className={`px-3 py-1 rounded-full border ${f.conditions.includes(c)?'bg-brand-50 border-brand-300 text-brand-800':'bg-white'}`} onClick={()=>toggleCond(c)} type="button">{c}</button>
          ))}
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={f.consents} onChange={e=>setF(v=>({...v, consents: e.target.checked}))} />
        ยินยอมให้ใช้ข้อมูลเพื่อการรักษาพยาบาล
      </label>
      <div className="rounded-lg border p-3 text-sm bg-slate-50">
        <p className="font-medium">สรุป</p>
        {summary ? (
          <p>{f.name}, อายุ {f.age} ปี, เงื่อนไข: {f.conditions.length? f.conditions.join(', '): 'ไม่มี'}, ยินยอมแล้ว</p>
        ) : (
          <p className="text-slate-600">กรอกข้อมูลให้ครบและยืนยันความยินยอม</p>
        )}
      </div>
    </div>
  )
}
