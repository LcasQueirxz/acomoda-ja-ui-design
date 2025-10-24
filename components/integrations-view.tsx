"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Settings, CheckCircle2, AlertCircle, Plus, ExternalLink } from "lucide-react"

export function IntegrationsView() {
  const integrations = [
    {
      id: 1,
      name: "Booking.com",
      logo: "B",
      status: "active",
      lastSync: "2 minutos atrás",
      properties: 6,
      color: "blue",
    },
    {
      id: 2,
      name: "Airbnb",
      logo: "A",
      status: "active",
      lastSync: "5 minutos atrás",
      properties: 5,
      color: "pink",
    },
    {
      id: 3,
      name: "Expedia",
      logo: "E",
      status: "inactive",
      lastSync: "Nunca",
      properties: 0,
      color: "yellow",
    },
  ]

  const syncLogs = [
    { id: 1, integration: "Booking.com", action: "Sincronização completa", status: "success", time: "2 min atrás" },
    { id: 2, integration: "Airbnb", action: "Sincronização completa", status: "success", time: "5 min atrás" },
    { id: 3, integration: "Booking.com", action: "Nova reserva importada", status: "success", time: "15 min atrás" },
    { id: 4, integration: "Airbnb", action: "Atualização de preços", status: "success", time: "1 hora atrás" },
    { id: 5, integration: "Booking.com", action: "Erro na sincronização", status: "error", time: "2 horas atrás" },
  ]

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Integrações</h1>
          <p className="text-muted-foreground mt-1">Configuração de OTAs e APIs</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Integração
        </Button>
      </div>

      {/* Integration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <Card key={integration.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl ${
                  integration.color === "blue"
                    ? "bg-blue-500"
                    : integration.color === "pink"
                      ? "bg-pink-500"
                      : "bg-yellow-500"
                }`}
              >
                {integration.logo}
              </div>
              <Badge variant={integration.status === "active" ? "default" : "secondary"}>
                {integration.status === "active" ? (
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                ) : (
                  <AlertCircle className="w-3 h-3 mr-1" />
                )}
                {integration.status === "active" ? "Ativo" : "Inativo"}
              </Badge>
            </div>

            <h3 className="text-lg font-semibold mb-2">{integration.name}</h3>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Última Sincronização</span>
                <span className="font-medium">{integration.lastSync}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Propriedades Conectadas</span>
                <span className="font-medium">{integration.properties}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                <Settings className="w-4 h-4 mr-2" />
                Configurar
              </Button>
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                <ExternalLink className="w-4 h-4 mr-2" />
                API Key
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Sync Logs */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Log de Sincronização</h2>

        <div className="space-y-3">
          {syncLogs.map((log) => (
            <div
              key={log.id}
              className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
            >
              <div
                className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${log.status === "success" ? "bg-emerald-500" : "bg-red-500"}`}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="font-medium text-sm">{log.integration}</p>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{log.time}</span>
                </div>
                <p className="text-xs text-muted-foreground">{log.action}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
