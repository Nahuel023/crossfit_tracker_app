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
  short: 'Short (3-5 days)',
  medium: 'Medium (6-10 days)',
  long: 'Long (11-15 days)',
}

const tripDescriptions: Record<TripDuration, { goal: string; duration: string; color: string }> = {
  short: {
    goal: "Don't lose what was built. 45-60 min sessions, evenings.",
    duration: '3–5 days',
    color: 'text-orange-400',
  },
  medium: {
    goal: 'Keep building. 45-60 min sessions. Add gym equipment when available.',
    duration: '6–10 days',
    color: 'text-yellow-400',
  },
  long: {
    goal: 'Treat as a training week. Structure sessions like home week.',
    duration: '11–15 days',
    color: 'text-red-400',
  },
}

const travelProtocols: Record<TripDuration, { title: string; items: string[] }[]> = {
  short: [
    {
      title: 'Push',
      items: ['HSPU progression against wall', 'Pike push-ups (feet on chair)', 'Dips on chair or parallel bars'],
    },
    {
      title: 'Pull',
      items: ['Find a bar (park, hotel gym)', 'If no bar: towel rows, door frame holds', 'Ring work if available'],
    },
    {
      title: 'Legs',
      items: ['Pistol squat practice', 'Jump squats', 'Bulgarian split squat'],
    },
    {
      title: 'Core',
      items: ['Hollow body holds', 'Arch holds', 'L-sit progression'],
    },
    {
      title: 'Cardio',
      items: ['20 min zone 2 run at conversational pace'],
    },
  ],
  medium: [
    {
      title: 'Gym additions',
      items: ['Weighted pull-ups (use available load)', 'Ring work if rings available', 'Barbell: snatch/clean at moderate load'],
    },
    {
      title: 'Bodyweight HSPU',
      items: ['Aim for 10+ reps per session', 'Full ROM against wall'],
    },
    {
      title: 'Muscle-Up',
      items: ['Jumping MU or banded if available', 'Box transition practice'],
    },
    {
      title: 'Handstand Walk',
      items: ['15 min dedicated practice per session'],
    },
    {
      title: 'Cardio',
      items: ['Zone 2: 30 min minimum', '2 sessions per week'],
    },
  ],
  long: [
    {
      title: 'Day 1-2: Activation',
      items: ['Light volume only', 'Mobility focus', 'Movement pattern restoration'],
    },
    {
      title: 'Day 3-8: Full sessions',
      items: ['Full bodyweight protocol', 'Add available equipment', 'Same structure as home week'],
    },
    {
      title: 'Day 9-11: Peak',
      items: ['Highest intensity of the trip', 'Competition simulation if possible'],
    },
    {
      title: 'Day 12-15: Deload',
      items: ['Reduced volume', 'Mobility work', 'Zone 2 only cardio'],
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
        <h1 className="text-2xl font-bold">Travel Mode</h1>
        <p className="text-sm text-muted-foreground">Maintain your fitness on the road</p>
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
                <p className="font-medium">Travel mode</p>
                <p className="text-xs text-muted-foreground">
                  {travelMode ? 'Active — using travel protocol' : 'Off — using normal plan'}
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
            <Label>Trip duration</Label>
            <Select value={duration} onValueChange={v => setDuration(v as TripDuration)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short">Short (3-5 days)</SelectItem>
                <SelectItem value="medium">Medium (6-10 days)</SelectItem>
                <SelectItem value="long">Long (11-15 days)</SelectItem>
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
                  <span className="text-blue-400 font-medium">Key principle: </span>
                  Travel blocks don&apos;t count against your main plan completion rate. They&apos;re logged separately and show as travel sessions in your progress.
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
            <p className="text-muted-foreground text-sm">Enable travel mode when you&apos;re away from your gym.</p>
            <p className="text-xs text-muted-foreground mt-1">Select your trip duration to get a tailored protocol.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
