'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BlockCard } from '@/components/block-card'
import { Flame, Clock, Dumbbell, Trophy, Plane, TrendingUp } from 'lucide-react'
import { TrainingBlock, BlockCompletion, Profile } from '@/types/database'
import { getCurrentPhase, getPhaseLabel, DAY_NAMES_FULL } from '@/lib/utils'
import Link from 'next/link'

interface DashboardClientProps {
  todayBlocks: TrainingBlock[]
  completions: BlockCompletion[]
  streak: number
  profile: Profile | null
  pendingCount: number
  todayDate: string
  dayOfWeek: number
}

const phaseColors = {
  build: 'bg-blue-500/20 text-blue-400',
  competition: 'bg-purple-500/20 text-purple-400',
  elite: 'bg-emerald-500/20 text-emerald-400',
}

export function DashboardClient({
  todayBlocks: initialBlocks,
  completions: initialCompletions,
  streak,
  profile,
  pendingCount,
  todayDate,
  dayOfWeek,
}: DashboardClientProps) {
  const [completions, setCompletions] = useState(initialCompletions)
  const router = useRouter()

  const phase = getCurrentPhase(new Date(todayDate))
  const completedToday = completions.filter(c => c.status === 'completed').length
  const totalToday = initialBlocks.length

  const today = new Date(todayDate + 'T12:00:00')
  const dateDisplay = today.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  function getCompletion(blockId: string) {
    return completions.find(c => c.block_id === blockId)
  }

  function refresh() {
    router.refresh()
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <p className="text-sm text-muted-foreground">{dateDisplay}</p>
        <h1 className="text-2xl font-bold">
          Hey, {profile?.name ?? 'Nahuel'} 👋
        </h1>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-3 text-center">
            <Flame className="h-5 w-5 mx-auto mb-1 text-orange-400" />
            <p className="text-xl font-bold">{streak}</p>
            <p className="text-xs text-muted-foreground">Day streak</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <Dumbbell className="h-5 w-5 mx-auto mb-1 text-blue-400" />
            <p className="text-xl font-bold">{completedToday}/{totalToday}</p>
            <p className="text-xs text-muted-foreground">Today done</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <Clock className="h-5 w-5 mx-auto mb-1 text-yellow-400" />
            <p className="text-xl font-bold">{pendingCount}</p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
      </div>

      {/* Phase indicator */}
      <div className="flex items-center gap-2">
        <Badge className={phaseColors[phase]}>{getPhaseLabel(phase)}</Badge>
        {phase === 'build' && (
          <span className="text-xs text-muted-foreground">
            {getWeeksUntilOctober(new Date(todayDate))} weeks to competition
          </span>
        )}
      </div>

      {/* Today's blocks */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Today — {DAY_NAMES_FULL[dayOfWeek]}</h2>
          <Link href="/planner">
            <Button variant="ghost" size="sm" className="text-xs h-7">
              Full week →
            </Button>
          </Link>

        </div>

        {initialBlocks.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground text-sm">No blocks scheduled for today.</p>
              <p className="text-xs text-muted-foreground mt-1">Rest day or check the planner to add sessions.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {initialBlocks.map(block => (
              <BlockCard
                key={block.id}
                block={block}
                completion={getCompletion(block.id)}
                onStatusChange={refresh}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="font-semibold mb-3">Quick actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <Link href="/weight">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="p-3 flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-green-400 shrink-0" />
                <div>
                  <p className="text-sm font-medium">Log weight</p>
                  <p className="text-xs text-muted-foreground">Track body weight</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/planner">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="p-3 flex items-center gap-3">
                <Dumbbell className="h-5 w-5 text-blue-400 shrink-0" />
                <div>
                  <p className="text-sm font-medium">This week</p>
                  <p className="text-xs text-muted-foreground">View full planner</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/milestones">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="p-3 flex items-center gap-3">
                <Trophy className="h-5 w-5 text-purple-400 shrink-0" />
                <div>
                  <p className="text-sm font-medium">Milestones</p>
                  <p className="text-xs text-muted-foreground">October targets</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/travel">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="p-3 flex items-center gap-3">
                <Plane className="h-5 w-5 text-orange-400 shrink-0" />
                <div>
                  <p className="text-sm font-medium">Travel mode</p>
                  <p className="text-xs text-muted-foreground">Adapt plan</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}

function getWeeksUntilOctober(from: Date): number {
  const oct = new Date('2026-10-01')
  const diff = oct.getTime() - from.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24 * 7)))
}
