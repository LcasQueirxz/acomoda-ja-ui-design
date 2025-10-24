"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Download, TrendingUp, TrendingDown } from "lucide-react"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

export function AnalysisView() {
  const occupancyData = [
    { property: "APT_401", rate: 85 },
    { property: "CASA_JD", rate: 78 },
    { property: "POUS_01", rate: 72 },
    { property: "EST_MOD", rate: 90 },
    { property: "CASA_PR", rate: 68 },
    { property: "APT_LUX", rate: 82 },
  ]

  const revenueData = [
    { month: "Mai", revenue: 42000 },
    { month: "Jun", revenue: 48000 },
    { month: "Jul", revenue: 52000 },
    { month: "Ago", revenue: 49000 },
    { month: "Set", revenue: 55000 },
    { month: "Out", revenue: 58000 },
  ]

  const cancellationData = [
    { month: "Mai", rate: 5.2 },
    { month: "Jun", rate: 4.8 },
    { month: "Jul", rate: 3.9 },
    { month: "Ago", rate: 4.5 },
    { month: "Set", rate: 3.2 },
    { month: "Out", rate: 2.8 },
  ]

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Análise</h1>
          <p className="text-muted-foreground mt-1">Relatórios detalhados de BI e modelagem dimensional</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filtros Avançados
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Plataforma" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as Plataformas</SelectItem>
            <SelectItem value="booking">Booking.com</SelectItem>
            <SelectItem value="airbnb">Airbnb</SelectItem>
            <SelectItem value="direct">Reserva Direta</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Imóvel" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Imóveis</SelectItem>
            <SelectItem value="apt401">APT_401</SelectItem>
            <SelectItem value="casajd">CASA_JD</SelectItem>
            <SelectItem value="pous01">POUS_01</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="6months">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1month">Último Mês</SelectItem>
            <SelectItem value="3months">Últimos 3 Meses</SelectItem>
            <SelectItem value="6months">Últimos 6 Meses</SelectItem>
            <SelectItem value="1year">Último Ano</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Taxa Média de Ocupação</p>
          <p className="text-3xl font-bold">79.2%</p>
          <div className="flex items-center gap-1 mt-2 text-emerald-500 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+6.2%</span>
          </div>
        </Card>

        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Receita Total (6 meses)</p>
          <p className="text-3xl font-bold">R$ 304k</p>
          <div className="flex items-center gap-1 mt-2 text-emerald-500 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+12.4%</span>
          </div>
        </Card>

        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Taxa de Cancelamento</p>
          <p className="text-3xl font-bold">2.8%</p>
          <div className="flex items-center gap-1 mt-2 text-emerald-500 text-sm">
            <TrendingDown className="w-4 h-4" />
            <span>-2.4%</span>
          </div>
        </Card>

        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">No-show Rate</p>
          <p className="text-3xl font-bold">1.2%</p>
          <div className="flex items-center gap-1 mt-2 text-emerald-500 text-sm">
            <TrendingDown className="w-4 h-4" />
            <span>-0.8%</span>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Occupancy by Property */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Taxa de Ocupação por Imóvel</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={occupancyData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="property" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="rate" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Revenue Evolution */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Evolução de Receita (MRR)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Cancellation Metrics */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Métricas de Cancelamento</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={cancellationData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line type="monotone" dataKey="rate" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Platform Distribution */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Distribuição por Plataforma</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Booking.com</span>
                <span className="text-sm font-bold">45%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: "45%" }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Airbnb</span>
                <span className="text-sm font-bold">38%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-pink-500" style={{ width: "38%" }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Reserva Direta</span>
                <span className="text-sm font-bold">17%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: "17%" }} />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
