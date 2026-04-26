export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { WeightClient } from './weight-client'

export default async function WeightPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: logs } = await supabase
    .from('body_weight_logs')
    .select('*')
    .eq('user_id', user.id)
    .order('logged_at', { ascending: true })
    .limit(200)

  return <WeightClient initialLogs={logs ?? []} userId={user.id} />
}
