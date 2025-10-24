"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Download, DollarSign, TrendingUp, CreditCard } from "lucide-react"

export function SalesView() {
  const transactions = [
    {
      id: 1,
      date: "2025-10-23",
      description: "Reserva #1234 - APT_401",
      amount: 1200,
      method: "PIX",
      status: "received",
    },
    {
      id: 2,
      date: "2025-10-22",
      description: "Reserva #1233 - CASA_JD",
      amount: 2400,
      method: "Cartão",
      status: "received",
    },
    {
      id: 3,
      date: "2025-10-22",
      description: "Reserva #1232 - POUS_01",
      amount: 1800,
      method: "Boleto",
      status: "pending",
    },
    {
      id: 4,
      date: "2025-10-21",
      description: "Reserva #1231 - EST_MOD",
      amount: 950,
      method: "PIX",
      status: "received",
    },
    {
      id: 5,
      date: "2025-10-21",
      description: "Reserva #1230 - CASA_PR",
      amount: 3200,
      method: "Cartão",
      status: "received",
    },
    {
      id: 6,
      date: "2025-10-20",
      description: "Reserva #1229 - APT_LUX",
      amount: 1650,
      method: "PIX",
      status: "received",
    },
    {
      id: 7,
      date: "2025-10-20",
      description: "Reserva #1228 - APT_401",
      amount: 1100,
      method: "Boleto",
      status: "pending",
    },
    {
      id: 8,
      date: "2025-10-19",
      description: "Reserva #1227 - CASA_JD",
      amount: 2800,
      method: "Cartão",
      status: "received",
    },
  ]

  const totalReceived = transactions.filter((t) => t.status === "received").reduce((sum, t) => sum + t.amount, 0)
  const totalPending = transactions.filter((t) => t.status === "pending").reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Vendas</h1>
          <p className="text-muted-foreground mt-1">Gestão financeira e faturamento</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Exportar Relatório
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-emerald-500" />
            </div>
            <p className="text-sm text-muted-foreground">Total Recebido</p>
          </div>
          <p className="text-3xl font-bold">R$ {totalReceived.toLocaleString("pt-BR")}</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-amber-500" />
            </div>
            <p className="text-sm text-muted-foreground">A Receber (30 dias)</p>
          </div>
          <p className="text-3xl font-bold">R$ {totalPending.toLocaleString("pt-BR")}</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-sm text-muted-foreground">Total de Transações</p>
          </div>
          <p className="text-3xl font-bold">{transactions.length}</p>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Buscar transações..." className="pl-9" />
      </div>

      {/* Transactions Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr className="text-left">
                <th className="p-4 text-sm font-semibold">Data</th>
                <th className="p-4 text-sm font-semibold">Descrição</th>
                <th className="p-4 text-sm font-semibold">Valor</th>
                <th className="p-4 text-sm font-semibold">Meio de Pagamento</th>
                <th className="p-4 text-sm font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b border-border last:border-b-0 hover:bg-accent/50 transition-colors"
                >
                  <td className="p-4">
                    <span className="text-sm">
                      {new Date(transaction.date).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-medium">{transaction.description}</p>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-semibold">R$ {transaction.amount.toLocaleString("pt-BR")}</span>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline">{transaction.method}</Badge>
                  </td>
                  <td className="p-4">
                    <Badge variant={transaction.status === "received" ? "default" : "secondary"}>
                      {transaction.status === "received" ? "Recebido" : "Pendente"}
                    </Badge>
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
