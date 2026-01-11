import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  ClipboardList,
  Heart,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/patients', label: 'Patients', icon: Users },
  { href: '/visits', label: 'Visits', icon: Calendar },
  { href: '/insurance-notes', label: 'Insurance Notes', icon: FileText },
  { href: '/orders', label: 'Clinical Orders', icon: ClipboardList },
  { href: '/patient-portal', label: 'Patient Portal', icon: Heart },
  { href: '/settings', label: 'Settings', icon: Settings },
]

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const location = useLocation()

  return (
    <aside
      className={cn(
        'hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col lg:w-64 transition-all duration-300',
        isCollapsed && 'lg:-translate-x-full'
      )}
    >
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-card px-3 pb-4">
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center px-2">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg gradient-medical flex items-center justify-center">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            {!isCollapsed && (
              <span className="text-xl font-bold text-foreground">20back</span>
            )}
          </Link>
        </div>

        {/* Collapse Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'absolute top-4 -right-3 h-6 w-6 rounded-full border bg-background shadow-sm transition-transform duration-300',
            'hidden lg:flex',
            isCollapsed && 'translate-x-[17rem]'
          )}
          onClick={onToggle}
        >
          {isCollapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-3 w-3" />
          )}
        </Button>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col">
          <ul className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul className="space-y-1">
                {navItems.map((item) => {
                  const isActive =
                    location.pathname === item.href ||
                    (item.href !== '/' && location.pathname.startsWith(item.href))

                  return (
                    <li key={item.href}>
                      <Link
                        to={item.href}
                        className={cn(
                          'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-colors',
                          isActive
                            ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted',
                          isCollapsed && 'justify-center'
                        )}
                        title={isCollapsed ? item.label : undefined}
                      >
                        <item.icon
                          className={cn(
                            'h-5 w-5 shrink-0',
                            isActive
                              ? 'text-blue-600 dark:text-blue-400'
                              : 'text-muted-foreground group-hover:text-foreground'
                          )}
                        />
                        {!isCollapsed && item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </li>
          </ul>
        </nav>

        {/* User Info */}
        {!isCollapsed && (
          <div className="border-t pt-4">
            <div className="flex items-center gap-3 px-2">
              <div className="h-9 w-9 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium text-sm">
                DS
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Dr. Smith</p>
                <p className="text-xs text-muted-foreground truncate">Internal Medicine</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

