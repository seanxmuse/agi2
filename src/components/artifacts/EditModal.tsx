import { useState, useEffect } from 'react'
import { Save } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import type { InsuranceNote, ClinicalOrder, PatientArtifact } from '@/types'

type EditableSection = 'insurance' | 'orders' | 'patient'

interface EditModalProps {
  isOpen: boolean
  onClose: () => void
  section: EditableSection | null
  insuranceNote: InsuranceNote
  orders: ClinicalOrder[]
  patientArtifact: PatientArtifact
  onSaveInsurance: (note: InsuranceNote) => void
  onSaveOrders: (orders: ClinicalOrder[]) => void
  onSavePatient: (artifact: PatientArtifact) => void
}

export function EditModal({
  isOpen,
  onClose,
  section,
  insuranceNote,
  orders,
  patientArtifact,
  onSaveInsurance,
  onSaveOrders,
  onSavePatient,
}: EditModalProps) {
  const [localInsurance, setLocalInsurance] = useState(insuranceNote)
  const [localOrders, setLocalOrders] = useState(orders)
  const [localPatient, setLocalPatient] = useState(patientArtifact)

  useEffect(() => {
    setLocalInsurance(insuranceNote)
    setLocalOrders(orders)
    setLocalPatient(patientArtifact)
  }, [insuranceNote, orders, patientArtifact, isOpen])

  const handleSave = () => {
    if (section === 'insurance') {
      onSaveInsurance(localInsurance)
    } else if (section === 'orders') {
      onSaveOrders(localOrders)
    } else if (section === 'patient') {
      onSavePatient(localPatient)
    }
    onClose()
  }

  const getTitle = () => {
    switch (section) {
      case 'insurance':
        return 'Edit Insurance Note'
      case 'orders':
        return 'Edit Clinical Orders'
      case 'patient':
        return 'Edit Patient Summary'
      default:
        return 'Edit'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
          <DialogDescription>
            Make changes to the {section} section. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {section === 'insurance' && (
            <InsuranceEditor
              note={localInsurance}
              onChange={setLocalInsurance}
            />
          )}

          {section === 'orders' && (
            <OrdersEditor
              orders={localOrders}
              onChange={setLocalOrders}
            />
          )}

          {section === 'patient' && (
            <PatientEditor
              artifact={localPatient}
              onChange={setLocalPatient}
            />
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Insurance Note Editor
interface InsuranceEditorProps {
  note: InsuranceNote
  onChange: (note: InsuranceNote) => void
}

function InsuranceEditor({ note, onChange }: InsuranceEditorProps) {
  const updateBilling = (field: string, value: string) => {
    onChange({
      ...note,
      layers: {
        ...note.layers,
        billing: {
          ...note.layers.billing,
          [field]: value,
        },
      },
    })
  }

  const updateIcdCode = (index: number, field: string, value: string | boolean) => {
    const newCodes = [...note.layers.billing.icdCodes]
    newCodes[index] = { ...newCodes[index], [field]: value }
    onChange({
      ...note,
      layers: {
        ...note.layers,
        billing: {
          ...note.layers.billing,
          icdCodes: newCodes,
        },
      },
    })
  }

  const updateJustification = (value: string) => {
    onChange({
      ...note,
      layers: {
        ...note.layers,
        medicalNecessity: {
          ...note.layers.medicalNecessity,
          justification: value,
        },
      },
    })
  }

  return (
    <div className="space-y-6">
      {/* Billing Summary */}
      <div className="space-y-4">
        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
          Billing Summary
        </h4>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium">Chief Complaint</label>
            <Input
              value={note.layers.billing.chiefComplaint}
              onChange={(e) => updateBilling('chiefComplaint', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">E/M Level</label>
            <Input
              value={note.layers.billing.emLevel}
              onChange={(e) => updateBilling('emLevel', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Follow-up</label>
            <Input
              value={note.layers.billing.followUp}
              onChange={(e) => updateBilling('followUp', e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      </div>

      {/* ICD Codes */}
      <div className="space-y-4">
        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
          ICD-10 Codes
        </h4>

        {note.layers.billing.icdCodes.map((code, idx) => (
          <div key={idx} className="flex gap-3 p-3 rounded-lg border bg-muted/30">
            <div className="w-28">
              <label className="text-xs text-muted-foreground">Code</label>
              <Input
                value={code.code}
                onChange={(e) => updateIcdCode(idx, 'code', e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-muted-foreground">Description</label>
              <Input
                value={code.description}
                onChange={(e) => updateIcdCode(idx, 'description', e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="flex items-end">
              <Button
                variant={code.isPrimary ? 'default' : 'outline'}
                size="sm"
                onClick={() => updateIcdCode(idx, 'isPrimary', !code.isPrimary)}
              >
                {code.isPrimary ? 'Primary' : 'Secondary'}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Medical Necessity */}
      <div className="space-y-4">
        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
          Medical Necessity
        </h4>

        <div>
          <label className="text-sm font-medium">Clinical Justification</label>
          <Textarea
            value={note.layers.medicalNecessity.justification}
            onChange={(e) => updateJustification(e.target.value)}
            className="mt-1 min-h-[100px]"
          />
        </div>
      </div>

      {/* Full Documentation */}
      <div className="space-y-4">
        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
          Complete Documentation
        </h4>

        <Textarea
          value={note.layers.fullDocumentation}
          onChange={(e) => onChange({
            ...note,
            layers: {
              ...note.layers,
              fullDocumentation: e.target.value,
            },
          })}
          className="mt-1 min-h-[200px] font-mono text-sm"
        />
      </div>
    </div>
  )
}

// Orders Editor
interface OrdersEditorProps {
  orders: ClinicalOrder[]
  onChange: (orders: ClinicalOrder[]) => void
}

function OrdersEditor({ orders, onChange }: OrdersEditorProps) {
  const updateOrder = (index: number, updates: Partial<ClinicalOrder>) => {
    const newOrders = [...orders]
    newOrders[index] = { ...newOrders[index], ...updates }
    onChange(newOrders)
  }

  const updateOrderDetails = (index: number, field: string, value: unknown) => {
    const newOrders = [...orders]
    newOrders[index] = {
      ...newOrders[index],
      details: {
        ...newOrders[index].details,
        [field]: value,
      },
    }
    onChange(newOrders)
  }

  return (
    <div className="space-y-4">
      {orders.map((order, idx) => (
        <div key={order.id} className="p-4 rounded-lg border space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="capitalize">
              {order.type}
            </Badge>
            <Badge variant={order.status === 'sent' ? 'sent' : order.status === 'ordered' ? 'ordered' : 'default'}>
              {order.status}
            </Badge>
          </div>

          {order.type === 'prescription' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground">Medication</label>
                <Input
                  value={(order.details as any).medication}
                  onChange={(e) => updateOrderDetails(idx, 'medication', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Dose</label>
                <Input
                  value={(order.details as any).dose}
                  onChange={(e) => updateOrderDetails(idx, 'dose', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Frequency</label>
                <Input
                  value={(order.details as any).frequency}
                  onChange={(e) => updateOrderDetails(idx, 'frequency', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Quantity</label>
                <Input
                  type="number"
                  value={(order.details as any).quantity}
                  onChange={(e) => updateOrderDetails(idx, 'quantity', parseInt(e.target.value))}
                  className="mt-1"
                />
              </div>
            </div>
          )}

          {order.type === 'imaging' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground">Study</label>
                <Input
                  value={(order.details as any).study}
                  onChange={(e) => updateOrderDetails(idx, 'study', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Indication</label>
                <Textarea
                  value={(order.details as any).indication}
                  onChange={(e) => updateOrderDetails(idx, 'indication', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          )}

          {order.type === 'referral' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground">Specialty</label>
                <Input
                  value={(order.details as any).specialty}
                  onChange={(e) => updateOrderDetails(idx, 'specialty', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Reason</label>
                <Textarea
                  value={(order.details as any).reason}
                  onChange={(e) => updateOrderDetails(idx, 'reason', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// Patient Artifact Editor
interface PatientEditorProps {
  artifact: PatientArtifact
  onChange: (artifact: PatientArtifact) => void
}

function PatientEditor({ artifact, onChange }: PatientEditorProps) {
  const updateContent = (field: string, value: string | string[]) => {
    onChange({
      ...artifact,
      content: {
        ...artifact.content,
        [field]: value,
      },
    })
  }

  const updateArrayItem = (field: keyof typeof artifact.content, index: number, value: string) => {
    const arr = [...(artifact.content[field] as string[])]
    arr[index] = value
    updateContent(field, arr)
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium">Greeting</label>
        <Input
          value={artifact.content.greeting}
          onChange={(e) => updateContent('greeting', e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Summary</label>
        <Textarea
          value={artifact.content.summary}
          onChange={(e) => updateContent('summary', e.target.value)}
          className="mt-1 min-h-[100px]"
        />
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium">Medications</label>
        {artifact.content.medications.map((med, idx) => (
          <Input
            key={idx}
            value={med}
            onChange={(e) => updateArrayItem('medications', idx, e.target.value)}
          />
        ))}
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium">Next Steps</label>
        {artifact.content.nextSteps.map((step, idx) => (
          <Input
            key={idx}
            value={step}
            onChange={(e) => updateArrayItem('nextSteps', idx, e.target.value)}
          />
        ))}
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium">Warning Signs Title</label>
        <Input
          value={artifact.content.warningSignsTitle}
          onChange={(e) => updateContent('warningSignsTitle', e.target.value)}
        />

        <label className="text-sm font-medium mt-3 block">Warning Signs</label>
        {artifact.content.warningSigns.map((sign, idx) => (
          <Input
            key={idx}
            value={sign}
            onChange={(e) => updateArrayItem('warningSigns', idx, e.target.value)}
          />
        ))}
      </div>
    </div>
  )
}

