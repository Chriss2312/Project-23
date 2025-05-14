'use client';

import { HomeIcon, BookOpenIcon, UsersIcon, ScannerIcon, BarChartIcon, SettingsIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: "/", label: "Dashboard", icon: HomeIcon },
  { href: "/classes", label: "Classes", icon: BookOpenIcon },
  { href: "/students", label: "Students", icon: UsersIcon },
  { href: "/scanner", label: "Scanner", icon: ScannerIcon },
  { href: "/analytics", label: "Analytics", icon: BarChartIcon },
  { href: "/settings", label: "Settings", icon: SettingsIcon },
];

export function NavMenu() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
            pathname === item.href && "bg-gray-100 dark:bg-gray-800"
          )}
        >
          <item.icon className="h-5 w-5" />
          {item.label}
        </Link>
      ))}
    </nav>
  );
} 