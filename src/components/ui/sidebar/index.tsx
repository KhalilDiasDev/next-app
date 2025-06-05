import React from "react";


interface SidebarProps {
  children: React.ReactNode;
}

export default function SidebarComponent({ children }: SidebarProps) {


  return (
    <div className="h-screen">
     
    
        {children}
    </div>
  );
}
