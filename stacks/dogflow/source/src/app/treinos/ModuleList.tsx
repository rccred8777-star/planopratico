'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Lock, CheckCircle, Clock, ChevronRight, PawPrint, Trophy } from 'lucide-react'
import Image from 'next/image'

const DAY_IMAGES = [
  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=85', // intro — golden retriever filhote
  'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=85', // dia 1 — cão olhando atento para cima
  'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600&q=85', // dia 2 — cão sentado feliz
  'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=600&q=85', // dia 3 — cão deitado tranquilo
  'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=600&q=85', // dia 4 — cão correndo animado
  'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&q=85', // dia 5 — cão no passeio com guia
  'https://images.unsplash.com/photo-1534361960057-19f4434a5f85?w=600&q=85', // dia 6 — cão simpático
  'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600&q=85', // dia 7 — cão com dono feliz
]

function formatHoursLeft(h: number) {
  if (h <= 0) return ''
  if (h < 1) return `${Math.ceil(h * 60)}min`
  if (h < 24) return `${Math.ceil(h)}h`
  return `${Math.ceil(h / 24)}d`
}

export default function ModuleList({ modules, pet, purchasedAt }: any) {
  const router = useRouter()
  const completed = modules.filter((m: any) => m.progress?.status === 'completed').length
  const total = modules.length

  return (
    <div className="min-h-screen bg-surface pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-brand-500 to-brand-600 px-5 pt-12 pb-20 safe-top">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <PawPrint className="w-6 h-6 text-white" />
            <span className="text-white font-bold text-lg">DogFlow</span>
          </div>
          <span className="text-brand-100 text-sm font-medium">Desafio 7 Dias</span>
        </div>
        {pet && (
          <p className="text-white font-semibold text-xl mt-3">Olá, {pet.name}! 🐾</p>
        )}
        <p className="text-brand-100 text-sm">Continue seu progresso hoje</p>
      </div>

      {/* Progress Card */}
      <div className="px-5 -mt-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-5 shadow-lg border border-gray-100 mb-5"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-brand-500" />
              <span className="font-semibold text-gray-900">Seu progresso</span>
            </div>
            <span className="text-sm text-gray-500">{completed}/{total} dias</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(completed / total) * 100}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="bg-gradient-to-r from-brand-400 to-brand-600 h-3 rounded-full"
            />
          </div>
          {completed === total && total > 0 && (
            <p className="text-brand-600 font-semibold text-sm mt-2 text-center">
              🎉 Desafio concluído! Parabéns!
            </p>
          )}
        </motion.div>

        {/* Modules */}
        <div className="space-y-3">
          {modules.map((module: any, i: number) => {
            const isCompleted = module.progress?.status === 'completed'
            const isLocked = !module.unlocked
            const stepsTotal = module.stepCount || 1
            const stepsDone = module.progress?.completed_steps || 0
            const pct = Math.round((stepsDone / stepsTotal) * 100)

            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={!isLocked ? { y: -2 } : {}}
                onClick={() => !isLocked && router.push(`/treino/${module.id}`)}
                className={`relative bg-white rounded-3xl overflow-hidden border shadow-sm transition-all ${
                  isLocked ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:shadow-md'
                } ${isCompleted ? 'border-green-200' : 'border-gray-100'}`}
              >
                {/* Image */}
                <div className="relative h-32 w-full">
                  <Image
                    src={DAY_IMAGES[i] || DAY_IMAGES[0]}
                    alt={module.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 640px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Day badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      module.order_index === 0
                        ? 'bg-brand-500 text-white'
                        : `bg-white/90 text-gray-700`
                    }`}>
                      {module.order_index === 0 ? 'Intro' : `Dia ${module.order_index}`}
                    </span>
                  </div>

                  {/* Status icon */}
                  <div className="absolute top-3 right-3">
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6 text-green-400 drop-shadow" />
                    ) : isLocked ? (
                      <div className="bg-black/40 rounded-full p-1">
                        <Lock className="w-4 h-4 text-white" />
                      </div>
                    ) : null}
                  </div>

                  {/* Title */}
                  <div className="absolute bottom-3 left-3 right-10">
                    <h3 className="text-white font-bold text-base leading-tight drop-shadow">
                      {module.title}
                    </h3>
                  </div>
                </div>

                {/* Bottom */}
                <div className="px-4 py-3 flex items-center justify-between">
                  {isLocked ? (
                    <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>Libera em {formatHoursLeft(module.hoursLeft)}</span>
                    </div>
                  ) : isCompleted ? (
                    <span className="text-green-600 text-sm font-semibold">✓ Concluído</span>
                  ) : stepsDone > 0 ? (
                    <div className="flex-1 mr-3">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Em andamento</span><span>{pct}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div className="bg-brand-500 h-1.5 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-500 text-sm">Pronto para começar</span>
                  )}
                  {!isLocked && <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
