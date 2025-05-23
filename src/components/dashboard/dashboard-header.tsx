
"use client"
import React from "react"; 
import Link from "next/link"
import {
  Home,
  LineChart,
  PanelLeft,
  Search,
  Settings, // Changed from Settings2 to Settings to match sidebar
  User,
  MessagesSquare,
  LayoutGrid,
  LogOut,
  SlidersHorizontal,
  BarChartBig, 
  Trophy, 
} from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { AppLogo } from "@/components/layout/app-logo"
import { usePathname } from "next/navigation"

const getBreadcrumbName = (pathSegment: string) => {
  if (!pathSegment) return "Overview"; // Changed from Dashboard to Overview for the root dashboard page
  const name = pathSegment.charAt(0).toUpperCase() + pathSegment.slice(1);
  return name.replace(/-/g, " "); // Replace hyphens with spaces
};


export function DashboardHeader() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean); // e.g., ['dashboard', 'agents']

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs bg-sidebar text-sidebar-foreground">
          <nav className="grid gap-6 text-lg font-medium">
            <div className="group flex h-10 shrink-0 items-center justify-start gap-2 rounded-full text-lg font-semibold text-primary-foreground md:text-base mb-4">
                <AppLogo className="text-sidebar-primary" />
            </div>
            <Link
              href="/dashboard"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/feed"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <LayoutGrid className="h-5 w-5" />
              Feed
            </Link>
            <Link
              href="/dashboard/agents"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <SlidersHorizontal className="h-5 w-5" />
              Agents
            </Link>
            <Link
              href="/dashboard/chat"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <MessagesSquare className="h-5 w-5" />
              Chat Rooms
            </Link>
            <Link
              href="/dashboard/analytics"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <BarChartBig className="h-5 w-5" />
              Analytics
            </Link>
            <Link
              href="/dashboard/leaderboard"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Trophy className="h-5 w-5" />
              Leaderboard
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {pathSegments.slice(1).map((segment, index) => {
            const href = "/" + pathSegments.slice(0, index + 2).join("/");
            const isLast = index === pathSegments.length - 2; 
            return (
              <React.Fragment key={segment}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="font-sans">{getBreadcrumbName(segment)}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={href} className="font-sans">{getBreadcrumbName(segment)}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="relative ml-auto flex-1 md:grow-0">
        {/* Search can be added here if needed */}
      </div>
      <ThemeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <User className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard/settings" className="flex items-center w-full">
             <Settings className="mr-2 h-4 w-4" /> Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>Support (Placeholder)</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
             <Link href="/" className="flex items-center w-full">
                <LogOut className="mr-2 h-4 w-4" /> Logout
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

