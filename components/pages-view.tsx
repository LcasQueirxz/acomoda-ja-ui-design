"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Eye, Edit, Trash2, Globe } from "lucide-react"

export function PagesView() {
  const pages = [
    {
      id: 1,
      title: "APT_401 - Estúdio Moderno Centro SP",
      url: "acomodaja.com.br/apt-401",
      status: "published",
      views: 1243,
      bookings: 8,
    },
    {
      id: 2,
      title: "CASA_JD - Casa de Praia Exclusiva",
      url: "acomodaja.com.br/casa-jd",
      status: "published",
      views: 892,
      bookings: 5,
    },
    {
      id: 3,
      title: "POUS_01 - Pousada Boutique Serra",
      url: "acomodaja.com.br/pous-01",
      status: "draft",
      views: 0,
      bookings: 0,
    },
  ]

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Páginas</h1>
          <p className="text-muted-foreground mt-1">Gestão de conteúdo para reservas diretas</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Novo Anúncio Direto
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Total de Páginas</p>
          <p className="text-3xl font-bold">{pages.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Visualizações Totais</p>
          <p className="text-3xl font-bold">{pages.reduce((sum, p) => sum + p.views, 0).toLocaleString()}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Reservas Diretas</p>
          <p className="text-3xl font-bold text-emerald-500">{pages.reduce((sum, p) => sum + p.bookings, 0)}</p>
        </Card>
      </div>

      {/* Pages List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr className="text-left">
                <th className="p-4 text-sm font-semibold">Título</th>
                <th className="p-4 text-sm font-semibold">URL</th>
                <th className="p-4 text-sm font-semibold">Status</th>
                <th className="p-4 text-sm font-semibold">Visualizações</th>
                <th className="p-4 text-sm font-semibold">Reservas</th>
                <th className="p-4 text-sm font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => (
                <tr
                  key={page.id}
                  className="border-b border-border last:border-b-0 hover:bg-accent/50 transition-colors"
                >
                  <td className="p-4">
                    <p className="font-medium text-sm">{page.title}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Globe className="w-4 h-4" />
                      <span className="text-xs">{page.url}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant={page.status === "published" ? "default" : "secondary"}>
                      {page.status === "published" ? "Publicado" : "Rascunho"}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{page.views.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-medium">{page.bookings}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4 text-red-500" />
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
