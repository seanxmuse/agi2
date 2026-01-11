import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // ICD-10 code badges
        "icd-primary": "border-blue-200 bg-blue-100 text-blue-800",
        "icd-secondary": "border-slate-200 bg-slate-100 text-slate-700",
        // Order status badges
        ordered: "border-transparent bg-blue-100 text-blue-800",
        sent: "border-transparent bg-purple-100 text-purple-800",
        progress: "border-transparent bg-amber-100 text-amber-800",
        completed: "border-transparent bg-green-100 text-green-800",
        reviewed: "border-transparent bg-cyan-100 text-cyan-800",
        // Clinical badges
        warning: "border-transparent bg-amber-100 text-amber-800",
        success: "border-transparent bg-green-100 text-green-800",
        info: "border-transparent bg-blue-100 text-blue-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

