"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, Eye, ShieldAlert, CheckCircle2 } from "lucide-react"
import { useAppStore } from "@/lib/store"

interface Reservation {
  id: string
  platform: "booking" | "airbnb" | "direct"
  property: string
  checkIn: string
  checkOut: string
  status: "confirmed" | "pending" | "cancelled" | "checked-in" | "blocked"
  total: number
  guest: string
  reason?: string
}

export function ReservationsView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [platformFilter, setPlatformFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const { blockedReservations, properties } = useAppStore()

  const reservations: Reservation[] = [
    {
      id: "RES-001",
      platform: "booking",
      property: "APT_401 - Estúdio Moderno",
      checkIn: "05/10/2025",
      checkOut: "08/10/2025",
      status: "confirmed",
      total: 1200,
      guest: "João Silva",
    },
    {
      id: "RES-002",
      platform: "airbnb",
      property: "APT_401 - Estúdio Moderno",
      checkIn: "07/10/2025",
      checkOut: "10/10/2025",
      status: "confirmed",
      total: 1350,
      guest: "Maria Santos",
    },
    {
      id: "RES-003",
      platform: "direct",
      property: "CASA_JD - Casa de Praia",
      checkIn: "26/10/2025",
      checkOut: "30/10/2025",
      status: "pending",
      total: 1600,
      guest: "Pedro Costa",
    },
    {
      id: "RES-004",
      platform: "booking",
      property: "POUS_01 - Pousada Aconchego",
      checkIn: "27/10/2025",
      checkOut: "29/10/2025",
      status: "checked-in",
      total: 800,
      guest: "Ana Oliveira",
    },
    {
      id: "RES-005",
      platform: "airbnb",
      property: "APT_502 - Loft Industrial",
      checkIn: "28/10/2025",
      checkOut: "31/10/2025",
      status: "confirmed",
      total: 1500,
      guest: "Carlos Ferreira",
    },
    {
      id: "RES-006",
      platform: "booking",
      property: "CASA_JD - Casa de Praia",
      checkIn: "20/10/2025",
      checkOut: "22/10/2025",
      status: "cancelled",
      total: 600,
      guest: "Sofia Rodrigues",
    },
    ...blockedReservations.map((blocked) => {
      const property = properties.find((p) => p.id === blocked.propertyId)
      return {
        id: blocked.id,
        platform: blocked.platform,
        property: `${blocked.propertyId} - ${property?.name || "Propriedade"}`,
        checkIn: blocked.checkIn,
        checkOut: blocked.checkOut,
        status: "blocked" as const,
        total: blocked.preventedRevenue,
        guest: blocked.guestName,
        reason: blocked.reason,
      }
    }),
  ]

  const getPlatformBadge = (platform: string) => {
    switch (platform) {
      case "booking":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Booking.com</Badge>
      case "airbnb":
        return <Badge className="bg-pink-500 hover:bg-pink-600">Airbnb</Badge>
      case "direct":
        return <Badge className="bg-emerald-500 hover:bg-emerald-600">Direta</Badge>
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
      case "blocked":
        return (
          <Badge variant="outline" className="border-orange-500 text-orange-500 bg-orange-500/10">
            <ShieldAlert className="w-3 h-3 mr-1" />
            Bloqueada
          </Badge>
        )
      default:
        return <Badge variant="outline">Desconhecido</Badge>
    }
  }

  const filteredReservations = reservations.filter((res) => {
    const matchesSearch =
      res.guest.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.property.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPlatform = platformFilter === "all" || res.platform === platformFilter
    const matchesStatus = statusFilter === "all" || res.status === statusFilter
    return matchesSearch && matchesPlatform && matchesStatus
  })

  const blockedCount = reservations.filter((r) => r.status === "blocked").length
  const preventedRevenue = reservations.filter((r) => r.status === "blocked").reduce((sum, r) => sum + r.total, 0)

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Reservas Centralizadas</h1>
        <p className="text-muted-foreground mt-1">Gerencie todas as suas reservas em um só lugar</p>
      </div>

      {blockedCount > 0 && (
        <Card className="p-4 border-orange-500/50 bg-orange-500/5">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-orange-500/10">
              <ShieldAlert className="w-5 h-5 text-orange-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-orange-500 mb-1">Sistema de Prevenção de Overbooking Ativo</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Nossa plataforma bloqueou automaticamente {blockedCount} tentativa(s) de reserva que causariam
                conflitos, prevenindo R$ {preventedRevenue.toLocaleString("pt-BR")} em possíveis problemas de
                overbooking.
              </p>
              <Button
                size="sm"
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-500/10 bg-transparent"
                onClick={() => setStatusFilter("blocked")}
              >
                Ver Reservas Bloqueadas
              </Button>
            </div>
            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
          </div>
        </Card>
      )}

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por hóspede, ID ou propriedade..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={platformFilter} onValueChange={setPlatformFilter}>
            <SelectTrigger className="w-full lg:w-[180px]">
              <SelectValue placeholder="Plataforma" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas Plataformas</SelectItem>
              <SelectItem value="booking">Booking.com</SelectItem>
              <SelectItem value="airbnb">Airbnb</SelectItem>
              <SelectItem value="direct">Reserva Direta</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full lg:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos Status</SelectItem>
              <SelectItem value="confirmed">Confirmada</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="checked-in">Check-in Feito</SelectItem>
              <SelectItem value="cancelled">Cancelada</SelectItem>
              <SelectItem value="blocked">Bloqueada (Overbooking)</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {/* Reservations Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold text-sm">ID</th>
                <th className="text-left p-4 font-semibold text-sm">Plataforma</th>
                <th className="text-left p-4 font-semibold text-sm">Hóspede</th>
                <th className="text-left p-4 font-semibold text-sm">Propriedade</th>
                <th className="text-left p-4 font-semibold text-sm">Check-in</th>
                <th className="text-left p-4 font-semibold text-sm">Check-out</th>
                <th className="text-left p-4 font-semibold text-sm">Status</th>
                <th className="text-left p-4 font-semibold text-sm">Valor</th>
                <th className="text-left p-4 font-semibold text-sm">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.map((reservation) => (
                <tr
                  key={reservation.id}
                  className={`border-b border-border hover:bg-muted/30 transition-colors ${
                    reservation.status === "blocked" ? "bg-orange-500/5" : ""
                  }`}
                >
                  <td className="p-4 font-mono text-sm">{reservation.id}</td>
                  <td className="p-4">{getPlatformBadge(reservation.platform)}</td>
                  <td className="p-4 font-medium">{reservation.guest}</td>
                  <td className="p-4 text-sm text-muted-foreground">{reservation.property}</td>
                  <td className="p-4 text-sm">{reservation.checkIn}</td>
                  <td className="p-4 text-sm">{reservation.checkOut}</td>
                  <td className="p-4">{getStatusBadge(reservation.status)}</td>
                  <td className="p-4 font-semibold">
                    {reservation.status === "blocked" ? (
                      <span className="text-orange-500">R$ {reservation.total.toLocaleString("pt-BR")}</span>
                    ) : (
                      `R$ ${reservation.total.toLocaleString("pt-BR")}`
                    )}
                  </td>
                  <td className="p-4">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Ver
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredReservations.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            <p>Nenhuma reserva encontrada com os filtros aplicados.</p>
          </div>
        )}
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Total de Reservas</p>
          <p className="text-2xl font-bold">{reservations.filter((r) => r.status !== "blocked").length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Confirmadas</p>
          <p className="text-2xl font-bold text-emerald-500">
            {reservations.filter((r) => r.status === "confirmed").length}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Pendentes</p>
          <p className="text-2xl font-bold text-yellow-500">
            {reservations.filter((r) => r.status === "pending").length}
          </p>
        </Card>
        <Card className="p-4 border-orange-500/30">
          <p className="text-sm text-muted-foreground mb-1">Bloqueadas</p>
          <p className="text-2xl font-bold text-orange-500">{blockedCount}</p>
          <p className="text-xs text-muted-foreground mt-1">Overbooking evitado</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Receita Total</p>
          <p className="text-2xl font-bold">
            R${" "}
            {reservations
              .filter((r) => r.status !== "blocked")
              .reduce((sum, r) => sum + r.total, 0)
              .toLocaleString("pt-BR")}
          </p>
        </Card>
      </div>
    </div>
  )
}
