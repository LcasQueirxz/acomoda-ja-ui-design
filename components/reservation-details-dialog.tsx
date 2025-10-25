"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAppStore } from "@/lib/store"
import { User, Phone, Mail, DollarSign, Home, Trash2, Edit } from "lucide-react"
import { useState } from "react"

interface ReservationDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ReservationDetailsDialog({ open, onOpenChange }: ReservationDetailsDialogProps) {
  const { selectedReservation, deleteReservation, updateReservation, properties } = useAppStore()
  const [isDeleting, setIsDeleting] = useState(false)

  if (!selectedReservation) return null

  const property = properties.find((p) => p.id === selectedReservation.roomId)

  const handleDelete = () => {
    if (confirm("Tem certeza que deseja cancelar esta reserva?")) {
      setIsDeleting(true)
      deleteReservation(selectedReservation.id)
      setTimeout(() => {
        setIsDeleting(false)
        onOpenChange(false)
      }, 500)
    }
  }

  const handleMove = () => {
    alert("Funcionalidade de reacomodação em desenvolvimento")
  }

  const getPlatformBadge = (platform: string) => {
    switch (platform) {
      case "booking":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Booking.com</Badge>
      case "airbnb":
        return <Badge className="bg-pink-500 hover:bg-pink-600">Airbnb</Badge>
      case "direct":
        return <Badge className="bg-emerald-500 hover:bg-emerald-600">Reserva Direta</Badge>
      default:
        return <Badge>Desconhecida</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge variant="outline" className="border-emerald-500 text-emerald-500">
            Confirmada
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-500">
            Pendente
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="border-red-500 text-red-500">
            Cancelada
          </Badge>
        )
      case "checked-in":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            Check-in Feito
          </Badge>
        )
      default:
        return <Badge variant="outline">Desconhecido</Badge>
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Detalhes da Reserva</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">ID da Reserva</p>
              <p className="font-mono font-semibold">{selectedReservation.id}</p>
            </div>
            <div className="flex gap-2">
              {getPlatformBadge(selectedReservation.platform)}
              {getStatusBadge(selectedReservation.status)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="w-4 h-4" />
                <span className="text-sm">Hóspede</span>
              </div>
              <p className="font-semibold">{selectedReservation.guestName}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Home className="w-4 h-4" />
                <span className="text-sm">Propriedade</span>
              </div>
              <p className="font-semibold">{property?.name || selectedReservation.roomId}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span className="text-sm">E-mail</span>
              </div>
              <p className="text-sm">{selectedReservation.guestEmail}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span className="text-sm">Telefone</span>
              </div>
              <p className="text-sm">{selectedReservation.guestPhone}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Check-in</p>
              <p className="font-semibold">{selectedReservation.checkIn}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Check-out</p>
              <p className="font-semibold">{selectedReservation.checkOut}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Noites</p>
              <p className="font-semibold">{selectedReservation.nights}</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-500" />
              <span className="font-medium">Valor Total</span>
            </div>
            <p className="text-2xl font-bold text-emerald-500">
              R$ {selectedReservation.total.toLocaleString("pt-BR")}
            </p>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
          <Button variant="outline" onClick={handleMove}>
            <Edit className="w-4 h-4 mr-2" />
            Reacomodar
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            <Trash2 className="w-4 h-4 mr-2" />
            {isDeleting ? "Cancelando..." : "Cancelar Reserva"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
