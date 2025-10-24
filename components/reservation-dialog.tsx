"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, User, CreditCard } from "lucide-react"

interface ReservationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedCell: { room: string; day: number } | null
}

export function ReservationDialog({ open, onOpenChange, selectedCell }: ReservationDialogProps) {
  const [formData, setFormData] = useState({
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    checkIn: "",
    checkOut: "",
    room: selectedCell?.room || "",
    platform: "",
    guests: "2",
    price: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle reservation creation
    console.log("Creating reservation:", formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto w-[95vw] sm:w-full">
        <DialogHeader>
          <DialogTitle className="text-xl lg:text-2xl">Nova Reserva</DialogTitle>
          <DialogDescription className="text-sm">Preencha os dados da reserva abaixo</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6 mt-4">
          {/* Guest Information */}
          <div className="space-y-3 lg:space-y-4">
            <div className="flex items-center gap-2 text-xs lg:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              <User className="w-3 h-3 lg:w-4 lg:h-4" />
              Informações do Hóspede
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
              <div className="space-y-2">
                <Label htmlFor="guestName" className="text-sm">
                  Nome Completo
                </Label>
                <Input
                  id="guestName"
                  placeholder="João Silva"
                  value={formData.guestName}
                  onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                  required
                  className="text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="guestEmail" className="text-sm">
                  Email
                </Label>
                <Input
                  id="guestEmail"
                  type="email"
                  placeholder="joao@example.com"
                  value={formData.guestEmail}
                  onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })}
                  required
                  className="text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="guestPhone" className="text-sm">
                  Telefone
                </Label>
                <Input
                  id="guestPhone"
                  placeholder="+55 11 99999-9999"
                  value={formData.guestPhone}
                  onChange={(e) => setFormData({ ...formData, guestPhone: e.target.value })}
                  required
                  className="text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="guests" className="text-sm">
                  Número de Hóspedes
                </Label>
                <Select value={formData.guests} onValueChange={(value) => setFormData({ ...formData, guests: value })}>
                  <SelectTrigger id="guests" className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Hóspede</SelectItem>
                    <SelectItem value="2">2 Hóspedes</SelectItem>
                    <SelectItem value="3">3 Hóspedes</SelectItem>
                    <SelectItem value="4">4 Hóspedes</SelectItem>
                    <SelectItem value="5">5+ Hóspedes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Reservation Details */}
          <div className="space-y-3 lg:space-y-4">
            <div className="flex items-center gap-2 text-xs lg:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              <Calendar className="w-3 h-3 lg:w-4 lg:h-4" />
              Detalhes da Reserva
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
              <div className="space-y-2">
                <Label htmlFor="checkIn" className="text-sm">
                  Check-in
                </Label>
                <Input
                  id="checkIn"
                  type="date"
                  value={formData.checkIn}
                  onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                  required
                  className="text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="checkOut" className="text-sm">
                  Check-out
                </Label>
                <Input
                  id="checkOut"
                  type="date"
                  value={formData.checkOut}
                  onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                  required
                  className="text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="room" className="text-sm">
                  Imóvel
                </Label>
                <Select value={formData.room} onValueChange={(value) => setFormData({ ...formData, room: value })}>
                  <SelectTrigger id="room" className="text-sm">
                    <SelectValue placeholder="Selecione o imóvel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CHL1">CHL1 - Chalé 1</SelectItem>
                    <SelectItem value="CHL2">CHL2 - Chalé 2</SelectItem>
                    <SelectItem value="CHL3">CHL3 - Chalé 3</SelectItem>
                    <SelectItem value="CHL4">CHL4 - Chalé 4</SelectItem>
                    <SelectItem value="CHL5">CHL5 - Chalé 5</SelectItem>
                    <SelectItem value="CHL6">CHL6 - Chalé 6</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="platform" className="text-sm">
                  Plataforma
                </Label>
                <Select
                  value={formData.platform}
                  onValueChange={(value) => setFormData({ ...formData, platform: value })}
                >
                  <SelectTrigger id="platform" className="text-sm">
                    <SelectValue placeholder="Selecione a plataforma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="booking">Booking.com</SelectItem>
                    <SelectItem value="airbnb">Airbnb</SelectItem>
                    <SelectItem value="direct">Reserva Direta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="space-y-3 lg:space-y-4">
            <div className="flex items-center gap-2 text-xs lg:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              <CreditCard className="w-3 h-3 lg:w-4 lg:h-4" />
              Informações de Pagamento
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-sm">
                  Valor Total
                </Label>
                <Input
                  id="price"
                  placeholder="R$ 0,00"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  className="text-sm"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-2 lg:gap-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
              Cancelar
            </Button>
            <Button type="submit" className="w-full sm:w-auto">
              Criar Reserva
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
