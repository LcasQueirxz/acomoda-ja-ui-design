"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useAppStore, type Service } from "@/lib/store"
import { Wrench, Sparkles, Search, MapPin } from "lucide-react"

interface NewServiceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedCell?: { room: string; day: number } | null
}

export function NewServiceDialog({ open, onOpenChange, selectedCell }: NewServiceDialogProps) {
  const { properties, addService } = useAppStore()

  const [serviceType, setServiceType] = useState<"cleaning" | "maintenance" | "inspection">("cleaning")
  const [propertyId, setPropertyId] = useState("")
  const [day, setDay] = useState("")
  const [provider, setProvider] = useState("")
  const [cost, setCost] = useState("")
  const [notes, setNotes] = useState("")

  // Local service providers based on property city
  const getLocalProviders = (city: string, type: string) => {
    const providers: Record<string, Record<string, string[]>> = {
      "São Paulo": {
        cleaning: ["CleanPro SP", "Limpeza Express", "SP Clean Services"],
        maintenance: ["Manutenção Total SP", "Fix It SP", "Reparo Rápido"],
        inspection: ["Vistoria SP", "Inspeção Premium", "Check SP"],
      },
      Salvador: {
        cleaning: ["Limpeza Bahia", "Clean BA", "Salvador Limpo"],
        maintenance: ["Manutenção Express BA", "Consertos Salvador", "Fix BA"],
        inspection: ["Vistoria Bahia", "Inspeção BA", "Check Salvador"],
      },
      Gramado: {
        cleaning: ["Limpeza Serra", "Clean Gramado", "Gramado Limpo"],
        maintenance: ["Manutenção Serra Gaúcha", "Fix Gramado", "Reparo RS"],
        inspection: ["Vistoria Gramado", "Inspeção RS", "Check Serra"],
      },
    }

    return providers[city]?.[type] || ["Prestador Local", "Serviço Profissional", "Empresa Especializada"]
  }

  useEffect(() => {
    if (selectedCell) {
      setPropertyId(selectedCell.room)
      setDay(selectedCell.day.toString())
    }
  }, [selectedCell])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const property = properties.find((p) => p.id === propertyId)
    if (!property) return

    const newService: Service = {
      id: `SRV-${Date.now()}`,
      type: serviceType,
      propertyId,
      date: `${day}/10/2025`,
      day: Number.parseInt(day),
      status: "scheduled",
      provider,
      cost: Number.parseFloat(cost),
      notes,
    }

    addService(newService)
    onOpenChange(false)
    resetForm()
  }

  const resetForm = () => {
    setServiceType("cleaning")
    setPropertyId("")
    setDay("")
    setProvider("")
    setCost("")
    setNotes("")
  }

  const selectedProperty = properties.find((p) => p.id === propertyId)
  const localProviders = selectedProperty ? getLocalProviders(selectedProperty.city, serviceType) : []

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wrench className="w-5 h-5 text-primary" />
            Agendar Serviço
          </DialogTitle>
          <DialogDescription>
            Agende limpeza, manutenção ou inspeção para suas propriedades com prestadores locais
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="serviceType">Tipo de Serviço</Label>
              <Select value={serviceType} onValueChange={(value: any) => setServiceType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cleaning">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-500" />
                      Limpeza
                    </div>
                  </SelectItem>
                  <SelectItem value="maintenance">
                    <div className="flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-orange-500" />
                      Manutenção
                    </div>
                  </SelectItem>
                  <SelectItem value="inspection">
                    <div className="flex items-center gap-2">
                      <Search className="w-4 h-4 text-cyan-500" />
                      Inspeção
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="property">Propriedade</Label>
              <Select value={propertyId} onValueChange={setPropertyId} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a propriedade" />
                </SelectTrigger>
                <SelectContent>
                  {properties.map((property) => (
                    <SelectItem key={property.id} value={property.id}>
                      {property.id} - {property.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedProperty && (
            <div className="p-3 bg-muted rounded-lg flex items-start gap-2 text-sm">
              <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">{selectedProperty.name}</p>
                <p className="text-muted-foreground">
                  {selectedProperty.address}, {selectedProperty.city} - {selectedProperty.state}
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="day">Dia do Mês</Label>
              <Input
                id="day"
                type="number"
                min="1"
                max="31"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                placeholder="Ex: 15"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cost">Custo (R$)</Label>
              <Input
                id="cost"
                type="number"
                step="0.01"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                placeholder="Ex: 150.00"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="provider">Prestador de Serviço</Label>
            {localProviders.length > 0 && (
              <div className="mb-2 p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-xs text-muted-foreground mb-2">Prestadores locais em {selectedProperty?.city}:</p>
                <div className="flex flex-wrap gap-2">
                  {localProviders.map((prov) => (
                    <Button
                      key={prov}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setProvider(prov)}
                      className="text-xs"
                    >
                      {prov}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            <Input
              id="provider"
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              placeholder="Nome do prestador de serviço"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Detalhes adicionais sobre o serviço..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Agendar Serviço</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
