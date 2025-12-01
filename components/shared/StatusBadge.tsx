import React from "react";
import { Badge } from "@/components/ui/badge";

export type StatusType = 
  | "completed" 
  | "available" 
  | "locked" 
  | "beginner" 
  | "intermediate" 
  | "advanced" 
  | "expert"
  | "special";

interface StatusBadgeProps {
  status: StatusType;
  variant?: "default" | "secondary" | "outline" | "destructive";
  className?: string;
}

export function StatusBadge({ status, variant, className }: StatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "completed":
        return { text: "Completed", variant: "default" as const, className: "bg-chart-1/20 text-chart-1 border-chart-1/30" };
      case "available":
        return { text: "Available", variant: "secondary" as const, className: "bg-primary/10 text-primary border-primary/20" };
      case "locked":
        return { text: "Locked", variant: "outline" as const, className: "bg-muted text-muted-foreground" };
      case "beginner":
        return { text: "Beginner", variant: "outline" as const, className: "bg-primary/10 text-primary border-primary/20" };
      case "intermediate":
        return { text: "Intermediate", variant: "outline" as const, className: "bg-accent/20 text-accent-foreground border-accent/30" };
      case "advanced":
        return { text: "Advanced", variant: "outline" as const, className: "bg-secondary/10 text-secondary border-secondary/20" };
      case "expert":
        return { text: "Expert", variant: "outline" as const, className: "bg-destructive/10 text-destructive border-destructive/20" };
      case "special":
        return { text: "Special Challenge", variant: "default" as const, className: "bg-accent text-accent-foreground" };
      default:
        return { text: status, variant: "outline" as const, className: "" };
    }
  };

  const { text, variant: defaultVariant, className: defaultClassName } = getStatusConfig();

  return (
    <Badge 
      variant={variant || defaultVariant} 
      className={`${defaultClassName} ${className || ""}`}
    >
      {text}
    </Badge>
  );
}