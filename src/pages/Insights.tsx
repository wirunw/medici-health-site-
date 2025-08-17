import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, Legend } from 'recharts'

// World Bank API response shape: [ {page info}, [ { date: '2020', value: 2.1 }, ... ] ]
async function fetchWB(indicator: string) {
  const url = `https://api.worldbank.org/v2/country/THA/indicator/${indicator}?format=json`;
  const res = await fetch(url)
  if (!res.ok) throw new Error('WB API error')
  const data = await res.json()
  return Array.isArray(data) ? data[1] ?? [] : []
}

function useWB(indicator: string){
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  useEffect(()=>{
    let canceled = false
    setLoading(true)
    fetchWB(indicator).then(rows => {
      if (canceled) return
      setData(rows.filter((r:any)=>r.value!=null).map((r:any)=>({ year: r.date, value: r.value })))
      setLoading(false)
    }).catch(e=>{
      if (canceled) return
      setError(String(e))
      setLoading(false)
    })
    return ()=>{canceled=true}
  },[indicator])
  return { data, loading, error }
}

export default function Insights(){
  const phys = useWB('SH.MED.PHYS.ZS') // physicians per 1,000
  const beds = useWB('SH.MED.BEDS.ZS') // hospital beds per 1,000
  const aged = useWB('SP.POP.65UP.TO.ZS') // % age 65+
  const spend = useWB('SH.XPD.CHEX.GD.ZS') // health expenditure %GDP

  const latestCards = useMemo(()=>{
    function latest(arr:any[]){
      return arr.slice().sort((a,b)=>Number(b.year)-Number(a.year))[0]
    }
    return {
      phys: latest(phys.data), beds: latest(beds.data), aged: latest(aged.data), spend: latest(spend.data)
    }
  },[phys.data,beds.data,aged.data,spend.data])

  const fmt = (n?: number) => n==null ? '—' : Number(n).toFixed(2)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Insights สุขภาพไทย — Pain Points สำหรับทีมแพทย์และเภสัชกร</h2>
        <a className="text-brand-700 underline" href="https://data.worldbank.org/" target="_blank" rel="noreferrer">ที่มา</a>
      </div>

      <section className="grid gap-4 md:grid-cols-4">
        {['แพทย์/1,000','เตียง/1,000','อายุ 65+ (%)','รายจ่ายสุขภาพ (%GDP)'].map((label, i)=>{
          const map:any = [latestCards.phys, latestCards.beds, latestCards.aged, latestCards.spend]
          const item = map[i]
          return (
            <div key={label} className="card p-4">
              <p className="text-sm text-slate-600">{label}</p>
              <p className="text-2xl font-bold">{item?.value?.toFixed(2) ?? '—'}</p>
              <p className="text-xs text-slate-500">ปี {item?.year ?? '—'}</p>
            </div>
          )
        })}
      </section>

      <section className="card p-6 space-y-3">
        <h3 className="text-lg font-semibold">สรุปภาพรวมและความหมายต่อระบบบริการ</h3>
        <p className="text-slate-700 text-sm">
          จากข้อมูลล่าสุด: แพทย์ต่อ 1,000 คน ≈ <span className="font-medium">{fmt(latestCards.phys?.value)}</span>, เตียงต่อ 1,000 คน ≈ <span className="font-medium">{fmt(latestCards.beds?.value)}</span>, สัดส่วนประชากรอายุ 65+ ≈ <span className="font-medium">{fmt(latestCards.aged?.value)}%</span>, และรายจ่ายสุขภาพคิดเป็น ≈ <span className="font-medium">{fmt(latestCards.spend?.value)}% ของ GDP</span>.
        </p>
        <ul className="list-disc ml-5 text-slate-700 text-sm space-y-1">
          <li>บุคลากรต่อประชากรไม่สูงนัก → ภาระงานหน้าห้องตรวจและการเข้าถึงแพทย์ผู้เชี่ยวชาญมีข้อจำกัด</li>
          <li>สังคมสูงวัยและ NCDs เพิ่มขึ้น → ต้องการการติดตามระยะยาวและการประสานงานข้ามบทบาท (แพทย์–เภสัชกร–พยาบาล)</li>
          <li>รายจ่ายสุขภาพมีแนวโน้มเพิ่ม → จำเป็นต้องเพิ่มประสิทธิภาพเวิร์กโฟลว์ ลดการเดินทางที่ไม่จำเป็น และคัดกรองก่อนพบแพทย์</li>
        </ul>
        <div className="pt-1">
          <Link to="/demo" className="btn btn-primary">ดูวิธีที่ Medici Health ช่วย</Link>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="card p-4">
          <h3 className="font-semibold mb-2">แพทย์และเตียงต่อ 1,000 คน</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={mergeByYear(phys.data,beds.data)} margin={{left:8,right:8}}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line dataKey="phys" name="แพทย์/1,000" type="monotone" stroke="#1E90FF" dot={false} />
              <Line dataKey="beds" name="เตียง/1,000" type="monotone" stroke="#0EA5E9" dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <p className="mt-3 text-xs text-slate-600">เส้นเทรนด์นี้สะท้อนขีดความสามารถของระบบบริการปลายทาง (supply side). เมื่อต่อกับการคัดกรองและติดตามจากระยะไกล จะช่วยใช้ทรัพยากรแพทย์และเตียงอย่างมีประสิทธิภาพ</p>
        </div>

        <div className="card p-4">
          <h3 className="font-semibold mb-2">โครงสร้างผู้สูงอายุ และรายจ่ายสุขภาพ</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={mergeByYear(aged.data, spend.data)} margin={{left:8,right:8}}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="a" name="อายุ 65+ (%)" fill="#10B981" />
              <Bar dataKey="b" name="รายจ่ายสุขภาพ (%GDP)" fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
          <p className="mt-3 text-xs text-slate-600">ผู้สูงอายุเพิ่มขึ้นพร้อมกับภาระค่าใช้จ่ายด้านสุขภาพ เทเลเมดิซีนช่วยลดการเดินทางที่ไม่จำเป็น กระชับการติดตาม และส่งเสริมการใช้ยาอย่างปลอดภัยผ่านการเชื่อมงานกับเภสัชกร</p>
        </div>
      </section>

      <section className="text-xs text-slate-500 space-y-1">
        <p>หมายเหตุ: ข้อมูลอัปเดตตามที่ World Bank เผยแพร่ อาจมีดีเลย์หรือปีล่าสุดไม่ตรงกันระหว่างตัวชี้วัด</p>
        <p>การตีความเพื่อ Pain Points: บุคลากรต่อประชากรไม่สูง → ภาระงานหน้าห้องตรวจมาก; สังคมสูงวัยและ NCDs เพิ่ม → ต้องการการติดตามต่อเนื่อง; เทเลเมดิซีนช่วยคัดกรอง ปรึกษา และส่งยาถึงมือผู้ป่วยได้เร็วขึ้น</p>
      </section>
    </div>
  )
}

type Merged = { year: string; phys?: number; beds?: number; a?: number; b?: number }
function mergeByYear(a: {year:string, value:number}[], b: {year:string, value:number}[]): Merged[] {
  const map = new Map<string, Merged>()
  for (const r of a) {
    const key = String(r.year)
    const m: Merged = map.get(key) ?? { year: key }
    m.phys = m.phys ?? r.value
    m.a = m.a ?? r.value
    map.set(key, m)
  }
  for (const r of b) {
    const key = String(r.year)
    const m: Merged = map.get(key) ?? { year: key }
    m.beds = m.beds ?? r.value
    m.b = m.b ?? r.value
    map.set(key, m)
  }
  return Array.from(map.values()).sort((x,y)=>Number(x.year)-Number(y.year))
}
