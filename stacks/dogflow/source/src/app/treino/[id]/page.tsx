import { createServerSupabase } from '@/lib/supabase-server'
import { redirect, notFound } from 'next/navigation'
import { isModuleUnlocked } from '@/lib/access'
import TrainingDetail from './TrainingDetail'

export default async function TreinoPage({ params }: { params: { id: string } }) {
  const supabase = createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [{ data: purchase }, { data: module_ }, { data: steps }, { data: pet }] =
    await Promise.all([
      supabase.from('purchases').select('*').eq('user_id', user.id).eq('status', 'active').single(),
      supabase.from('training_modules').select('*').eq('id', params.id).single(),
      supabase.from('training_steps').select('*').eq('module_id', params.id).order('order_index'),
      supabase.from('pets').select('*').eq('user_id', user.id).single(),
    ])

  if (!purchase) redirect('/acesso-negado')
  if (!module_) notFound()
  if (!isModuleUnlocked(module_.unlock_hours, purchase.purchased_at)) redirect('/treinos')

  const { data: progress } = await supabase
    .from('training_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('module_id', params.id)
    .single()

  return (
    <TrainingDetail
      module={module_}
      steps={steps || []}
      progress={progress}
      pet={pet}
      userId={user.id}
    />
  )
}
