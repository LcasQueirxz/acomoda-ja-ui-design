"use client"

import { create } from "zustand"

export interface Reservation {
  id: string
  roomId: string
  startDay: number
  endDay: number
  guestName: string
  guestEmail: string
  guestPhone: string
  platform: "booking" | "airbnb" | "direct"
  status: "confirmed" | "pending" | "checked-in" | "cancelled"
  checkIn: string
  checkOut: string
  total: number
  nights: number
}

export interface Property {
  id: string
  name: string
  type: string
  address: string
  city: string
  state: string
  platforms: ("booking" | "airbnb")[]
  occupancyRate: number
  monthlyRevenue: number
  baseRate: number
  rooms: number
  image: string
}

export interface Guest {
  id: string
  name: string
  email: string
  phone: string
  totalBookings: number
  totalRevenue: number
  lastBooking: string
}

export interface Service {
  id: string
  type: "cleaning" | "maintenance" | "inspection"
  propertyId: string
  date: string
  day: number
  status: "scheduled" | "in-progress" | "completed" | "cancelled"
  provider: string
  cost: number
  notes: string
}

export interface BlockedReservation {
  id: string
  propertyId: string
  attemptDate: string
  platform: "booking" | "airbnb" | "direct"
  guestName: string
  checkIn: string
  checkOut: string
  reason: string
  preventedRevenue: number
}

interface AppState {
  reservations: Reservation[]
  properties: Property[]
  guests: Guest[]
  services: Service[]
  blockedReservations: BlockedReservation[]
  conflictFilter: boolean
  selectedReservation: Reservation | null
  selectedProperty: Property | null

  // Actions
  addReservation: (reservation: Reservation) => void
  updateReservation: (id: string, reservation: Partial<Reservation>) => void
  deleteReservation: (id: string) => void
  setConflictFilter: (value: boolean) => void
  setSelectedReservation: (reservation: Reservation | null) => void

  addProperty: (property: Property) => void
  updateProperty: (id: string, property: Partial<Property>) => void
  deleteProperty: (id: string) => void
  setSelectedProperty: (property: Property | null) => void

  addGuest: (guest: Guest) => void
  updateGuest: (id: string, guest: Partial<Guest>) => void

  addService: (service: Service) => void
  updateService: (id: string, service: Partial<Service>) => void
  deleteService: (id: string) => void

  getConflictingReservations: () => Reservation[]
}

export const useAppStore = create<AppState>((set, get) => ({
  reservations: [
    {
      id: "RES-001",
      roomId: "APT_401",
      startDay: 5,
      endDay: 8,
      guestName: "João Silva",
      guestEmail: "joao@email.com",
      guestPhone: "(11) 98765-4321",
      platform: "booking",
      status: "confirmed",
      checkIn: "05/10/2025",
      checkOut: "08/10/2025",
      total: 1200,
      nights: 3,
    },
    {
      id: "RES-002",
      roomId: "APT_401",
      startDay: 7,
      endDay: 10,
      guestName: "Maria Santos",
      guestEmail: "maria@email.com",
      guestPhone: "(11) 91234-5678",
      platform: "airbnb",
      status: "confirmed",
      checkIn: "07/10/2025",
      checkOut: "10/10/2025",
      total: 1350,
      nights: 3,
    },
  ],

  properties: [
    {
      id: "APT_401",
      name: "Estúdio Moderno",
      type: "Apartamento",
      address: "Av. Paulista, 1000",
      city: "São Paulo",
      state: "SP",
      platforms: ["booking", "airbnb"],
      occupancyRate: 85,
      monthlyRevenue: 3500,
      baseRate: 250,
      rooms: 1,
      image: "/modern-studio-apartment-interior-s-o-paulo.jpg",
    },
    {
      id: "CASA_JD",
      name: "Casa de Praia Exclusiva",
      type: "Casa",
      address: "Rua das Ondas, 45",
      city: "Salvador",
      state: "BA",
      platforms: ["booking", "airbnb"],
      occupancyRate: 78,
      monthlyRevenue: 5800,
      baseRate: 450,
      rooms: 3,
      image: "/luxury-beach-house-brazil-northeast-coast.jpg",
    },
  ],

  guests: [
    {
      id: "GUEST-001",
      name: "João Silva",
      email: "joao@email.com",
      phone: "(11) 98765-4321",
      totalBookings: 3,
      totalRevenue: 3600,
      lastBooking: "05/10/2025",
    },
  ],

  services: [
    {
      id: "SRV-001",
      type: "cleaning",
      propertyId: "APT_401",
      date: "12/10/2025",
      day: 12,
      status: "scheduled",
      provider: "CleanPro SP",
      cost: 150,
      notes: "Limpeza completa pós check-out",
    },
    {
      id: "SRV-002",
      type: "maintenance",
      propertyId: "CASA_JD",
      date: "15/10/2025",
      day: 15,
      status: "scheduled",
      provider: "Manutenção Express BA",
      cost: 280,
      notes: "Verificar ar-condicionado",
    },
  ],

  blockedReservations: [
    {
      id: "BLOCK-001",
      propertyId: "APT_401",
      attemptDate: "03/10/2025",
      platform: "airbnb",
      guestName: "Carlos Mendes",
      checkIn: "06/10/2025",
      checkOut: "09/10/2025",
      reason: "Conflito com reserva existente RES-001",
      preventedRevenue: 1100,
    },
    {
      id: "BLOCK-002",
      propertyId: "APT_401",
      attemptDate: "04/10/2025",
      platform: "booking",
      guestName: "Ana Paula",
      checkIn: "08/10/2025",
      checkOut: "11/10/2025",
      reason: "Conflito com reserva existente RES-002",
      preventedRevenue: 1250,
    },
    {
      id: "BLOCK-003",
      propertyId: "CASA_JD",
      attemptDate: "05/10/2025",
      platform: "airbnb",
      guestName: "Roberto Lima",
      checkIn: "20/10/2025",
      checkOut: "23/10/2025",
      reason: "Conflito com reserva existente",
      preventedRevenue: 1800,
    },
  ],

  conflictFilter: false,
  selectedReservation: null,
  selectedProperty: null,

  addReservation: (reservation) =>
    set((state) => ({
      reservations: [...state.reservations, reservation],
    })),

  updateReservation: (id, reservation) =>
    set((state) => ({
      reservations: state.reservations.map((r) => (r.id === id ? { ...r, ...reservation } : r)),
    })),

  deleteReservation: (id) =>
    set((state) => ({
      reservations: state.reservations.filter((r) => r.id !== id),
    })),

  setConflictFilter: (value) => set({ conflictFilter: value }),

  setSelectedReservation: (reservation) => set({ selectedReservation: reservation }),

  addProperty: (property) =>
    set((state) => ({
      properties: [...state.properties, property],
    })),

  updateProperty: (id, property) =>
    set((state) => ({
      properties: state.properties.map((p) => (p.id === id ? { ...p, ...property } : p)),
    })),

  deleteProperty: (id) =>
    set((state) => ({
      properties: state.properties.filter((p) => p.id !== id),
    })),

  setSelectedProperty: (property) => set({ selectedProperty: property }),

  addGuest: (guest) =>
    set((state) => ({
      guests: [...state.guests, guest],
    })),

  updateGuest: (id, guest) =>
    set((state) => ({
      guests: state.guests.map((g) => (g.id === id ? { ...g, ...guest } : g)),
    })),

  addService: (service) =>
    set((state) => ({
      services: [...state.services, service],
    })),

  updateService: (id, service) =>
    set((state) => ({
      services: state.services.map((s) => (s.id === id ? { ...s, ...service } : s)),
    })),

  deleteService: (id) =>
    set((state) => ({
      services: state.services.filter((s) => s.id !== id),
    })),

  getConflictingReservations: () => {
    const { reservations } = get()
    const conflicts: Reservation[] = []

    for (let i = 0; i < reservations.length; i++) {
      for (let j = i + 1; j < reservations.length; j++) {
        const res1 = reservations[i]
        const res2 = reservations[j]

        if (res1.roomId === res2.roomId) {
          const overlap =
            (res1.startDay <= res2.endDay && res1.endDay >= res2.startDay) ||
            (res2.startDay <= res1.endDay && res2.endDay >= res1.startDay)

          if (overlap) {
            if (!conflicts.find((r) => r.id === res1.id)) conflicts.push(res1)
            if (!conflicts.find((r) => r.id === res2.id)) conflicts.push(res2)
          }
        }
      }
    }

    return conflicts
  },
}))
