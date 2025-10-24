"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Calendar, DollarSign } from "lucide-react"

export function DownloadsView() {
  const reports = [
    {
      id: 1,
      name: "Relatório de Ocupação - Outubro 2025",
      type: "Ocupação",
      date: "2025-10-23",
      size: "2.4 MB",
      format: "PDF",
    },
    {
      id: 2,
      name: "Faturamento Mensal - Setembro 2025",
      type: "Financeiro",
      date: "2025-10-01",
      size: "1.8 MB",
      format: "XLSX",
    },
    {
      id: 3,
      name: "Relatório Anual de Ocupação - 2024",
      type: "Ocupação",
      date: "2025-01-15",
      size: "5.2 MB",
      format: "PDF",
    },
    {
      id: 4,
      name: "Transações - Q3 2025",
      type: "Financeiro",
      date: "2025-10-05",
      size: "3.1 MB",
      format: "CSV",
    },
  ]

  const getTypeIcon = (type: string) => {
    if (type === "Ocupação") return <Calendar className="w-5 h-5 text-blue-500" />
    return <DollarSign className="w-5 h-5 text-emerald-500" />
  }

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Downloads</h1>
          <p className="text-muted-foreground mt-1">Exportação e gerenciamento de relatórios</p>
        </div>
        <Button>
          <FileText className="w-4 h-4 mr-2" />
          Gerar Novo Relatório
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Total de Relatórios</p>
          <p className="text-3xl font-bold">{reports.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Espaço Utilizado</p>
          <p className="text-3xl font-bold">12.5 MB</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Último Download</p>
          <p className="text-3xl font-bold">Hoje</p>
        </Card>
      </div>

      {/* Reports List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr className="text-left">
                <th className="p-4 text-sm font-semibold">Nome do Arquivo</th>
                <th className="p-4 text-sm font-semibold">Tipo</th>
                <th className="p-4 text-sm font-semibold">Data de Criação</th>
                <th className="p-4 text-sm font-semibold">Tamanho</th>
                <th className="p-4 text-sm font-semibold">Formato</th>
                <th className="p-4 text-sm font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr
                  key={report.id}
                  className="border-b border-border last:border-b-0 hover:bg-accent/50 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <p className="font-medium text-sm">{report.name}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">{getTypeIcon(report.type)}</div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm">
                      {new Date(report.date).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm">{report.size}</span>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline">{report.format}</Badge>
                  </td>
                  <td className="p-4">
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
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
