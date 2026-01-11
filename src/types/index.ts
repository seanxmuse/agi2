// Patient Types
export interface Patient {
  id: string
  firstName: string
  lastName: string
  dob: string
  mrn: string
  gender: 'M' | 'F' | 'O'
  insurance: {
    provider: string
    planId: string
    groupNumber: string
  }
  allergies: string[]
  medications: Medication[]
  contact: {
    phone: string
    email: string
    address: string
  }
}

export interface Medication {
  name: string
  dose: string
  frequency: string
  startDate: string
}

// Visit Types
export interface Visit {
  id: string
  patientId: string
  date: string
  provider: string
  chiefComplaint: string
  status: 'checked-in' | 'in-progress' | 'completed'
  transcript?: string
}

// Insurance Note Types (Artifact 1)
export interface InsuranceNote {
  visitId: string
  layers: {
    billing: BillingSummary
    medicalNecessity: MedicalNecessity
    fullDocumentation: string
  }
}

export interface BillingSummary {
  chiefComplaint: string
  icdCodes: ICDCode[]
  emLevel: string
  followUp: string
}

export interface MedicalNecessity {
  justification: string
  servicesRendered: string[]
  ordersWithJustification: OrderJustification[]
}

export interface OrderJustification {
  cptCode: string
  description: string
  rationale: string
}

export interface ICDCode {
  code: string
  description: string
  isPrimary: boolean
}

// Clinical Orders Types (Artifact 2)
export type OrderType = 'prescription' | 'lab' | 'imaging' | 'referral'
export type OrderStatus = 'ordered' | 'sent' | 'in-progress' | 'completed' | 'reviewed'

export interface ClinicalOrder {
  id: string
  visitId: string
  type: OrderType
  status: OrderStatus
  createdAt: string
  details: PrescriptionDetails | LabDetails | ImagingDetails | ReferralDetails
}

export interface PrescriptionDetails {
  medication: string
  dose: string
  frequency: string
  quantity: number
  refills: number
  instructions?: string
}

export interface LabDetails {
  tests: string[]
  urgency: 'routine' | 'urgent' | 'stat'
  notes?: string
}

export interface ImagingDetails {
  study: string
  bodyPart: string
  indication: string
  protocol?: string
}

export interface ReferralDetails {
  specialty: string
  provider?: string
  urgency: 'routine' | 'urgent' | 'emergent'
  reason: string
  notes?: string
}

// Patient Artifact Types (Artifact 3)
export type ArtifactFormat = 'pdf' | 'video' | 'tiktok' | 'audio'
export type LiteracyLevel = 5 | 8 | 12 | 'professional'
export type Language = 'en' | 'es' | 'zh' | 'other'

export interface PatientArtifact {
  visitId: string
  preferences: {
    format: ArtifactFormat
    literacyLevel: LiteracyLevel
    language: Language
  }
  content: {
    greeting: string
    summary: string
    medications: string[]
    nextSteps: string[]
    warningSignsTitle: string
    warningSigns: string[]
  }
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

