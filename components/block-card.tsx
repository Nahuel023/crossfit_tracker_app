'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CheckCircle2, Circle, Trash2, ChevronDown, ChevronUp, Dumbbell } from 'lucide-react'
import { cn, getCategoryColor, getCategoryDotColor, getCategoryLabel, getSkillLabel, getMetricLabel } from '@/lib/utils'
import { TrainingBlock, BlockCompletion, MetricType } from '@/types/database'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

interface BlockCardProps {
  block: TrainingBlock
  completion?: BlockCompletion
  onStatusChange?: () => void
  showDate?: boolean
  dateLabel?: string
}

const feelLabels = ['', 'Terrible', 'Mal', 'OK', 'Bien', 'Excelente']
const feelColors = ['', 'text-red-500', 'text-orange-500', 'text-yellow-500', 'text-green-500', 'text-emerald-500']

export function BlockCard({ block, completion, onStatusChange, showDate, dateLabel }: BlockCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [showLog, setShowLog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [skill, setSkill] = useState(block.skills[0] ?? '')
  const [metricType, setMetricType] = useState<MetricType>('reps')
  const [metricValue, setMetricValue] = useState('')
  const [feel, setFeel] = useState<number>(3)
  const [notes, setNotes] = useState('')
  const supabase = createClient()

  const isCompleted = completion?.status === 'completed'
  const isDeleted = completion?.status === 'deleted'

  async function toggleComplete() {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    if (isCompleted) {
      await supabase.from('block_completions').delete().eq('block_id', block.id).eq('user_id', user.id)
    } else {
      await supabase.from('block_completions').upsert({
        user_id: user.id,
        block_id: block.id,
        status: 'completed',
        completed_at: new Date().toISOString(),
      }, { onConflict: 'user_id,block_id' })
    }
    setLoading(false)
    onStatusChange?.()
  }

  async function handleDelete() {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('block_completions').upsert({
      user_id: user.id,
      block_id: block.id,
      status: 'deleted',
    }, { onConflict: 'user_id,block_id' })
    setLoading(false)
    onStatusChange?.()
  }

  async function handleLogSkill(e: React.FormEvent) {
    e.preventDefault()
    if (!metricValue || !skill) return
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { error } = await supabase.from('skill_logs').insert({
      user_id: user.id,
      block_id: block.id,
      skill,
      metric_type: metricType,
      metric_value: parseFloat(metricValue),
      feel,
      notes: notes || null,
      logged_at: new Date().toISOString().split('T')[0],
    })
    if (error) {
      toast.error('Error al registrar')
    } else {
      toast.success('¡Registrado!')
      setShowLog(false)
      setMetricValue('')
      setNotes('')
      // auto-complete the block
      if (!isCompleted) {
        await supabase.from('block_completions').upsert({
          user_id: user.id,
          block_id: block.id,
          status: 'completed',
          completed_at: new Date().toISOString(),
        }, { onConflict: 'user_id,block_id' })
        onStatusChange?.()
      }
    }
    setLoading(false)
  }

  if (isDeleted) return null

  return (
    <>
      <Card className={cn(
        'transition-all duration-200',
        isCompleted && 'opacity-60',
      )}>
        <CardContent className="p-3">
          <div className="flex items-start gap-3">
            <button
              onClick={toggleComplete}
              disabled={loading}
              className="mt-0.5 shrink-0 transition-colors"
            >
              {isCompleted
                ? <CheckCircle2 className="h-5 w-5 text-green-500" />
                : <Circle className="h-5 w-5 text-muted-foreground" />
              }
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  {showDate && dateLabel && (
                    <p className="text-xs text-muted-foreground mb-0.5">{dateLabel}</p>
                  )}
                  <p className={cn('font-medium text-sm leading-snug', isCompleted && 'line-through text-muted-foreground')}>
                    {block.title}
                  </p>
                </div>
                <Badge className={cn('text-[10px] px-1.5 py-0 shrink-0', getCategoryColor(block.category as any))}>
                  {getCategoryLabel(block.category as any)}
                </Badge>
              </div>

              {block.skills.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {block.skills.slice(0, 3).map(s => (
                    <span key={s} className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">
                      {getSkillLabel(s)}
                    </span>
                  ))}
                  {block.skills.length > 3 && (
                    <span className="text-[10px] text-muted-foreground">+{block.skills.length - 3}</span>
                  )}
                </div>
              )}

              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => setExpanded(e => !e)}
                  className="text-xs text-muted-foreground flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  {expanded ? 'Menos' : 'Detalles'}
                </button>
                {block.skills.length > 0 && (
                  <button
                    onClick={() => setShowLog(true)}
                    className="text-xs text-blue-400 flex items-center gap-1 hover:text-blue-300 transition-colors"
                  >
                    <Dumbbell className="h-3 w-3" />
                    Registrar
                  </button>
                )}
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="ml-auto text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

              {expanded && (
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed border-t border-border pt-2">
                  {block.description}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Log skill dialog */}
      <Dialog open={showLog} onOpenChange={setShowLog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Registrar — {block.title}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleLogSkill} className="space-y-4">
            <div className="space-y-2">
              <Label>Habilidad</Label>
              <Select value={skill} onValueChange={setSkill}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {block.skills.map(s => (
                    <SelectItem key={s} value={s}>{getSkillLabel(s)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Métrica</Label>
                <Select value={metricType} onValueChange={v => setMetricType(v as MetricType)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reps">Reps</SelectItem>
                    <SelectItem value="weight_kg">Peso (kg)</SelectItem>
                    <SelectItem value="time_seconds">Tiempo (seg)</SelectItem>
                    <SelectItem value="distance_meters">Distancia (m)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Value ({getMetricLabel(metricType)})</Label>
                <Input
                  type="number"
                  step="0.5"
                  min="0"
                  value={metricValue}
                  onChange={e => setMetricValue(e.target.value)}
                  placeholder="0"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>¿Cómo te sentiste? <span className={cn('font-medium', feelColors[feel])}>{feelLabels[feel]}</span></Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setFeel(n)}
                    className={cn(
                      'flex-1 py-2 rounded-lg border text-sm font-medium transition-colors',
                      feel === n
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border text-muted-foreground hover:border-primary/50'
                    )}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Notas (opcional)</Label>
              <Textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Notas sobre la sesión…"
                rows={2}
              />
            </div>

            <div className="flex gap-2">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setShowLog(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? 'Guardando…' : 'Guardar'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
