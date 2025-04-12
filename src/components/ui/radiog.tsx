import * as React from "react";
import { cn } from "../../lib/utlis";

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: string;
    onValueChange?: (value: string) => void;
}

export const RadioGroup = ({
    children,
    value,
    onValueChange,
    className,
    ...props
}: RadioGroupProps) => {
    return (
        <div className={cn("", className)} {...props}>
            {React.Children.map(children, (child: any) =>
                React.cloneElement(child, {
                    checked: child.props.value === value,
                    onChange: () => onValueChange?.(child.props.value),
                })
            )}
        </div>
    );
};

interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
    ({ className, ...props }, ref) => {
        return (
            <input type="radio" ref={ref} className={cn("hidden", className)} {...props} />
        );
    }
);
RadioGroupItem.displayName = "RadioGroupItem";