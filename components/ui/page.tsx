//aqui vai ficar as funçoes padroes do UI

import { cn } from "@/lib/utils";

//PageContainer do shadcn/ui
export const PageContainer = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("space-y-6 px-5 mx-auto max-w-7xl", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const SectionContainer = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <section className={cn("py-16 md:py-24", className)} {...props}>
      <div className="container mx-auto px-4 max-w-7xl">{children}</div>
    </section>
  );
};
