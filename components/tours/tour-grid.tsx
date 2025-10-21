// Tour grid layout component

import { ReactNode } from "react";

interface TourGridProps {
  children: ReactNode;
}

export function TourGrid({ children }: TourGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
}

