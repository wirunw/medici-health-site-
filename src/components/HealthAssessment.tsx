import { useState } from 'react'

type Question = {
  id: string
  text: string
  type: 'yes_no' | 'scale' | 'multiple'
  options?: string[]
}

type Answer = {
  questionId: string
  value: string | number
}

type AssessmentResult = {
  score: number
  level: 'ดีเยี่ยม' | 'ดี' | 'ปานกลาง' | 'ควรปรับปรุง'
  recommendations: string[]
  nextSteps: string
}

const questions: Question[] = [
  { id: 'exercise', text: 'คุณออกกำลังกายสม่ำเสมออย่างน้อยสัปดาห์ละ 3 ครั้ง หรือไม่?', type: 'yes_no' },
  { id: 'sleep', text: 'คุณนอนหลับเพียงพอ (7-9 ชั่วโมงต่อคืน) หรือไม่?', type: 'yes_no' },
  { id: 'stress', text: 'ระดับความเครียดในชีวิตของคุณ (1=น้อยมาก, 5=มากมาย)', type: 'scale' },
  { id: 'diet', text: 'คุณรับประทานผักและผลไม้วันละกี่มื้อ?', type: 'multiple', options: ['ไม่ค่อยกิน', '1 มื้อ', '2 มื้อ', '3 มื้อหรือมากกว่า'] },
  { id: 'checkup', text: 'คุณตรวจสุขภาพประจำปีสม่ำเสมอหรือไม่?', type: 'yes_no' },
  { id: 'smoking', text: 'คุณสูบบุหรี่หรือไม่?', type: 'yes_no' },
  { id: 'hydration', text: 'คุณดื่มน้ำเปล่าวันละกี่แก้ว?', type: 'multiple', options: ['น้อยกว่า 4 แก้ว', '4-6 แก้ว', '7-8 แก้ว', 'มากกว่า 8 แก้ว'] }
]

function calculateResult(answers: Answer[]): AssessmentResult {
  let score = 0
  const maxScore = questions.length * 4 // normalized to 4 points per question
  
  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId)
    if (!question) return
    
    switch (question.type) {
      case 'yes_no':
        if (answer.questionId === 'smoking') {
          score += answer.value === 'ไม่' ? 4 : 0 // reverse scoring for smoking
        } else {
          score += answer.value === 'ใช่' ? 4 : 1
        }
        break
      case 'scale':
        if (answer.questionId === 'stress') {
          score += 5 - Number(answer.value) // reverse scoring for stress
        }
        break
      case 'multiple':
        if (answer.questionId === 'diet') {
          const dietScore = { 'ไม่ค่อยกิน': 1, '1 มื้อ': 2, '2 มื้อ': 3, '3 มื้อหรือมากกว่า': 4 }
          score += dietScore[answer.value as keyof typeof dietScore] || 1
        } else if (answer.questionId === 'hydration') {
          const hydrateScore = { 'น้อยกว่า 4 แก้ว': 1, '4-6 แก้ว': 2, '7-8 แก้ว': 4, 'มากกว่า 8 แก้ว': 3 }
          score += hydrateScore[answer.value as keyof typeof hydrateScore] || 1
        }
        break
    }
  })
  
  const percentage = (score / maxScore) * 100
  
  let level: AssessmentResult['level']
  let recommendations: string[]
  let nextSteps: string
  
  if (percentage >= 85) {
    level = 'ดีเยี่ยม'
    recommendations = ['รักษาพฤติกรรมสุขภาพดีต่อไป', 'แบ่งปันความรู้สุขภาพกับคนรอบข้าง']
    nextSteps = 'ทำการตรวจสุขภาพประจำปีเพื่อติดตามสถานะ'
  } else if (percentage >= 70) {
    level = 'ดี'
    recommendations = ['เพิ่มการออกกำลังกายให้สม่ำเสมอมากขึ้น', 'ปรับปรุงคุณภาพการนอนหลับ']
    nextSteps = 'ปรึกษาแพทย์เพื่อรับคำแนะนำการดูแลสุขภาพเชิงป้องกัน'
  } else if (percentage >= 50) {
    level = 'ปานกลาง'
    recommendations = ['ปรับเปลี่ยนพฤติกรรมการกินให้มีผักผลไม้มากขึ้น', 'จัดการความเครียดด้วยกิจกรรมผ่อนคลาย', 'ออกกำลังกายอย่างสม่ำเสมอ']
    nextSteps = 'พิจารณาปรึกษาทีมสุขภาพเพื่อวางแผนปรับปรุงสุขภาพ'
  } else {
    level = 'ควรปรับปรุง'
    recommendations = ['เปลี่ยนแปลงพฤติกรรมสุขภาพในหลายด้าน', 'เลิกสูบบุหรี่ (หากสูบ)', 'เพิ่มการดื่มน้ำ', 'หาเวลาออกกำลังกาย', 'นอนหลับให้เพียงพอ']
    nextSteps = 'ควรพบแพทย์เพื่อประเมินสุขภาพและรับคำปรึกษาเร่งด่วน'
  }
  
  return { score: Math.round(percentage), level, recommendations, nextSteps }
}

export default function HealthAssessment({ compact = false }: { compact?: boolean }) {
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [result, setResult] = useState<AssessmentResult | null>(null)
  const [showResult, setShowResult] = useState(false)
  
  const handleAnswer = (value: string | number) => {
    const question = questions[currentQ]
    if (!question) return
    
    const newAnswers = [...answers.filter(a => a.questionId !== question.id), 
                       { questionId: question.id, value }]
    setAnswers(newAnswers)
    
    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1)
    } else {
      // Assessment complete
      const assessmentResult = calculateResult(newAnswers)
      setResult(assessmentResult)
      setShowResult(true)
    }
  }
  
  const resetAssessment = () => {
    setCurrentQ(0)
    setAnswers([])
    setResult(null)
    setShowResult(false)
  }
  
  if (showResult && result) {
    return (
      <div className={`card p-6 space-y-4 ${compact ? 'max-w-md' : ''}`}>
        <div className="text-center">
          <h3 className="text-xl font-bold text-brand-700">ผลการประเมินสุขภาพของคุณ</h3>
          <div className="mt-3">
            <div className="text-3xl font-bold">{result.score}%</div>
            <div className={`text-lg font-semibold ${
              result.level === 'ดีเยี่ยม' ? 'text-green-600' :
              result.level === 'ดี' ? 'text-blue-600' :
              result.level === 'ปานกลาง' ? 'text-yellow-600' : 'text-red-600'
            }`}>
              สุขภาพระดับ{result.level}
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-slate-800 mb-2">คำแนะนำสำหรับคุณ:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
              {result.recommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>
          
          <div className="rounded-lg bg-brand-50 p-3">
            <p className="text-sm"><span className="font-semibold">ขั้นตอนถัดไป:</span> {result.nextSteps}</p>
          </div>
          
          <div className="flex gap-2 pt-2">
            <button className="btn btn-primary flex-1" onClick={resetAssessment}>ทำแบบประเมินใหม่</button>
            <button className="btn flex-1" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              ปรึกษาทีมแพทย์
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  const question = questions[currentQ]
  const progress = ((currentQ + 1) / questions.length) * 100
  
  if (!question) return null
  
  return (
    <div className={`card p-6 space-y-4 ${compact ? 'max-w-md' : ''}`}>
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">แบบประเมินสุขภาพ 2 นาที</h3>
          <span className="text-sm text-slate-500">{currentQ + 1}/{questions.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-brand-600 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      
      <div className="py-4">
        <p className="text-slate-800 mb-4">{question.text}</p>
        
        <div className="space-y-2">
          {question.type === 'yes_no' && (
            <>
              <button className="w-full p-3 text-left border rounded-lg hover:bg-brand-50 hover:border-brand-300 transition-colors" 
                      onClick={() => handleAnswer('ใช่')}>
                ใช่
              </button>
              <button className="w-full p-3 text-left border rounded-lg hover:bg-brand-50 hover:border-brand-300 transition-colors" 
                      onClick={() => handleAnswer('ไม่')}>
                ไม่ใช่
              </button>
            </>
          )}
          
          {question.type === 'scale' && (
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map(num => (
                <button key={num} 
                        className="p-3 text-center border rounded-lg hover:bg-brand-50 hover:border-brand-300 transition-colors"
                        onClick={() => handleAnswer(num)}>
                  {num}
                </button>
              ))}
            </div>
          )}
          
          {question.type === 'multiple' && question.options && (
            <>
              {question.options.map(option => (
                <button key={option} 
                        className="w-full p-3 text-left border rounded-lg hover:bg-brand-50 hover:border-brand-300 transition-colors"
                        onClick={() => handleAnswer(option)}>
                  {option}
                </button>
              ))}
            </>
          )}
        </div>
      </div>
      
      {currentQ > 0 && (
        <button className="text-brand-700 text-sm hover:underline" onClick={() => setCurrentQ(prev => prev - 1)}>
          ← ย้อนกลับ
        </button>
      )}
    </div>
  )
}
