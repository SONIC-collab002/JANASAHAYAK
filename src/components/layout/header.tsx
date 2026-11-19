"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { APP_NAME, APP_NAME_HINDI } from '@/lib/constants';
import { Logo } from '@/components/icons';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, PlusCircle } from 'lucide-react';

const navLinks = [
  { href: '/#issues', label: 'Active Reports · रिपोर्टें' },
  { href: '/#charter', label: 'Citizen Charter · अधिकार' },
  { href: '/#helplines', label: 'Helplines · हेल्पलाइन' },
  { href: '/admin', label: 'Officer Portal · अधिकारी' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      {/* Tiranga Hairline Accent */}
      <div className="h-[3px] w-full bg-gradient-to-r from-orange-500 via-amber-200 to-emerald-600" />

      <div className="container mx-auto flex h-16 items-center justify-between gap-8 px-4 md:px-6">
        {/* Zone 1: Single text element wordmark */}
        <Link href="/" className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group">
          <Logo className="h-8 w-8 transition-transform group-hover:scale-105" />
          <span className="font-headline font-bold text-lg md:text-xl tracking-tight text-foreground flex items-baseline gap-1.5">
            <span>{APP_NAME}</span>
            <span className="text-primary font-semibold text-base">| {APP_NAME_HINDI}</span>
          </span>
        </Link>

        {/* Zone 2: 4 clean single-line nav links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-muted-foreground">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-primary transition-colors whitespace-nowrap shrink-0"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <Button asChild className="h-10 px-5 font-semibold shadow-sm whitespace-nowrap shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/report-issue">
              <PlusCircle className="mr-1.5 h-4 w-4" />
              Report Issue · शिकायत
            </Link>
          </Button>

          {/* Mobile Sheet Trigger */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open Navigation</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-6">
                <div className="flex items-center gap-2.5 mb-8 pb-4 border-b">
                  <Logo className="h-8 w-8" />
                  <span className="font-headline font-bold text-xl">{APP_NAME} · {APP_NAME_HINDI}</span>
                </div>
                <nav className="flex flex-col space-y-4 text-base">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="text-foreground/80 hover:text-primary py-2 transition-colors font-medium"
                    >
                      {link.label}
                    </a>
                  ))}
                  <div className="pt-4 border-t">
                    <Button asChild className="w-full h-11">
                      <Link href="/report-issue">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Report Civic Issue
                      </Link>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

