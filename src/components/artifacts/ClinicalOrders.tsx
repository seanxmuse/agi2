import { Pill, FlaskConical, Scan, UserPlus, Clock, Check, ArrowRight, Send, MapPin, Phone } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import type { ClinicalOrder, OrderStatus } from '@/types'

interface ClinicalOrdersProps {
  orders: ClinicalOrder[]
}

const orderTypeConfig = {
  prescription: {
    icon: Pill,
    label: 'Prescriptions',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
  lab: {
    icon: FlaskConical,
    label: 'Laboratories',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
  },
  imaging: {
    icon: Scan,
    label: 'Imaging',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  referral: {
    icon: UserPlus,
    label: 'Referrals',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
  },
}

const statusConfig: Record<OrderStatus, { label: string; variant: 'ordered' | 'sent' | 'progress' | 'completed' | 'reviewed'; icon: typeof Clock }> = {
  ordered: { label: 'Ordered', variant: 'ordered', icon: Clock },
  sent: { label: 'Sent', variant: 'sent', icon: Send },
  'in-progress': { label: 'In Progress', variant: 'progress', icon: ArrowRight },
  completed: { label: 'Completed', variant: 'completed', icon: Check },
  reviewed: { label: 'Reviewed', variant: 'reviewed', icon: Check },
}

const workflowSteps = ['Ordered', 'Sent', 'In Progress', 'Completed', 'Reviewed']

function getWorkflowProgress(status: OrderStatus): number {
  const statusIndex = {
    ordered: 0,
    sent: 1,
    'in-progress': 2,
    completed: 3,
    reviewed: 4,
  }
  return ((statusIndex[status] + 1) / 5) * 100
}

export function ClinicalOrders({ orders }: ClinicalOrdersProps) {
  const prescriptions = orders.filter((o) => o.type === 'prescription')
  const labs = orders.filter((o) => o.type === 'lab')
  const imaging = orders.filter((o) => o.type === 'imaging')
  const referrals = orders.filter((o) => o.type === 'referral')

  return (
    <div className="space-y-6">
      {/* Workflow Legend */}
      <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border">
        <p className="text-sm font-medium text-muted-foreground">Order Workflow:</p>
        <div className="flex items-center gap-2">
          {workflowSteps.map((step, idx) => (
            <div key={step} className="flex items-center">
              <span className="text-xs text-muted-foreground">{step}</span>
              {idx < workflowSteps.length - 1 && (
                <ArrowRight className="h-3 w-3 mx-1 text-muted-foreground/50" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Orders - Single Column */}
      <div className="space-y-6">
        {/* Prescriptions */}
        <OrderSection type="prescription" orders={prescriptions} />

        {/* Labs */}
        <OrderSection type="lab" orders={labs} />

        {/* Referrals */}
        <OrderSection type="referral" orders={referrals} />

        {/* Imaging */}
        <OrderSection type="imaging" orders={imaging} />
      </div>
    </div>
  )
}

interface OrderSectionProps {
  type: 'prescription' | 'lab' | 'imaging' | 'referral'
  orders: ClinicalOrder[]
}

function OrderSection({ type, orders }: OrderSectionProps) {
  const config = orderTypeConfig[type]
  const Icon = config.icon

  if (orders.length === 0) {
    return (
      <Card className={`${config.borderColor} border-dashed`}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className={`h-8 w-8 rounded-lg ${config.bgColor} flex items-center justify-center`}>
              <Icon className={`h-4 w-4 ${config.color}`} />
            </div>
            {config.label}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No {config.label.toLowerCase()} for this visit</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={config.borderColor}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className={`h-8 w-8 rounded-lg ${config.bgColor} flex items-center justify-center`}>
            <Icon className={`h-4 w-4 ${config.color}`} />
          </div>
          {config.label}
          <Badge variant="outline" className="ml-auto">
            {orders.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </CardContent>
    </Card>
  )
}

interface OrderCardProps {
  order: ClinicalOrder
}

function OrderCard({ order }: OrderCardProps) {
  const statusInfo = statusConfig[order.status]
  const details = order.details as any
  const facility = details.pharmacy || details.facility

  return (
    <div className="p-3 rounded-lg border bg-card space-y-2">
      {/* Order Details */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          {order.type === 'prescription' && (
            <div>
              <p className="font-medium">
                {details.medication} {details.dose}
              </p>
              <p className="text-sm text-muted-foreground">
                {details.frequency}, #{details.quantity}, {details.refills} refills
              </p>
            </div>
          )}

          {order.type === 'lab' && (
            <div>
              <p className="font-medium">{details.tests.join(', ')}</p>
              <p className="text-sm text-muted-foreground">
                {details.urgency.charAt(0).toUpperCase() + details.urgency.slice(1)}
                {details.notes && ` • ${details.notes}`}
              </p>
            </div>
          )}

          {order.type === 'imaging' && (
            <div>
              <p className="font-medium">{details.study}</p>
              <p className="text-sm text-muted-foreground">{details.indication}</p>
            </div>
          )}

          {order.type === 'referral' && (
            <div>
              <p className="font-medium">{details.specialty} Consult</p>
              <p className="text-sm text-muted-foreground">
                {details.urgency.charAt(0).toUpperCase() + details.urgency.slice(1)} • {details.reason}
              </p>
            </div>
          )}
        </div>

        <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
      </div>

      {/* Facility/Pharmacy Info */}
      {facility && (
        <div className="pt-2 border-t mt-2 space-y-1">
          <p className="text-sm font-medium text-foreground">{facility.name}</p>
          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 mt-0.5 shrink-0" />
            <span>{facility.address}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Phone className="h-3 w-3 shrink-0" />
            <span>{facility.phone}</span>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="pt-1">
        <Progress value={getWorkflowProgress(order.status)} className="h-1.5" />
      </div>
    </div>
  )
}

