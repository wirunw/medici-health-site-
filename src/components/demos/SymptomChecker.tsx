import { useState } from 'react'
import { triage } from '../../lib/fakeApi'

export default function SymptomChecker() {
  const [text, setText] = useState('ไอ เจ็บคอ มีไข้เล็กน้อย')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{risk:string; guidance:string}|null>(null)

  const onCheck = async () => {
    setLoading(true)
    setResult(null)
    const r = await triage(text)
    setResult(r)
    setLoading(false)
  }

  return (
    <div className="card p-5 space-y-3">
      <h3 className="text-lg font-semibold">ตัวอย่าง: ประเมินอาการเบื้องต้น</h3>
      <textarea className="w-full rounded-lg border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-brand-400" rows={3} value={text} onChange={e=>setText(e.target.value)} />
      <button className="btn btn-primary" onClick={onCheck} disabled={loading}>{loading ? 'กำลังประเมิน...' : 'ประเมิน'}</button>
      {result && (
        <div className="rounded-lg border p-3 text-sm">
          <p><span className="font-medium">ระดับความเสี่ยง:</span> <span className={result.risk==='สูง' ? 'text-red-600' : result.risk==='กลาง' ? 'text-amber-600' : 'text-emerald-600'}>{result.risk}</span></p>
          <p className="text-slate-600">คำแนะนำ: {result.guidance}</p>
        </div>
      )}
    </div>
  )
}
