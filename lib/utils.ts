import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Category, Phase } from '@/types/database'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCategoryColor(category: Category): string {
  const colors: Record<Category, string> = {
    strength: 'bg-red-500/20 text-red-400 border-red-500/30',
    gymnastics: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    cardio: 'bg-green-500/20 text-green-400 border-green-500/30',
    olympic_lifting: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    travel: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    milestone: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  }
  return colors[category] ?? 'bg-gray-500/20 text-gray-400 border-gray-500/30'
}

export function getCategoryDotColor(category: Category): string {
  const colors: Record<Category, string> = {
    strength: 'bg-red-500',
    gymnastics: 'bg-blue-500',
    cardio: 'bg-green-500',
    olympic_lifting: 'bg-yellow-500',
    travel: 'bg-orange-500',
    milestone: 'bg-purple-500',
  }
  return colors[category] ?? 'bg-gray-500'
}

export function getCategoryLabel(category: Category): string {
  const labels: Record<Category, string> = {
    strength: 'Strength',
    gymnastics: 'Gymnastics',
    cardio: 'Cardio',
    olympic_lifting: 'Olympic Lifting',
    travel: 'Travel',
    milestone: 'Milestone',
  }
  return labels[category] ?? category
}

export function getPhaseLabel(phase: Phase): string {
  const labels: Record<Phase, string> = {
    build: 'Phase 1 — Build',
    competition: 'Phase 2 — Competition',
    elite: 'Phase 3 — Elite',
  }
  return labels[phase]
}

export function getSkillLabel(skill: string): string {
  const labels: Record<string, string> = {
    double_unders: 'Double Unders',
    pistol_squat: 'Pistol Squat',
    muscle_up_rings: 'Ring Muscle-Up',
    muscle_up_bar: 'Bar Muscle-Up',
    hspu_strict: 'Strict HSPU',
    hspu_kipping: 'Kipping HSPU',
    handstand_walk: 'Handstand Walk',
    pullup_strict: 'Strict Pull-Up',
    pullup_butterfly: 'Butterfly Pull-Up',
    pullup_weighted: 'Weighted Pull-Up',
    rope_climb: 'Rope Climb',
    zone2_cardio: 'Zone 2 Cardio',
    muscle_up_rings_strict: 'Strict Ring MU',
    rings_dips: 'Ring Dips',
    rings_support_hold: 'Ring Support Hold',
    iron_cross_progression: 'Iron Cross Prog.',
    rings_rollout: 'Ring Rollout',
    deficit_hspu: 'Deficit HSPU',
    heavy_weighted_pullup: 'Heavy Weighted Pull-Up',
    snatch_technique: 'Snatch',
    clean_and_jerk_technique: 'Clean & Jerk',
    toes_to_bar_butterfly: 'Butterfly T2B',
  }
  return labels[skill] ?? skill.replace(/_/g, ' ')
}

export function getMetricLabel(metricType: string): string {
  const labels: Record<string, string> = {
    reps: 'reps',
    weight_kg: 'kg',
    time_seconds: 'sec',
    distance_meters: 'm',
  }
  return labels[metricType] ?? metricType
}

export function getCurrentPhase(date: Date = new Date()): Phase {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  if (year < 2026 || (year === 2026 && month < 10)) return 'build'
  if (year === 2026 && month === 10) return 'competition'
  return 'elite'
}

export function getWeekStart(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  d.setDate(diff)
  d.setHours(0, 0, 0, 0)
  return d
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('es-AR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
}

export function formatDateISO(date: Date): string {
  return date.toISOString().split('T')[0]
}

export const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
export const DAY_NAMES_FULL = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
