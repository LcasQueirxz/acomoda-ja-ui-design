"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle2, Calendar, DollarSign, Users, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DashboardView() {
  // Mock data for BI metrics
  const occupancyRate = 75
  const occupancyChange = 5
  const mrr = 45800
  const mrrChange = 12.5
  const conflictsCount = 2

  const upcomingCheckIns = [
    { date: "24/10", guest: "João Silva", property: "CHL1", platform: "booking" },
    { date: "25/10", guest: "Maria Santos", property: "CHL2", platform: "airbnb" },
    { date: "26/10", guest: "Pedro Costa", property: "CHL3", platform: "direct" },
    { date: "27/10", guest: "Ana Oliveira", property: "CHL4", platform: "booking" },
    { date: "28/10", guest: "Carlos Ferreira", property: "CHL5", platform: "airbnb" },
  ]

  const revenueByPlatform = [
    { platform: "Booking.com", revenue: 22500, percentage: 49, color: "bg-blue-500" },
    { platform: "Airbnb", revenue: 18300, percentage: 40, color: "bg-pink-500" },
    { platform: "Reserva Direta", revenue: 5000, percentage: 11, color: "bg-emerald-500" },
  ]

  // Mock heatmap data (simplified - showing occupancy by week)
  const seasonalityData = [
    { week: "Sem 1", occupancy: 65 },
    { week: "Sem 2", occupancy: 72 },
    { week: "Sem 3", occupancy: 85 },
    { week: "Sem 4", occupancy: 90 },
    { week: "Sem 5", occupancy: 78 },
    { week: "Sem 6", occupancy: 68 },
  ]

  const getOccupancyColor = (occupancy: number) => {
    if (occupancy >= 80) return "bg-emerald-500"
    if (occupancy >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Manager Control</h1>
        <p className="text-muted-foreground mt-1">Visão estratégica e prevenção de overbooking</p>
      </div>

      {conflictsCount > 0 ? (
        <Card className="p-6 lg:p-8 bg-gradient-to-br from-red-500/20 to-red-500/10 border-red-500/50 shadow-lg shadow-red-500/20">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 animate-pulse">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-red-500 mb-1">
                RISCO CRÍTICO: {conflictsCount} RESERVAS EM CONFLITO!
              </h2>
              <p className="text-sm text-muted-foreground">
                Detectamos sobreposição de reservas. Ação imediata necessária para evitar overbooking.
              </p>
            </div>
            <Button variant="destructive" size="lg" className="flex-shrink-0">
              Revisar Conflitos Agora
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="p-6 lg:p-8 bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 border-emerald-500/50">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-emerald-500 mb-1">STATUS OK - Sincronização Ativa</h2>
              <p className="text-sm text-muted-foreground">
                Todas as 12 propriedades estão sincronizadas. Nenhum conflito detectado.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* KPI Principal - Taxa de Ocupação */}
      <Card className="p-6 lg:p-8 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Taxa de Ocupação Média</p>
            <div className="flex items-baseline gap-3">
              <h2 className="text-4xl lg:text-5xl font-bold">{occupancyRate}%</h2>
              <div
                className={`flex items-center gap-1 text-sm font-semibold ${
                  occupancyChange >= 0 ? "text-emerald-500" : "text-red-500"
                }`}
              >
                {occupancyChange >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {Math.abs(occupancyChange)}%
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">vs. mês anterior</p>
          </div>
          <div className="hidden lg:block">
            <Home className="w-16 h-16 text-primary/20" />
          </div>
        </div>
      </Card>

      {/* Painéis de Receita e Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Receita Gerada (MRR) */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Receita Gerada (MRR)</p>
              <p className="text-xs text-muted-foreground">Reservas confirmadas</p>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold">R$ {mrr.toLocaleString("pt-BR")}</h3>
            <span className="text-sm font-semibold text-emerald-500">+{mrrChange}%</span>
          </div>
        </Card>

        {/* Alerta de Conflitos */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                conflictsCount === 0 ? "bg-emerald-500/10" : "bg-red-500/10"
              }`}
            >
              {conflictsCount === 0 ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-500" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Alerta de Conflitos</p>
              <p className="text-xs text-muted-foreground">Risco de overbooking</p>
            </div>
          </div>
          {conflictsCount === 0 ? (
            <div>
              <h3 className="text-3xl font-bold text-emerald-500 mb-2">Status OK</h3>
              <p className="text-sm text-muted-foreground">Sincronização Ativa</p>
            </div>
          ) : (
            <div>
              <h3 className="text-3xl font-bold text-red-500 mb-2">{conflictsCount} Conflitos</h3>
              <Button variant="destructive" size="sm">
                Resolver Agora
              </Button>
            </div>
          )}
        </Card>
      </div>

      {/* Receita por Plataforma */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h3 className="font-semibold">Receita por Plataforma</h3>
            <p className="text-xs text-muted-foreground">Distribuição de receita</p>
          </div>
        </div>

        <div className="space-y-4">
          {revenueByPlatform.map((item) => (
            <div key={item.platform}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{item.platform}</span>
                <span className="text-sm font-semibold">R$ {item.revenue.toLocaleString("pt-BR")}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div className={`h-full ${item.color} transition-all`} style={{ width: `${item.percentage}%` }} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{item.percentage}% do total</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Próximos Check-ins e Mapa de Calor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Próximos Check-ins */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <h3 className="font-semibold">Próximos Check-ins</h3>
              <p className="text-xs text-muted-foreground">Próximos 5 dias</p>
            </div>
          </div>

          <div className="space-y-3">
            {upcomingCheckIns.map((checkin, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="text-center">
                  <p className="text-xs font-semibold text-muted-foreground">OUT</p>
                  <p className="text-sm font-bold">{checkin.date}</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{checkin.guest}</p>
                  <p className="text-xs text-muted-foreground">{checkin.property}</p>
                </div>
                <div
                  className={`w-2 h-2 rounded-full ${
                    checkin.platform === "booking"
                      ? "bg-blue-500"
                      : checkin.platform === "airbnb"
                        ? "bg-pink-500"
                        : "bg-emerald-500"
                  }`}
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Mapa de Calor de Sazonalidade */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 className="font-semibold">Sazonalidade</h3>
              <p className="text-xs text-muted-foreground">Taxa de ocupação por semana</p>
            </div>
          </div>

          <div className="space-y-3">
            {seasonalityData.map((item) => (
              <div key={item.week} className="flex items-center gap-3">
                <span className="text-sm font-medium w-16">{item.week}</span>
                <div className="flex-1 bg-muted rounded-full h-8 overflow-hidden flex items-center">
                  <div
                    className={`h-full ${getOccupancyColor(item.occupancy)} transition-all flex items-center justify-end pr-2`}
                    style={{ width: `${item.occupancy}%` }}
                  >
                    <span className="text-xs font-bold text-white">{item.occupancy}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Use estes dados para ajustar a{" "}
              <span className="font-semibold text-foreground">precificação dinâmica</span>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
