'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Sun, Moon, LogOut, User, Dumbbell } from 'lucide-react'
import { Profile } from '@/types/database'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

interface SettingsClientProps {
  profile: Profile | null
  userId: string
  email: string
}

export function SettingsClient({ profile, userId, email }: SettingsClientProps) {
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)

  const [name, setName] = useState(profile?.name ?? 'Nahuel')
  const [weightKg, setWeightKg] = useState(profile?.weight_kg?.toString() ?? '101.5')
  const [heightCm, setHeightCm] = useState(profile?.height_cm?.toString() ?? '185')

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        name,
        weight_kg: parseFloat(weightKg),
        height_cm: parseFloat(heightCm),
      })
    if (error) {
      toast.error('Failed to save profile')
    } else {
      toast.success('Profile updated!')
    }
    setLoading(false)
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const bmi = profile
    ? (parseFloat(weightKg) / Math.pow(parseFloat(heightCm) / 100, 2)).toFixed(1)
    : null

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>

      {/* Profile */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveProfile} className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Name</Label>
              <Input value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Weight (kg)</Label>
                <Input
                  type="number"
                  step="0.5"
                  min="40"
                  max="200"
                  value={weightKg}
                  onChange={e => setWeightKg(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Height (cm)</Label>
                <Input
                  type="number"
                  step="1"
                  min="100"
                  max="250"
                  value={heightCm}
                  onChange={e => setHeightCm(e.target.value)}
                  required
                />
              </div>
            </div>
            {bmi && (
              <p className="text-xs text-muted-foreground">BMI: {bmi}</p>
            )}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Saving…' : 'Save profile'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Starting marks */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Dumbbell className="h-4 w-4" />
            Starting Marks (May 2026)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {[
              ['Snatch', '65 kg'],
              ['Clean & Jerk', '70 kg'],
              ['Front Squat', '90 kg'],
              ['Back Squat', '100 kg'],
              ['Deadlift', '160 kg'],
              ['Strict Pull-Ups', '5 consecutive'],
              ['Kipping Pull-Ups', '10'],
              ['HSPU', '3 partial strict'],
              ['Handstand Walk', '2-3 steps'],
              ['Muscle-Up', '1-2 with momentum'],
            ].map(([skill, value]) => (
              <div key={skill} className="flex justify-between py-1.5 border-b border-border last:border-0">
                <span className="text-muted-foreground">{skill}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Appearance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              <span className="text-sm">{theme === 'dark' ? 'Dark mode' : 'Light mode'}</span>
            </div>
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={checked => setTheme(checked ? 'dark' : 'light')}
            />
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Sign out */}
      <Button variant="destructive" className="w-full" onClick={handleSignOut}>
        <LogOut className="h-4 w-4 mr-2" />
        Sign out
      </Button>
    </div>
  )
}
