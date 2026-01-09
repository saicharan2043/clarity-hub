import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      position="top-center"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:rounded-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success: "group-[.toaster]:!bg-[hsl(var(--toast-success))] group-[.toaster]:!text-[hsl(var(--toast-success-foreground))] group-[.toaster]:!border-[hsl(var(--toast-success-border))]",
          error: "group-[.toaster]:!bg-[hsl(var(--toast-error))] group-[.toaster]:!text-[hsl(var(--toast-error-foreground))] group-[.toaster]:!border-[hsl(var(--toast-error-border))]",
          warning: "group-[.toaster]:!bg-[hsl(var(--toast-warning))] group-[.toaster]:!text-[hsl(var(--toast-warning-foreground))] group-[.toaster]:!border-[hsl(var(--toast-warning-border))]",
          info: "group-[.toaster]:!bg-[hsl(var(--toast-info))] group-[.toaster]:!text-[hsl(var(--toast-info-foreground))] group-[.toaster]:!border-[hsl(var(--toast-info-border))]",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
