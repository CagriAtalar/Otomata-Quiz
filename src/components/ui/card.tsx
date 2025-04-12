import * as React from "react";
import { cn } from "../../lib/utlis";

export const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("rounded-xl p-4 shadow", className)} {...props} />
);
Card.displayName = "Card";

export const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("mb-2", className)} {...props} />
);
CardHeader.displayName = "CardHeader";

export const CardTitle = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <h2 className={cn("font-bold", className)} {...props} />
);
CardTitle.displayName = "CardTitle";

export const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("", className)} {...props} />
);
CardContent.displayName = "CardContent";