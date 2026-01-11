import { Heart, User } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { PatientArtifact } from '@/components/artifacts/PatientArtifact'
import { mockPatientArtifact, mockPatients, mockVisits } from '@/data/mockData'
import { formatDate } from '@/lib/utils'

export function PatientPortalPage() {
  const patient = mockPatients[0]
  const visit = mockVisits[0]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patient Portal Preview</h1>
          <p className="text-muted-foreground mt-1">
            Interactive, personalized patient-facing artifacts
          </p>
        </div>
      </div>

      {/* Patient Selector */}
      <Card className="gradient-medical-subtle border-blue-200">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarFallback className="bg-blue-500 text-white text-lg font-semibold">
                {patient.firstName[0]}{patient.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-semibold">
                {patient.firstName} {patient.lastName}
              </h2>
              <p className="text-muted-foreground">
                Visit on {formatDate(visit.date)} • {visit.chiefComplaint}
              </p>
            </div>
            <Button variant="outline">
              <User className="mr-2 h-4 w-4" />
              Switch Patient
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Info Banner */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-blue-900">Patient-Facing Experience</p>
              <p className="text-sm text-blue-700">
                This is how patients will see their visit summary. It's warm, friendly, and interactive.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patient Artifact */}
      <PatientArtifact artifact={mockPatientArtifact} patientName={patient.firstName} />
    </div>
  )
}

