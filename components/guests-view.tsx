"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Mail, Phone, Calendar, Download } from "lucide-react"

interface Guest {
  id: string
  name: string
  email: string
  phone: string
  lastStay: string
  platform: "booking" | "airbnb" | "direct"
  totalStays: number
  totalSpent: number
}

export function GuestsView() {
  const [searchQuery, setSearchQuery] = useState("")

  const guests: Guest[] = [
    {
      id: "GST-001",
      name: "João Silva",
      email: "joao.silva@email.com",
      phone: "+55 51 99999-1111",
      lastStay: "24/10/2025",
      platform: "booking",
      totalStays: 3,
      totalSpent: 3600,
    },
    {
      id: "GST-002",
      name: "Maria Santos",
      email: "maria.santos@email.com",
      phone: "+55 51 99999-2222",
      lastStay: "25/10/2025",
      platform: "airbnb",
      totalStays: 5,
      totalSpent: 6750,
    },
    {
      id: "GST-003",
      name: "Pedro Costa",
      email: "pedro.costa@email.com",
      phone: "+55 51 99999-3333",
      lastStay: "26/10/2025",
      platform: "direct",
      totalStays: 2,
      totalSpent: 3200,
    },
    {
      id: "GST-004",
      name: "Ana Oliveira",
      email: "ana.oliveira@email.com",
      phone: "+55 51 99999-4444",
      lastStay: "27/10/2025",
      platform: "booking",
      totalStays: 1,
      totalSpent: 800,
    },
    {
      id: "GST-005",
      name: "Carlos Ferreira",
      email: "carlos.ferreira@email.com",
      phone: "+55 51 99999-5555",
      lastStay: "28/10/2025",
      platform: "airbnb",
      totalStays: 4,
      totalSpent: 6000,
    },
    {
      id: "GST-006",
      name: "Sofia Rodrigues",
      email: "sofia.rodrigues@email.com",
      phone: "+55 51 99999-6666",
      lastStay: "20/10/2025",
      platform: "booking",
      totalStays: 2,
      totalSpent: 1200,
    },
    {
      id: "GST-007",
      name: "Miguel Alves",
      email: "miguel.alves@email.com",
      phone: "+55 51 99999-7777",
      lastStay: "15/10/2025",
      platform: "direct",
      totalStays: 6,
      totalSpent: 9600,
    },
    {
      id: "GST-008",
      name: "Beatriz Lima",
      email: "beatriz.lima@email.com",
      phone: "+55 51 99999-8888",
      lastStay: "10/10/2025",
      platform: "airbnb",
      totalStays: 3,
      totalSpent: 5100,
    },
  ]

  const getPlatformBadge = (platform: string) => {
    switch (platform) {
      case "booking":
        return <Badge className="bg-blue-500 hover:bg-blue-600 text-xs">Booking</Badge>
      case "airbnb":
        return <Badge className="bg-pink-500 hover:bg-pink-600 text-xs">Airbnb</Badge>
      case "direct":
        return <Badge className="bg-emerald-500 hover:bg-emerald-600 text-xs">Direta</Badge>
      default:
        return <Badge className="text-xs">Desconhecida</Badge>
    }
  }

  const filteredGuests = guests.filter(
    (guest) =>
      guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.phone.includes(searchQuery),
  )

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Hóspedes</h1>
        <p className="text-muted-foreground mt-1">CRM de clientes para campanhas e retenção</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Total de Hóspedes</p>
          <p className="text-3xl font-bold">{guests.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Estadias Totais</p>
          <p className="text-3xl font-bold">{guests.reduce((sum, g) => sum + g.totalStays, 0)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Receita Total</p>
          <p className="text-3xl font-bold">
            R$ {guests.reduce((sum, g) => sum + g.totalSpent, 0).toLocaleString("pt-BR")}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Ticket Médio</p>
          <p className="text-3xl font-bold">
            R${" "}
            {Math.round(
              guests.reduce((sum, g) => sum + g.totalSpent, 0) / guests.reduce((sum, g) => sum + g.totalStays, 0),
            ).toLocaleString("pt-BR")}
          </p>
        </Card>
      </div>

      {/* Search and Actions */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, email ou telefone..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar Lista
          </Button>
        </div>
      </Card>

      {/* Guests Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold text-sm">Nome</th>
                <th className="text-left p-4 font-semibold text-sm">Email</th>
                <th className="text-left p-4 font-semibold text-sm">Telefone</th>
                <th className="text-left p-4 font-semibold text-sm">Última Estadia</th>
                <th className="text-left p-4 font-semibold text-sm">Plataforma</th>
                <th className="text-left p-4 font-semibold text-sm">Total Estadias</th>
                <th className="text-left p-4 font-semibold text-sm">Total Gasto</th>
                <th className="text-left p-4 font-semibold text-sm">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredGuests.map((guest) => (
                <tr key={guest.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{guest.name}</p>
                      <p className="text-xs text-muted-foreground">{guest.id}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      {guest.email}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      {guest.phone}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      {guest.lastStay}
                    </div>
                  </td>
                  <td className="p-4">{getPlatformBadge(guest.platform)}</td>
                  <td className="p-4 text-center font-semibold">{guest.totalStays}</td>
                  <td className="p-4 font-semibold">R$ {guest.totalSpent.toLocaleString("pt-BR")}</td>
                  <td className="p-4">
                    <Button variant="ghost" size="sm">
                      Ver Perfil
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredGuests.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            <p>Nenhum hóspede encontrado com os critérios de busca.</p>
          </div>
        )}
      </Card>
    </div>
  )
}
