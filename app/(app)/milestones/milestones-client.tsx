'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CheckCircle2, Circle, Trophy, Plus, Target } from 'lucide-react'
import { MilestoneCheck, CompetitionResult } from '@/types/database'
import { getSkillLabel } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface MilestonesClientProps {
  milestones: MilestoneCheck[]
  competitions: CompetitionResult[]
  userId: string
}

export function MilestonesClient({ milestones, competitions: initialCompetitions, userId }: MilestonesClientProps) {
  const router = useRouter()
  const supabase = createClient()
  const [selectedMilestone, setSelectedMilestone] = useState<MilestoneCheck | null>(null)
  const [achievedValue, setAchievedValue] = useState('')
  const [achievedDate, setAchievedDate] = useState(new Date().toISOString().split('T')[0])
  const [loading, setLoading] = useState(false)
  const [showAddComp, setShowAddComp] = useState(false)
  const [competitions, setCompetitions] = useState(initialCompetitions)

  // Competition form state
  const [compDate, setCompDate] = useState('')
  const [compName, setCompName] = useState('')
  const [compCategory, setCompCategory] = useState<'scaled' | 'rx'>('scaled')
  const [compNotes, setCompNotes] = useState('')

  // Group milestones by skill
  const skillGroups: Record<string, { minimum?: MilestoneCheck; ideal?: MilestoneCheck }> = {}
  milestones.forEach(m => {
    if (!skillGroups[m.skill]) skillGroups[m.skill] = {}
    if (m.is_minimum) skillGroups[m.skill].minimum = m
    else skillGroups[m.skill].ideal = m
  })

  const totalMinimum = milestones.filter(m => m.is_minimum).length
  const achievedMinimum = milestones.filter(m => m.is_minimum && m.achieved_at).length
  const totalIdeal = milestones.filter(m => !m.is_minimum).length
  const achievedIdeal = milestones.filter(m => !m.is_minimum && m.achieved_at).length

  async function handleMarkAchieved(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedMilestone || !achievedValue) return
    setLoading(true)
    const { error } = await supabase
      .from('milestone_checks')
      .update({
        achieved_value: parseFloat(achievedValue),
        achieved_at: achievedDate,
      })
      .eq('id', selectedMilestone.id)
    if (error) {
      toast.error('Failed to save')
    } else {
      toast.success('¡Meta lograda! 🎉')
      setSelectedMilestone(null)
      router.refresh()
    }
    setLoading(false)
  }

  async function handleUnmark(milestone: MilestoneCheck) {
    await supabase
      .from('milestone_checks')
      .update({ achieved_value: null, achieved_at: null })
      .eq('id', milestone.id)
    router.refresh()
  }

  async function handleAddCompetition(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const { data, error } = await supabase
      .from('competition_results')
      .insert({
        user_id: userId,
        competition_date: compDate,
        competition_name: compName,
        category: compCategory,
        notes: compNotes,
      })
      .select()
      .single()
    if (error) {
      toast.error('Failed to save')
    } else {
      toast.success('¡Competencia registrada!')
      setCompetitions(prev => [data, ...prev])
      setShowAddComp(false)
      setCompDate('')
      setCompName('')
      setCompNotes('')
    }
    setLoading(false)
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold">Metas de Octubre</h1>
        <p className="text-sm text-muted-foreground">Objetivos de competencia para octubre 2026</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">Objetivos mínimos</p>
              <Target className="h-4 w-4 text-yellow-400" />
            </div>
            <p className="text-xl font-bold">{achievedMinimum}/{totalMinimum}</p>
            <Progress value={(achievedMinimum / totalMinimum) * 100} className="mt-2 h-1.5" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">Objetivos ideales</p>
              <Trophy className="h-4 w-4 text-purple-400" />
            </div>
            <p className="text-xl font-bold">{achievedIdeal}/{totalIdeal}</p>
            <Progress value={(achievedIdeal / totalIdeal) * 100} className="mt-2 h-1.5" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="milestones">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="milestones">Metas</TabsTrigger>
          <TabsTrigger value="competitions">Competencias</TabsTrigger>
        </TabsList>

        <TabsContent value="milestones" className="space-y-3 mt-4">
          {Object.entries(skillGroups).map(([skill, { minimum, ideal }]) => (
            <Card key={skill}>
              <CardHeader className="pb-2 pt-3 px-4">
                <CardTitle className="text-sm">{getSkillLabel(skill)}</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-3 space-y-2">
                {minimum && (
                  <MilestoneRow
                    milestone={minimum}
                    label="Mínimo"
                    onMark={() => { setSelectedMilestone(minimum); setAchievedValue('') }}
                    onUnmark={() => handleUnmark(minimum)}
                  />
                )}
                {ideal && (
                  <MilestoneRow
                    milestone={ideal}
                    label="Ideal"

                    onMark={() => { setSelectedMilestone(ideal); setAchievedValue('') }}
                    onUnmark={() => handleUnmark(ideal)}
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="competitions" className="space-y-4 mt-4">
          <Button onClick={() => setShowAddComp(true)} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Registrar competencia
          </Button>

          {competitions.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <Trophy className="h-8 w-8 mx-auto mb-2 text-muted-foreground/30" />
                <p className="text-sm text-muted-foreground">Sin competencias registradas todavía.</p>
              </CardContent>
            </Card>
          ) : (
            competitions.map(comp => (
              <Card key={comp.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{comp.competition_name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {new Date(comp.competition_date + 'T12:00:00').toLocaleDateString('es-AR', {
                          weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
                        })}
                      </p>
                    </div>
                    <Badge className={comp.category === 'rx' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}>
                      {comp.category.toUpperCase()}
                    </Badge>
                  </div>
                  {comp.notes && (
                    <p className="text-sm text-muted-foreground mt-2 border-t border-border pt-2">{comp.notes}</p>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>

      {/* Mark achieved dialog */}
      <Dialog open={!!selectedMilestone} onOpenChange={open => !open && setSelectedMilestone(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Marcar Meta Lograda</DialogTitle>
          </DialogHeader>
          {selectedMilestone && (
            <form onSubmit={handleMarkAchieved} className="space-y-4">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium">{getSkillLabel(selectedMilestone.skill)}</p>
                <p className="text-xs text-muted-foreground">
                  Objetivo: {selectedMilestone.target_value} {selectedMilestone.target_unit}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs">Valor logrado</Label>
                  <Input
                    type="number"
                    step="0.5"
                    min="0"
                    value={achievedValue}
                    onChange={e => setAchievedValue(e.target.value)}
                    placeholder={selectedMilestone.target_value.toString()}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Fecha</Label>
                  <Input
                    type="date"
                    value={achievedDate}
                    onChange={e => setAchievedDate(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setSelectedMilestone(null)}>
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? 'Guardando…' : 'Marcar logrado'}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Add competition dialog */}
      <Dialog open={showAddComp} onOpenChange={setShowAddComp}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Registrar Competencia</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddCompetition} className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Nombre de la competencia</Label>
              <Input
                value={compName}
                onChange={e => setCompName(e.target.value)}
                placeholder="e.g. CrossFit Open 26.1"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Date</Label>
                <Input type="date" value={compDate} onChange={e => setCompDate(e.target.value)} required />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Categoría</Label>
                <Select value={compCategory} onValueChange={v => setCompCategory(v as 'scaled' | 'rx')}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scaled">Scaled</SelectItem>
                    <SelectItem value="rx">Rx</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Notas / resultado</Label>
              <Textarea
                value={compNotes}
                onChange={e => setCompNotes(e.target.value)}
                placeholder="Descripción del WOD, score, cómo salió…"
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setShowAddComp(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? 'Guardando…' : 'Guardar'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function MilestoneRow({
  milestone,
  label,
  onMark,
  onUnmark,
}: {
  milestone: MilestoneCheck
  label: string
  onMark: () => void
  onUnmark: () => void
}) {
  const achieved = !!milestone.achieved_at

  return (
    <div className={cn(
      'flex items-center gap-3 p-2 rounded-lg',
      achieved ? 'bg-green-500/10' : 'bg-muted/50'
    )}>
      <button onClick={achieved ? onUnmark : onMark} className="shrink-0">
        {achieved
          ? <CheckCircle2 className="h-5 w-5 text-green-500" />
          : <Circle className="h-5 w-5 text-muted-foreground" />
        }
      </button>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={cn('text-[10px] px-1.5 py-0', label === 'Mínimo' ? 'border-yellow-500/40 text-yellow-400' : 'border-purple-500/40 text-purple-400')}>
            {label}
          </Badge>
          <span className="text-sm font-medium">{milestone.target_value} {milestone.target_unit}</span>
        </div>
        {achieved && milestone.achieved_value && (
          <p className="text-xs text-green-400 mt-0.5">
            Logrado: {milestone.achieved_value} {milestone.target_unit} el {new Date(milestone.achieved_at! + 'T12:00:00').toLocaleDateString('es-AR', { month: 'short', day: 'numeric' })}
          </p>
        )}
      </div>
    </div>
  )
}
