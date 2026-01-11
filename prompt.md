# AGI2 - Healthcare Visit Management System

## Overview
A full-stack healthcare application for managing patient visits, generating clinical documentation, insurance billing, and patient engagement. Built with React + FastAPI, using Claude for AI-powered transcription and patient Q&A.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React (Vite + TypeScript) |
| Backend | FastAPI (Python) |
| AI/LLM | Claude API (Anthropic) |
| Database | PostgreSQL + SQLAlchemy |
| External APIs | ICD-10 Database (NIH Clinical Tables API) |
| Styling | Tailwind CSS + shadcn/ui |

---

## Design System

| Element | Value |
|---------|-------|
| Primary | `#0066CC` (Medical Blue) |
| Secondary | `#00A3E0` (Accent Blue) |
| Background | `#FFFFFF` (White) |
| Surface | `#F8FAFC` (Off-white) |
| Text Primary | `#1E293B` (Slate 800) |
| Text Secondary | `#64748B` (Slate 500) |
| Border | `#E2E8F0` (Slate 200) |
| Font | Satoshi / Inter |
| Spacing | 8px grid system |

### Color Palette (Blue & White Only)

```css
:root {
  /* Primary Blues */
  --blue-50: #EFF6FF;
  --blue-100: #DBEAFE;
  --blue-200: #BFDBFE;
  --blue-300: #93C5FD;
  --blue-400: #60A5FA;
  --blue-500: #3B82F6;
  --blue-600: #2563EB;
  --blue-700: #1D4ED8;
  --blue-800: #1E40AF;
  --blue-900: #1E3A8A;
  
  /* Medical Blue */
  --primary: #0066CC;
  --primary-light: #4D94DB;
  --primary-dark: #004C99;
  
  /* Whites */
  --white: #FFFFFF;
  --surface: #F8FAFC;
  --muted: #F1F5F9;
}
```

---

## Application Flow

### 1. Patient Check-In
- Patient arrives and checks in
- System displays **Chart Card** with:
  - Patient demographics (name, DOB, MRN)
  - Visit history
  - Active medications
  - Allergies
  - Insurance info

### 2. Visit Transcript Generation
- Doctor conducts visit
- **Audio transcription** via Claude API
- Real-time or post-visit processing
- Transcript stored with timestamps

---

## Post-Visit Outputs (3 Artifacts)

After the transcript is generated, the system produces **three distinct outputs**:

```
                        ┌─────────────────┐
                        │   TRANSCRIPT    │
                        │   (from visit)  │
                        └────────┬────────┘
                                 │
          ┌──────────────────────┼──────────────────────┐
          ▼                      ▼                      ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  1. INSURANCE   │    │  2. CLINICAL    │    │  3. PATIENT     │
│     NOTE        │    │     ORDERS      │    │     ARTIFACT    │
│                 │    │                 │    │                 │
│  • ICD-10 codes │    │  • Prescriptions│    │  • Personalized │
│  • Billing      │    │  • Imaging      │    │  • Multi-format │
│  • 3-layer view │    │  • Referrals    │    │  • Multi-lingual│
│                 │    │  • Labs         │    │  • Interactive  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

### 3. Insurance Note (3-Layer Summary with ICD-10 Codes)

The **insurance-based documentation** interface. After the transcript is generated, the system creates a 3-layer summary optimized for billing and insurance, pulling **ICD-10 codes from the NIH Clinical Tables API**.

```
┌─────────────────────────────────────────────────────────┐
│  🏥 INSURANCE NOTE                                      │
├─────────────────────────────────────────────────────────┤
│  LAYER 1: Billing Summary                               │
│  ┌─────────────────────────────────────────────────────┐│
│  │ Chief Complaint: Chest pain, shortness of breath   ││
│  │                                                    ││
│  │ ICD-10 Codes:                                      ││
│  │ • I20.9  - Angina pectoris, unspecified (Primary) ││
│  │ • I10    - Essential hypertension (Secondary)     ││
│  │ • R07.9  - Chest pain, unspecified                ││
│  │                                                    ││
│  │ E/M Level: 99214 (Established, Moderate)           ││
│  │ Follow-up: 2 weeks                                 ││
│  └─────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────┤
│  LAYER 2: Medical Necessity [Expand ▼]                  │
│  ┌─────────────────────────────────────────────────────┐│
│  │ Clinical Justification:                            ││
│  │ • 58yo M with history of HTN, presenting with     ││
│  │   new onset exertional chest pain x 2 weeks       ││
│  │ • EKG shows nonspecific ST changes                ││
│  │ • Risk factors: HTN, family history CAD           ││
│  │                                                    ││
│  │ Services Rendered:                                 ││
│  │ • Comprehensive history and physical              ││
│  │ • EKG interpretation (93000)                      ││
│  │ • Medical decision making: moderate complexity    ││
│  │                                                    ││
│  │ Orders with Medical Necessity:                     ││
│  │ • Stress test (93015) - r/o ischemia             ││
│  │ • Lipid panel (80061) - cardiac risk assessment  ││
│  │ • BMP (80048) - baseline metabolic status        ││
│  └─────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────┤
│  LAYER 3: Complete Documentation [Expand ▼]            │
│  ┌─────────────────────────────────────────────────────┐│
│  │ [Full Visit Transcript]                            ││
│  │ [Complete HPI, ROS, Physical Exam]                 ││
│  │ [All ICD-10 Codes with Descriptions]               ││
│  │ [CPT Codes and Modifiers]                          ││
│  │ [Audit-Ready Documentation]                        ││
│  └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

| Layer | Purpose | Content |
|-------|---------|---------|
| **Layer 1** | Billing Summary | ICD-10 codes, E/M level, diagnoses |
| **Layer 2** | Medical Necessity | Clinical justification, CPT codes, order rationale |
| **Layer 3** | Complete Documentation | Full transcript, all codes, audit-ready record |

**ICD-10 Integration:**
- Real-time lookup from NIH Clinical Tables API
- AI-suggested codes based on transcript content
- Primary/secondary diagnosis selection
- Billability validation
- Code hierarchy navigation

---

### 4. Clinical Orders (4 Order Types)

The **clinical workflow agent** handles four types of orders that result from the visit:

```
┌─────────────────────────────────────────────────────────┐
│  📋 CLINICAL ORDERS                                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  💊 PRESCRIPTIONS          🔬 LABORATORIES              │
│  ┌─────────────────────┐   ┌─────────────────────┐     │
│  │ Lisinopril 10mg     │   │ CBC with diff       │     │
│  │ QD, #30, 3 refills  │   │ BMP                 │     │
│  │                     │   │ Lipid panel         │     │
│  │ Aspirin 81mg        │   │ HbA1c               │     │
│  │ QD, #90, 3 refills  │   │                     │     │
│  └─────────────────────┘   └─────────────────────┘     │
│                                                         │
│  🩻 IMAGING                📤 REFERRALS                 │
│  ┌─────────────────────┐   ┌─────────────────────┐     │
│  │ Cardiac Stress Test │   │ Cardiology Consult  │     │
│  │ - Exercise protocol │   │ - Dr. Smith         │     │
│  │ - r/o ischemia      │   │ - Urgent, 1 week    │     │
│  │                     │   │                     │     │
│  │ Chest X-Ray PA/Lat  │   │ Nutrition Consult   │     │
│  │ - r/o cardiomegaly  │   │ - Cardiac diet      │     │
│  └─────────────────────┘   └─────────────────────┘     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

| Order Type | Description | Examples |
|------------|-------------|----------|
| **💊 Prescriptions** | Medication orders | New meds, refills, dosage changes |
| **🔬 Laboratories** | Lab test orders | CBC, BMP, lipid panel, HbA1c |
| **🩻 Imaging** | Diagnostic imaging | X-ray, CT, MRI, stress test, echo |
| **📤 Referrals** | Specialist referrals | Cardiology, endocrine, nutrition |

**Order Workflow:**
```
Ordered → Sent → In Progress → Completed → Reviewed
```

---

### 5. Patient Artifact (Personalized, Interactive)

The **patient-facing artifact** is designed to create a warm, engaging experience. It helps patients remember what was discussed, understand their next steps, and interact with their visit information.

```
┌─────────────────────────────────────────────────────────┐
│  👤 PATIENT ARTIFACT                                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────────────────────────────────────────┐│
│  │  📱 FORMAT PREFERENCES                              ││
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   ││
│  │  │ 📄 PDF  │ │ 🎬 Video│ │ 📱TikTok│ │ 🗣️ Audio│   ││
│  │  │ Summary │ │ Explainer│ │  Style  │ │ Version │   ││
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘   ││
│  └─────────────────────────────────────────────────────┘│
│                                                         │
│  ┌─────────────────────────────────────────────────────┐│
│  │  📚 LITERACY LEVEL                                  ││
│  │  ○ 5th Grade   ● 8th Grade   ○ 12th Grade   ○ Pro ││
│  └─────────────────────────────────────────────────────┘│
│                                                         │
│  ┌─────────────────────────────────────────────────────┐│
│  │  🌍 LANGUAGE                                        ││
│  │  ● English  ○ Spanish  ○ Chinese  ○ Other: ___    ││
│  └─────────────────────────────────────────────────────┘│
│                                                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  YOUR VISIT SUMMARY                          🇪🇸 🇨🇳    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  👋 Hi Maria! Here's what we talked about today:       │
│                                                         │
│  ❤️ WHAT'S GOING ON                                    │
│  You came in because of chest pain. We ran some tests  │
│  and think your heart is healthy, but we want to make  │
│  sure by doing a stress test.                          │
│                                                         │
│  💊 YOUR MEDICATIONS                                    │
│  • Keep taking your blood pressure medicine            │
│  • NEW: Take a baby aspirin every day                  │
│                                                         │
│  📅 WHAT'S NEXT                                         │
│  1. Get a stress test scheduled (call 555-1234)        │
│  2. Get blood work done (you can walk in)              │
│  3. See me again in 2 weeks                            │
│                                                         │
│  ⚠️ CALL US RIGHT AWAY IF:                             │
│  • Chest pain gets worse                               │
│  • You feel short of breath at rest                    │
│  • You feel dizzy or faint                             │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  💬 Have questions? Ask me anything about your visit   │
│  ┌─────────────────────────────────────────────────────┐│
│  │ What does a stress test involve?                   ││
│  └─────────────────────────────────────────────────────┘│
│                                          [Ask] [🎤]    │
└─────────────────────────────────────────────────────────┘
```

**Personalization Options:**

| Option | Values | Purpose |
|--------|--------|---------|
| **Format** | PDF, Video, TikTok-style, Audio | Match patient's preferred consumption style |
| **Literacy Level** | 5th, 8th, 12th grade, Professional | Adjust language complexity |
| **Language** | English, Spanish, Chinese, etc. | Full translation support |
| **Tone** | Warm, friendly, encouraging | Build patient engagement |

**Interactive Features:**
- **LLM Q&A Chat**: Patient can ask questions about their visit
- **Voice Input**: Speak questions naturally
- **Video Explainers**: Short-form video summaries (TikTok-style)
- **Action Items**: Clear next steps with reminders
- **Warning Signs**: Easy-to-understand red flags

**Key Design Goals:**
- Make the interaction feel **warm and personal**
- Patient can **interact with and explore** the note
- **Reduce anxiety** through clear, friendly language
- **Improve adherence** through accessible next steps

---

## API Endpoints

### Patients
```
GET    /api/patients                    # List patients
GET    /api/patients/{id}               # Get patient details
GET    /api/patients/{id}/chart         # Get chart card
```

### Visits & Transcript
```
POST   /api/visits                      # Create new visit
GET    /api/visits/{id}                 # Get visit details
POST   /api/visits/{id}/transcript      # Upload/generate transcript
POST   /api/transcript/process          # Process raw audio/text via Claude
```

---

### Artifact 1: Insurance Note (ICD-10)
```
GET    /api/visits/{id}/insurance-note              # Get full 3-layer insurance note
GET    /api/visits/{id}/insurance-note?layer=1      # Get specific layer (1, 2, or 3)
POST   /api/visits/{id}/insurance-note/generate     # Generate insurance note from transcript

# ICD-10 Code Lookup (NIH API)
GET    /api/icd/search?q={query}        # Search ICD-10 codes
GET    /api/icd/code/{code}             # Get code details
POST   /api/visits/{id}/icd-codes       # AI-suggest codes from transcript
GET    /api/visits/{id}/icd-codes       # Get assigned ICD codes for visit
PUT    /api/visits/{id}/icd-codes       # Update/confirm ICD codes
```

---

### Artifact 2: Clinical Orders
```
# Orders (all 4 types)
POST   /api/orders                      # Create order
GET    /api/orders/{id}                 # Get order status
GET    /api/visits/{id}/orders          # Get all orders for visit
PUT    /api/orders/{id}/status          # Update order status

# Prescriptions
POST   /api/orders/prescription         # Create prescription
GET    /api/patients/{id}/prescriptions # Get patient's active prescriptions

# Labs
POST   /api/orders/lab                  # Order lab tests
GET    /api/orders/lab/catalog          # Get available lab tests

# Imaging
POST   /api/orders/imaging              # Order imaging study
GET    /api/orders/imaging/catalog      # Get available imaging types

# Referrals
POST   /api/orders/referral             # Create referral
GET    /api/orders/referral/specialists # Get specialist directory
```

---

### Artifact 3: Patient Artifact
```
# Patient-facing summary
GET    /api/patient-artifact/{visit_id}                     # Get patient artifact
POST   /api/patient-artifact/{visit_id}/generate            # Generate artifact from transcript
GET    /api/patient-artifact/{visit_id}?format=video        # Get in specific format
GET    /api/patient-artifact/{visit_id}?literacy=5          # Get at specific grade level
GET    /api/patient-artifact/{visit_id}?language=spanish    # Get translated version

# Patient preferences
GET    /api/patients/{id}/preferences                       # Get patient preferences
PUT    /api/patients/{id}/preferences                       # Update preferences
        # { format: "tiktok", literacy_level: 8, language: "en" }

# Interactive Q&A
POST   /api/patient-artifact/{visit_id}/ask                 # LLM Q&A about visit
        # { question: "What is a stress test?", language: "en" }
```

---

## Project Structure

```
agi2/
├── frontend/                    # React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/             # Base UI components (shadcn-style)
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Accordion.tsx
│   │   │   │   └── ...
│   │   │   │
│   │   │   ├── ChartCard/      # Patient chart card component
│   │   │   │
│   │   │   ├── InsuranceNote/  # Artifact 1: Insurance documentation
│   │   │   │   ├── InsuranceNote.tsx
│   │   │   │   ├── LayerOne.tsx      # Billing summary
│   │   │   │   ├── LayerTwo.tsx      # Medical necessity
│   │   │   │   ├── LayerThree.tsx    # Complete documentation
│   │   │   │   └── ICDCodeSearch.tsx # ICD-10 code lookup
│   │   │   │
│   │   │   ├── ClinicalOrders/ # Artifact 2: Clinical orders
│   │   │   │   ├── OrdersPanel.tsx
│   │   │   │   ├── PrescriptionForm.tsx
│   │   │   │   ├── LabOrderForm.tsx
│   │   │   │   ├── ImagingOrderForm.tsx
│   │   │   │   ├── ReferralForm.tsx
│   │   │   │   └── OrderStatusBadge.tsx
│   │   │   │
│   │   │   └── PatientArtifact/ # Artifact 3: Patient-facing
│   │   │       ├── PatientArtifact.tsx
│   │   │       ├── FormatSelector.tsx   # PDF, Video, TikTok, Audio
│   │   │       ├── LiteracySelector.tsx # Grade level picker
│   │   │       ├── LanguageSelector.tsx # Translation options
│   │   │       ├── VisitSummary.tsx     # Friendly summary view
│   │   │       ├── ActionItems.tsx      # Next steps
│   │   │       ├── WarningSignsCard.tsx # Red flags
│   │   │       └── ChatInterface.tsx    # Q&A with LLM
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── PatientChart.tsx
│   │   │   ├── Visit.tsx
│   │   │   ├── InsuranceNote.tsx    # View/edit insurance note
│   │   │   ├── Orders.tsx           # Clinical orders
│   │   │   └── PatientPortal.tsx    # Patient artifact view
│   │   │
│   │   ├── hooks/
│   │   ├── services/           # API client
│   │   ├── types/
│   │   └── lib/
│   │       └── utils.ts
│   │
│   ├── index.html
│   ├── tailwind.config.ts
│   └── package.json
│
├── backend/                     # FastAPI application
│   ├── app/
│   │   ├── main.py
│   │   ├── config.py           # Environment config
│   │   │
│   │   ├── routers/
│   │   │   ├── patients.py
│   │   │   ├── visits.py
│   │   │   ├── insurance_note.py    # Artifact 1 endpoints
│   │   │   ├── icd_codes.py         # ICD-10 API integration
│   │   │   ├── orders.py            # Artifact 2 endpoints
│   │   │   └── patient_artifact.py  # Artifact 3 endpoints
│   │   │
│   │   ├── services/
│   │   │   ├── claude_service.py         # Claude API integration
│   │   │   ├── transcript_service.py     # Audio processing
│   │   │   ├── insurance_note_service.py # Generate insurance notes
│   │   │   ├── icd_service.py            # NIH ICD-10 API
│   │   │   ├── orders_service.py         # Order management
│   │   │   └── patient_artifact_service.py # Patient-facing generation
│   │   │
│   │   ├── models/             # SQLAlchemy models
│   │   │   ├── patient.py
│   │   │   ├── visit.py
│   │   │   ├── insurance_note.py
│   │   │   ├── order.py
│   │   │   └── patient_artifact.py
│   │   │
│   │   └── schemas/            # Pydantic schemas
│   │
│   └── requirements.txt
│
├── .env.example                 # Template for env vars
├── .cursor/
│   └── CURSOR.mdc              # Cursor project context
├── prompt.md                    # This file
└── README.md
```

---

## Environment Variables

```bash
# .env (DO NOT COMMIT)
CLAUDE_API_KEY=sk-ant-api03-xxxxx      # Claude API key
DATABASE_URL=postgresql://user:pass@localhost:5432/agi2
ICD_API_URL=https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search

# Frontend
VITE_API_URL=http://localhost:8000
```

---

## External APIs

### ICD-10 Database (NIH Clinical Tables API)
Free, no authentication required:
```
Base URL: https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search
Example:  ?terms=chest+pain&maxList=10
```

Response format:
```json
[
  3,
  ["R07.9", "R07.89", "R07.1"],
  null,
  [
    ["R07.9", "Chest pain, unspecified"],
    ["R07.89", "Other chest pain"],
    ["R07.1", "Chest pain on breathing"]
  ]
]
```

### Claude API (Anthropic)
- Model: `claude-sonnet-4-20250514` (or latest)
- Used for:
  - Transcription summarization
  - Multi-layer summary generation
  - Patient Q&A responses
  - ICD code suggestions from visit content

---

## Component Patterns (Reference: Mount SinAI)

### Card Component
```tsx
<Card className="border bg-white shadow-sm">
  <CardHeader>
    <CardTitle className="text-blue-600">Patient Chart</CardTitle>
    <CardDescription>Demographics and visit history</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

### Button Variants
```tsx
<Button variant="default">Primary (Blue)</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="secondary">Secondary</Button>
```

### Summary Layer Accordion
```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="layer1">
    <AccordionTrigger>Quick Overview</AccordionTrigger>
    <AccordionContent>...</AccordionContent>
  </AccordionItem>
  <AccordionItem value="layer2">
    <AccordionTrigger>Clinical Detail</AccordionTrigger>
    <AccordionContent>...</AccordionContent>
  </AccordionItem>
</Accordion>
```

---

## Key Features Detail

### Transcript → 3 Artifacts Flow
```
┌─────────────────────────────────────────────────────────────────┐
│                     VISIT TRANSCRIPT                            │
│                (Audio/Text via Claude API)                      │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CLAUDE AI PROCESSING                         │
│                                                                 │
│  • Extract clinical elements                                    │
│  • Identify diagnoses → map to ICD-10                          │
│  • Identify orders (Rx, labs, imaging, referrals)              │
│  • Generate patient-friendly summary                            │
└─────────────────────────────┬───────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────────────┐
│ ARTIFACT 1    │   │ ARTIFACT 2    │   │ ARTIFACT 3            │
│ Insurance Note│   │ Clinical Orders│  │ Patient Artifact      │
├───────────────┤   ├───────────────┤   ├───────────────────────┤
│ • Layer 1:    │   │ 💊 Prescriptions│ │ Format:               │
│   Billing     │   │ 🔬 Labs        │   │ • PDF / Video / TikTok│
│ • Layer 2:    │   │ 🩻 Imaging     │   │                       │
│   Med Necess. │   │ 📤 Referrals   │   │ Literacy: 5th-12th   │
│ • Layer 3:    │   │               │   │                       │
│   Full Docs   │   │ Workflow:     │   │ Language:             │
│               │   │ Order→Done    │   │ EN / ES / ZH / etc.   │
│ ICD-10 Codes  │   │               │   │                       │
│ (NIH API)     │   │               │   │ + Interactive Q&A     │
└───────────────┘   └───────────────┘   └───────────────────────┘
```

### ICD-10 Code Integration
```
Transcript Text
      ↓
Claude extracts diagnoses
      ↓
NIH Clinical Tables API lookup
(https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search)
      ↓
Return matching ICD-10 codes
      ↓
Doctor confirms/edits codes
      ↓
Codes saved to Insurance Note
```

### Patient Artifact Personalization

| Preference | Options | How It Works |
|------------|---------|--------------|
| **Format** | PDF, Video explainer, TikTok-style, Audio | Different output generation |
| **Literacy** | 5th, 8th, 12th grade, Professional | Claude adjusts vocabulary/complexity |
| **Language** | English, Spanish, Chinese, etc. | Full translation via Claude |
| **Tone** | Warm, clinical, detailed | Adjusts communication style |

### Patient Q&A Safety Guardrails
- Never diagnose or recommend medication changes
- Redirect emergency symptoms to care team
- Context-limited to visit data only
- Clear disclaimers on AI-generated content
- Answers in patient's preferred language and literacy level

---

## Development Phases

### Phase 1: Foundation
- [ ] Setup React frontend with Vite + TypeScript
- [ ] Setup FastAPI backend
- [ ] Configure Tailwind with blue/white theme
- [ ] Database models and migrations
- [ ] Basic patient/visit CRUD
- [ ] Chart card component

### Phase 2: Transcript & Claude Integration
- [ ] Claude API service
- [ ] Audio/text transcript processing
- [ ] Store and retrieve transcripts

### Phase 3: Artifact 1 - Insurance Note
- [ ] 3-layer insurance note UI (accordion)
- [ ] NIH ICD-10 API integration
- [ ] AI-suggested ICD codes from transcript
- [ ] ICD code search and selection
- [ ] E/M level and CPT code display

### Phase 4: Artifact 2 - Clinical Orders
- [ ] Orders panel UI
- [ ] Prescription form
- [ ] Lab order form
- [ ] Imaging order form
- [ ] Referral form
- [ ] Order workflow status tracking

### Phase 5: Artifact 3 - Patient Artifact
- [ ] Format selector (PDF, Video, TikTok, Audio)
- [ ] Literacy level selector (grade level)
- [ ] Language selector (English, Spanish, Chinese)
- [ ] Patient-friendly summary generation
- [ ] Action items / next steps
- [ ] Warning signs card
- [ ] LLM Q&A chat interface

---

## Notes
- This is a demo/prototype application
- Not intended for production HIPAA compliance
- ICD-10 integration uses free public NIH API
- Orders are demo-only, no real integration
- Blue and white color scheme only
- Patient artifact formats (video, TikTok) are conceptual demos
