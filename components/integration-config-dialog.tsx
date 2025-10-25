"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { CheckCircle2, Copy } from "lucide-react"

interface IntegrationConfigDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  integration: any
}

export function IntegrationConfigDialog({ open, onOpenChange, integration }: IntegrationConfigDialogProps) {
  const [apiKey, setApiKey] = useState("")
  const [webhookUrl, setWebhookUrl] = useState("")

  useEffect(() => {
    if (integration) {
      setApiKey(integration.apiKey || "")
      setWebhookUrl(`https://acomodaja.com/webhook/${integration.name.toLowerCase().replace(/\./g, "")}`)
    }
  }, [integration])

  if (!integration) return null

  const handleSave = () => {
    alert(`Configurações salvas para ${integration.name}!`)
    onOpenChange(false)
  }

  const handleCopyWebhook = () => {
    navigator.clipboard.writeText(webhookUrl)
    alert("URL do webhook copiada!")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold ${
                integration.color === "blue"
                  ? "bg-blue-500"
                  : integration.color === "pink"
                    ? "bg-pink-500"
                    : "bg-yellow-500"
              }`}
            >
              {integration.logo}
            </div>
            Configurar {integration.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <p className="text-sm font-medium">Status da Integração</p>
              <p className="text-xs text-muted-foreground">Última sincronização: {integration.lastSync}</p>
            </div>
            <Badge variant={integration.status === "active" ? "default" : "secondary"}>
              {integration.status === "active" ? (
                <>
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Ativo
                </>
              ) : (
                "Inativo"
              )}
            </Badge>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key *</Label>
              <Input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Cole sua API Key aqui"
              />
              <p className="text-xs text-muted-foreground">
                Obtenha sua API Key no painel de desenvolvedor do {integration.name}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="webhookUrl">URL do Webhook</Label>
              <div className="flex gap-2">
                <Input id="webhookUrl" value={webhookUrl} readOnly className="flex-1" />
                <Button variant="outline" size="icon" onClick={handleCopyWebhook}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Configure esta URL no painel do {integration.name} para receber notificações em tempo real
              </p>
            </div>

            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-sm font-medium mb-2">Propriedades Conectadas</p>
              <p className="text-2xl font-bold text-blue-500">{integration.properties}</p>
              <p className="text-xs text-muted-foreground mt-1">Propriedades sincronizadas com {integration.name}</p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Salvar Configurações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
