"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Send } from "lucide-react"

export function MessagesView() {
  const [selectedConversation, setSelectedConversation] = useState(1)

  const conversations = [
    {
      id: 1,
      guest: "Maria Santos",
      property: "APT_401",
      platform: "booking",
      lastMessage: "Obrigada! Até breve.",
      time: "10 min atrás",
      unread: 0,
    },
    {
      id: 2,
      guest: "João Silva",
      property: "CASA_JD",
      platform: "airbnb",
      lastMessage: "Qual o horário do check-in?",
      time: "25 min atrás",
      unread: 2,
    },
    {
      id: 3,
      guest: "Pedro Costa",
      property: "POUS_01",
      platform: "direct",
      lastMessage: "Gostaria de estender minha estadia",
      time: "1 hora atrás",
      unread: 1,
    },
    {
      id: 4,
      guest: "Ana Oliveira",
      property: "EST_MOD",
      platform: "booking",
      lastMessage: "Perfeito, obrigada!",
      time: "2 horas atrás",
      unread: 0,
    },
  ]

  const messages = [
    { id: 1, sender: "guest", text: "Olá! Gostaria de confirmar o horário do check-in.", time: "14:30" },
    {
      id: 2,
      sender: "host",
      text: "Olá Maria! O check-in é a partir das 14h. Você pode chegar a qualquer momento após esse horário.",
      time: "14:35",
    },
    { id: 3, sender: "guest", text: "Perfeito! Chegarei por volta das 15h.", time: "14:40" },
    { id: 4, sender: "host", text: "Ótimo! Estarei aguardando. Qualquer dúvida, estou à disposição.", time: "14:42" },
    { id: 5, sender: "guest", text: "Obrigada! Até breve.", time: "14:45" },
  ]

  return (
    <div className="p-4 lg:p-6 h-[calc(100vh-4rem)]">
      <div className="flex flex-col h-full gap-4">
        {/* Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Mensagens</h1>
          <p className="text-muted-foreground mt-1">Central de comunicação com hóspedes</p>
        </div>

        {/* Messages Container */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 overflow-hidden">
          {/* Conversations List */}
          <Card className="lg:col-span-1 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Buscar conversas..." className="pl-9" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`w-full p-4 border-b border-border hover:bg-accent/50 transition-colors text-left ${
                    selectedConversation === conversation.id ? "bg-accent" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium text-sm flex-shrink-0">
                        {conversation.guest.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-sm truncate">{conversation.guest}</p>
                        <p className="text-xs text-muted-foreground truncate">{conversation.property}</p>
                      </div>
                    </div>
                    {conversation.unread > 0 && (
                      <Badge className="bg-primary text-primary-foreground">{conversation.unread}</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate mb-1">{conversation.lastMessage}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{conversation.time}</span>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        conversation.platform === "booking"
                          ? "border-blue-500 text-blue-500"
                          : conversation.platform === "airbnb"
                            ? "border-pink-500 text-pink-500"
                            : "border-emerald-500 text-emerald-500"
                      }`}
                    >
                      {conversation.platform === "booking" ? "B" : conversation.platform === "airbnb" ? "A" : "D"}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2 flex flex-col overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                  M
                </div>
                <div>
                  <p className="font-semibold">Maria Santos</p>
                  <p className="text-xs text-muted-foreground">APT_401 - Estúdio Moderno</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "host" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === "host" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${message.sender === "host" ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                    >
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input placeholder="Digite sua mensagem..." className="flex-1" />
                <Button>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
