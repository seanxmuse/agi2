import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, FileText, ClipboardList, Heart, ScrollText, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PatientCard } from '@/components/PatientCard'
import { ArtifactSection } from '@/components/artifacts/ArtifactSection'
import { InsuranceNote } from '@/components/artifacts/InsuranceNote'
import { ClinicalOrders } from '@/components/artifacts/ClinicalOrders'
import { PatientArtifact } from '@/components/artifacts/PatientArtifact'
import { TranscriptConversation } from '@/components/TranscriptConversation'
import { EditModal } from '@/components/artifacts/EditModal'
import { mockPatients, mockVisits, mockInsuranceNote, mockOrders, mockPatientArtifact } from '@/data/mockData'
import type { InsuranceNote as InsuranceNoteType, ClinicalOrder, PatientArtifact as PatientArtifactType } from '@/types'

interface ConfirmedSections {
  insurance: boolean
  orders: boolean
  patient: boolean
}

type EditableSection = 'insurance' | 'orders' | 'patient'

export function VisitDetail() {
  const { visitId } = useParams()
  const visit = mockVisits.find((v) => v.id === visitId)
  const patient = visit ? mockPatients.find((p) => p.id === visit.patientId) : null

  const [confirmedSections, setConfirmedSections] = useState<ConfirmedSections>({
    insurance: false,
    orders: false,
    patient: false,
  })

  // Editable state
  const [insuranceNote, setInsuranceNote] = useState<InsuranceNoteType>(mockInsuranceNote)
  const [orders, setOrders] = useState<ClinicalOrder[]>(mockOrders)
  const [patientArtifact, setPatientArtifact] = useState<PatientArtifactType>(mockPatientArtifact)

  // Edit modal state
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingSection, setEditingSection] = useState<EditableSection | null>(null)

  const handleConfirmSection = (section: keyof ConfirmedSections) => {
    setConfirmedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleConfirmAll = () => {
    setConfirmedSections({
      insurance: true,
      orders: true,
      patient: true,
    })
  }

  const handleEditSection = (section: EditableSection) => {
    setEditingSection(section)
    setEditModalOpen(true)
  }

  const allConfirmed = confirmedSections.insurance && confirmedSections.orders && confirmedSections.patient

  if (!visit || !patient) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-muted-foreground">Visit not found</p>
        <Button variant="link" asChild className="mt-2">
          <Link to="/">Return to Dashboard</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back Button */}
      <Button variant="ghost" asChild className="-ml-2">
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </Button>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Patient Details (1/3) */}
        <div className="lg:col-span-1">
          <PatientCard patient={patient} visit={visit} />
        </div>

        {/* Right Column - Transcript + Artifacts (2/3) */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="artifacts" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="transcript" className="flex items-center gap-2">
                <ScrollText className="h-4 w-4" />
                Transcript
              </TabsTrigger>
              <TabsTrigger value="artifacts" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Artifacts
                {allConfirmed && (
                  <CheckCircle className="h-4 w-4 text-green-500 ml-1" />
                )}
              </TabsTrigger>
            </TabsList>

            {/* Transcript Tab */}
            <TabsContent value="transcript" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Visit Transcript</CardTitle>
                  <CardDescription>Conversation from the clinical encounter</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {visit.transcript ? (
                    <TranscriptConversation
                      transcript={visit.transcript}
                      doctorName={visit.provider}
                      patientName={`${patient.firstName} ${patient.lastName}`}
                    />
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <ScrollText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No transcript available for this visit</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Artifacts Tab */}
            <TabsContent value="artifacts" className="mt-6 space-y-6">
              {/* Patient Artifact Section (Visit Summary - First) */}
              <ArtifactSection
                title="Visit Summary"
                icon={<Heart className="h-5 w-5" />}
                isConfirmed={confirmedSections.patient}
                onConfirm={() => handleConfirmSection('patient')}
                onEdit={() => handleEditSection('patient')}
              >
                <PatientArtifact artifact={patientArtifact} patientName={patient.firstName} isPatientView={false} />
              </ArtifactSection>

              {/* Clinical Orders Section */}
              <ArtifactSection
                title="Clinical Orders"
                icon={<ClipboardList className="h-5 w-5" />}
                isConfirmed={confirmedSections.orders}
                onConfirm={() => handleConfirmSection('orders')}
                onEdit={() => handleEditSection('orders')}
              >
                <ClinicalOrders orders={orders} />
              </ArtifactSection>

              {/* Insurance Note Section (Last) */}
              <ArtifactSection
                title="Insurance Note"
                icon={<FileText className="h-5 w-5" />}
                isConfirmed={confirmedSections.insurance}
                onConfirm={() => handleConfirmSection('insurance')}
                onEdit={() => handleEditSection('insurance')}
              >
                <InsuranceNote note={insuranceNote} />
              </ArtifactSection>

              {/* Confirm All Button */}
              <div className="flex justify-end pt-4 border-t">
                <Button
                  size="lg"
                  onClick={handleConfirmAll}
                  disabled={allConfirmed}
                  className="gap-2"
                >
                  <CheckCircle className="h-5 w-5" />
                  {allConfirmed ? 'All Sections Confirmed' : 'Confirm All'}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Edit Modal */}
      <EditModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        section={editingSection}
        insuranceNote={insuranceNote}
        orders={orders}
        patientArtifact={patientArtifact}
        onSaveInsurance={setInsuranceNote}
        onSaveOrders={setOrders}
        onSavePatient={setPatientArtifact}
      />
    </div>
  )
}
