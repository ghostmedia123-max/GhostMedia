'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/lib/client';
import { FooterData } from '@/lib/types';

interface NavbarProps {
  footerData: FooterData;
}

export default function Navbar({ footerData }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Content', href: '/content' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Set isScrolled to true if user has scrolled down 50px or more
      setIsScrolled(window.scrollY > 50);
    };

    // Add event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-[#001564] shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-x-2 text-white">
              {footerData.siteIcon && (
                <Image
                  src={urlFor(footerData.siteIcon).width(40).height(40).url()}
                  alt={footerData.siteName || 'Site Logo'}
                  width={40}
                  height={40}
                />
              )}
              <span className="font-semibold">{footerData.siteName || 'GhostMedia'}</span>
            </Link>
          </div>
          {/* Desktop Menu */}
          <div className="hidden text-white md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <div key={link.name} className="relative px-3 py-2">
                  <Link href={link.href} className={`relative z-10 text-base font-medium transition-colors ${pathname === link.href ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
                    {link.name}
                  </Link>
                  {pathname === link.href && (
                    <motion.div
                      layoutId="navbar-active-link"
                      className="absolute inset-0 rounded-md bg-white/10"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Hamburger Button */}
          <div className="-mr-2 flex text-white md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="relative z-50 inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon for hamburger/close */}
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 bg-[#000729] md:hidden"
          id="mobile-menu"
        >
          <div className="flex h-full flex-col items-center justify-center space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block rounded-md px-3 py-2 text-2xl font-medium transition-colors hover:text-white ${
                  pathname === link.href ? 'text-white' : 'text-gray-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}