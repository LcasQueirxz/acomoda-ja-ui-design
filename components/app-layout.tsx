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
} from "lucide-react"
import Link from "next/link"

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
        } transition-all duration-300 border-r border-border bg-card flex flex-col overflow-hidden fixed lg:relative h-full z-50 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-primary-foreground font-bold text-sm">A</span>
            </div>
            {sidebarOpen && <span className="font-semibold text-lg whitespace-nowrap">AcomodaJá</span>}
          </div>
        </div>

        {/* Search */}
        {sidebarOpen && (
          <div className="p-4 border-b border-border flex-shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Buscar..." className="pl-9 bg-background border-border" />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Geral Section */}
          <div>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Geral</div>
            <div className="space-y-1">
              <NavItem href="/painel-controle" icon={LayoutDashboard} label="Painel de Controle" />
              <NavItem href="/paginas" icon={FileText} label="Páginas" />

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
                    <SubNavItem href="/analise" icon={BarChart3} label="Relatórios" />
                    <SubNavItem href="/analise/clientes" icon={Users} label="Clientes" />
                    <SubNavItem href="/analise/publico" icon={UsersRound} label="Público" badge="NOVO" />
                    <SubNavItem href="/analise/pagamentos" icon={DollarSign} label="Pagamentos" />
                    <SubNavItem href="/analise/fluxos" icon={Workflow} label="Fluxos de Trabalho" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Vendas Section */}
          <div>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Vendas</div>
            <NavItem href="/vendas" icon={ShoppingCart} label="Vendas" count={118} />
          </div>

          {/* Integrações Section */}
          <div>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Integrações</div>
            <NavItem href="/integracoes" icon={Grid3x3} label="Integrações" />
          </div>

          {/* Outros Section */}
          <div>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Outros</div>
            <div className="space-y-1">
              <NavItem href="/mensagens" icon={MessageSquare} label="Mensagens" count={24} />
              <NavItem href="/downloads" icon={Download} label="Downloads" />
              <NavItem href="/declaracao" icon={FileCheck} label="Declaração" />
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-border bg-card flex items-center px-4 lg:px-6 gap-4 lg:gap-6 flex-shrink-0">
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

          <div className="ml-auto flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground text-xs font-medium">U</span>
              </div>
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}

function NavItem({
  href,
  icon: Icon,
  label,
  count,
}: {
  href: string
  icon: React.ElementType
  label: string
  count?: number
}) {
  return (
    <Link
      href={href}
      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent text-sm font-medium transition-colors"
    >
      <Icon className="w-4 h-4" />
      <span className="flex-1 text-left">{label}</span>
      {count && <span className="text-xs font-semibold text-muted-foreground">{count}</span>}
    </Link>
  )
}

function SubNavItem({
  href,
  icon: Icon,
  label,
  badge,
}: {
  href: string
  icon: React.ElementType
  label: string
  badge?: string
}) {
  return (
    <Link
      href={href}
      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent text-sm transition-colors"
    >
      <Icon className="w-4 h-4" />
      <span className="flex-1 text-left">{label}</span>
      {badge && (
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-primary text-primary-foreground">{badge}</span>
      )}
    </Link>
  )
}
