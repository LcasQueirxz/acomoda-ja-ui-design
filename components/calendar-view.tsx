"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Plus, Filter } from "lucide-react"
import { ReservationDialog } from "@/components/reservation-dialog"
import { cn } from "@/lib/utils"

interface Reservation {
  id: string
  roomId: string
  startDay: number
  endDay: number
  guestName: string
  platform: "booking" | "airbnb" | "direct"
  status: "confirmed" | "pending" | "checked-in"
}

export function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState(9) // October (0-indexed)
  const [currentYear, setCurrentYear] = useState(2025)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedCell, setSelectedCell] = useState<{ room: string; day: number } | null>(null)

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const rooms = ["APT_401", "CASA_JD", "POUS_01", "EST_MOD", "CASA_PR", "APT_LUX"]

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

  const reservations: Reservation[] = [
    {
      id: "1",
      roomId: "APT_401",
      startDay: 5,
      endDay: 8,
      guestName: "João Silva",
      platform: "booking",
      status: "confirmed",
    },
    {
      id: "2",
      roomId: "APT_401",
      startDay: 12,
      endDay: 15,
      guestName: "Maria Santos",
      platform: "airbnb",
      status: "confirmed",
    },
    {
      id: "3",
      roomId: "CASA_JD",
      startDay: 3,
      endDay: 7,
      guestName: "Pedro Costa",
      platform: "direct",
      status: "checked-in",
    },
    {
      id: "4",
      roomId: "CASA_JD",
      startDay: 18,
      endDay: 22,
      guestName: "Ana Oliveira",
      platform: "booking",
      status: "confirmed",
    },
    {
      id: "5",
      roomId: "POUS_01",
      startDay: 8,
      endDay: 14,
      guestName: "Carlos Ferreira",
      platform: "airbnb",
      status: "confirmed",
    },
    {
      id: "6",
      roomId: "EST_MOD",
      startDay: 1,
      endDay: 4,
      guestName: "Sofia Rodrigues",
      platform: "booking",
      status: "confirmed",
    },
    {
      id: "7",
      roomId: "EST_MOD",
      startDay: 20,
      endDay: 25,
      guestName: "Miguel Alves",
      platform: "direct",
      status: "pending",
    },
    {
      id: "8",
      roomId: "CASA_PR",
      startDay: 10,
      endDay: 17,
      guestName: "Beatriz Lima",
      platform: "airbnb",
      status: "confirmed",
    },
    {
      id: "9",
      roomId: "APT_LUX",
      startDay: 6,
      endDay: 9,
      guestName: "Ricardo Pereira",
      platform: "booking",
      status: "confirmed",
    },
  ]

  const getReservationForCell = (roomId: string, day: number) => {
    return reservations.find((res) => res.roomId === roomId && day >= res.startDay && day <= res.endDay)
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

  const handleCellClick = (room: string, day: number) => {
    setSelectedCell({ room, day })
    setDialogOpen(true)
  }

  const getPlatformColor = (platform: string) => {
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

  return (
    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Calendário de Reservas</h1>
          <p className="text-muted-foreground mt-1 text-sm lg:text-base">Gerencie suas reservas e disponibilidade</p>
        </div>

        <div className="flex items-center gap-2 lg:gap-3 flex-wrap">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none bg-transparent">
            <Filter className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Filtrar</span>
          </Button>
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none bg-transparent">
            <span className="hidden sm:inline">Exportar</span>
            <span className="sm:hidden">Export</span>
          </Button>
          <Button size="sm" onClick={() => setDialogOpen(true)} className="flex-1 sm:flex-none">
            <Plus className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Nova Reserva</span>
            <span className="sm:hidden">Nova</span>
          </Button>
        </div>
      </div>

      {/* Month Selector */}
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
            {/* Header Row with Day Numbers */}
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

            {/* Room Rows */}
            {rooms.map((room) => (
              <div
                key={room}
                className="flex border-b border-border last:border-b-0 hover:bg-accent/30 transition-colors"
              >
                <div className="w-24 lg:w-32 flex-shrink-0 px-3 lg:px-4 py-3 lg:py-4 font-medium text-xs lg:text-sm border-r border-border flex items-center bg-card sticky left-0 z-10">
                  <div>
                    <div className="font-semibold">{room}</div>
                    <div className="text-[10px] lg:text-xs text-muted-foreground">
                      {room.startsWith("APT") ? "Apartamento" : room.startsWith("CASA") ? "Casa" : "Pousada"}
                    </div>
                  </div>
                </div>
                {days.map((day) => {
                  const reservation = getReservationForCell(room, day)
                  const isStart = isReservationStart(room, day)
                  const isEnd = isReservationEnd(room, day)
                  const date = new Date(currentYear, currentMonth, day)
                  const isWeekend = date.getDay() === 0 || date.getDay() === 6

                  return (
                    <div
                      key={day}
                      className={cn(
                        "w-12 lg:w-14 flex-shrink-0 border-r border-border last:border-r-0 p-0.5 lg:p-1 cursor-pointer",
                        isWeekend && "bg-muted/20",
                      )}
                      onClick={() => handleCellClick(room, day)}
                    >
                      {reservation ? (
                        <div
                          className={cn(
                            "h-8 lg:h-10 flex items-center justify-center text-white text-[9px] lg:text-[10px] font-medium transition-all",
                            getPlatformColor(reservation.platform),
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
                      ) : (
                        <div className="h-8 lg:h-10 rounded hover:bg-accent/50 transition-colors" />
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
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
          <div className="w-3 h-3 lg:w-4 lg:h-4 rounded border-2 border-border" />
          <span className="text-muted-foreground">Disponível</span>
        </div>
      </div>

      {/* Reservation Dialog */}
      <ReservationDialog open={dialogOpen} onOpenChange={setDialogOpen} selectedCell={selectedCell} />
    </div>
  )
}
