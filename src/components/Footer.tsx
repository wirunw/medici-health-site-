export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 grid gap-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white font-bold">M</span>
            <span className="font-semibold">Medici Health</span>
          </div>
          <p className="text-sm text-slate-600">แพลตฟอร์ม telemedicine สำหรับทีมดูแลผู้ป่วย: หมอ เภสัชกร และพยาบาล</p>
        </div>
        <div className="text-sm text-slate-600">
          <p>© {new Date().getFullYear()} Medici Health. สงวนลิขสิทธิ์</p>
        </div>
        <div id="contact" className="text-sm">
          <p className="font-medium">ติดต่อ</p>
          <p>อีเมล: hello@medici.health (ตัวอย่าง)</p>
        </div>
      </div>
    </footer>
  )
}
