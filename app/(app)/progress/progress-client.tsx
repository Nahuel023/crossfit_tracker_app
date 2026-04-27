'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts'
import { SkillLog, BodyWeightLog } from '@/types/database'
import { getSkillLabel, getMetricLabel } from '@/lib/utils'
import { TrendingUp } from 'lucide-react'

const ALL_SKILLS = [
  'double_unders', 'pistol_squat', 'muscle_up_rings', 'muscle_up_bar',
  'hspu_strict', 'hspu_kipping', 'handstand_walk', 'pullup_strict',
  'pullup_butterfly', 'pullup_weighted', 'rope_climb', 'zone2_cardio',
  'snatch_technique', 'clean_and_jerk_technique',
]

interface ProgressClientProps {
  skillLogs: SkillLog[]
  bodyWeightLogs: BodyWeightLog[]
  completions: { completed_at: string | null; created_at: string }[]
}

const feelColors = ['', '#ef4444', '#f97316', '#eab308', '#22c55e', '#10b981']

export function ProgressClient({ skillLogs, bodyWeightLogs, completions }: ProgressClientProps) {
  const [selectedSkill, setSelectedSkill] = useState('pullup_strict')

  const skillsWithData = ALL_SKILLS.filter(s => skillLogs.some(l => l.skill === s))

  function getSkillChartData(skill: string) {
    return skillLogs
      .filter(l => l.skill === skill)
      .map(l => ({
        date: l.logged_at,
        label: new Date(l.logged_at + 'T12:00:00').toLocaleDateString('es-AR', { month: 'short', day: 'numeric' }),
        value: l.metric_value,
        metricType: l.metric_type,
        feel: l.feel,
      }))
  }

  function getSkillPR(skill: string) {
    const logs = skillLogs.filter(l => l.skill === skill)
    if (!logs.length) return null
    return logs.reduce((max, l) => l.metric_value > max.metric_value ? l : max)
  }

  // Monthly volume (completions per month)
  const monthlyData = (() => {
    const map: Record<string, number> = {}
    completions.forEach(c => {
      const date = c.completed_at || c.created_at
      if (!date) return
      const month = date.substring(0, 7)
      map[month] = (map[month] || 0) + 1
    })
    return Object.entries(map).sort().map(([month, count]) => ({
      label: new Date(month + '-01T12:00:00').toLocaleDateString('es-AR', { month: 'short', year: '2-digit' }),
      count,
    }))
  })()

  const selectedData = getSkillChartData(selectedSkill)
  const selectedPR = getSkillPR(selectedSkill)
  const metricType = selectedData[0]?.metricType ?? 'reps'

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold">Progreso</h1>
        <p className="text-sm text-muted-foreground">Seguí tus mejoras a lo largo del tiempo</p>
      </div>

      <Tabs defaultValue="skills">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="skills">Habilidades</TabsTrigger>
          <TabsTrigger value="volume">Volumen</TabsTrigger>
        </TabsList>

        <TabsContent value="skills" className="space-y-4 mt-4">
          {/* Skill selector */}
          <Select value={selectedSkill} onValueChange={setSelectedSkill}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ALL_SKILLS.map(s => (
                <SelectItem key={s} value={s}>
                  {getSkillLabel(s)}
                  {skillsWithData.includes(s) ? ' ✓' : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* PR badge */}
          {selectedPR && (
            <div className="flex items-center gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <TrendingUp className="h-4 w-4 text-yellow-400 shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Récord Personal</p>
                <p className="font-bold text-yellow-400">{selectedPR.metric_value} {getMetricLabel(selectedPR.metric_type)}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-xs text-muted-foreground">
                  {new Date(selectedPR.logged_at + 'T12:00:00').toLocaleDateString('es-AR', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>
          )}

          {/* Chart */}
          {selectedData.length > 1 ? (
            <Card>
              <CardContent className="pt-4">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={selectedData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="label"
                      tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                      interval="preserveStartEnd"
                    />
                    <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                    <Tooltip
                      contentStyle={{
                        background: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                      formatter={(v) => [`${v} ${getMetricLabel(metricType)}`, getSkillLabel(selectedSkill)]}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--chart-1))"
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--chart-1))', r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          ) : selectedData.length === 1 ? (
            <Card>
              <CardContent className="py-6 text-center">
                <p className="text-muted-foreground text-sm">Solo 1 registro. ¡Seguí registrando para ver el gráfico!</p>
                <p className="text-lg font-bold mt-2">{selectedData[0].value} {getMetricLabel(metricType)}</p>
                <p className="text-xs text-muted-foreground">{selectedData[0].label}</p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-6 text-center">
                <p className="text-muted-foreground text-sm">Sin datos para {getSkillLabel(selectedSkill)}.</p>
                <p className="text-xs text-muted-foreground mt-1">Registrá esta habilidad después de entrenar.</p>
              </CardContent>
            </Card>
          )}

          {/* Recent logs for this skill */}
          {selectedData.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Registros recientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[...selectedData].reverse().slice(0, 8).map((entry, i) => (
                    <div key={i} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ background: feelColors[entry.feel] }}
                        />
                        <p className="text-sm font-medium">{entry.value} {getMetricLabel(entry.metricType)}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">{entry.label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* All PRs table */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Récords Personales</CardTitle>
            </CardHeader>
            <CardContent>
              {skillsWithData.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-4">Sin datos todavía. ¡Empezá a registrar!</p>
              ) : (
                <div className="space-y-2">
                  {skillsWithData.map(skill => {
                    const pr = getSkillPR(skill)
                    if (!pr) return null
                    return (
                      <div key={skill} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                        <p className="text-sm">{getSkillLabel(skill)}</p>
                        <div className="text-right">
                          <p className="text-sm font-bold">{pr.metric_value} {getMetricLabel(pr.metric_type)}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(pr.logged_at + 'T12:00:00').toLocaleDateString('es-AR', { month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="volume" className="space-y-4 mt-4">
          {monthlyData.length > 0 ? (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Bloques completados por mes</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={monthlyData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="label"
                      tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                    <Tooltip
                      contentStyle={{
                        background: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                      formatter={(v) => [v, 'Bloques']}
                    />
                    <Bar dataKey="count" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground text-sm">Completá algunos bloques para ver el volumen.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
