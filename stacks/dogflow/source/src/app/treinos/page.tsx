import { createServerSupabase } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { isModuleUnlocked, hoursUntilUnlock } from '@/lib/access'
import ModuleList from './ModuleList'

export default async function TreinosPage() {
  const supabase = createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [{ data: purchase }, { data: modules }, { data: progress }, { data: pet }] =
    await Promise.all([
      supabase.from('purchases').select('*').eq('user_id', user.id).eq('status', 'active').single(),
      supabase.from('training_modules').select('*, training_steps(count)').eq('product', 'dogflow_7dias').order('order_index'),
      supabase.from('training_progress').select('*').eq('user_id', user.id),
      supabase.from('pets').select('*').eq('user_id', user.id).single(),
    ])

  if (!purchase) redirect('/acesso-negado')

  const modulesWithStatus = (modules || []).map(m => ({
    ...m,
    unlocked: isModuleUnlocked(m.unlock_hours, purchase.purchased_at),
    hoursLeft: hoursUntilUnlock(m.unlock_hours, purchase.purchased_at),
    progress: progress?.find(p => p.module_id === m.id) ?? null,
    stepCount: m.training_steps?.[0]?.count ?? 0,
  }))

  return <ModuleList modules={modulesWithStatus} pet={pet} purchasedAt={purchase.purchased_at} />
}
