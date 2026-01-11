import { Link } from 'react-router-dom'
import { FileText, ArrowRight, Search, Filter } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { InsuranceNote } from '@/components/artifacts/InsuranceNote'
import { mockInsuranceNote, mockPatients, mockVisits } from '@/data/mockData'

export function InsuranceNotesPage() {
  const visit = mockVisits.find((v) => v.id === mockInsuranceNote.visitId)
  const patient = visit ? mockPatients.find((p) => p.id === visit.patientId) : null

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Insurance Notes</h1>
          <p className="text-muted-foreground mt-1">
            3-layer documentation with ICD-10 codes for billing
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by patient or diagnosis..." className="pl-9" />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Notes List */}
      <div className="grid gap-6">
        {/* Sample Note Card */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">
                    {patient?.firstName} {patient?.lastName}
                  </CardTitle>
                  <CardDescription>
                    Visit: {visit?.date ? new Date(visit.date).toLocaleDateString() : 'N/A'} • {visit?.chiefComplaint}
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="success">Completed</Badge>
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/visits/${visit?.id}`}>
                    View Visit <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <InsuranceNote note={mockInsuranceNote} />
          </CardContent>
        </Card>

        {/* Empty State for Demo */}
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-center">
              More insurance notes will appear here as visits are completed
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

