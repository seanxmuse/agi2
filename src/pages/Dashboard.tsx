import { Link } from 'react-router-dom'
import { Calendar, Users, FileText, ClipboardList, Clock, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { mockPatients, mockVisits } from '@/data/mockData'
import { getGreeting, calculateAge, formatMRN } from '@/lib/utils'

const stats = [
  { label: 'Patients Today', value: '12', icon: Users, color: 'bg-blue-500' },
  { label: 'Visits Completed', value: '8', icon: Calendar, color: 'bg-green-500' },
  { label: 'Pending Notes', value: '4', icon: FileText, color: 'bg-amber-500' },
  { label: 'Orders to Review', value: '6', icon: ClipboardList, color: 'bg-purple-500' },
]

export function Dashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Greeting */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{getGreeting()}, Dr. Smith</h1>
        <p className="text-muted-foreground mt-1">
          Here's an overview of your practice today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={stat.label} className="animate-slide-in-bottom" style={{ animationDelay: `${i * 50}ms` }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <div className={`h-8 w-8 rounded-lg ${stat.color} flex items-center justify-center`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Today's Schedule</CardTitle>
                <CardDescription>Upcoming patient visits</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/visits">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockVisits.map((visit) => {
                const patient = mockPatients.find((p) => p.id === visit.patientId)
                if (!patient) return null

                return (
                  <Link
                    key={visit.id}
                    to={`/visits/${visit.id}`}
                    className="flex items-center gap-4 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-blue-100 text-blue-700 font-medium">
                        {patient.firstName[0]}{patient.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">
                          {patient.firstName} {patient.lastName}
                        </p>
                        <Badge
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
                      <p className="text-sm text-muted-foreground truncate">
                        {visit.chiefComplaint}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm font-medium">
                        <Clock className="h-3.5 w-3.5" />
                        {new Date(visit.date).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {calculateAge(patient.dob)}yo {patient.gender}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Patients */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Recent Patients</CardTitle>
                <CardDescription>Quick access to patient charts</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/patients">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockPatients.map((patient) => (
                <Link
                  key={patient.id}
                  to={`/patients/${patient.id}`}
                  className="flex items-center gap-4 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                >
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-blue-100 text-blue-700 font-medium">
                      {patient.firstName[0]}{patient.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">
                      {patient.firstName} {patient.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      MRN: {formatMRN(patient.mrn)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {calculateAge(patient.dob)} years old
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {patient.insurance.provider}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="gradient-medical-subtle border-blue-200">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/visits/v1">
                <FileText className="mr-2 h-4 w-4" />
                View Latest Visit
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/insurance-notes">
                <FileText className="mr-2 h-4 w-4" />
                Insurance Notes
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/orders">
                <ClipboardList className="mr-2 h-4 w-4" />
                Clinical Orders
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/patient-portal">
                View Patient Portal
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

