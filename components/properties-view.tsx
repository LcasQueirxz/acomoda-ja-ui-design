"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, MapPin, TrendingUp, Edit, Trash2 } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { NewPropertyDialog } from "@/components/new-property-dialog"
import { EditPropertyDialog } from "@/components/edit-property-dialog"

export function PropertiesView() {
  const { properties, deleteProperty, setSelectedProperty } = useAppStore()
  const [newPropertyDialogOpen, setNewPropertyDialogOpen] = useState(false)
  const [editPropertyDialogOpen, setEditPropertyDialogOpen] = useState(false)

  const handleEdit = (property: any) => {
    setSelectedProperty(property)
    setEditPropertyDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta propriedade?")) {
      deleteProperty(id)
    }
  }

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
        <Button onClick={() => setNewPropertyDialogOpen(true)}>
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
                <span className="text-xs">
                  {property.address}, {property.city} - {property.state}
                </span>
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
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Tarifa Base</span>
                  <span className="font-semibold">R$ {property.baseRate}/noite</span>
                </div>
              </div>

              <div className="pt-3 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                  onClick={() => handleEdit(property)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent"
                  onClick={() => handleDelete(property.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <NewPropertyDialog open={newPropertyDialogOpen} onOpenChange={setNewPropertyDialogOpen} />
      <EditPropertyDialog open={editPropertyDialogOpen} onOpenChange={setEditPropertyDialogOpen} />
    </div>
  )
}
