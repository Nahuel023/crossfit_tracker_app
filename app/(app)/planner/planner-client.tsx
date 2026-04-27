'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BlockCard } from '@/components/block-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { TrainingBlock, BlockCompletion } from '@/types/database'
import { DAY_NAMES, DAY_NAMES_FULL, getCategoryDotColor } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface PlannerClientProps {
  blocks: TrainingBlock[]
  completions: BlockCompletion[]
  weekStartISO: string
  todayISO: string
}

export function PlannerClient({ blocks, completions, weekStartISO, todayISO }: PlannerClientProps) {
  const router = useRouter()
  const [selectedDay, setSelectedDay] = useState(() => {
    const today = new Date(todayISO + 'T12:00:00')
    const weekStart = new Date(weekStartISO + 'T12:00:00')
    const diff = Math.floor((today.getTime() - weekStart.getTime()) / (1000 * 60 * 60 * 24))
    return diff >= 0 && diff <= 6 ? diff : 0
  })

  const weekStart = new Date(weekStartISO + 'T12:00:00')
  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekEnd.getDate() + 6)

  function prevWeek() {
    const d = new Date(weekStart)
    d.setDate(d.getDate() - 7)
    router.push(`/planner?week=${d.toISOString().split('T')[0]}`)
  }

  function nextWeek() {
    const d = new Date(weekStart)
    d.setDate(d.getDate() + 7)
    router.push(`/planner?week=${d.toISOString().split('T')[0]}`)
  }

  function getDayDate(dayIndex: number): Date {
    const d = new Date(weekStart)
    d.setDate(d.getDate() + dayIndex)
    return d
  }

  function getDayBlocks(dayIndex: number) {
    return blocks.filter(b => b.day_of_week === dayIndex)
  }

  function getDayCompletion(dayIndex: number) {
    const dayBlocks = getDayBlocks(dayIndex)
    if (dayBlocks.length === 0) return 'empty'
    const dayCompletions = completions.filter(c =>
      dayBlocks.some(b => b.id === c.block_id)
    )
    const completed = dayCompletions.filter(c => c.status === 'completed').length
    if (completed === dayBlocks.length) return 'full'
    if (completed > 0) return 'partial'
    return 'none'
  }

  function isToday(dayIndex: number): boolean {
    const d = getDayDate(dayIndex)
    return d.toISOString().split('T')[0] === todayISO
  }

  const selectedBlocks = getDayBlocks(selectedDay)
  const weekLabel = `${weekStart.toLocaleDateString('es-AR', { month: 'short', day: 'numeric' })} – ${weekEnd.toLocaleDateString('es-AR', { month: 'short', day: 'numeric', year: 'numeric' })}`

  const weekCompleted = completions.filter(c => c.status === 'completed').length
  const weekTotal = blocks.length

  return (
    <div className="space-y-4">
      {/* Week header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={prevWeek}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-center">
          <p className="font-semibold text-sm">{weekLabel}</p>
          <p className="text-xs text-muted-foreground">{weekCompleted}/{weekTotal} completados</p>
        </div>
        <Button variant="ghost" size="icon" onClick={nextWeek}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Day tabs */}
      <div className="grid grid-cols-7 gap-1">
        {DAY_NAMES.map((name, i) => {
          const status = getDayCompletion(i)
          const today = isToday(i)
          const dayDate = getDayDate(i)
          const blockCount = getDayBlocks(i).length

          return (
            <button
              key={i}
              onClick={() => setSelectedDay(i)}
              className={cn(
                'flex flex-col items-center py-2 px-1 rounded-lg transition-colors',
                selectedDay === i
                  ? 'bg-primary text-primary-foreground'
                  : today
                  ? 'bg-accent border border-primary/30 text-foreground'
                  : 'hover:bg-accent text-muted-foreground'
              )}
            >
              <span className="text-[10px] font-medium">{name}</span>
              <span className="text-sm font-bold">{dayDate.getDate()}</span>
              <div className="flex gap-0.5 mt-1 h-2 items-center">
                {blockCount > 0 && (
                  <span className={cn(
                    'w-1.5 h-1.5 rounded-full',
                    status === 'full' ? 'bg-green-500' :
                    status === 'partial' ? 'bg-yellow-500' :
                    selectedDay === i ? 'bg-primary-foreground/60' : 'bg-muted-foreground/40'
                  )} />
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Day blocks */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">
            {DAY_NAMES_FULL[selectedDay]} — {getDayDate(selectedDay).toLocaleDateString('es-AR', { month: 'short', day: 'numeric' })}
          </h2>
          <Badge variant="outline" className="text-xs">
            {selectedBlocks.length} bloque{selectedBlocks.length !== 1 ? 's' : ''}
          </Badge>
        </div>

        {selectedBlocks.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">Sin bloques</p>
            <p className="text-xs mt-1">Día de descanso 🌟</p>
          </div>
        ) : (
          <div className="space-y-2">
            {selectedBlocks.map(block => (
              <BlockCard
                key={block.id}
                block={block}
                completion={completions.find(c => c.block_id === block.id)}
                onStatusChange={() => router.refresh()}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
