export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { PlannerClient } from './planner-client'

export default async function PlannerPage({
  searchParams,
}: {
  searchParams: Promise<{ week?: string }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const params = await searchParams
  const requestedWeek = params.week
  const today = new Date()
  const weekStart = requestedWeek
    ? new Date(requestedWeek + 'T12:00:00')
    : getWeekStart(today)
  const weekStartISO = weekStart.toISOString().split('T')[0]

  const { data: blocks } = await supabase
    .from('training_blocks')
    .select('*')
    .eq('week_start', weekStartISO)
    .eq('is_travel_block', false)
    .order('day_of_week')
    .order('category')

  const blockIds = blocks?.map(b => b.id) ?? []
  const { data: completions } = blockIds.length > 0
    ? await supabase
        .from('block_completions')
        .select('*')
        .in('block_id', blockIds)
        .eq('user_id', user.id)
    : { data: [] }

  return (
    <PlannerClient
      blocks={blocks ?? []}
      completions={completions ?? []}
      weekStartISO={weekStartISO}
      todayISO={today.toISOString().split('T')[0]}
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
