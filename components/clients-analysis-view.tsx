"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, TrendingUp, Star, DollarSign, Calendar } from "lucide-react"

export function ClientsAnalysisView() {
  const clients = [
    {
      id: 1,
      name: "Maria Santos",
      platform: "Airbnb",
      totalRevenue: 12500,
      stays: 8,
      lastFeedback: "Excelente!",
      rating: 5,
      retentionScore: 95,
    },
    {
      id: 2,
      name: "João Silva",
      platform: "Booking.com",
      totalRevenue: 9800,
      stays: 5,
      lastFeedback: "Muito bom",
      rating: 4.5,
      retentionScore: 85,
    },
    {
      id: 3,
      name: "Pedro Costa",
      platform: "Direto",
      totalRevenue: 15200,
      stays: 12,
      lastFeedback: "Perfeito!",
      rating: 5,
      retentionScore: 98,
    },
    {
      id: 4,
      name: "Ana Oliveira",
      platform: "Airbnb",
      totalRevenue: 7600,
      stays: 4,
      lastFeedback: "Bom",
      rating: 4,
      retentionScore: 72,
    },
    {
      id: 5,
      name: "Carlos Ferreira",
      platform: "Booking.com",
      totalRevenue: 11300,
      stays: 7,
      lastFeedback: "Ótimo!",
      rating: 5,
      retentionScore: 88,
    },
  ]

  const getRetentionColor = (score: number) => {
    if (score >= 90) return "text-emerald-500"
    if (score >= 70) return "text-yellow-500"
    return "text-red-500"
  }

  const getPlatformColor = (platform: string) => {
    if (platform === "Airbnb") return "bg-pink-500/10 text-pink-500 border-pink-500/20"
    if (platform === "Booking.com") return "bg-blue-500/10 text-blue-500 border-blue-500/20"
    return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
  }

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Análise de Clientes</h1>
        <p className="text-muted-foreground mt-1">Receita e ocupação por hóspede</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">R$ 56.4k</p>
              <p className="text-xs text-muted-foreground">Receita Total</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">36</p>
              <p className="text-xs text-muted-foreground">Total de Estadias</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Star className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">4.7</p>
              <p className="text-xs text-muted-foreground">Avaliação Média</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">87.6%</p>
              <p className="text-xs text-muted-foreground">Retenção Média</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Buscar hóspede..." className="pl-9" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Todos</Button>
            <Button variant="outline">Airbnb</Button>
            <Button variant="outline">Booking.com</Button>
            <Button variant="outline">Direto</Button>
          </div>
        </div>
      </Card>

      {/* Clients Table */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-semibold">Hóspede</th>
                <th className="text-left py-3 px-4 text-sm font-semibold">Plataforma</th>
                <th className="text-right py-3 px-4 text-sm font-semibold">Receita Total</th>
                <th className="text-center py-3 px-4 text-sm font-semibold">Estadias</th>
                <th className="text-center py-3 px-4 text-sm font-semibold">Avaliação</th>
                <th className="text-left py-3 px-4 text-sm font-semibold">Último Feedback</th>
                <th className="text-center py-3 px-4 text-sm font-semibold">Retenção</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-semibold">{client.name.charAt(0)}</span>
                      </div>
                      <span className="font-medium">{client.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant="outline" className={getPlatformColor(client.platform)}>
                      {client.platform}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-right font-semibold">
                    R$ {client.totalRevenue.toLocaleString("pt-BR")}
                  </td>
                  <td className="py-4 px-4 text-center">{client.stays}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                      <span className="text-sm font-medium">{client.rating}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{client.lastFeedback}</td>
                  <td className="py-4 px-4 text-center">
                    <span className={`font-bold ${getRetentionColor(client.retentionScore)}`}>
                      {client.retentionScore}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
