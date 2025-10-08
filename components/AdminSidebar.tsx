'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChartBarIcon,
  InboxArrowDownIcon,
  HomeIcon,
  Cog6ToothIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';
import SignOutButton from './SignOutButton';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Submissions', href: '/admin/submissions', icon: InboxArrowDownIcon },
  { name: 'Analytics', href: '/admin/analytics', icon: ChartBarIcon },
];

const publicPageLinks = [
  { name: 'Homepage', href: '/' },
  { name: 'About Page', href: '/about' },
  { name: 'Content Page', href: '/content' },
  { name: 'Contact Page', href: '/contact' },
];

const settingsNavigation = [
  { name: 'Settings', href: '/admin/settings', icon: Cog6ToothIcon },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-1 grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
      <div className="flex h-16 shrink-0 items-center">
        <h1 className="text-2xl font-bold text-white">Admin</h1>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={classNames(
                      pathname === item.href
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800',
                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                    )}
                  >
                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <div className="text-xs font-semibold leading-6 text-gray-400">View Site</div>
            <ul role="list" className="-mx-2 mt-2 space-y-1">
              {publicPageLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                  >
                    <ArrowTopRightOnSquareIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          {/* SignOutButton is only for desktop view, hidden on mobile where it's in the top bar */}
          <li className="mt-auto hidden lg:block">
            <div className="w-full">
              <SignOutButton />
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}