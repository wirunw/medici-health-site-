export type Slot = { id: string; start: string; clinician: string; role: 'แพทย์'|'พยาบาล'|'เภสัชกร' }
export type Triage = { risk: 'ต่ำ'|'กลาง'|'สูง'; guidance: string }

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

export async function fetchSlots(): Promise<Slot[]> {
  await delay(400)
  return [
    { id: 's1', start: new Date(Date.now()+60*60*1000).toISOString(), clinician: 'นพ. ก้องภพ', role: 'แพทย์' },
    { id: 's2', start: new Date(Date.now()+2*60*60*1000).toISOString(), clinician: 'ภก. ชุติมา', role: 'เภสัชกร' },
    { id: 's3', start: new Date(Date.now()+3*60*60*1000).toISOString(), clinician: 'พยบ. พัชรี', role: 'พยาบาล' },
  ]
}

export async function bookSlot(id: string) {
  await delay(600)
  return { ok: true, meetingUrl: 'https://meet.medici.health/example' }
}

export async function triage(symptoms: string): Promise<Triage> {
  await delay(500)
  const s = symptoms.toLowerCase()
  if (s.includes('เจ็บหน้าอก') || s.includes('หายใจไม่ออก')) return { risk: 'สูง', guidance: 'กรุณาไปโรงพยาบาลทันที หรือโทร 1669' }
  if (s.includes('ไข้') || s.includes('ไอ') || s.includes('เจ็บคอ')) return { risk: 'กลาง', guidance: 'ดื่มน้ำ พักผ่อน หากมีอาการแย่ลงปรึกษาแพทย์' }
  return { risk: 'ต่ำ', guidance: 'เฝ้าสังเกตอาการและดูแลตนเอง' }
}

export async function routePrescription(meds: string[]) {
  await delay(500)
  return { pharmacy: 'Medici e-Pharmacy', etaHours: 3, tracking: 'RX123456' }
}
