"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, TrendingDown, TrendingUp, CreditCard, Smartphone } from "lucide-react"

export function PaymentsAnalysisView() {
  const platformCosts = [
    {
      platform: "Booking.com",
      revenue: 22500,
      commission: 3375,
      commissionRate: 15,
      net: 19125,
      color: "bg-blue-500",
    },
    {
      platform: "Airbnb",
      revenue: 18300,
      commission: 2562,
      commissionRate: 14,
      net: 15738,
      color: "bg-pink-500",
    },
    {
      platform: "Reserva Direta (PIX)",
      revenue: 5000,
      commission: 0,
      commissionRate: 0,
      net: 5000,
      color: "bg-emerald-500",
    },
  ]

  const payments = [
    {
      id: 1,
      date: "20/10/2025",
      guest: "Maria Santos",
      amount: 1250,
      method: "PIX",
      status: "Liquidado",
      platform: "Direto",
    },
    {
      id: 2,
      date: "19/10/2025",
      guest: "João Silva",
      amount: 980,
      method: "Cartão",
      status: "Liquidado",
      platform: "Booking.com",
    },
    {
      id: 3,
      date: "18/10/2025",
      guest: "Pedro Costa",
      amount: 1520,
      method: "PIX",
      status: "Liquidado",
      platform: "Direto",
    },
    {
      id: 4,
      date: "17/10/2025",
      guest: "Ana Oliveira",
      amount: 760,
      method: "Cartão",
      status: "Pendente",
      platform: "Airbnb",
    },
    {
      id: 5,
      date: "16/10/2025",
      guest: "Carlos Ferreira",
      amount: 1130,
      method: "Boleto",
      status: "Liquidado",
      platform: "Direto",
    },
  ]

  const totalRevenue = platformCosts.reduce((sum, p) => sum + p.revenue, 0)
  const totalCommission = platformCosts.reduce((sum, p) => sum + p.commission, 0)
  const totalNet = platformCosts.reduce((sum, p) => sum + p.net, 0)

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Análise de Pagamentos</h1>
        <p className="text-muted-foreground mt-1">Fluxo financeiro e custo de transação</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">R$ {totalRevenue.toLocaleString("pt-BR")}</p>
              <p className="text-xs text-muted-foreground">Receita Bruta</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">R$ {totalCommission.toLocaleString("pt-BR")}</p>
              <p className="text-xs text-muted-foreground">Comissões Pagas</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">R$ {totalNet.toLocaleString("pt-BR")}</p>
              <p className="text-xs text-muted-foreground">Receita Líquida</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Platform Cost Comparison */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Comparativo de Taxas por Plataforma</h2>
        <div className="space-y-6">
          {platformCosts.map((platform) => (
            <div key={platform.platform} className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">{platform.platform}</span>
                <Badge
                  variant="outline"
                  className={
                    platform.commissionRate === 0
                      ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                      : "bg-red-500/10 text-red-500 border-red-500/20"
                  }
                >
                  {platform.commissionRate}% comissão
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs mb-1">Receita Bruta</p>
                  <p className="font-semibold">R$ {platform.revenue.toLocaleString("pt-BR")}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs mb-1">Comissão</p>
                  <p className="font-semibold text-red-500">- R$ {platform.commission.toLocaleString("pt-BR")}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs mb-1">Receita Líquida</p>
                  <p className="font-semibold text-emerald-500">R$ {platform.net.toLocaleString("pt-BR")}</p>
                </div>
              </div>

              <div className="w-full bg-muted rounded-full h-3 overflow-hidden flex">
                <div
                  className={`${platform.color} transition-all`}
                  style={{ width: `${(platform.net / platform.revenue) * 100}%` }}
                  title="Receita Líquida"
                />
                <div
                  className="bg-red-500/50 transition-all"
                  style={{ width: `${(platform.commission / platform.revenue) * 100}%` }}
                  title="Comissão"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
          <p className="text-sm font-semibold text-emerald-500 mb-1">Vantagem do PIX/Reserva Direta</p>
          <p className="text-xs text-muted-foreground">
            Economize até R$ {totalCommission.toLocaleString("pt-BR")} em comissões incentivando reservas diretas com
            pagamento em PIX
          </p>
        </div>
      </Card>

      {/* Payments Table */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Detalhamento de Pagamentos</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-semibold">Data</th>
                <th className="text-left py-3 px-4 text-sm font-semibold">Hóspede</th>
                <th className="text-left py-3 px-4 text-sm font-semibold">Plataforma</th>
                <th className="text-center py-3 px-4 text-sm font-semibold">Método</th>
                <th className="text-right py-3 px-4 text-sm font-semibold">Valor</th>
                <th className="text-center py-3 px-4 text-sm font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                  <td className="py-4 px-4 text-sm">{payment.date}</td>
                  <td className="py-4 px-4 font-medium">{payment.guest}</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{payment.platform}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      {payment.method === "PIX" ? (
                        <Smartphone className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <CreditCard className="w-4 h-4 text-blue-500" />
                      )}
                      <span className="text-sm">{payment.method}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right font-semibold">R$ {payment.amount.toLocaleString("pt-BR")}</td>
                  <td className="py-4 px-4 text-center">
                    <Badge
                      variant="outline"
                      className={
                        payment.status === "Liquidado"
                          ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                      }
                    >
                      {payment.status}
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
