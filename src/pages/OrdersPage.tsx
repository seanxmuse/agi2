import { Link } from 'react-router-dom'
import { ClipboardList, Filter, Search, Pill, FlaskConical, Scan, UserPlus } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ClinicalOrders } from '@/components/artifacts/ClinicalOrders'
import { mockOrders, mockPatients, mockVisits } from '@/data/mockData'

export function OrdersPage() {
  const prescriptions = mockOrders.filter((o) => o.type === 'prescription')
  const labs = mockOrders.filter((o) => o.type === 'lab')
  const imaging = mockOrders.filter((o) => o.type === 'imaging')
  const referrals = mockOrders.filter((o) => o.type === 'referral')

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clinical Orders</h1>
          <p className="text-muted-foreground mt-1">
            Manage prescriptions, labs, imaging, and referrals
          </p>
        </div>
        <Button>
          <ClipboardList className="mr-2 h-4 w-4" />
          New Order
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Prescriptions</CardTitle>
            <Pill className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{prescriptions.length}</div>
            <p className="text-xs text-muted-foreground">
              {prescriptions.filter((o) => o.status === 'sent').length} sent
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Labs</CardTitle>
            <FlaskConical className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{labs.length}</div>
            <p className="text-xs text-muted-foreground">
              {labs.filter((o) => o.status === 'ordered').length} pending
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Imaging</CardTitle>
            <Scan className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{imaging.length}</div>
            <p className="text-xs text-muted-foreground">
              {imaging.filter((o) => o.status === 'ordered').length} scheduled
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Referrals</CardTitle>
            <UserPlus className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{referrals.length}</div>
            <p className="text-xs text-muted-foreground">
              {referrals.filter((o) => o.status === 'sent').length} sent
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search orders..." className="pl-9" />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter by Status
        </Button>
      </div>

      {/* Orders Tabs */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">
            All Orders
            <Badge variant="outline" className="ml-2">{mockOrders.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending
            <Badge variant="ordered" className="ml-2">
              {mockOrders.filter((o) => o.status === 'ordered').length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="in-progress">
            In Progress
            <Badge variant="progress" className="ml-2">
              {mockOrders.filter((o) => o.status === 'in-progress').length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed
            <Badge variant="completed" className="ml-2">
              {mockOrders.filter((o) => o.status === 'completed' || o.status === 'reviewed').length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>All Clinical Orders</CardTitle>
              <CardDescription>
                From visit on {new Date(mockVisits[0].date).toLocaleDateString()} - {mockPatients[0].firstName} {mockPatients[0].lastName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ClinicalOrders orders={mockOrders} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <ClinicalOrders orders={mockOrders.filter((o) => o.status === 'ordered')} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="in-progress" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <ClinicalOrders orders={mockOrders.filter((o) => o.status === 'in-progress')} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <ClinicalOrders orders={mockOrders.filter((o) => o.status === 'completed' || o.status === 'reviewed')} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

