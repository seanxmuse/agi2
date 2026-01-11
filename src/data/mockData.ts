import type { Patient, Visit, InsuranceNote, ClinicalOrder, PatientArtifact } from '@/types'

export const mockPatients: Patient[] = [
  {
    id: 'p1',
    firstName: 'Peter',
    lastName: 'Brown',
    dob: '1970-03-15',
    mrn: '123456789',
    gender: 'M',
    insurance: {
      provider: 'Blue Cross Blue Shield',
      planId: 'PPO-12345',
      groupNumber: 'GRP-98765',
    },
    allergies: [],
    medications: [
      { name: 'Ibuprofen', dose: '400mg', frequency: 'PRN', startDate: '2023-08-15' },
    ],
    contact: {
      phone: '(555) 123-4567',
      email: 'peter.brown@email.com',
      address: '123 Main St, New York, NY 10001',
    },
  },
  {
    id: 'p2',
    firstName: 'James',
    lastName: 'Wilson',
    dob: '1958-07-22',
    mrn: '987654321',
    gender: 'M',
    insurance: {
      provider: 'Aetna',
      planId: 'HMO-54321',
      groupNumber: 'GRP-11111',
    },
    allergies: ['Aspirin'],
    medications: [
      { name: 'Atorvastatin', dose: '20mg', frequency: 'QHS', startDate: '2023-09-10' },
      { name: 'Amlodipine', dose: '5mg', frequency: 'QD', startDate: '2024-02-20' },
    ],
    contact: {
      phone: '(555) 987-6543',
      email: 'james.wilson@email.com',
      address: '456 Oak Ave, Brooklyn, NY 11201',
    },
  },
  {
    id: 'p3',
    firstName: 'Sarah',
    lastName: 'Chen',
    dob: '1975-11-08',
    mrn: '456789123',
    gender: 'F',
    insurance: {
      provider: 'United Healthcare',
      planId: 'EPO-67890',
      groupNumber: 'GRP-22222',
    },
    allergies: [],
    medications: [
      { name: 'Levothyroxine', dose: '50mcg', frequency: 'QD', startDate: '2022-04-15' },
    ],
    contact: {
      phone: '(555) 456-7890',
      email: 'sarah.chen@email.com',
      address: '789 Pine Rd, Manhattan, NY 10022',
    },
  },
]

export const mockVisits: Visit[] = [
  {
    id: 'v1',
    patientId: 'p1',
    date: '2024-01-15T10:00:00',
    provider: 'Dr. Sarah Miller',
    chiefComplaint: 'Worsening left knee pain',
    status: 'completed',
    transcript: `Peter Brown is a 54-year-old male with established history of osteoarthritis of the left knee presenting with worsening left knee pain over the past several weeks. Pain is localized to the medial aspect of the left knee, worse in the afternoons, especially after prolonged standing at work. Patient reports current ibuprofen 400mg as needed is no longer providing adequate pain relief. Denies trauma, locking, catching, or giving way of the knee. Denies fever, chills, or systemic symptoms.

Review of recent X-rays from last month demonstrates progression of medial compartment narrowing compared to prior imaging, consistent with advancing osteoarthritis.

Vitals: BP 138/88, HR 72, RR 16, SpO2 99% on RA, Temp 98.6°F
Physical exam: General - well appearing, no acute distress. Left knee examination reveals mild medial joint line tenderness. Full range of motion. No effusion. Negative McMurray's test. Negative Lachman's test. Gait: Mild antalgic pattern favoring left leg.

Assessment: Osteoarthritis of left knee, primary - progressive symptoms requiring escalation of conservative management.

Plan:
1. Initiate Naproxen 500mg PO twice daily with food
2. Referral to Physical Therapy for knee strengthening exercises
3. Follow-up in 6 weeks to assess response
4. If no improvement after 6 weeks, proceed with MRI left knee
5. Educated patient on activity modification and weight management`,
  },
  {
    id: 'v2',
    patientId: 'p2',
    date: '2026-01-10T10:00:00',
    provider: 'Dr. Smith',
    chiefComplaint: 'Annual physical',
    status: 'in-progress',
  },
  {
    id: 'v3',
    patientId: 'p3',
    date: '2026-01-10T11:00:00',
    provider: 'Dr. Smith',
    chiefComplaint: 'Follow-up thyroid',
    status: 'checked-in',
  },
]

export const mockInsuranceNote: InsuranceNote = {
  visitId: 'v1',
  layers: {
    billing: {
      chiefComplaint: 'Worsening left knee pain, especially in afternoons',
      icdCodes: [
        { code: 'M17.11', description: 'Primary osteoarthritis, left knee', isPrimary: true },
        { code: 'M25.562', description: 'Pain in left knee', isPrimary: false },
      ],
      emLevel: '99214 (Established Patient, Level 4)',
      followUp: '',
    },
    medicalNecessity: {
      justification: '54yo M with established history of osteoarthritis of the left knee presenting with worsening left knee pain over several weeks. Pain localized to medial aspect, worse in afternoons after prolonged standing at work. Current ibuprofen 400mg PRN no longer providing adequate relief. Recent X-rays demonstrate progression of medial compartment narrowing consistent with advancing osteoarthritis.',
      servicesRendered: [
        'Comprehensive history and physical examination',
        'Review of recent X-ray imaging',
        'Medical decision making: moderate complexity',
      ],
      ordersWithJustification: [
        { cptCode: '97110', description: 'Physical Therapy - Therapeutic exercises', rationale: 'Knee strengthening exercises and functional improvement for osteoarthritis management' },
        { cptCode: '73721', description: 'MRI left knee without contrast', rationale: 'Conditional order if no improvement after 6 weeks of conservative treatment - detailed evaluation of cartilage and soft tissue structures' },
      ],
    },
    fullDocumentation: `INSURANCE MEDICAL NOTE

Patient: Peter Brown
DOB: 03/15/1970
Date of Service: 01/15/2024
Location: Outpatient Clinic
Provider: Sarah Miller, MD
Visit Type: Established Patient, Level 4

REASON FOR VISIT
Worsening left knee pain, especially in afternoons. Current ibuprofen not providing adequate relief.

HISTORY OF PRESENT ILLNESS
Peter Brown is a 54-year-old male with established history of osteoarthritis of the left knee presenting with worsening left knee pain over the past several weeks. Pain is localized to the medial aspect of the left knee, worse in the afternoons, especially after prolonged standing at work. Patient reports current ibuprofen 400mg as needed is no longer providing adequate pain relief. Denies trauma, locking, catching, or giving way of the knee. Denies fever, chills, or systemic symptoms.

Review of recent X-rays from last month demonstrates progression of medial compartment narrowing compared to prior imaging, consistent with advancing osteoarthritis.

REVIEW OF SYSTEMS
• Constitutional: Negative for fever, chills, or weight loss
• Musculoskeletal: Positive for left knee pain, worse with activity; negative for joint swelling, redness, or warmth
• Neurologic: Negative for numbness, tingling, or weakness
• All other systems: Reviewed and negative

PHYSICAL EXAMINATION
Vital Signs:
• BP: 138/88 mmHg
• HR: 72 bpm
• Temp: 98.6°F
• RR: 16
• SpO₂: 99% on room air

General: Well appearing, no acute distress
Musculoskeletal: Left knee examination reveals mild medial joint line tenderness. Full range of motion. No effusion. Negative McMurray's test. Negative Lachman's test.
Gait: Mild antalgic pattern favoring left leg.
Cardiovascular: Regular rate and rhythm
Respiratory: Clear to auscultation bilaterally
Neurologic: Alert and oriented ×3

LABORATORIES AND IMAGING
• X-ray left knee (recent): Progression of medial compartment narrowing, consistent with osteoarthritis
• MRI left knee: Ordered conditionally if no improvement after 6 weeks of conservative treatment
• Laboratory studies: Not indicated at this time

ASSESSMENT AND PLAN

1. Osteoarthritis of left knee, primary (M17.11)
   • Initiate Naproxen 500mg PO twice daily with food for anti-inflammatory effect and pain control
   • Referral to Physical Therapy for knee strengthening exercises and functional improvement
   • Follow-up in 6 weeks to assess response to conservative management
   • If no improvement after 6 weeks of PT and NSAID therapy, proceed with MRI left knee (CPT: 73721) for detailed evaluation of cartilage and soft tissue structures
   • Educated patient on activity modification and weight management

2. Left knee pain (M25.562)
   • Symptoms attributed to progressive osteoarthritis
   • Expected to improve with conservative management including NSAID therapy and physical therapy`,
  },
}

export const mockOrders: ClinicalOrder[] = [
  {
    id: 'o1',
    visitId: 'v1',
    type: 'prescription',
    status: 'sent',
    createdAt: '2024-01-15T10:30:00',
    details: {
      medication: 'Naproxen',
      dose: '500mg',
      frequency: 'BID',
      quantity: 60,
      refills: 2,
      instructions: 'Take with food for anti-inflammatory effect and pain control',
      pharmacy: {
        name: 'CVS Pharmacy',
        address: '350 Fifth Avenue, New York, NY 10118',
        phone: '(212) 564-8970',
      },
    } as PrescriptionDetails,
  },
  {
    id: 'o4',
    visitId: 'v1',
    type: 'lab',
    status: 'ordered',
    createdAt: '2024-01-15T10:32:00',
    details: {
      tests: ['CBC with Differential', 'CMP (Comprehensive Metabolic Panel)', 'ESR (Sed Rate)', 'CRP (C-Reactive Protein)'],
      urgency: 'routine',
      notes: 'Baseline inflammatory markers and metabolic panel before starting NSAID therapy',
      facility: {
        name: 'Quest Diagnostics',
        address: '1440 Broadway, New York, NY 10018',
        phone: '(212) 730-2270',
      },
    } as LabDetails,
  },
  {
    id: 'o3',
    visitId: 'v1',
    type: 'referral',
    status: 'sent',
    createdAt: '2024-01-15T10:40:00',
    details: {
      specialty: 'Physical Therapy',
      provider: 'Excel Physical Therapy',
      urgency: 'routine',
      reason: 'Knee strengthening exercises and functional improvement for left knee osteoarthritis',
      notes: 'Focus on quadriceps strengthening, ROM exercises, and gait training',
      facility: {
        name: 'Excel Physical Therapy',
        address: '275 Madison Avenue, Suite 1000, New York, NY 10016',
        phone: '(212) 867-8600',
      },
    } as ReferralDetails,
  },
  {
    id: 'o2',
    visitId: 'v1',
    type: 'imaging',
    status: 'ordered',
    createdAt: '2024-01-15T10:35:00',
    details: {
      study: 'MRI Left Knee without Contrast',
      bodyPart: 'Left Knee',
      indication: 'Conditional: If no improvement after 6 weeks of conservative treatment - detailed evaluation of cartilage and soft tissue structures',
      protocol: 'Standard knee protocol',
      facility: {
        name: 'Lenox Hill Radiology',
        address: '61 East 77th Street, New York, NY 10075',
        phone: '(212) 772-3111',
      },
    } as ImagingDetails,
  },
]

export const mockPatientArtifact: PatientArtifact = {
  visitId: 'v1',
  preferences: {
    format: 'pdf',
    literacyLevel: 8,
    language: 'en',
  },
  content: {
    greeting: 'Hi Peter! Here\'s what we talked about today:',
    summary: 'You came in because your left knee pain has been getting worse, especially in the afternoons after standing at work. We looked at your recent X-rays and they show that the arthritis in your knee has progressed a bit. The ibuprofen you\'ve been taking isn\'t working as well anymore, so we\'re going to try a stronger anti-inflammatory medicine and get you started with physical therapy.',
    medications: [
      'STOP taking Ibuprofen 400mg',
      'NEW: Start Naproxen 500mg - take one pill twice a day with food',
    ],
    nextSteps: [
      'Start physical therapy at Excel Physical Therapy - 275 Madison Avenue, Suite 1000, New York, NY 10016 - (212) 867-8600',
      'Pick up your prescription at CVS Pharmacy - 350 Fifth Avenue, New York, NY 10118 - (212) 564-8970',
      'Get blood work done at Quest Diagnostics - 1440 Broadway, New York, NY 10018 - (212) 730-2270',
      'Take Naproxen regularly with meals to reduce inflammation',
      'Try to avoid standing for long periods when possible - take breaks to sit and rest your knee',
      'See me again in 6 weeks to check how you\'re doing',
    ],
    warningSignsTitle: 'Call us right away if:',
    warningSigns: [
      'Your knee becomes very swollen, red, or warm to touch',
      'You develop a fever along with knee pain',
    ],
  },
}

interface FacilityInfo {
  name: string
  address: string
  phone: string
}

interface PrescriptionDetails {
  medication: string
  dose: string
  frequency: string
  quantity: number
  refills: number
  instructions?: string
  pharmacy?: FacilityInfo
}

interface LabDetails {
  tests: string[]
  urgency: 'routine' | 'urgent' | 'stat'
  notes?: string
  facility?: FacilityInfo
}

interface ImagingDetails {
  study: string
  bodyPart: string
  indication: string
  protocol?: string
  facility?: FacilityInfo
}

interface ReferralDetails {
  specialty: string
  provider?: string
  urgency: 'routine' | 'urgent' | 'emergent'
  reason: string
  notes?: string
  facility?: FacilityInfo
}

