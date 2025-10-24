"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Calendar, TrendingUp, Users, DollarSign, Bell, ArrowRight, Wifi, WifiOff } from "lucide-react"

export function ControlPanelView() {
  const todayTasks = [
    { id: 1, type: "check-in", guest: "Maria Santos", property: "APT_401 - Estúdio Moderno", time: "14:00" },
    { id: 2, type: "check-out", guest: "João Silva", property: "CASA_JD - Casa de Praia", time: "11:00" },
    { id: 3, type: "check-in", guest: "Pedro Costa", property: "POUS_01 - Pousada Boutique", time: "15:00" },
  ]

  const notifications = [
    {
      id: 1,
      type: "error",
      title: "Falha na Sincronização",
      message: "Booking.com - Última sincronização há 2 horas",
      time: "10 min atrás",
    },
    {
      id: 2,
      type: "message",
      title: "Nova Mensagem",
      message: "Hóspede Ana Oliveira enviou uma mensagem",
      time: "25 min atrás",
    },
    {
      id: 3,
      type: "info",
      title: "Reserva Confirmada",
      message: "Nova reserva para APT_401 - 15 a 18 de Nov",
      time: "1 hora atrás",
    },
  ]

  const syncStatus = {
    isActive: false,
    lastSync: "2 horas atrás",
    failedPlatforms: ["Booking.com"],
  }

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Painel de Controle</h1>
        <p className="text-muted-foreground mt-1">Visão operacional do dia</p>
      </div>

      {/* OTA Sync Status Widget */}
      <Card
        className={`p-4 ${syncStatus.isActive ? "bg-emerald-500/10 border-emerald-500/30" : "bg-red-500/10 border-red-500/30"}`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${syncStatus.isActive ? "bg-emerald-500" : "bg-red-500"}`}
          >
            {syncStatus.isActive ? <Wifi className="w-5 h-5 text-white" /> : <WifiOff className="w-5 h-5 text-white" />}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">Sincronização OTA: {syncStatus.isActive ? "Ativa" : "Falha!"}</p>
            <p className="text-xs text-muted-foreground">
              {syncStatus.isActive
                ? "Todas as plataformas conectadas"
                : `${syncStatus.failedPlatforms.join(", ")} - Última sincronização ${syncStatus.lastSync}`}
            </p>
          </div>
          {!syncStatus.isActive && (
            <Button variant="destructive" size="sm">
              Reconectar
            </Button>
          )}
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">3</p>
              <p className="text-xs text-muted-foreground">Tarefas Hoje</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">12</p>
              <p className="text-xs text-muted-foreground">Reservas Confirmadas</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">8</p>
              <p className="text-xs text-muted-foreground">Hóspedes Ativos</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">R$ 4.2k</p>
              <p className="text-xs text-muted-foreground">Receita Hoje</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Tasks */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Tarefas do Dia</h2>
            <Badge variant="outline">{todayTasks.length}</Badge>
          </div>

          <div className="space-y-3">
            {todayTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    task.type === "check-in" ? "bg-emerald-500/10" : "bg-blue-500/10"
                  }`}
                >
                  {task.type === "check-in" ? (
                    <ArrowRight className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <ArrowRight className="w-5 h-5 text-blue-500 rotate-180" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={task.type === "check-in" ? "default" : "secondary"} className="text-xs">
                      {task.type === "check-in" ? "Check-in" : "Check-out"}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{task.time}</span>
                  </div>
                  <p className="font-medium text-sm">{task.guest}</p>
                  <p className="text-xs text-muted-foreground truncate">{task.property}</p>
                </div>
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full mt-4 bg-transparent">
            Ver Todas as Tarefas
          </Button>
        </Card>

        {/* System Notifications */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Notificações do Sistema</h2>
            <Bell className="w-5 h-5 text-muted-foreground" />
          </div>

          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      notification.type === "error"
                        ? "bg-red-500"
                        : notification.type === "message"
                          ? "bg-blue-500"
                          : "bg-emerald-500"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className="font-medium text-sm">{notification.title}</p>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{notification.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{notification.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full mt-4 bg-transparent">
            Ver Todas as Notificações
          </Button>
        </Card>
      </div>

      {/* Short-term Metrics */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Métricas de Curto Prazo</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Taxa de Ocupação (7 dias)</span>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-3xl font-bold">82%</p>
            <p className="text-xs text-emerald-500">+5% vs. semana anterior</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Receita (7 dias)</span>
              <DollarSign className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-3xl font-bold">R$ 28.4k</p>
            <p className="text-xs text-blue-500">+12% vs. semana anterior</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Novos Hóspedes</span>
              <Users className="w-4 h-4 text-purple-500" />
            </div>
            <p className="text-3xl font-bold">15</p>
            <p className="text-xs text-purple-500">+3 vs. semana anterior</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
