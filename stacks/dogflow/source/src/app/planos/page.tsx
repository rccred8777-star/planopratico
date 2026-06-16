'use client'

import { motion } from 'framer-motion'
import { Check, PawPrint, Zap, Crown, Star } from 'lucide-react'

const PLANS = [
  {
    id: 'basico',
    name: 'Básico',
    price: 29.90,
    icon: PawPrint,
    color: 'from-gray-700 to-gray-900',
    description: 'Para continuar evoluindo',
    features: [
      'Todos os módulos de obediência',
      '1 pet cadastrado',
      'Acompanhamento de progresso',
      'Checklist diário',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 59.90,
    icon: Star,
    color: 'from-brand-500 to-brand-700',
    description: 'O mais popular entre tutores',
    popular: true,
    features: [
      'Todos os módulos de obediência',
      'Até 3 pets cadastrados',
      'Módulos de socialização',
      'Módulos de truques',
      'Suporte prioritário via WhatsApp',
      'Progresso detalhado com gráficos',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 99.90,
    icon: Crown,
    color: 'from-amber-500 to-amber-700',
    description: 'Para tutores dedicados',
    features: [
      'Acesso ilimitado a todos os módulos',
      'Pets ilimitados',
      'Módulos avançados exclusivos',
      'Planos personalizados com IA',
      'Consultoria mensal com especialista',
      'Suporte VIP 24h',
    ],
  },
]

export default function PlanosPage() {
  return (
    <div className="min-h-screen bg-surface pb-10">
      <div className="bg-gradient-to-b from-brand-500 to-brand-600 px-5 pt-12 pb-8 safe-top">
        <div className="flex items-center gap-2 mb-2">
          <PawPrint className="w-6 h-6 text-white" />
          <span className="text-white font-bold text-lg">DogFlow</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white">Continue evoluindo</h1>
        <p className="text-brand-100 text-sm mt-1">Escolha o plano ideal para você e seu cão</p>
      </div>

      <div className="px-5 -mt-4 space-y-4">
        {PLANS.map((plan, i) => {
          const Icon = plan.icon
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-white rounded-3xl overflow-hidden border shadow-sm ${
                plan.popular ? 'border-brand-400 shadow-brand-100 shadow-md' : 'border-gray-100'
              }`}
            >
              {plan.popular && (
                <div className="bg-brand-500 text-white text-xs font-bold text-center py-1.5 tracking-wide">
                  ⭐ MAIS POPULAR
                </div>
              )}

              <div className={`bg-gradient-to-r ${plan.color} px-5 py-5`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 rounded-2xl p-2">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-extrabold text-lg">{plan.name}</h3>
                      <p className="text-white/70 text-xs">{plan.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white/70 text-xs">por mês</p>
                    <p className="text-white font-extrabold text-2xl">
                      R${plan.price.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-5 py-4">
                <div className="space-y-2 mb-5">
                  {plan.features.map((f, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">{f}</span>
                    </div>
                  ))}
                </div>

                <button className={`w-full py-3.5 rounded-2xl font-bold text-sm transition-all ${
                  plan.popular
                    ? 'bg-brand-500 hover:bg-brand-600 text-white shadow-md'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}>
                  <Zap className="w-4 h-4 inline mr-1.5" />
                  Assinar {plan.name}
                </button>
              </div>
            </motion.div>
          )
        })}

        <p className="text-center text-gray-400 text-xs px-4">
          Cancele quando quiser. Sem fidelidade.
        </p>
      </div>
    </div>
  )
}
