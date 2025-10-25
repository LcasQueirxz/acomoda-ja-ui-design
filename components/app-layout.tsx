"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  ShoppingCart,
  Grid3x3,
  MessageSquare,
  Download,
  FileCheck,
  Search,
  Menu,
  X,
  ChevronDown,
  Users,
  UsersRound,
  DollarSign,
  Workflow,
  Bell,
  Settings,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [analyticsOpen, setAnalyticsOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-0 lg:w-20"
        } transition-all duration-300 bg-card flex flex-col overflow-hidden fixed lg:relative h-full z-50 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0 relative overflow-hidden shadow-lg shadow-primary/20">
              <Image
                src="/acomoda-ja-logo.png"
                alt="AcomodaJá"
                width={40}
                height={40}
                className="object-contain scale-110"
              />
            </div>
            {sidebarOpen && (
              <span className="font-bold text-xl whitespace-nowrap bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                AcomodaJá
              </span>
            )}
          </div>
        </div>

        {/* Search */}
        {sidebarOpen && (
          <div className="p-4 flex-shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Buscar..." className="pl-9 bg-background/50 border-0" />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Geral Section */}
          <div>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Geral</div>
            <div className="space-y-1">
              <Link href="/painel-controle">
                <NavItem icon={LayoutDashboard} label="Painel de Controle" />
              </Link>
              <Link href="/paginas">
                <NavItem icon={FileText} label="Páginas" />
              </Link>

              {/* Análise - Expandable */}
              <div>
                <button
                  onClick={() => setAnalyticsOpen(!analyticsOpen)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent text-sm font-medium bg-accent"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span className="flex-1 text-left">Análise</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${analyticsOpen ? "rotate-180" : ""}`} />
                </button>

                {analyticsOpen && (
                  <div className="ml-7 mt-1 space-y-1 border-l border-border pl-3">
                    <Link href="/analise">
                      <SubNavItem icon={BarChart3} label="Relatórios" />
                    </Link>
                    <Link href="/analise/clientes">
                      <SubNavItem icon={Users} label="Clientes" />
                    </Link>
                    <Link href="/analise/publico">
                      <SubNavItem icon={UsersRound} label="Público" badge="NOVO" />
                    </Link>
                    <Link href="/analise/pagamentos">
                      <SubNavItem icon={DollarSign} label="Pagamentos" />
                    </Link>
                    <Link href="/analise/fluxos">
                      <SubNavItem icon={Workflow} label="Fluxos de Trabalho" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Vendas Section */}
          <div>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Vendas</div>
            <Link href="/vendas">
              <NavItem icon={ShoppingCart} label="Vendas" count={118} />
            </Link>
          </div>

          {/* Integrações Section */}
          <div>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Integrações</div>
            <Link href="/integracoes">
              <NavItem icon={Grid3x3} label="Integrações" />
            </Link>
          </div>

          {/* Outros Section */}
          <div>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Outros</div>
            <div className="space-y-1">
              <Link href="/mensagens">
                <NavItem icon={MessageSquare} label="Mensagens" count={24} />
              </Link>
              <Link href="/downloads">
                <NavItem icon={Download} label="Downloads" />
              </Link>
              <Link href="/declaracao">
                <NavItem icon={FileCheck} label="Declaração" />
              </Link>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-card/50 backdrop-blur-sm flex items-center px-4 lg:px-6 gap-4 lg:gap-6 flex-shrink-0">
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden">
            <Menu className="w-5 h-5" />
          </Button>

          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden lg:flex">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>

          <nav className="hidden md:flex items-center gap-4 lg:gap-6 overflow-x-auto">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap">
              Início
            </Link>
            <Link
              href="/reservas"
              className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap"
            >
              Reservas
            </Link>
            <Link
              href="/propriedades"
              className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap"
            >
              Propriedades
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap"
            >
              Dashboard
            </Link>
            <Link
              href="/hospedes"
              className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap"
            >
              Hóspedes
            </Link>
          </nav>

          <div className="ml-auto flex items-center gap-3">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notificações</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-96 overflow-y-auto">
                  <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                    <div className="font-medium text-sm">Nova reserva confirmada</div>
                    <div className="text-xs text-muted-foreground">APT_401 - Check-in em 2 dias</div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                    <div className="font-medium text-sm">Limpeza agendada</div>
                    <div className="text-xs text-muted-foreground">CASA_JD - Amanhã às 10h</div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                    <div className="font-medium text-sm">Sincronização concluída</div>
                    <div className="text-xs text-muted-foreground">Booking.com - 3 novas reservas</div>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                    <AvatarImage src="/placeholder-user.png" alt="User" />
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">LQ</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Lucas Queiroz</p>
                    <p className="text-xs leading-none text-muted-foreground">lucas@acomodaja.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">Sair</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}

function NavItem({
  icon: Icon,
  label,
  count,
}: {
  icon: React.ElementType
  label: string
  count?: number
}) {
  return (
    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent text-sm font-medium transition-colors">
      <Icon className="w-4 h-4" />
      <span className="flex-1 text-left">{label}</span>
      {count && <span className="text-xs font-semibold text-muted-foreground">{count}</span>}
    </button>
  )
}

function SubNavItem({
  icon: Icon,
  label,
  badge,
}: {
  icon: React.ElementType
  label: string
  badge?: string
}) {
  return (
    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent text-sm transition-colors">
      <Icon className="w-4 h-4" />
      <span className="flex-1 text-left">{label}</span>
      {badge && (
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-primary text-primary-foreground">{badge}</span>
      )}
    </button>
  )
}
