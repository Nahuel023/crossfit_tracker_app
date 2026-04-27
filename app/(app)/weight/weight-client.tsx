'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { BodyWeightLog } from '@/types/database'
import { Scale, TrendingDown } from 'lucide-react'

interface WeightClientProps {
  initialLogs: BodyWeightLog[]
  userId: string
}

export function WeightClient({ initialLogs, userId }: WeightClientProps) {
  const [logs, setLogs] = useState(initialLogs)
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [weight, setWeight] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!weight) return
    setLoading(true)
    const { data, error } = await supabase
      .from('body_weight_logs')
      .insert({ user_id: userId, weight_kg: parseFloat(weight), logged_at: date, notes: notes || null })
      .select()
      .single()
    if (error) {
      toast.error('Error al guardar')
    } else {
      toast.success('¡Peso registrado!')
      setLogs(prev => [...prev, data].sort((a, b) => a.logged_at.localeCompare(b.logged_at)))
      setWeight('')
      setNotes('')
    }
    setLoading(false)
  }

  const chartData = logs.map(l => ({
    date: l.logged_at,
    weight: l.weight_kg,
    label: new Date(l.logged_at + 'T12:00:00').toLocaleDateString('es-AR', { month: 'short', day: 'numeric' }),
  }))

  const latestWeight = logs.length > 0 ? logs[logs.length - 1].weight_kg : null
  const startWeight = logs.length > 0 ? logs[0].weight_kg : 101.5
  const change = latestWeight ? latestWeight - startWeight : 0

  const minWeight = Math.min(...logs.map(l => l.weight_kg), 93) - 1
  const maxWeight = Math.max(...logs.map(l => l.weight_kg), 102) + 1

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold">Peso Corporal</h1>
        <p className="text-sm text-muted-foreground">Objetivo: 93–95 kg para octubre 2026</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-3 text-center">
            <Scale className="h-4 w-4 mx-auto mb-1 text-blue-400" />
            <p className="text-lg font-bold">{latestWeight ?? 101.5} kg</p>
            <p className="text-xs text-muted-foreground">Actual</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <TrendingDown className="h-4 w-4 mx-auto mb-1 text-green-400" />
            <p className="text-lg font-bold">{change > 0 ? '+' : ''}{change.toFixed(1)} kg</p>
            <p className="text-xs text-muted-foreground">Cambio</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <p className="text-sm font-bold text-orange-400 mt-1">93–95</p>
            <p className="text-xs text-muted-foreground">Objetivo kg</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      {logs.length > 1 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Peso en el tiempo</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  domain={[minWeight, maxWeight]}
                  tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                />
                <Tooltip
                  contentStyle={{
                    background: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  formatter={(v) => [`${v} kg`, 'Peso']}
                />
                <ReferenceLine y={93} stroke="hsl(var(--chart-2))" strokeDasharray="4 4" label={{ value: '93 kg', fontSize: 10, fill: 'hsl(var(--chart-2))' }} />
                <ReferenceLine y={95} stroke="hsl(var(--chart-2))" strokeDasharray="4 4" label={{ value: '95 kg', fontSize: 10, fill: 'hsl(var(--chart-2))' }} />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--chart-1))', r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Log form */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Registrar peso</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Fecha</Label>
                <Input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Peso (kg)</Label>
                <Input
                  type="number"
                  step="0.1"
                  min="50"
                  max="200"
                  value={weight}
                  onChange={e => setWeight(e.target.value)}
                  placeholder="101.5"
                  required
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Notas (opcional)</Label>
              <Input
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="En ayunas, por la mañana…"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Guardando…' : 'Registrar peso'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* History */}
      {logs.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Registros recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[...logs].reverse().slice(0, 10).map(log => (
                <div key={log.id} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium">{log.weight_kg} kg</p>
                    {log.notes && <p className="text-xs text-muted-foreground">{log.notes}</p>}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(log.logged_at + 'T12:00:00').toLocaleDateString('es-AR', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
