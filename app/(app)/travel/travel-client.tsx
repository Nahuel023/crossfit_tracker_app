'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Plane, Dumbbell, Clock, Zap } from 'lucide-react'
import { TrainingBlock } from '@/types/database'

interface TravelClientProps {
  travelBlocks: TrainingBlock[]
  userId: string
}

type TripDuration = 'short' | 'medium' | 'long'

const tripLabels: Record<TripDuration, string> = {
  short: 'Corto (3-5 días)',
  medium: 'Medio (6-10 días)',
  long: 'Largo (11-15 días)',
}

const tripDescriptions: Record<TripDuration, { goal: string; duration: string; color: string }> = {
  short: {
    goal: 'No perder lo ganado. Sesiones de 45-60 min, por las tardes.',
    duration: '3–5 días',
    color: 'text-orange-400',
  },
  medium: {
    goal: 'Seguir construyendo. Sesiones de 45-60 min. Usá el gym si hay.',
    duration: '6–10 días',
    color: 'text-yellow-400',
  },
  long: {
    goal: 'Tratarlo como una semana de entrenamiento normal.',
    duration: '11–15 días',
    color: 'text-red-400',
  },
}

const travelProtocols: Record<TripDuration, { title: string; items: string[] }[]> = {
  short: [
    {
      title: 'Empuje',
      items: ['Progresión HSPU contra la pared', 'Pike push-ups (pies en silla)', 'Dips en silla o paralelas'],
    },
    {
      title: 'Tirón',
      items: ['Buscá una barra (plaza, hotel gym)', 'Sin barra: remo con toalla, sostén en marco de puerta', 'Trabajo en anillas si hay'],
    },
    {
      title: 'Piernas',
      items: ['Práctica de pistol squat', 'Saltos en sentadilla', 'Bulgarian split squat'],
    },
    {
      title: 'Core',
      items: ['Hollow body holds', 'Arch holds', 'Progresión L-sit'],
    },
    {
      title: 'Cardio',
      items: ['20 min trote zona 2 a ritmo conversacional'],
    },
  ],
  medium: [
    {
      title: 'Adiciones con gym',
      items: ['Pull-ups con peso (lo que haya)', 'Trabajo en anillas si hay', 'Barra: snatch/clean a carga moderada'],
    },
    {
      title: 'HSPU sin peso',
      items: ['Apuntá a 10+ reps por sesión', 'ROM completo contra la pared'],
    },
    {
      title: 'Muscle-Up',
      items: ['MU con salto o banda si hay', 'Práctica de transición en cajón'],
    },
    {
      title: 'Handstand Walk',
      items: ['15 min de práctica dedicada por sesión'],
    },
    {
      title: 'Cardio',
      items: ['Zona 2: mínimo 30 min', '2 sesiones por semana'],
    },
  ],
  long: [
    {
      title: 'Días 1-2: Activación',
      items: ['Volumen liviano', 'Foco en movilidad', 'Restaurar patrones de movimiento'],
    },
    {
      title: 'Días 3-8: Sesiones completas',
      items: ['Protocolo completo de peso corporal', 'Agregá el equipo disponible', 'Misma estructura que en casa'],
    },
    {
      title: 'Días 9-11: Pico',
      items: ['Mayor intensidad del viaje', 'Simulación de competencia si es posible'],
    },
    {
      title: 'Días 12-15: Descarga',
      items: ['Volumen reducido', 'Trabajo de movilidad', 'Solo cardio zona 2'],
    },
  ],
}

export function TravelClient({ travelBlocks, userId }: TravelClientProps) {
  const [travelMode, setTravelMode] = useState(false)
  const [duration, setDuration] = useState<TripDuration>('short')

  const relevantBlock = travelBlocks.find(b => {
    if (duration === 'short') return b.title.includes('Short')
    if (duration === 'medium') return b.title.includes('Medium')
    return b.title.includes('Long')
  })

  const protocol = travelProtocols[duration]
  const info = tripDescriptions[duration]

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold">Modo Viaje</h1>
        <p className="text-sm text-muted-foreground">Mantenete en forma cuando viajás</p>
      </div>

      {/* Toggle */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-orange-500/10">
                <Plane className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <p className="font-medium">Modo viaje</p>
                <p className="text-xs text-muted-foreground">
                  {travelMode ? 'Activo — usando protocolo de viaje' : 'Desactivado — usando el plan normal'}
                </p>
              </div>
            </div>
            <Switch checked={travelMode} onCheckedChange={setTravelMode} />
          </div>
        </CardContent>
      </Card>

      {travelMode && (
        <>
          {/* Duration selector */}
          <div className="space-y-2">
            <Label>Duración del viaje</Label>
            <Select value={duration} onValueChange={v => setDuration(v as TripDuration)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short">Corto (3-5 días)</SelectItem>
                <SelectItem value="medium">Medio (6-10 días)</SelectItem>
                <SelectItem value="long">Largo (11-15 días)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Protocol info */}
          <Card className="border-orange-500/30 bg-orange-500/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Zap className={`h-5 w-5 shrink-0 mt-0.5 ${info.color}`} />
                <div>
                  <p className={`font-medium ${info.color}`}>{tripLabels[duration]}</p>
                  <p className="text-sm text-muted-foreground mt-1">{info.goal}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Protocol blocks */}
          <div className="space-y-3">
            {protocol.map((section, i) => (
              <Card key={i}>
                <CardHeader className="pb-2 pt-3 px-4">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Dumbbell className="h-4 w-4 text-orange-400" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-3">
                  <ul className="space-y-1.5">
                    {section.items.map((item, j) => (
                      <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-orange-400 mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Key reminder */}
          <Card className="border-blue-500/20 bg-blue-500/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground">
                  <span className="text-blue-400 font-medium">Principio clave: </span>
                  Los bloques de viaje no afectan tu tasa de completado del plan principal. Se registran por separado y aparecen como sesiones de viaje en tu progreso.
                </p>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {!travelMode && (
        <Card>
          <CardContent className="py-10 text-center">
            <Plane className="h-10 w-10 mx-auto mb-3 text-muted-foreground/30" />
            <p className="text-muted-foreground text-sm">Activá el modo viaje cuando estés lejos del gym.</p>
            <p className="text-xs text-muted-foreground mt-1">Seleccioná la duración de tu viaje para ver el protocolo.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
