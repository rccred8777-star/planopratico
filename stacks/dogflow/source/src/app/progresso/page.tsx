import { createServerSupabase } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import ProgressView from './ProgressView'

export default async function ProgressoPage() {
  const supabase = createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [{ data: purchase }, { data: modules }, { data: progress }, { data: pet }] =
    await Promise.all([
      supabase.from('purchases').select('*').eq('user_id', user.id).eq('status', 'active').single(),
      supabase.from('training_modules').select('*').eq('product', 'dogflow_7dias').order('order_index'),
      supabase.from('training_progress').select('*').eq('user_id', user.id),
      supabase.from('pets').select('*').eq('user_id', user.id).single(),
    ])

  if (!purchase) redirect('/acesso-negado')

  return <ProgressView modules={modules || []} progress={progress || []} pet={pet} purchasedAt={purchase.purchased_at} />
}
