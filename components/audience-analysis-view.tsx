"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Users, TrendingUp } from "lucide-react"

export function AudienceAnalysisView() {
  const geographicData = [
    { city: "São Paulo", state: "SP", bookings: 145, percentage: 32, growth: 15 },
    { city: "Rio de Janeiro", state: "RJ", bookings: 98, percentage: 22, growth: 8 },
    { city: "Belo Horizonte", state: "MG", bookings: 76, percentage: 17, growth: 12 },
    { city: "Curitiba", state: "PR", bookings: 54, percentage: 12, growth: -3 },
    { city: "Porto Alegre", state: "RS", bookings: 42, percentage: 9, growth: 5 },
    { city: "Brasília", state: "DF", bookings: 35, percentage: 8, growth: 18 },
  ]

  const stayDuration = [
    { duration: "1-2 noites", count: 85, percentage: 28, avgPrice: 450 },
    { duration: "3-4 noites", count: 120, percentage: 40, avgPrice: 820 },
    { duration: "5-7 noites", count: 68, percentage: 23, avgPrice: 1450 },
    { duration: "8+ noites", count: 27, percentage: 9, avgPrice: 2100 },
  ]

  const demographics = [
    { segment: "Casais", percentage: 45, trend: "up" },
    { segment: "Famílias", percentage: 30, trend: "up" },
    { segment: "Viajantes Solo", percentage: 15, trend: "stable" },
    { segment: "Grupos", percentage: 10, trend: "down" },
  ]

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Análise de Público</h1>
        <p className="text-muted-foreground mt-1">Segmentação e expansão de mercado</p>
        <Badge variant="outline" className="mt-2 bg-primary/10 text-primary border-primary/20">
          NOVO
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">6</p>
              <p className="text-xs text-muted-foreground">Cidades Principais</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">3.8</p>
              <p className="text-xs text-muted-foreground">Noites Médias</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">450</p>
              <p className="text-xs text-muted-foreground">Total de Reservas</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Geographic Distribution */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Origem Geográfica dos Hóspedes</h2>
        <div className="space-y-4">
          {geographicData.map((location) => (
            <div key={location.city} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">
                    {location.city}, {location.state}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">{location.bookings} reservas</span>
                  <div
                    className={`flex items-center gap-1 text-xs font-semibold ${
                      location.growth >= 0 ? "text-emerald-500" : "text-red-500"
                    }`}
                  >
                    <TrendingUp className={`w-3 h-3 ${location.growth < 0 ? "rotate-180" : ""}`} />
                    {Math.abs(location.growth)}%
                  </div>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div className="h-full bg-blue-500 transition-all" style={{ width: `${location.percentage}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stay Duration Analysis */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Duração Média da Estadia</h2>
          <div className="space-y-4">
            {stayDuration.map((item) => (
              <div key={item.duration} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{item.duration}</span>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{item.count} reservas</p>
                    <p className="text-xs text-muted-foreground">R$ {item.avgPrice} média</p>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-purple-500 transition-all" style={{ width: `${item.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Demographics */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Segmentação Demográfica</h2>
          <div className="space-y-4">
            {demographics.map((demo) => (
              <div key={demo.segment} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">{demo.segment}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold">{demo.percentage}%</span>
                  {demo.trend === "up" && <TrendingUp className="w-4 h-4 text-emerald-500" />}
                  {demo.trend === "down" && <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />}
                  {demo.trend === "stable" && <div className="w-4 h-0.5 bg-muted-foreground" />}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Insights Card */}
      <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <h3 className="font-semibold mb-2">Insights de Expansão</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>
              São Paulo representa 32% das reservas com crescimento de 15% - considere expandir portfólio na região
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>Estadias de 3-4 noites são as mais comuns (40%) - otimize preços para este período</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>Casais representam 45% do público - destaque amenidades românticas no marketing</span>
          </li>
        </ul>
      </Card>
    </div>
  )
}
