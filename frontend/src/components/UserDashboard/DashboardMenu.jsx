'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Package, Heart, User } from 'lucide-react';

const tabs = [
  { href: '/dashboard/products', label: 'Products', icon: Package },
  { href: '/dashboard/orders', label: 'Orders', icon: Package },
  { href: '/dashboard/wishlist', label: 'Wishlist', icon: Heart },
  { href: '/dashboard/profile', label: 'Profile', icon: User },
];

export default function DashboardMenu() {
  const pathname = usePathname();

  return (
    <div className="mb-9">
      <div className="flex flex-col md:flex-row w-full relative bg-gray-500/50 shadow-[20px_0_30px_5px_rgb(47,47,80)] rounded-md p-1">
        {tabs.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-5 py-5 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
                'text-[#ff7c8e] dark:text-white',
                isActive &&
                  'bg-background text-[#ff7c8e] dark:text-[#ff7c8e] dark:border-input dark:bg-input/30 shadow-sm'
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
