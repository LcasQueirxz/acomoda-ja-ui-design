"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

interface NewIntegrationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewIntegrationDialog({ open, onOpenChange }: NewIntegrationDialogProps) {
  const availableIntegrations = [
    { id: 1, name: "Booking.com", logo: "B", color: "blue", status: "available" },
    { id: 2, name: "Airbnb", logo: "A", color: "pink", status: "available" },
    { id: 3, name: "Expedia", logo: "E", color: "yellow", status: "available" },
    { id: 4, name: "VRBO", logo: "V", color: "purple", status: "coming-soon" },
    { id: 5, name: "TripAdvisor", logo: "T", color: "green", status: "coming-soon" },
    { id: 6, name: "Decolar", logo: "D", color: "orange", status: "coming-soon" },
  ]

  const handleConnect = (integration: any) => {
    if (integration.status === "coming-soon") {
      alert(`${integration.name} estará disponível em breve!`)
    } else {
      alert(`Iniciando configuração de ${integration.name}...`)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Adicionar Nova Integração</DialogTitle>
          <p className="text-sm text-muted-foreground">Conecte sua conta com as principais plataformas de reservas</p>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableIntegrations.map((integration) => (
            <Card
              key={integration.id}
              className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleConnect(integration)}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl ${
                    integration.color === "blue"
                      ? "bg-blue-500"
                      : integration.color === "pink"
                        ? "bg-pink-500"
                        : integration.color === "yellow"
                          ? "bg-yellow-500"
                          : integration.color === "purple"
                            ? "bg-purple-500"
                            : integration.color === "green"
                              ? "bg-green-500"
                              : "bg-orange-500"
                  }`}
                >
                  {integration.logo}
                </div>
                {integration.status === "coming-soon" && (
                  <Badge variant="secondary" className="text-xs">
                    Em Breve
                  </Badge>
                )}
              </div>

              <h3 className="font-semibold mb-2">{integration.name}</h3>
              <p className="text-xs text-muted-foreground mb-3">
                {integration.status === "available"
                  ? "Conecte sua conta e sincronize suas reservas"
                  : "Integração em desenvolvimento"}
              </p>

              <Button
                variant={integration.status === "available" ? "default" : "outline"}
                size="sm"
                className="w-full"
                disabled={integration.status === "coming-soon"}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                {integration.status === "available" ? "Conectar" : "Em Breve"}
              </Button>
            </Card>
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
