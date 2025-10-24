"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, MapPin, Calendar, TrendingUp } from "lucide-react"

interface Property {
  id: string
  name: string
  type: string
  address: string
  platforms: ("booking" | "airbnb")[]
  occupancyRate: number
  monthlyRevenue: number
  image: string
}

export function PropertiesView() {
  const properties: Property[] = [
    {
      id: "APT_401",
      name: "Estúdio Moderno",
      type: "Apartamento",
      address: "Av. Paulista, 1000 - Centro, São Paulo - SP",
      platforms: ["booking", "airbnb"],
      occupancyRate: 85,
      monthlyRevenue: 3500,
      image: "/modern-studio-apartment-interior-s-o-paulo.jpg",
    },
    {
      id: "CASA_JD",
      name: "Casa de Praia Exclusiva",
      type: "Casa",
      address: "Rua das Ondas, 45 - Praia do Forte, BA",
      platforms: ["booking", "airbnb"],
      occupancyRate: 78,
      monthlyRevenue: 5800,
      image: "/luxury-beach-house-brazil-northeast-coast.jpg",
    },
    {
      id: "POUS_01",
      name: "Pousada Boutique Serra",
      type: "Pousada",
      address: "Estrada do Vale, 234 - Gramado, RS",
      platforms: ["booking"],
      occupancyRate: 72,
      monthlyRevenue: 4200,
      image: "/boutique-inn-mountain-serra-ga-cha.jpg",
    },
    {
      id: "EST_MOD",
      name: "Estúdio Compacto Premium",
      type: "Apartamento",
      address: "Rua Augusta, 567 - Jardins, São Paulo - SP",
      platforms: ["airbnb"],
      occupancyRate: 90,
      monthlyRevenue: 2900,
      image: "/compact-modern-studio-apartment-upscale-neighborho.jpg",
    },
    {
      id: "CASA_PR",
      name: "Casa Colonial Centro Histórico",
      type: "Casa",
      address: "Rua do Comércio, 89 - Centro, Paraty - RJ",
      platforms: ["booking", "airbnb"],
      occupancyRate: 68,
      monthlyRevenue: 4800,
      image: "/colonial-house-historic-center-paraty-brazil.jpg",
    },
    {
      id: "APT_LUX",
      name: "Apartamento Vista Mar",
      type: "Apartamento",
      address: "Av. Atlântica, 1200 - Copacabana, Rio de Janeiro - RJ",
      platforms: ["booking"],
      occupancyRate: 82,
      monthlyRevenue: 6200,
      image: "/luxury-apartment-ocean-view-copacabana-rio.jpg",
    },
  ]

  const getPlatformIcon = (platform: "booking" | "airbnb") => {
    if (platform === "booking") {
      return <Badge className="bg-blue-500 hover:bg-blue-600 text-xs">B</Badge>
    }
    return <Badge className="bg-pink-500 hover:bg-pink-600 text-xs">A</Badge>
  }

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Propriedades</h1>
          <p className="text-muted-foreground mt-1">Gerencie seus imóveis e integrações</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nova Propriedade
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Total de Propriedades</p>
          <p className="text-3xl font-bold">{properties.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Taxa Média de Ocupação</p>
          <p className="text-3xl font-bold text-emerald-500">
            {Math.round(properties.reduce((sum, p) => sum + p.occupancyRate, 0) / properties.length)}%
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Receita Mensal Total</p>
          <p className="text-3xl font-bold">
            R$ {properties.reduce((sum, p) => sum + p.monthlyRevenue, 0).toLocaleString("pt-BR")}
          </p>
        </Card>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative overflow-hidden bg-muted">
              <img
                src={property.image || "/placeholder.svg"}
                alt={property.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 flex gap-1">
                {property.platforms.map((platform) => (
                  <div key={platform}>{getPlatformIcon(platform)}</div>
                ))}
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-lg">{property.name}</h3>
                  <Badge variant="outline" className="text-xs">
                    {property.id}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{property.type}</p>
              </div>

              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span className="text-xs">{property.address}</span>
              </div>

              <div className="pt-3 border-t border-border space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Taxa de Ocupação</span>
                  <span className="font-semibold flex items-center gap-1">
                    {property.occupancyRate}%
                    <TrendingUp className="w-3 h-3 text-emerald-500" />
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Receita Mensal</span>
                  <span className="font-semibold">R$ {property.monthlyRevenue.toLocaleString("pt-BR")}</span>
                </div>
              </div>

              <div className="pt-3 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Calendar className="w-4 h-4 mr-2" />
                  Calendário
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Editar
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
