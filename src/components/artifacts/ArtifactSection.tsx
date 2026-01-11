import { ReactNode } from 'react'
import { Pencil, Check, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface ArtifactSectionProps {
  title: string
  icon: ReactNode
  isConfirmed: boolean
  onConfirm: () => void
  onEdit: () => void
  children: ReactNode
}

export function ArtifactSection({
  title,
  icon,
  isConfirmed,
  onConfirm,
  onEdit,
  children,
}: ArtifactSectionProps) {
  return (
    <Card className={cn(
      'transition-all duration-200',
      isConfirmed && 'border-green-300 bg-green-50/30'
    )}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
              {icon}
            </div>
            {title}
            {isConfirmed && (
              <Badge variant="success" className="ml-2 gap-1">
                <CheckCircle className="h-3 w-3" />
                Confirmed
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
              className="gap-2"
            >
              <Pencil className="h-4 w-4" />
              Edit
            </Button>
            <Button
              variant={isConfirmed ? 'outline' : 'default'}
              size="sm"
              onClick={onConfirm}
              className={cn(
                'gap-2',
                isConfirmed && 'border-green-500 text-green-700 hover:bg-green-50'
              )}
            >
              <Check className="h-4 w-4" />
              {isConfirmed ? 'Confirmed' : 'Confirm'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}

