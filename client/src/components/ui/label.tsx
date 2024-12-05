import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    // Base styles:
  // - Small text size (`text-sm`)
  // - Medium font weight (`font-medium`)
  // - No extra line spacing (`leading-none`)
  // - Disable cursor and reduce opacity if the associated peer element (e.g., input) is disabled
);

// label component definition 
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(
  // functional component definition
  ({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
  )
)
Label.displayName = LabelPrimitive.Root.displayName

// export label component for reuse
export { Label }
