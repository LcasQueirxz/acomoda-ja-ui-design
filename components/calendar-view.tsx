"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Plus, Filter, Wrench } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAppStore } from "@/lib/store"
import { ReservationDetailsDialog } from "@/components/reservation-details-dialog"
import { NewReservationDialog } from "@/components/new-reservation-dialog"
import { NewServiceDialog } from "@/components/new-service-dialog"

export function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState(9)
  const [currentYear, setCurrentYear] = useState(2025)
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)
  const [newReservationDialogOpen, setNewReservationDialogOpen] = useState(false)
  const [newServiceDialogOpen, setNewServiceDialogOpen] = useState(false)
  const [selectedCell, setSelectedCell] = useState<{ room: string; day: number } | null>(null)
  const [cellAction, setCellAction] = useState<"reservation" | "service">("reservation")

  const {
    reservations,
    properties,
    services,
    conflictFilter,
    setConflictFilter,
    getConflictingReservations,
    setSelectedReservation,
  } = useAppStore()

  const conflictingReservations = getConflictingReservations()
  const conflictIds = new Set(conflictingReservations.map((r) => r.id))

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const rooms = properties.map((p) => p.id)

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]

  const getReservationForCell = (roomId: string, day: number) => {
    return reservations.find((res) => res.roomId === roomId && day >= res.startDay && day <= res.endDay)
  }

  const getServiceForCell = (roomId: string, day: number) => {
    return services.find((srv) => srv.propertyId === roomId && srv.day === day)
  }

  const isReservationStart = (roomId: string, day: number) => {
    return reservations.some((res) => res.roomId === roomId && res.startDay === day)
  }

  const isReservationEnd = (roomId: string, day: number) => {
    return reservations.some((res) => res.roomId === roomId && res.endDay === day)
  }

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const handleReservationClick = (reservation: any) => {
    setSelectedReservation(reservation)
    setDetailsDialogOpen(true)
  }

  const handleCellClick = (room: string, day: number, action: "reservation" | "service" = "reservation") => {
    const reservation = getReservationForCell(room, day)
    const service = getServiceForCell(room, day)

    if (reservation) {
      handleReservationClick(reservation)
    } else if (service && action === "service") {
      // Could open service details dialog here
      console.log("[v0] Service clicked:", service)
    } else {
      setSelectedCell({ room, day })
      setCellAction(action)
      if (action === "reservation") {
        setNewReservationDialogOpen(true)
      } else {
        setNewServiceDialogOpen(true)
      }
    }
  }

  const getPlatformColor = (platform: string, isConflict: boolean) => {
    if (isConflict) {
      return "bg-red-500/90 hover:bg-red-600 ring-2 ring-red-500 ring-offset-2 animate-pulse"
    }

    switch (platform) {
      case "booking":
        return "bg-blue-500/90 hover:bg-blue-600"
      case "airbnb":
        return "bg-pink-500/90 hover:bg-pink-600"
      case "direct":
        return "bg-emerald-500/90 hover:bg-emerald-600"
      default:
        return "bg-gray-500/90"
    }
  }

  const getServiceColor = (type: string) => {
    switch (type) {
      case "cleaning":
        return "bg-purple-500/90 hover:bg-purple-600"
      case "maintenance":
        return "bg-orange-500/90 hover:bg-orange-600"
      case "inspection":
        return "bg-cyan-500/90 hover:bg-cyan-600"
      default:
        return "bg-gray-500/90"
    }
  }

  useEffect(() => {
    return () => {
      if (conflictFilter) {
        setConflictFilter(false)
      }
    }
  }, [])

  return (
    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Calendário de Reservas</h1>
          <p className="text-muted-foreground mt-1 text-sm lg:text-base">Gerencie suas reservas e disponibilidade</p>
        </div>

        <div className="flex items-center gap-2 lg:gap-3 flex-wrap">
          {conflictFilter && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setConflictFilter(false)}
              className="flex-1 sm:flex-none"
            >
              Limpar Filtro de Conflitos
            </Button>
          )}
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none bg-transparent">
            <Filter className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Filtrar</span>
          </Button>
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none bg-transparent">
            <span className="hidden sm:inline">Exportar</span>
            <span className="sm:hidden">Export</span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setSelectedCell(null)
              setNewServiceDialogOpen(true)
            }}
            className="flex-1 sm:flex-none"
          >
            <Wrench className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Agendar Serviço</span>
            <span className="sm:hidden">Serviço</span>
          </Button>
          <Button size="sm" onClick={() => setNewReservationDialogOpen(true)} className="flex-1 sm:flex-none">
            <Plus className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Nova Reserva</span>
            <span className="sm:hidden">Nova</span>
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between bg-card border border-border rounded-lg p-3 lg:p-4">
        <Button variant="ghost" size="icon" onClick={handlePreviousMonth}>
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <h2 className="text-base lg:text-lg font-semibold">
          {monthNames[currentMonth]} / {currentYear}
        </h2>

        <Button variant="ghost" size="icon" onClick={handleNextMonth}>
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            <div className="flex border-b border-border bg-muted/50 sticky top-0 z-10">
              <div className="w-24 lg:w-32 flex-shrink-0 px-3 lg:px-4 py-2 lg:py-3 font-semibold text-xs lg:text-sm border-r border-border bg-muted/50">
                Imóvel
              </div>
              {days.map((day) => {
                const date = new Date(currentYear, currentMonth, day)
                const dayOfWeek = date.toLocaleDateString("pt-BR", { weekday: "short" })
                const isWeekend = date.getDay() === 0 || date.getDay() === 6

                return (
                  <div
                    key={day}
                    className={cn(
                      "w-12 lg:w-14 flex-shrink-0 px-1 lg:px-2 py-2 text-center text-xs border-r border-border last:border-r-0",
                      isWeekend && "bg-muted/30",
                    )}
                  >
                    <div className="font-medium">{day}</div>
                    <div className="text-[10px] text-muted-foreground uppercase hidden lg:block">{dayOfWeek}</div>
                  </div>
                )
              })}
            </div>

            {rooms.map((room) => {
              const property = properties.find((p) => p.id === room)

              return (
                <div
                  key={room}
                  className="flex border-b border-border last:border-b-0 hover:bg-accent/30 transition-colors"
                >
                  <div className="w-24 lg:w-32 flex-shrink-0 px-3 lg:px-4 py-3 lg:py-4 font-medium text-xs lg:text-sm border-r border-border flex items-center bg-card sticky left-0 z-10">
                    <div>
                      <div className="font-semibold">{room}</div>
                      <div className="text-[10px] lg:text-xs text-muted-foreground">
                        {property?.type || "Propriedade"}
                      </div>
                    </div>
                  </div>
                  {days.map((day) => {
                    const reservation = getReservationForCell(room, day)
                    const service = getServiceForCell(room, day)
                    const isStart = isReservationStart(room, day)
                    const isEnd = isReservationEnd(room, day)
                    const date = new Date(currentYear, currentMonth, day)
                    const isWeekend = date.getDay() === 0 || date.getDay() === 6
                    const isConflict = reservation && conflictIds.has(reservation.id)
                    const shouldShow = !conflictFilter || isConflict

                    return (
                      <div
                        key={day}
                        className={cn(
                          "w-12 lg:w-14 flex-shrink-0 border-r border-border last:border-r-0 p-0.5 lg:p-1 cursor-pointer relative",
                          isWeekend && "bg-muted/20",
                        )}
                        onContextMenu={(e) => {
                          e.preventDefault()
                          handleCellClick(room, day, "service")
                        }}
                        onClick={() => handleCellClick(room, day, "reservation")}
                      >
                        {reservation && shouldShow ? (
                          <div
                            className={cn(
                              "h-8 lg:h-10 flex items-center justify-center text-white text-[9px] lg:text-[10px] font-medium transition-all cursor-pointer",
                              getPlatformColor(reservation.platform, isConflict),
                              isStart && "rounded-l",
                              isEnd && "rounded-r",
                              !isStart && !isEnd && "rounded-none",
                            )}
                            title={`${reservation.guestName} - ${reservation.platform}`}
                          >
                            {isStart && (
                              <span className="truncate px-0.5 lg:px-1 hidden lg:inline">
                                {reservation.guestName.split(" ")[0]}
                              </span>
                            )}
                          </div>
                        ) : service ? (
                          <div
                            className={cn(
                              "h-8 lg:h-10 flex items-center justify-center text-white text-[9px] lg:text-[10px] font-medium transition-all cursor-pointer rounded border-2 border-white/30",
                              getServiceColor(service.type),
                            )}
                            title={`${service.type} - ${service.provider}`}
                          >
                            <Wrench className="w-3 h-3" />
                          </div>
                        ) : (
                          <div className="h-8 lg:h-10 rounded hover:bg-accent/50 transition-colors" />
                        )}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 lg:gap-6 text-xs lg:text-sm flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 lg:w-4 lg:h-4 rounded bg-blue-500" />
          <span className="text-muted-foreground">Booking.com</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 lg:w-4 lg:h-4 rounded bg-pink-500" />
          <span className="text-muted-foreground">Airbnb</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 lg:w-4 lg:h-4 rounded bg-emerald-500" />
          <span className="text-muted-foreground">Reserva Direta</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 lg:w-4 lg:h-4 rounded bg-red-500 ring-2 ring-red-500" />
          <span className="text-muted-foreground">Conflito</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 lg:w-4 lg:h-4 rounded bg-purple-500 border-2 border-white" />
          <span className="text-muted-foreground">Limpeza</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 lg:w-4 lg:h-4 rounded bg-orange-500 border-2 border-white" />
          <span className="text-muted-foreground">Manutenção</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 lg:w-4 lg:h-4 rounded border-2 border-border" />
          <span className="text-muted-foreground">Disponível</span>
        </div>
      </div>

      <ReservationDetailsDialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen} />
      <NewReservationDialog
        open={newReservationDialogOpen}
        onOpenChange={setNewReservationDialogOpen}
        selectedCell={selectedCell}
      />
      <NewServiceDialog
        open={newServiceDialogOpen}
        onOpenChange={setNewServiceDialogOpen}
        selectedCell={selectedCell}
      />
    </div>
  )
}
