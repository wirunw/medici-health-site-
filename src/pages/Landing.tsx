import { Link } from 'react-router-dom'
import FeatureCard from '../components/FeatureCard'
import HealthAssessment from '../components/HealthAssessment'

export default function Landing(){
  return (
    <>
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-white" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-slate-900">Medici Health — เทเลเมดิซีนสำหรับทีมแพทย์–เภสัชกร–พยาบาลไทย</h1>
            <p className="mt-4 text-slate-700 text-lg">ยกระดับการดูแลผู้ป่วยไทยด้วยแพลตฟอร์มที่เชื่อมทีมสหวิชาชีพเข้าหาผู้ป่วยอย่างปลอดภัย รวดเร็ว และสอดคล้องมาตรฐาน</p>
            <div className="mt-6 flex gap-3">
              <Link to="/demo" className="btn btn-primary">ลองสาธิต</Link>
              <a href="#security" className="btn">มาตรฐานความปลอดภัย</a>
              <Link to="/insights" className="btn">มุมมองข้อมูลสุขภาพไทย</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="card p-5">
              <p className="font-semibold">นัดปรึกษาออนไลน์</p>
              <p className="text-sm text-slate-600">พบแพทย์/เภสัชกร/พยาบาลได้ในคลิกเดียว</p>
            </div>
            <div className="card p-5">
              <p className="font-semibold">e-Prescription</p>
              <p className="text-sm text-slate-600">ส่งใบสั่งยาไปยังร้านยา/โรงพยาบาล</p>
            </div>
            <div className="card p-5">
              <p className="font-semibold">Triaging</p>
              <p className="text-sm text-slate-600">ประเมินความเร่งด่วนเบื้องต้น</p>
            </div>
            <div className="card p-5">
              <p className="font-semibold">Care Team Chat</p>
              <p className="text-sm text-slate-600">ประสานงานแบบเรียลไทม์</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl font-bold mb-4">ประเมินสุขภาพของคุณใน 2 นาที</h2>
            <p className="text-slate-600 mb-4">
              ทำแบบประเมินสุขภาพเบื้องต้นเพื่อทราบสถานะสุขภาพปัจจุบันและรับคำแนะนำที่เหมาะสมจากทีมผู้เชี่ยวชาญ
            </p>
            <ul className="list-disc ml-5 text-sm text-slate-600 space-y-1">
              <li>ประเมินพฤติกรรมสุขภาพ 7 ด้าน</li>
              <li>รับผลลัพธ์พร้อมคำแนะนำทันที</li>
              <li>เชื่อมต่อกับทีมแพทย์เพื่อปรึกษาต่อ</li>
            </ul>
          </div>
          <HealthAssessment compact />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-2xl font-bold mb-4">ทำไมเทเลเมดิซีนจึงจำเป็นสำหรับไทย</h2>
        <div className="grid md:grid-cols-3 gap-5">
          <div className="card p-5">
            <p className="font-semibold">บุคลากรจำกัด ภาระงานสูง</p>
            <p className="text-sm text-slate-600">จำนวนแพทย์/เตียงต่อประชากรไม่สูงเมื่อเทียบความต้องการ เทเลเมดิซีนช่วยคัดกรองและดูแลต่อเนื่อง</p>
          </div>
          <div className="card p-5">
            <p className="font-semibold">NCDs และสังคมสูงวัย</p>
            <p className="text-sm text-slate-600">เบาหวาน/ความดันเพิ่มขึ้น พร้อมผู้สูงอายุจำนวนมาก ต้องการติดตามอาการระยะยาวที่ยืดหยุ่น</p>
          </div>
          <div className="card p-5">
            <p className="font-semibold">ความเหลื่อมล้ำการเข้าถึง</p>
            <p className="text-sm text-slate-600">พื้นที่ห่างไกล/ต่างจังหวัดเข้าถึงผู้เชี่ยวชาญได้ยาก วิดีโอปรึกษา+ส่งยาช่วยลดช่องว่าง</p>
          </div>
        </div>
        <div className="mt-6">
          <Link to="/insights" className="text-brand-700 underline">ดูข้อมูลประกอบ (Insights สุขภาพไทย)</Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 grid md:grid-cols-3 gap-5">
        <FeatureCard title="การจองและวิดีโอคอล" desc="จองง่าย ลิงก์ห้องประชุมอัตโนมัติ รองรับผู้ให้บริการหลายบทบาท" cta={<Link to="/demo" className="text-brand-700 underline">ทดลองจอง</Link>} />
        <FeatureCard title="e-Prescription" desc="ส่งใบสั่งยาและติดตามสถานะ เชื่อมร้านยา/ระบบจัดส่ง" cta={<Link to="/demo" className="text-brand-700 underline">ลองส่งใบสั่งยา</Link>} />
        <FeatureCard title="การประเมินอาการ" desc="คัดกรองความเร่งด่วนเบื้องต้น ช่วยลดภาระงานหน้าห้อง" cta={<Link to="/demo" className="text-brand-700 underline">ลองประเมิน</Link>} />
      </section>

      <section id="security" className="mx-auto max-w-7xl px-4 py-12">
        <div className="card p-6">
          <h2 className="text-2xl font-bold">ความปลอดภัยและมาตรฐาน</h2>
          <ul className="list-disc ml-5 mt-3 text-slate-700">
            <li>การเข้ารหัสข้อมูลระหว่างทาง (TLS)</li>
            <li>แนวปฏิบัติความเป็นส่วนตัวตาม PDPA</li>
            <li>Role-based access สำหรับทีมดูแล</li>
          </ul>
        </div>
      </section>
    </>
  )
}
