"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAppStore } from "@/lib/store"
import { useState } from "react"

interface NewReservationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedCell: { room: string; day: number } | null
}

export function NewReservationDialog({ open, onOpenChange, selectedCell }: NewReservationDialogProps) {
  const { addReservation, properties } = useAppStore()
  const [formData, setFormData] = useState({
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    platform: "direct" as "booking" | "airbnb" | "direct",
    startDay: selectedCell?.day || 1,
    endDay: selectedCell?.day ? selectedCell.day + 2 : 3,
    roomId: selectedCell?.room || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const nights = formData.endDay - formData.startDay
    const property = properties.find((p) => p.id === formData.roomId)
    const total = property ? property.baseRate * nights : 0

    const newReservation = {
      id: `RES-${Date.now()}`,
      ...formData,
      status: "confirmed" as const,
      checkIn: `${formData.startDay.toString().padStart(2, "0")}/10/2025`,
      checkOut: `${formData.endDay.toString().padStart(2, "0")}/10/2025`,
      total,
      nights,
    }

    addReservation(newReservation)
    onOpenChange(false)

    setFormData({
      guestName: "",
      guestEmail: "",
      guestPhone: "",
      platform: "direct",
      startDay: 1,
      endDay: 3,
      roomId: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Nova Reserva</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="guestName">Nome do Hóspede *</Label>
              <Input
                id="guestName"
                value={formData.guestName}
                onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="guestEmail">E-mail *</Label>
              <Input
                id="guestEmail"
                type="email"
                value={formData.guestEmail}
                onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="guestPhone">Telefone *</Label>
              <Input
                id="guestPhone"
                value={formData.guestPhone}
                onChange={(e) => setFormData({ ...formData, guestPhone: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="platform">Plataforma *</Label>
              <Select
                value={formData.platform}
                onValueChange={(value: any) => setFormData({ ...formData, platform: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="booking">Booking.com</SelectItem>
                  <SelectItem value="airbnb">Airbnb</SelectItem>
                  <SelectItem value="direct">Reserva Direta</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="roomId">Propriedade *</Label>
              <Select value={formData.roomId} onValueChange={(value) => setFormData({ ...formData, roomId: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma propriedade" />
                </SelectTrigger>
                <SelectContent>
                  {properties.map((property) => (
                    <SelectItem key={property.id} value={property.id}>
                      {property.name} ({property.id})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Período</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  min="1"
                  max="31"
                  value={formData.startDay}
                  onChange={(e) => setFormData({ ...formData, startDay: Number.parseInt(e.target.value) })}
                  placeholder="Dia início"
                />
                <Input
                  type="number"
                  min="1"
                  max="31"
                  value={formData.endDay}
                  onChange={(e) => setFormData({ ...formData, endDay: Number.parseInt(e.target.value) })}
                  placeholder="Dia fim"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Criar Reserva</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
