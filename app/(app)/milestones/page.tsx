export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { MilestonesClient } from './milestones-client'

const DEFAULT_MILESTONES = [
  { skill: 'double_unders', target_value: 50, target_unit: 'reps', is_minimum: true },
  { skill: 'double_unders', target_value: 80, target_unit: 'reps', is_minimum: false },
  { skill: 'pistol_squat', target_value: 5, target_unit: 'reps each leg', is_minimum: true },
  { skill: 'pistol_squat', target_value: 10, target_unit: 'reps each leg', is_minimum: false },
  { skill: 'muscle_up_rings', target_value: 3, target_unit: 'reps', is_minimum: true },
  { skill: 'muscle_up_rings', target_value: 5, target_unit: 'reps chained', is_minimum: false },
  { skill: 'hspu_strict', target_value: 7, target_unit: 'reps', is_minimum: true },
  { skill: 'hspu_kipping', target_value: 10, target_unit: 'reps chained', is_minimum: false },
  { skill: 'handstand_walk', target_value: 10, target_unit: 'm', is_minimum: true },
  { skill: 'handstand_walk', target_value: 20, target_unit: 'm', is_minimum: false },
  { skill: 'pullup_butterfly', target_value: 15, target_unit: 'reps chained', is_minimum: true },
  { skill: 'pullup_butterfly', target_value: 25, target_unit: 'reps chained', is_minimum: false },
  { skill: 'rope_climb', target_value: 3, target_unit: 'climbs technical', is_minimum: true },
  { skill: 'rope_climb', target_value: 4, target_unit: 'climbs (+1 strict)', is_minimum: false },
  { skill: 'pullup_strict', target_value: 20, target_unit: 'reps consecutive', is_minimum: true },
  { skill: 'pullup_weighted', target_value: 30, target_unit: 'kg 1RM weighted', is_minimum: false },
  { skill: 'zone2_cardio', target_value: 40, target_unit: 'min without fatigue', is_minimum: true },
]

export default async function MilestonesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Ensure milestones exist for this user (idempotent)
  const { data: existing } = await supabase
    .from('milestone_checks')
    .select('skill, is_minimum')
    .eq('user_id', user.id)

  const existingSet = new Set((existing ?? []).map(m => `${m.skill}_${m.is_minimum}`))
  const toInsert = DEFAULT_MILESTONES.filter(
    m => !existingSet.has(`${m.skill}_${m.is_minimum}`)
  ).map(m => ({ ...m, user_id: user.id }))

  if (toInsert.length > 0) {
    await supabase.from('milestone_checks').insert(toInsert)
  }

  const { data: milestones } = await supabase
    .from('milestone_checks')
    .select('*')
    .eq('user_id', user.id)
    .order('skill')
    .order('is_minimum', { ascending: false })

  const { data: competitions } = await supabase
    .from('competition_results')
    .select('*')
    .eq('user_id', user.id)
    .order('competition_date', { ascending: false })

  return (
    <MilestonesClient
      milestones={milestones ?? []}
      competitions={competitions ?? []}
      userId={user.id}
    />
  )
}
