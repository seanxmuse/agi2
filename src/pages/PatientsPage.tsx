import { Link } from 'react-router-dom'
import { Search, Filter, ArrowRight, Calendar, AlertCircle, Pill } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { mockPatients, mockVisits } from '@/data/mockData'
import { calculateAge, formatMRN, formatDate } from '@/lib/utils'

export function PatientsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
          <p className="text-muted-foreground mt-1">
            Manage patient records and view charts
          </p>
        </div>
        <Button>
          Add Patient
        </Button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search patients by name, MRN..." className="pl-9" />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Patients Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockPatients.map((patient) => {
          const patientVisits = mockVisits.filter((v) => v.patientId === patient.id)
          const lastVisit = patientVisits[0]

          return (
            <Card key={patient.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarFallback className="bg-blue-100 text-blue-700 text-lg font-semibold">
                      {patient.firstName[0]}{patient.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg">
                      {patient.firstName} {patient.lastName}
                    </CardTitle>
                    <CardDescription>
                      {calculateAge(patient.dob)}yo {patient.gender === 'M' ? 'Male' : patient.gender === 'F' ? 'Female' : 'Other'}
                    </CardDescription>
                    <p className="text-xs text-muted-foreground mt-1">
                      MRN: {formatMRN(patient.mrn)}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Insurance */}
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Insurance</p>
                  <p className="text-sm font-medium">{patient.insurance.provider}</p>
                </div>

                {/* Allergies */}
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Allergies
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {patient.allergies.length > 0 ? (
                      patient.allergies.map((allergy) => (
                        <Badge key={allergy} variant="destructive" className="text-xs">
                          {allergy}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-green-600">NKDA</span>
                    )}
                  </div>
                </div>

                {/* Medications */}
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                    <Pill className="h-3 w-3" />
                    Medications ({patient.medications.length})
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {patient.medications.slice(0, 2).map((med) => (
                      <Badge key={med.name} variant="outline" className="text-xs">
                        {med.name}
                      </Badge>
                    ))}
                    {patient.medications.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{patient.medications.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Last Visit */}
                {lastVisit && (
                  <div className="pt-3 border-t">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Last Visit
                    </p>
                    <p className="text-sm mt-1">{formatDate(lastVisit.date)}</p>
                    <p className="text-xs text-muted-foreground truncate">{lastVisit.chiefComplaint}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link to={`/patients/${patient.id}`}>
                      View Chart
                    </Link>
                  </Button>
                  {lastVisit && (
                    <Button variant="default" size="sm" className="flex-1" asChild>
                      <Link to={`/visits/${lastVisit.id}`}>
                        Last Visit <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

