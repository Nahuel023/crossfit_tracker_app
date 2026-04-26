export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { PendingClient } from './pending-client'

export default async function PendingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const today = new Date()
  const weekStart = getWeekStart(today)
  const weekStartISO = weekStart.toISOString().split('T')[0]

  // Get all past blocks not completed or deleted
  const { data: blocks } = await supabase
    .from('training_blocks')
    .select('*')
    .lt('week_start', weekStartISO)
    .eq('is_travel_block', false)
    .order('week_start', { ascending: false })
    .order('day_of_week')

  const blockIds = blocks?.map(b => b.id) ?? []
  const { data: completions } = blockIds.length > 0
    ? await supabase
        .from('block_completions')
        .select('*')
        .in('block_id', blockIds)
        .eq('user_id', user.id)
    : { data: [] }

  // Filter to only truly pending (no completion record, or status not completed/deleted)
  const completionMap = new Map((completions ?? []).map(c => [c.block_id, c]))
  const pendingBlocks = (blocks ?? []).filter(b => {
    const c = completionMap.get(b.id)
    return !c || (c.status !== 'completed' && c.status !== 'deleted')
  })

  return (
    <PendingClient
      pendingBlocks={pendingBlocks}
      completions={completions ?? []}
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
