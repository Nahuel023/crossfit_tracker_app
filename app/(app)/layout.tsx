export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { NavBar } from '@/components/nav-bar'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // Count pending blocks from previous weeks
  const today = new Date()

  const { count: pendingCount } = await supabase
    .from('training_blocks')
    .select('id', { count: 'exact', head: true })
    .lt('week_start', getThisWeekStart(today))
    .not('id', 'in',
      `(select block_id from block_completions where user_id = '${user.id}' and status in ('completed','deleted'))`
    )

  return (
    <div className="min-h-screen bg-background">
      <NavBar pendingCount={pendingCount ?? 0} />
      <main className="lg:pl-56 pb-20 lg:pb-0">
        <div className="max-w-4xl mx-auto p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  )
}

function getThisWeekStart(date: Date): string {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  d.setDate(diff)
  d.setHours(0, 0, 0, 0)
  return d.toISOString().split('T')[0]
}
