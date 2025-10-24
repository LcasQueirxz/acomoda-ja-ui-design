"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Upload, Download, Eye } from "lucide-react"

export function DeclarationView() {
  const documents = [
    {
      id: 1,
      name: "Contrato de Anfitrião - AcomodaJá",
      type: "Contrato",
      date: "2025-01-15",
      status: "active",
    },
    {
      id: 2,
      name: "Termos de Uso do Serviço",
      type: "Termos",
      date: "2025-01-15",
      status: "active",
    },
    {
      id: 3,
      name: "Política de Privacidade",
      type: "Política",
      date: "2025-01-15",
      status: "active",
    },
    {
      id: 4,
      name: "Declaração de Imposto de Renda 2024",
      type: "Fiscal",
      date: "2025-03-20",
      status: "pending",
    },
  ]

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Declaração</h1>
          <p className="text-muted-foreground mt-1">Documentos fiscais e jurídicos</p>
        </div>
        <Button>
          <Upload className="w-4 h-4 mr-2" />
          Enviar Documento
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Total de Documentos</p>
          <p className="text-3xl font-bold">{documents.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Documentos Ativos</p>
          <p className="text-3xl font-bold text-emerald-500">{documents.filter((d) => d.status === "active").length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Pendentes</p>
          <p className="text-3xl font-bold text-amber-500">{documents.filter((d) => d.status === "pending").length}</p>
        </Card>
      </div>

      {/* Documents List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr className="text-left">
                <th className="p-4 text-sm font-semibold">Nome do Documento</th>
                <th className="p-4 text-sm font-semibold">Tipo</th>
                <th className="p-4 text-sm font-semibold">Data</th>
                <th className="p-4 text-sm font-semibold">Status</th>
                <th className="p-4 text-sm font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((document) => (
                <tr
                  key={document.id}
                  className="border-b border-border last:border-b-0 hover:bg-accent/50 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <p className="font-medium text-sm">{document.name}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline">{document.type}</Badge>
                  </td>
                  <td className="p-4">
                    <span className="text-sm">
                      {new Date(document.date).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </td>
                  <td className="p-4">
                    <Badge variant={document.status === "active" ? "default" : "secondary"}>
                      {document.status === "active" ? "Ativo" : "Pendente"}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
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
