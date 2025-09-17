"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

interface NavItemProps {
  label: string;
  href: string;
  icon: ReactNode;
  onClick?: () => void;
}

export default function NavItem({ label, href, icon, onClick }: NavItemProps) {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = href ? pathname.startsWith(href) : false;

  return (
    <button
      onClick={onClick ?? (() => router.push(href))}
      className={`relative flex items-center gap-2 px-3 py-2 rounded-xl
        transition-all duration-300 overflow-hidden
        ${
          isActive
            ? "bg-white/20 backdrop-blur-md text-white shadow-sm inner-border"
            : "backdrop-blur-sm text-gray-300 hover:bg-white/10 hover:text-white"
        }
      `}
    >
      {/* subtle highlight overlay */}
      {isActive && (
        <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
      )}

      <span className="relative z-10 flex items-center gap-2">
        {icon}
        <span>{label}</span>
      </span>
    </button>
  );
}
