export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { DashboardClient } from '../dashboard-client'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const today = new Date()
  const todayISO = today.toISOString().split('T')[0]
  const weekStart = getWeekStart(today)
  const weekStartISO = weekStart.toISOString().split('T')[0]
  const dayOfWeek = today.getDay() === 0 ? 6 : today.getDay() - 1

  const { data: todayBlocks } = await supabase
    .from('training_blocks')
    .select('*')
    .eq('week_start', weekStartISO)
    .eq('day_of_week', dayOfWeek)
    .eq('is_travel_block', false)
    .order('category')

  const blockIds = todayBlocks?.map(b => b.id) ?? []
  const { data: completions } = blockIds.length > 0
    ? await supabase
        .from('block_completions')
        .select('*')
        .in('block_id', blockIds)
        .eq('user_id', user.id)
    : { data: [] }

  const { data: recentCompletions } = await supabase
    .from('block_completions')
    .select('completed_at')
    .eq('user_id', user.id)
    .eq('status', 'completed')
    .not('completed_at', 'is', null)
    .order('completed_at', { ascending: false })
    .limit(60)

  const streak = calculateStreak(recentCompletions ?? [])

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { count: pendingCount } = await supabase
    .from('training_blocks')
    .select('id', { count: 'exact', head: true })
    .lt('week_start', weekStartISO)
    .eq('is_travel_block', false)
    .not('id', 'in',
      `(select block_id from block_completions where user_id = '${user.id}' and status in ('completed','deleted'))`
    )

  return (
    <DashboardClient
      todayBlocks={todayBlocks ?? []}
      completions={completions ?? []}
      streak={streak}
      profile={profile}
      pendingCount={pendingCount ?? 0}
      todayDate={todayISO}
      dayOfWeek={dayOfWeek}
    />
  )
}

function getWeekStart(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  d.setDate(diff)
  d.setHours(0, 0, 0, 0)
  return d
}

function calculateStreak(completions: { completed_at: string | null }[]): number {
  if (!completions.length) return 0
  const uniqueDays = new Set(
    completions
      .filter(c => c.completed_at)
      .map(c => c.completed_at!.split('T')[0])
  )
  let streak = 0
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  for (let i = 0; i < 60; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const iso = d.toISOString().split('T')[0]
    if (uniqueDays.has(iso)) {
      streak++
    } else if (i > 0) {
      break
    }
  }
  return streak
}
