import { User, Calendar, Stethoscope, Phone, Mail, MapPin, CakeIcon, AlertCircle, Pill, CreditCard } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { calculateAge, formatDate, formatMRN } from '@/lib/utils'
import type { Patient, Visit } from '@/types'

interface PatientCardProps {
  patient: Patient
  visit: Visit
}

function formatDOB(dob: string): string {
  const d = new Date(dob)
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function PatientCard({ patient, visit }: PatientCardProps) {
  return (
    <Card className="border-blue-200 gradient-medical-subtle lg:sticky lg:top-24">
      <CardContent className="pt-6 space-y-5">
        {/* Patient Avatar & Basic Info */}
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-blue-500 text-white text-xl font-semibold">
              {patient.firstName[0]}{patient.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold truncate">
              {patient.firstName} {patient.lastName}
            </h2>
            <div className="flex flex-col gap-1 mt-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {calculateAge(patient.dob)}yo {patient.gender === 'M' ? 'Male' : patient.gender === 'F' ? 'Female' : 'Other'}
              </span>
              <span>MRN: {formatMRN(patient.mrn)}</span>
            </div>
          </div>
        </div>

        {/* Demographics */}
        <div className="space-y-2 pt-4 border-t border-blue-200">
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Demographics</p>
          <div className="grid gap-2 text-sm">
            <div className="flex items-center gap-2">
              <CakeIcon className="h-4 w-4 text-blue-500 shrink-0" />
              <span className="text-muted-foreground">DOB:</span>
              <span className="font-medium">{formatDOB(patient.dob)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-blue-500 shrink-0" />
              <span className="font-medium">{patient.contact.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-blue-500 shrink-0" />
              <span className="font-medium text-sm truncate">{patient.contact.email}</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
              <span className="font-medium text-sm">{patient.contact.address}</span>
            </div>
          </div>
        </div>

        {/* Visit Details */}
        <div className="space-y-3 pt-4 border-t border-blue-200">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Visit Date</p>
            <p className="font-medium flex items-center gap-1 mt-1">
              <Calendar className="h-4 w-4 text-blue-500" />
              {formatDate(visit.date)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Provider</p>
            <p className="font-medium flex items-center gap-1 mt-1">
              <Stethoscope className="h-4 w-4 text-blue-500" />
              {visit.provider}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Chief Complaint</p>
            <p className="font-medium mt-1">{visit.chiefComplaint}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Status</p>
            <Badge
              className="mt-1"
              variant={
                visit.status === 'completed'
                  ? 'success'
                  : visit.status === 'in-progress'
                  ? 'progress'
                  : 'info'
              }
            >
              {visit.status === 'checked-in' ? 'Checked In' :
               visit.status === 'in-progress' ? 'In Progress' : 'Completed'}
            </Badge>
          </div>
        </div>

        {/* Insurance */}
        <div className="pt-4 border-t border-blue-200">
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium flex items-center gap-1">
            <CreditCard className="h-3.5 w-3.5" />
            Insurance
          </p>
          <p className="text-sm font-semibold mt-1">{patient.insurance.provider}</p>
          <div className="grid grid-cols-2 gap-x-4 mt-1 text-xs">
            <div>
              <span className="text-muted-foreground">Plan ID: </span>
              <span className="font-medium">{patient.insurance.planId}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Group: </span>
              <span className="font-medium">{patient.insurance.groupNumber}</span>
            </div>
          </div>
        </div>

        {/* Allergies */}
        <div className="pt-4 border-t border-blue-200">
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium flex items-center gap-1">
            <AlertCircle className="h-3.5 w-3.5" />
            Allergies
          </p>
          <div className="flex flex-wrap gap-1 mt-2">
            {patient.allergies.length > 0 ? (
              patient.allergies.map((allergy) => (
                <Badge key={allergy} variant="destructive" className="text-xs">
                  {allergy}
                </Badge>
              ))
            ) : (
              <Badge variant="success" className="text-xs">NKDA</Badge>
            )}
          </div>
        </div>

        {/* Active Medications */}
        <div className="pt-4 border-t border-blue-200">
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium flex items-center gap-1">
            <Pill className="h-3.5 w-3.5" />
            Active Medications ({patient.medications.length})
          </p>
          <div className="space-y-2 mt-2">
            {patient.medications.map((med) => (
              <div key={med.name} className="flex items-center justify-between p-2 rounded-md bg-white/50 border border-blue-100">
                <div>
                  <p className="text-sm font-medium">{med.name}</p>
                  <p className="text-xs text-muted-foreground">{med.dose} • {med.frequency}</p>
                </div>
                <span className="text-xs text-muted-foreground">
                  Since {new Date(med.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

