'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  CalendarDays,
  TrendingUp,
  Scale,
  Clock,
  Plane,
  Trophy,
  Settings,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/planner', label: 'Planner', icon: CalendarDays },
  { href: '/progress', label: 'Progress', icon: TrendingUp },
  { href: '/weight', label: 'Weight', icon: Scale },
  { href: '/pending', label: 'Pending', icon: Clock },
  { href: '/milestones', label: 'Milestones', icon: Trophy },
  { href: '/travel', label: 'Travel', icon: Plane },
  { href: '/settings', label: 'Settings', icon: Settings },
]

interface NavBarProps {
  pendingCount?: number
}

export function NavBar({ pendingCount = 0 }: NavBarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-56 bg-card border-r border-border z-40">
        <div className="p-4 border-b border-border">
          <p className="font-bold text-lg">CrossFit Tracker</p>
          <p className="text-xs text-muted-foreground">Nahuel · 2026→2027</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
                {label === 'Pending' && pendingCount > 0 && (
                  <Badge variant="destructive" className="ml-auto h-5 text-xs px-1.5">
                    {pendingCount}
                  </Badge>
                )}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40 pb-safe">
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.slice(0, 6).map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex flex-col items-center gap-1 px-2 py-1 rounded-lg transition-colors relative',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                <div className="relative">
                  <Icon className="h-5 w-5" />
                  {label === 'Pending' && pendingCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full text-[10px] w-4 h-4 flex items-center justify-center font-bold">
                      {pendingCount > 9 ? '9+' : pendingCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px] leading-none">{label}</span>
              </Link>
            )
          })}
          {/* Settings in mobile nav */}
          <Link
            href="/settings"
            className={cn(
              'flex flex-col items-center gap-1 px-2 py-1 rounded-lg transition-colors',
              pathname === '/settings' ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            <Settings className="h-5 w-5" />
            <span className="text-[10px] leading-none">Settings</span>
          </Link>
        </div>
      </nav>
    </>
  )
}
