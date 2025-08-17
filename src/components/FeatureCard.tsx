import { ReactNode } from 'react'

type Props = { title: string; desc: string; icon?: ReactNode; cta?: ReactNode }
export default function FeatureCard({ title, desc, icon, cta }: Props) {
  return (
    <div className="card p-5 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-brand-50 text-brand-700 grid place-items-center">
          {icon ?? <span className="font-bold">★</span>}
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-slate-600 text-sm">{desc}</p>
      {cta}
    </div>
  )
}
