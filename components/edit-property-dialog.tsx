"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useAppStore } from "@/lib/store"
import { useState, useEffect } from "react"

interface EditPropertyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditPropertyDialog({ open, onOpenChange }: EditPropertyDialogProps) {
  const { selectedProperty, updateProperty } = useAppStore()
  const [formData, setFormData] = useState({
    name: "",
    type: "Apartamento",
    address: "",
    city: "",
    state: "",
    baseRate: 250,
    rooms: 1,
    platforms: [] as ("booking" | "airbnb")[],
  })

  useEffect(() => {
    if (selectedProperty) {
      setFormData({
        name: selectedProperty.name,
        type: selectedProperty.type,
        address: selectedProperty.address,
        city: selectedProperty.city,
        state: selectedProperty.state,
        baseRate: selectedProperty.baseRate,
        rooms: selectedProperty.rooms,
        platforms: selectedProperty.platforms,
      })
    }
  }, [selectedProperty])

  if (!selectedProperty) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateProperty(selectedProperty.id, formData)
    onOpenChange(false)
  }

  const togglePlatform = (platform: "booking" | "airbnb") => {
    setFormData({
      ...formData,
      platforms: formData.platforms.includes(platform)
        ? formData.platforms.filter((p) => p !== platform)
        : [...formData.platforms, platform],
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Editar Propriedade</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="name">Nome da Propriedade *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipo *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Apartamento">Apartamento</SelectItem>
                  <SelectItem value="Casa">Casa</SelectItem>
                  <SelectItem value="Pousada">Pousada</SelectItem>
                  <SelectItem value="Chalé">Chalé</SelectItem>
                  <SelectItem value="Estúdio">Estúdio</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rooms">Número de Quartos *</Label>
              <Input
                id="rooms"
                type="number"
                min="1"
                value={formData.rooms}
                onChange={(e) => setFormData({ ...formData, rooms: Number.parseInt(e.target.value) })}
                required
              />
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="address">Endereço *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">Cidade *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">Estado *</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                maxLength={2}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="baseRate">Tarifa Base Diária (R$) *</Label>
              <Input
                id="baseRate"
                type="number"
                min="0"
                step="10"
                value={formData.baseRate}
                onChange={(e) => setFormData({ ...formData, baseRate: Number.parseFloat(e.target.value) })}
                required
              />
            </div>

            <div className="col-span-2 space-y-3">
              <Label>Plataformas de Integração</Label>
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="booking-edit"
                    checked={formData.platforms.includes("booking")}
                    onCheckedChange={() => togglePlatform("booking")}
                  />
                  <label htmlFor="booking-edit" className="text-sm font-medium cursor-pointer">
                    Booking.com
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="airbnb-edit"
                    checked={formData.platforms.includes("airbnb")}
                    onCheckedChange={() => togglePlatform("airbnb")}
                  />
                  <label htmlFor="airbnb-edit" className="text-sm font-medium cursor-pointer">
                    Airbnb
                  </label>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Salvar Alterações</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
