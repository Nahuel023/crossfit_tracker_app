export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { TravelClient } from './travel-client'

export default async function TravelPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Get generic travel blocks (not tied to a specific week)
  const { data: travelBlocks } = await supabase
    .from('training_blocks')
    .select('*')
    .eq('is_travel_block', true)

  return <TravelClient travelBlocks={travelBlocks ?? []} userId={user.id} />
}
