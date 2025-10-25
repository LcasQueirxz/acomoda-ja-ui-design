"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAppStore } from "@/lib/store"
import { useState } from "react"
import { Star, MapPin, Phone } from "lucide-react"

interface ServiceScheduleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  serviceType: "cleaning" | "maintenance" | null
}

export function ServiceScheduleDialog({ open, onOpenChange, serviceType }: ServiceScheduleDialogProps) {
  const { properties } = useAppStore()
  const [selectedProperty, setSelectedProperty] = useState("")

  const serviceProviders = {
    cleaning: [
      {
        id: 1,
        name: "CleanPro Salvador",
        city: "Salvador",
        state: "BA",
        rating: 4.8,
        reviews: 127,
        phone: "(71) 3456-7890",
      },
      {
        id: 2,
        name: "Limpeza Express",
        city: "Salvador",
        state: "BA",
        rating: 4.6,
        reviews: 89,
        phone: "(71) 3234-5678",
      },
      {
        id: 3,
        name: "Casa Limpa Serviços",
        city: "São Paulo",
        state: "SP",
        rating: 4.9,
        reviews: 203,
        phone: "(11) 3456-7890",
      },
      {
        id: 4,
        name: "Higieniza Mais",
        city: "Rio de Janeiro",
        state: "RJ",
        rating: 4.7,
        reviews: 156,
        phone: "(21) 3456-7890",
      },
    ],
    maintenance: [
      {
        id: 1,
        name: "Manutenção Total BA",
        city: "Salvador",
        state: "BA",
        rating: 4.7,
        reviews: 94,
        phone: "(71) 3567-8901",
      },
      {
        id: 2,
        name: "Reparo Rápido",
        city: "Salvador",
        state: "BA",
        rating: 4.5,
        reviews: 67,
        phone: "(71) 3345-6789",
      },
      { id: 3, name: "Fix It SP", city: "São Paulo", state: "SP", rating: 4.8, reviews: 178, phone: "(11) 3567-8901" },
      {
        id: 4,
        name: "Conserta Tudo RJ",
        city: "Rio de Janeiro",
        state: "RJ",
        rating: 4.6,
        reviews: 134,
        phone: "(21) 3567-8901",
      },
    ],
  }

  const selectedPropertyData = properties.find((p) => p.id === selectedProperty)
  const filteredProviders =
    serviceType && selectedPropertyData
      ? serviceProviders[serviceType].filter((p) => p.city === selectedPropertyData.city)
      : []

  const handleSchedule = (provider: any) => {
    alert(
      `Agendamento solicitado!\n\nServiço: ${serviceType === "cleaning" ? "Limpeza" : "Manutenção"}\nPrestador: ${provider.name}\nPropriedade: ${selectedPropertyData?.name}\n\nO prestador entrará em contato em breve.`,
    )
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Agendar {serviceType === "cleaning" ? "Limpeza" : "Manutenção"}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">Encontre prestadores de serviço na região da sua propriedade</p>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Selecione a Propriedade</label>
            <Select value={selectedProperty} onValueChange={setSelectedProperty}>
              <SelectTrigger>
                <SelectValue placeholder="Escolha uma propriedade" />
              </SelectTrigger>
              <SelectContent>
                {properties.map((property) => (
                  <SelectItem key={property.id} value={property.id}>
                    {property.name} - {property.city}/{property.state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedProperty && filteredProviders.length > 0 ? (
            <div className="space-y-3">
              <p className="text-sm font-medium">
                Prestadores disponíveis em {selectedPropertyData?.city}/{selectedPropertyData?.state}
              </p>
              {filteredProviders.map((provider) => (
                <Card key={provider.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{provider.name}</h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>
                            {provider.city}/{provider.state}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          <span>{provider.phone}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                          <span className="font-semibold">{provider.rating}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">({provider.reviews} avaliações)</span>
                      </div>
                    </div>
                    <Button size="sm" onClick={() => handleSchedule(provider)}>
                      Agendar
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : selectedProperty && filteredProviders.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <p>
                Nenhum prestador encontrado em {selectedPropertyData?.city}/{selectedPropertyData?.state}
              </p>
              <p className="text-sm mt-2">Estamos expandindo nossa rede de parceiros para esta região.</p>
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              <p>Selecione uma propriedade para ver os prestadores disponíveis</p>
            </div>
          )}
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
