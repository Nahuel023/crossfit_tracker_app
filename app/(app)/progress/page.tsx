export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ProgressClient } from './progress-client'

export default async function ProgressPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: skillLogs } = await supabase
    .from('skill_logs')
    .select('*')
    .eq('user_id', user.id)
    .order('logged_at', { ascending: true })
    .limit(500)

  const { data: bodyWeightLogs } = await supabase
    .from('body_weight_logs')
    .select('*')
    .eq('user_id', user.id)
    .order('logged_at', { ascending: true })
    .limit(200)

  // Get block completions per week for volume summary
  const { data: completions } = await supabase
    .from('block_completions')
    .select('completed_at, created_at')
    .eq('user_id', user.id)
    .eq('status', 'completed')
    .order('completed_at', { ascending: true })

  return (
    <ProgressClient
      skillLogs={skillLogs ?? []}
      bodyWeightLogs={bodyWeightLogs ?? []}
      completions={completions ?? []}
    />
  )
}
