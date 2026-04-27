'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BlockCard } from '@/components/block-card'
import { TrainingBlock, BlockCompletion } from '@/types/database'
import { Clock } from 'lucide-react'

interface PendingClientProps {
  pendingBlocks: TrainingBlock[]
  completions: BlockCompletion[]
}

export function PendingClient({ pendingBlocks, completions }: PendingClientProps) {
  const router = useRouter()

  // Group by week_start
  const grouped: Record<string, TrainingBlock[]> = {}
  pendingBlocks.forEach(b => {
    if (!grouped[b.week_start]) grouped[b.week_start] = []
    grouped[b.week_start].push(b)
  })

  const weekKeys = Object.keys(grouped).sort().reverse()

  function getWeekLabel(weekStart: string): string {
    const d = new Date(weekStart + 'T12:00:00')
    const end = new Date(d)
    end.setDate(end.getDate() + 6)
    return `${d.toLocaleDateString('es-AR', { month: 'short', day: 'numeric' })} – ${end.toLocaleDateString('es-AR', { month: 'short', day: 'numeric', year: 'numeric' })}`
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold">Bloques Pendientes</h1>
        <p className="text-sm text-muted-foreground">
          {pendingBlocks.length} bloque{pendingBlocks.length !== 1 ? 's' : ''} de semanas anteriores
        </p>
      </div>

      {pendingBlocks.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Clock className="h-10 w-10 mx-auto mb-3 text-muted-foreground/50" />
            <p className="font-medium">¡Todo al día!</p>
            <p className="text-sm text-muted-foreground mt-1">No hay bloques pendientes de semanas anteriores.</p>
          </CardContent>
        </Card>
      ) : (
        weekKeys.map(week => (
          <div key={week}>
            <div className="flex items-center gap-2 mb-2">
              <p className="text-sm font-medium text-muted-foreground">{getWeekLabel(week)}</p>
              <Badge variant="outline" className="text-xs">
                {grouped[week].length}
              </Badge>
            </div>
            <div className="space-y-2">
              {grouped[week].map(block => (
                <BlockCard
                  key={block.id}
                  block={block}
                  completion={completions.find(c => c.block_id === block.id)}
                  onStatusChange={() => router.refresh()}
                />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
