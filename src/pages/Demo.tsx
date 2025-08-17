import AppointmentScheduler from '../components/demos/AppointmentScheduler'
import SymptomChecker from '../components/demos/SymptomChecker'
import PrescriptionRouter from '../components/demos/PrescriptionRouter'
import TeamChat from '../components/demos/TeamChat'
import OnboardingForm from '../components/demos/OnboardingForm'
import { Link } from 'react-router-dom'

export default function Demo(){
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 space-y-8">
      <div className="flex items-center justify-between">
  <h2 className="text-2xl font-bold">สาธิตฟีเจอร์ — เวิร์กโฟลว์เทเลเมดิซีนสำหรับทีมไทย</h2>
        <Link to="/" className="text-brand-700 underline">กลับหน้าแรก</Link>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <AppointmentScheduler />
        <SymptomChecker />
        <PrescriptionRouter />
        <TeamChat />
        <OnboardingForm />
      </div>
    </div>
  )
}
