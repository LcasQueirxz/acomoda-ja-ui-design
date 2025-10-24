"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Clock, AlertCircle, Calendar, Sparkles, Home } from "lucide-react"

export function WorkflowsAnalysisView() {
  const workflows = [
    {
      id: 1,
      property: "APT_401 - Estúdio Moderno",
      guest: "Maria Santos",
      checkIn: "24/10",
      checkOut: "27/10",
      tasks: [
        { name: "Limpeza", status: "done", assignee: "Equipe A" },
        { name: "Manutenção", status: "done", assignee: "João M." },
        { name: "Check-in", status: "pending", assignee: "Recepção" },
      ],
    },
    {
      id: 2,
      property: "CASA_JD - Casa de Praia",
      guest: "João Silva",
      checkIn: "25/10",
      checkOut: "28/10",
      tasks: [
        { name: "Limpeza", status: "in-progress", assignee: "Equipe B" },
        { name: "Manutenção", status: "pending", assignee: "Pedro S." },
        { name: "Check-in", status: "pending", assignee: "Recepção" },
      ],
    },
    {
      id: 3,
      property: "POUS_01 - Pousada Boutique",
      guest: "Pedro Costa",
      checkIn: "26/10",
      checkOut: "29/10",
      tasks: [
        { name: "Limpeza", status: "pending", assignee: "Equipe A" },
        { name: "Manutenção", status: "pending", assignee: "João M." },
        { name: "Check-in", status: "pending", assignee: "Recepção" },
      ],
    },
  ]

  const getStatusIcon = (status: string) => {
    if (status === "done") return <CheckCircle2 className="w-4 h-4 text-emerald-500" />
    if (status === "in-progress") return <Clock className="w-4 h-4 text-amber-500" />
    return <AlertCircle className="w-4 h-4 text-muted-foreground" />
  }

  const getStatusBadge = (status: string) => {
    if (status === "done")
      return (
        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
          Concluído
        </Badge>
      )
    if (status === "in-progress")
      return (
        <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
          Em Andamento
        </Badge>
      )
    return (
      <Badge variant="outline" className="bg-muted text-muted-foreground">
        Pendente
      </Badge>
    )
  }

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Fluxos de Trabalho</h1>
        <p className="text-muted-foreground mt-1">Otimização operacional e gestão de tarefas</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">12</p>
              <p className="text-xs text-muted-foreground">Tarefas Totais</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">5</p>
              <p className="text-xs text-muted-foreground">Concluídas</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">2</p>
              <p className="text-xs text-muted-foreground">Em Andamento</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">5</p>
              <p className="text-xs text-muted-foreground">Pendentes</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Workflows Kanban */}
      <div className="space-y-4">
        {workflows.map((workflow) => (
          <Card key={workflow.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Home className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{workflow.property}</h3>
                  <p className="text-sm text-muted-foreground">Hóspede: {workflow.guest}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      Check-in: {workflow.checkIn}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Check-out: {workflow.checkOut}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {workflow.tasks.map((task, index) => (
                <div key={index} className="p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(task.status)}
                      <span className="font-medium text-sm">{task.name}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">Responsável: {task.assignee}</p>
                  {getStatusBadge(task.status)}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Future Integrations Card */}
      <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-2">Integrações Futuras</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Profissionalize sua gestão com serviços integrados de limpeza, manutenção e marketing automatizado.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Limpeza Automatizada</Badge>
              <Badge variant="outline">Manutenção Preventiva</Badge>
              <Badge variant="outline">Gestão de Anúncios</Badge>
              <Badge variant="outline">Automação de Mensagens</Badge>
            </div>
          </div>
          <Button variant="outline" className="flex-shrink-0 bg-transparent">
            Em Breve
          </Button>
        </div>
      </Card>
    </div>
  )
}
