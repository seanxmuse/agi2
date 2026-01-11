import { AlertCircle, CheckCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { InsuranceNote as InsuranceNoteType } from '@/types'

interface InsuranceNoteProps {
  note: InsuranceNoteType
}

export function InsuranceNote({ note }: InsuranceNoteProps) {
  const { layers } = note

  return (
    <div className="space-y-6">
      {/* Section 1: Billing Summary & Medical Necessity (Combined) */}
      <div className="border rounded-lg overflow-hidden">
        <div className="px-4 py-3 bg-blue-50 border-b">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
              1
            </div>
            <div className="text-left">
              <p className="font-semibold text-foreground">Billing Summary & Medical Necessity</p>
              <p className="text-sm text-muted-foreground">ICD-10 codes, E/M level, clinical justification</p>
            </div>
          </div>
        </div>
        <div className="px-4 py-4 bg-white space-y-6">
          {/* Chief Complaint */}
          <div>
            <p className="text-sm font-medium text-muted-foreground">Chief Complaint</p>
            <p className="mt-1 font-medium">{layers.billing.chiefComplaint}</p>
          </div>

          {/* ICD-10 Codes */}
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">ICD-10 Codes</p>
            <div className="space-y-2">
              {layers.billing.icdCodes.map((code, idx) => (
                <div
                  key={code.code}
                  className="flex items-center gap-3 p-3 rounded-lg border bg-card"
                >
                  <Badge variant={code.isPrimary ? 'icd-primary' : 'icd-secondary'}>
                    {code.code}
                  </Badge>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{code.description}</p>
                    {code.isPrimary && (
                      <p className="text-xs text-blue-600 font-medium">Primary Diagnosis</p>
                    )}
                  </div>
                  {code.isPrimary ? (
                    <CheckCircle className="h-5 w-5 text-blue-500" />
                  ) : (
                    <span className="text-xs text-muted-foreground">#{idx + 1}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* E/M Level */}
          <div className="p-3 rounded-lg bg-muted/50">
            <p className="text-sm font-medium text-muted-foreground">E/M Level</p>
            <p className="mt-1 font-semibold text-blue-600">{layers.billing.emLevel}</p>
          </div>

          {/* Clinical Justification */}
          <div>
            <p className="text-sm font-medium text-muted-foreground">Clinical Justification</p>
            <p className="mt-2 text-sm leading-relaxed bg-muted/50 p-3 rounded-lg">
              {layers.medicalNecessity.justification}
            </p>
          </div>

          {/* Services Rendered */}
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Services Rendered</p>
            <ul className="space-y-1">
              {layers.medicalNecessity.servicesRendered.map((service, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Orders with Justification */}
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Orders with Medical Necessity</p>
            <div className="space-y-2">
              {layers.medicalNecessity.ordersWithJustification.map((order) => (
                <div key={order.cptCode} className="p-3 rounded-lg border bg-card">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="font-mono">
                      {order.cptCode}
                    </Badge>
                    <span className="font-medium text-sm">{order.description}</span>
                  </div>
                  <p className="text-sm text-muted-foreground ml-[72px]">
                    {order.rationale}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Complete Documentation */}
      <div className="border rounded-lg overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold text-sm">
              2
            </div>
            <div className="text-left">
              <p className="font-semibold text-foreground">Complete Documentation</p>
              <p className="text-sm text-muted-foreground">Full transcript, all codes, audit-ready record</p>
            </div>
          </div>
        </div>
        <div className="px-4 py-4 bg-white">
          <div className="bg-muted/30 rounded-lg p-4 text-sm whitespace-pre-wrap font-mono leading-relaxed max-h-[500px] overflow-y-auto scrollbar-thin">
            {layers.fullDocumentation}
          </div>
        </div>
      </div>

      {/* ICD-10 Note */}
      <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-50 border border-blue-200">
        <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
        <p className="text-sm text-blue-700">
          ICD-10 codes are suggested based on the visit transcript and validated against the NIH Clinical Tables API. 
          Please review and confirm all codes before submission.
        </p>
      </div>
    </div>
  )
}
