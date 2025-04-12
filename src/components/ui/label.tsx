import * as React from "react";
import { cn } from "../../lib/utlis";

export const Label = React.forwardRef<
    HTMLLabelElement,
    React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
    <label ref={ref} className={cn("", className)} {...props} />
));
Label.displayName = "Label";