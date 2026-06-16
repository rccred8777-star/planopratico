'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { Loader2, PawPrint } from 'lucide-react'

const PROBLEMS = [
  { value: 'xixi',     emoji: '💧', label: 'Faz xixi fora do lugar' },
  { value: 'guia',     emoji: '🦮', label: 'Puxa demais na guia' },
  { value: 'latido',   emoji: '🔊', label: 'Late sem parar' },
  { value: 'pulo',     emoji: '🦘', label: 'Pula em todo mundo' },
  { value: 'filhote',  emoji: '🐶', label: 'Filhote bagunceiro' },
  { value: 'ansioso',  emoji: '😰', label: 'Ansioso / destrói a casa' },
]

export default function MeuPetPage() {
  const router = useRouter()
  const supabase = createClient()
  const [name, setName] = useState('')
  const [breed, setBreed] = useState('')
  const [ageMonths, setAgeMonths] = useState('')
  const [problem, setProblem] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!problem) { setError('Escolha o principal problema do seu cão.'); return }
    setLoading(true)
    setError('')
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/login'); return }

    const { error } = await supabase.from('pets').insert({
      user_id: user.id,
      name,
      breed: breed || null,
      age_months: ageMonths ? parseInt(ageMonths) : null,
      main_problem: problem,
    })

    if (error) { setError('Erro ao salvar. Tente novamente.'); setLoading(false); return }
    router.push('/treinos')
  }

  return (
    <div className="min-h-screen bg-surface pb-10">
      {/* Header */}
      <div className="bg-gradient-to-b from-brand-500 to-brand-600 px-6 pt-12 pb-8 safe-top">
        <div className="flex items-center gap-3">
          <PawPrint className="w-8 h-8 text-white" />
          <div>
            <h1 className="text-xl font-bold text-white">Cadastre seu cão</h1>
            <p className="text-brand-100 text-sm">Para personalizar seu desafio</p>
          </div>
        </div>
      </div>

      <div className="px-5 -mt-4">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-semibold text-gray-700">Nome do cão *</label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                required
                placeholder="Ex: Rex, Bolinha, Luna..."
                className="mt-1 w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Raça</label>
              <input
                value={breed}
                onChange={e => setBreed(e.target.value)}
                placeholder="Ex: Labrador, SRD, Poodle..."
                className="mt-1 w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Idade (em meses)</label>
              <input
                type="number"
                value={ageMonths}
                onChange={e => setAgeMonths(e.target.value)}
                placeholder="Ex: 6, 12, 24..."
                min="1"
                className="mt-1 w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                Principal problema *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PROBLEMS.map(p => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setProblem(p.value)}
                    className={`flex items-center gap-2 px-3 py-3 rounded-2xl border text-left text-sm font-medium transition-all ${
                      problem === p.value
                        ? 'bg-brand-500 text-white border-brand-500 shadow-md'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-brand-300'
                    }`}
                  >
                    <span className="text-lg">{p.emoji}</span>
                    <span className="leading-tight">{p.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {error && <p className="text-red-500 text-sm bg-red-50 px-4 py-2 rounded-xl">{error}</p>}

            <button
              type="submit"
              disabled={loading || !name || !problem}
              className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-4 rounded-2xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 text-base"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Começar o Desafio 🐾'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
