import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { final, homeMenu } from "./menu";
import { SidebarWrapper } from "@qriar-labs/qore";
import Link from "next/link";
import Image from "next/image";

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
