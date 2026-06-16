-- =============================================
-- DogFlow — Migration + Seed V1
-- Rodar no Supabase → SQL Editor → Run
-- =============================================

-- =============================================
-- 1. TABELAS
-- =============================================

create table if not exists purchases (
  id              uuid primary key default gen_random_uuid(),
  email           text not null,
  user_id         uuid references auth.users(id),
  kiwify_order_id text,
  product         text not null,
  status          text not null default 'active',
  purchased_at    timestamptz default now()
);

create table if not exists subscriptions (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references auth.users(id) not null,
  plan            text not null,
  price_monthly   numeric not null,
  status          text not null default 'active',
  start_date      date not null,
  end_date        date,
  kiwify_sub_id   text
);

create table if not exists pets (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid references auth.users(id) not null,
  name         text not null,
  breed        text,
  age_months   int,
  main_problem text,
  created_at   timestamptz default now()
);

create table if not exists training_modules (
  id            uuid primary key default gen_random_uuid(),
  product       text not null,
  category      text,
  title         text not null,
  description   text,
  order_index   int not null,
  plan_required text default 'desafio',
  unlock_hours  int default 0
);

create table if not exists training_steps (
  id             uuid primary key default gen_random_uuid(),
  module_id      uuid references training_modules(id) not null,
  order_index    int not null,
  title          text not null,
  objective      text not null,
  explanation    text not null,
  training       text not null,
  common_error   text not null,
  practical_task text not null,
  checklist      jsonb not null default '[]'
);

create table if not exists training_progress (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references auth.users(id) not null,
  pet_id          uuid references pets(id),
  module_id       uuid references training_modules(id) not null,
  completed_steps int default 0,
  status          text default 'in_progress',
  last_activity   timestamptz default now(),
  unique(user_id, module_id)
);

-- =============================================
-- 2. ROW LEVEL SECURITY
-- =============================================

alter table purchases        enable row level security;
alter table subscriptions    enable row level security;
alter table pets             enable row level security;
alter table training_modules enable row level security;
alter table training_steps   enable row level security;
alter table training_progress enable row level security;

-- purchases: usuario le apenas os seus
create policy "purchases_select_own" on purchases
  for select using (auth.uid() = user_id);

-- subscriptions: usuario le apenas as suas
create policy "subscriptions_select_own" on subscriptions
  for select using (auth.uid() = user_id);

-- pets: usuario le e escreve apenas os seus
create policy "pets_select_own" on pets
  for select using (auth.uid() = user_id);
create policy "pets_insert_own" on pets
  for insert with check (auth.uid() = user_id);
create policy "pets_update_own" on pets
  for update using (auth.uid() = user_id);

-- training_modules: qualquer usuario autenticado pode ler
create policy "modules_select_authenticated" on training_modules
  for select using (auth.role() = 'authenticated');

-- training_steps: qualquer usuario autenticado pode ler
create policy "steps_select_authenticated" on training_steps
  for select using (auth.role() = 'authenticated');

-- training_progress: usuario le e escreve apenas o seu
create policy "progress_select_own" on training_progress
  for select using (auth.uid() = user_id);
create policy "progress_insert_own" on training_progress
  for insert with check (auth.uid() = user_id);
create policy "progress_update_own" on training_progress
  for update using (auth.uid() = user_id);

-- =============================================
-- 3. SEED — training_modules
-- =============================================

insert into training_modules (product, category, title, description, order_index, plan_required, unlock_hours) values
  ('dogflow_7dias', 'iniciante', 'Boas-Vindas e Preparação',
   'Como o desafio funciona, o que esperar e como o cérebro do cão aprende.',
   0, 'desafio', 0),

  ('dogflow_7dias', 'iniciante', 'Dia 1 — Atenção e Nome',
   'A base de todo treinamento: o cão aprende a olhar para você quando chamado pelo nome.',
   1, 'desafio', 0),

  ('dogflow_7dias', 'iniciante', 'Dia 2 — Sentar',
   'O comando de pausa universal. Um cão que senta não pula, não corre, não empurra.',
   2, 'desafio', 24),

  ('dogflow_7dias', 'iniciante', 'Dia 3 — Ficar',
   'Controle de impulso: o cão mantém a posição mesmo quando você se afasta.',
   3, 'desafio', 48),

  ('dogflow_7dias', 'iniciante', 'Dia 4 — Vir Quando Chamado',
   'O comando mais importante de segurança. O cão corre até você quando chamado.',
   4, 'desafio', 72),

  ('dogflow_7dias', 'iniciante', 'Dia 5 — Passeio Sem Puxar',
   'Guia frouxa: o cão aprende que puxar trava o passeio, andar junto avança.',
   5, 'desafio', 96),

  ('dogflow_7dias', 'iniciante', 'Dia 6 — Não Pular nas Pessoas',
   'Quatro patas no chão: o cão aprende a cumprimentar sem pular em ninguém.',
   6, 'desafio', 120),

  ('dogflow_7dias', 'iniciante', 'Dia 7 — Rotina Consolidada',
   'Circuito completo dos 6 comandos e criação da rotina permanente de 10 min/dia.',
   7, 'desafio', 144);

-- =============================================
-- 4. SEED — training_steps
-- =============================================

-- ---- MÓDULO 0 — BOAS-VINDAS ----

insert into training_steps (module_id, order_index, title, objective, explanation, training, common_error, practical_task, checklist)
values (
  (select id from training_modules where order_index = 0 and product = 'dogflow_7dias'),
  0,
  'Bem-vindo ao Desafio 7 Dias',
  'Entender como o desafio funciona e o que esperar ao final dos 7 dias.',
  'Você está aqui porque ama seu cachorro — mas está no limite da paciência. Isso é completamente normal. A maioria dos donos nunca recebeu um método claro de como ensinar o cão. Tentaram de tudo, viram vídeos, compraram spray, usaram voz firme... e nada funcionou de verdade.

Não funcionou porque o problema não é o seu cão. O problema é que ninguém te ensinou como o cérebro do cão funciona.

Nos próximos 7 dias você vai aprender. Não precisa de equipamento especial. Não precisa ser especialista. Precisa de 10 minutos por dia, petisco no bolso e consistência.

Este método é baseado em reforço positivo — a abordagem mais estudada da ciência do comportamento animal. Sem gritar. Sem punição. Sem estresse.',
  'Hoje não há treino de comportamento. Hoje é dia de preparar:

1. Escolha o petisco de alto valor que vai usar esta semana (aquele que o cão enlouquece — nugget de frango, bifinho, pedaço de sachê)
2. Escolha o horário diário do treino (de preferência antes de uma refeição)
3. Escolha o espaço de treino: sala ou corredor sem bagunça
4. Guarde os petiscos em um potinho separado da ração normal
5. Marque no celular: "Treino DogFlow — [horário]" para os próximos 7 dias',
  'Começar o treino quando o cão acabou de comer. Cão satisfeito não se motiva por petisco. Treine sempre com o estômago vazio ou no meio do dia.',
  'Deixe o cão sentir o cheiro do petisco que você vai usar esta semana. Dê um pedacinho de graça — só para criar associação positiva com esse cheiro. Isso vai acelerar o aprendizado nos próximos dias.',
  '["Escolhi o petisco de alto valor", "Defini o horário diário do treino", "Escolhi o espaço de treino", "Guardei os petiscos separados da ração", "Agendei os 7 dias no celular"]'::jsonb
);

insert into training_steps (module_id, order_index, title, objective, explanation, training, common_error, practical_task, checklist)
values (
  (select id from training_modules where order_index = 0 and product = 'dogflow_7dias'),
  1,
  'Como o Cão Aprende',
  'Entender o princípio do reforço positivo para aplicar corretamente nos 7 dias.',
  'O cão não entende português. Ele não sabe que "não pode" significa "pare com isso". Ele entende consequências.

Se um comportamento gera algo bom (petisco, carinho, brincadeira) → ele repete.
Se um comportamento não gera nada de bom → ele para.

O erro que quase todo mundo comete é punir o que é errado sem ensinar o que é certo. O cão aprende "quando faço X acontece algo ruim" — mas não sabe o que fazer no lugar. Fica confuso, ansioso, e o comportamento persiste.

O método DogFlow ensina o comportamento certo primeiro. Sempre.',
  'Pratique o marcador "Sim!" hoje:

1. Chame o cão até você
2. Quando ele chegar, diga "Sim!" com energia e dê o petisco imediatamente
3. Repita 5 vezes

Esse "Sim!" é o marcador — o sinal exato de que o comportamento foi correto. Precisa ser imediato (dentro de 2 segundos) e sempre seguido de petisco.

As 3 regras de ouro:
— Marque na hora certa (até 2 segundos após o comportamento)
— Nunca repita o comando mais de uma vez
— Termine sempre com o cão acertando',
  'Elogiar o cão de forma genérica ("ah bonitinho...") em vez de marcar na hora certa. O marcador "Sim!" precisa ser específico e imediato — não um carinho demorado depois.',
  'Pratique o marcador 5 vezes hoje. Cão chega até você → "Sim!" → petisco. Só isso. Observe a reação do cão ao "Sim!" após algumas repetições.',
  '["Entendi que o cão aprende por consequências, não por punição", "Escolhi meu marcador (Sim! ou clicker)", "Pratiquei o marcador 5 vezes", "O cão associou o marcador com o petisco"]'::jsonb
);

-- ---- MÓDULO 1 — ATENÇÃO E NOME ----

insert into training_steps (module_id, order_index, title, objective, explanation, training, common_error, practical_task, checklist)
values (
  (select id from training_modules where order_index = 1 and product = 'dogflow_7dias'),
  0,
  'Responder ao Nome',
  'O cão vai aprender a olhar para você quando ouvir o nome.',
  'O nome do cão não significa "venha aqui". Significa "preste atenção em mim". Essa é a diferença que poucos donos conhecem.

Quando você grita o nome repetidamente e ele ignora, ele não está sendo teimoso — ele simplesmente não aprendeu que o nome significa "olha pra cá". Para ele, o nome é só um som do ambiente.

Antes de ensinar qualquer comando — sentar, ficar, vir — você precisa que o cão olhe para o seu rosto quando chamar. Se ele não olha, ele não está ouvindo.

Atenção é a base de todo treinamento.',
  'Parte 1 — Responder ao nome (5 minutos):

1. Fique de pé em frente ao cão, a uns 2 metros de distância
2. Diga o nome do cão UMA vez, em tom normal (não grite)
3. Espere. Se ele olhar para o seu rosto — mesmo por 1 segundo — diga "Sim!" e dê o petisco
4. Se ele não olhar: pegue o petisco e leve até o seu nariz. Quando ele olhar para você: "Sim!" + petisco
5. Repita 8 a 10 vezes

Parte 2 — Atenção com distração (5 minutos):

1. Adicione uma distração pequena: uma pessoa ao fundo, um objeto no chão
2. Diga o nome uma vez
3. Quando ele olhar para você, mesmo com a distração: "Sim!" + petisco
4. Repita 5 vezes',
  'Chamar o nome do cão quando está com raiva ou para repreender. "Totó, para com isso!" — o cão aprende que o nome precede algo ruim. Nunca use o nome em tom de ameaça. O nome sempre precede algo positivo.',
  'Ao longo do dia (fora do treino formal), pratique 5 vezes de forma casual: chame o nome, ele olha, dê petisco ou uma carinhada. A frequência consolida o aprendizado mais do que uma sessão longa.',
  '["Fiz a sessão de treino dos 10 minutos", "O cão olhou para mim quando chamei o nome (pelo menos 6 de 10 vezes)", "Não repeti o nome mais de uma vez por chamada", "Fiz 5 reforços casuais ao longo do dia", "Terminei a sessão com o cão acertando"]'::jsonb
);

insert into training_steps (module_id, order_index, title, objective, explanation, training, common_error, practical_task, checklist)
values (
  (select id from training_modules where order_index = 1 and product = 'dogflow_7dias'),
  1,
  'Atenção Sustentada',
  'O cão vai manter o contato visual por 3 segundos antes de receber o petisco.',
  'Agora que o cão já responde ao nome, vamos aumentar o critério. Não basta olhar rapidinho — queremos que ele sustente o olhar por alguns segundos.

Isso vai ser útil nos próximos dias, quando você precisar da atenção dele para ensinar outros comandos. Um cão que mantém contato visual é um cão que está "conectado" com você.',
  '1. Chame o nome do cão
2. Quando ele olhar, espere 1 segundo antes de dizer "Sim!" e dar o petisco
3. Nas próximas repetições, vá aumentando: 2 segundos, depois 3 segundos
4. Se ele desviar o olhar antes do tempo, não dê o petisco — recomeça do nome
5. Repita 8 vezes

Meta do dia: 3 segundos de contato visual consistente.',
  'Aumentar demais rápido demais. Se o cão está olhando 1 segundo e você de repente quer 10 segundos, ele vai desistir. Aumente de segundo em segundo, dia a dia.',
  'No fim do dia, teste: diga o nome do cão e conte mentalmente até 3 antes de recompensar. Se ele ficou olhando: parabéns — o Dia 1 está concluído.',
  '["O cão manteve contato visual por 1 segundo", "O cão manteve contato visual por 3 segundos", "Não dei petisco quando ele desviou o olhar antes do tempo", "Terminei a sessão com 3 acertos seguidos"]'::jsonb
);

-- ---- MÓDULO 2 — SENTAR ----

insert into training_steps (module_id, order_index, title, objective, explanation, training, common_error, practical_task, checklist)
values (
  (select id from training_modules where order_index = 2 and product = 'dogflow_7dias'),
  0,
  'Sentar com Luring',
  'O cão vai aprender a sentar com o comando verbal "senta" e por sinal de mão.',
  '"Senta" é o comando mais útil da vida com um cachorro. Não é porque é bonito. É porque um cão sentado não está fazendo tudo que você não quer: não está pulando em visita, não está correndo pela casa, não está ladrando enquanto você abre a porta.

"Senta" é o comando de pausa universal. Quando o cão aprender que sentar gera recompensa, ele vai começar a sentar espontaneamente para pedir as coisas — petisco, atenção, para sair para passear. É muito mais agradável do que latido ou pulo.',
  'Método do petisco sobre a cabeça (luring):

1. Fique de pé na frente do cão, petisco na mão fechada
2. Encoste o petisco no focinho do cão
3. Leve o petisco lentamente para cima e levemente para trás (como se fosse colocar na testa dele)
4. O cão vai inclinar a cabeça para cima e naturalmente dobrar as patas traseiras até sentar
5. No momento exato que a bunda tocar o chão: "Sim!" + petisco
6. Repita 8 vezes COM o petisco como guia

Adicionando o comando verbal:

7. Nas próximas repetições, diga "senta" no momento que você começa a mover a mão para cima
8. Cão senta → "Sim!" + petisco
9. Repita 5 vezes com o comando verbal',
  'Forçar a bunda do cão para baixo com a mão. Isso gera resistência — nenhum animal gosta de ser empurrado — e cria medo, não aprendizado. Deixe o luring fazer o trabalho.',
  'Antes do jantar do cão: peça "senta" e só coloque a tigela no chão quando ele sentar. Não precisa falar mais nada, não precisa repetir. Ele vai sentar porque quer comer. Isso cria o hábito de pedir educadamente.',
  '["Fiz 8 repetições com luring (petisco guiando)", "Adicionei o comando verbal senta", "O cão sentou pelo menos 7 de 10 vezes", "Usei o senta antes do jantar", "Não empurrei o cão para baixo em nenhum momento"]'::jsonb
);

insert into training_steps (module_id, order_index, title, objective, explanation, training, common_error, practical_task, checklist)
values (
  (select id from training_modules where order_index = 2 and product = 'dogflow_7dias'),
  1,
  'Sentar Sem Petisco na Mão',
  'O cão vai sentar com o comando verbal, sem precisar ver o petisco na mão.',
  'Muitos donos ficam presos no estágio em que o cão só senta quando vê o petisco. Isso acontece porque o cão aprendeu a responder ao petisco, não ao comando.

Este step resolve isso: o petisco vai para o bolso ou para outra mão. O cão aprende a responder à palavra e ao sinal — não ao petisco visível.',
  '1. Esconda o petisco no bolso ou segure nas costas
2. Diga "senta"
3. Faça o mesmo sinal de mão (cima para baixo), mas sem petisco na mão visível
4. Se sentar: "Sim!" + busque o petisco no bolso e dê
5. Se não sentar: pegue o petisco, faça o luring uma vez, depois tente de novo sem
6. Repita 10 vezes',
  'Ficar balançando a mão cheia de petisco para o cão obedecer. O cão está respondendo ao petisco, não ao comando. Reserve petisco visível apenas para o início do aprendizado.',
  'Peça "senta" 3 vezes ao longo do dia em situações normais: antes de colocar a coleira, antes de abrir a porta, antes de brincar. Petisco no bolso, não na mão.',
  '["O cão sentou com comando verbal e sem petisco visível (pelo menos 6 de 10 vezes)", "Pratiquei senta em 3 situações do dia a dia", "O cão está mais rápido para sentar do que ontem", "Terminei positivo (cão acertou no final da sessão)"]'::jsonb
);

-- ---- MÓDULO 3 — FICAR ----

insert into training_steps (module_id, order_index, title, objective, explanation, training, common_error, practical_task, checklist)
values (
  (select id from training_modules where order_index = 3 and product = 'dogflow_7dias'),
  0,
  'Ficar por Tempo',
  'O cão vai aprender a manter a posição sentado enquanto você espera.',
  '"Ficar" é um dos comandos mais difíceis porque vai contra o instinto do cão. O cão quer ficar do seu lado, quer se mover, quer investigar o mundo. Pedir para ele ficar imóvel é um exercício de confiança e controle de impulso.

Mas vale cada segundo de treino. O cão que fica é o cão que não arranca correndo para a rua quando a porta abre. O cão que não pula no prato antes de você colocar. O cão que fica quieto quando o veterinário examina.

Importante: revise o "senta" no início desta sessão antes de passar para o "fica".',
  'Fase 1 — Ficar por 1 segundo (5 minutos):

1. Peça "senta"
2. Mostre a palma da sua mão aberta para o cão (sinal visual de pare)
3. Diga "fica" em tom firme e calmo
4. Espere 1 segundo — apenas 1 — depois diga "Sim!" e dê o petisco
5. Diga "pode" para liberar o cão
6. Repita 6 vezes
7. Se o cão se levantar antes do "Sim!": silêncio, peça "senta" de novo, recomece

Fase 2 — Aumentar o tempo (5 minutos):

8. Repita aumentando para 3 segundos
9. Depois para 5 segundos
10. Repita 6 vezes em cada tempo',
  'Pedir "senta, fica, fica, fica, ficaaaa" em tom crescente enquanto o cão se levanta. Quando o cão se levanta, você reinicia — sem punição, sem drama. Silêncio, senta de novo, recomece com tempo menor.',
  'Pratique "senta + fica" antes de cada refeição hoje. Coloque a tigela, peça senta + fica, conte 5 segundos, diga "pode" e deixe o cão comer. Isso treina o comando e estabelece calma antes das refeições.',
  '["O cão ficou parado por 1 segundo (pelo menos 5 de 6 vezes)", "O cão ficou parado por 3 segundos (pelo menos 4 de 6 vezes)", "Usei o sinal de mão (palma aberta)", "Usei o liberador pode para finalizar cada fica", "Não repeti o comando quando o cão falhou"]'::jsonb
);

insert into training_steps (module_id, order_index, title, objective, explanation, training, common_error, practical_task, checklist)
values (
  (select id from training_modules where order_index = 3 and product = 'dogflow_7dias'),
  1,
  'Ficar com Distância',
  'O cão vai manter o "fica" enquanto você recua 1 passo.',
  'Agora que o cão sabe ficar por alguns segundos ao seu lado, vamos adicionar distância. Atenção: distância é muito mais difícil para o cão do que tempo. Avance devagar.

A regra mais importante: sempre volte até o cão para dar o petisco. Nunca chame o cão até você quando estiver treinando "fica" — ele vai aprender que pode se levantar.',
  '1. Peça "senta + fica"
2. Recue um passo para trás — apenas um
3. Volte imediatamente para junto do cão
4. Diga "Sim!" e dê o petisco (enquanto ele ainda está na posição)
5. Diga "pode" para liberar
6. Repita 8 vezes
7. Nas últimas 3 repetições, tente 2 passos para trás',
  'Ir longe demais cedo demais. Se você recua 3 passos e o cão levanta, você foi rápido demais. Volte para 1 passo e consolide antes de avançar.',
  'Antes de sair de um cômodo, peça "senta + fica", dê dois passos para fora da porta, volte, dê o petisco. Você está treinando o "ficar" real — o que vai impedir que o cão atravesse a porta com você quando não deve.',
  '["O cão ficou enquanto recuei 1 passo (pelo menos 6 de 8 vezes)", "Voltei sempre até o cão para dar o petisco", "Não chamei o cão até mim durante o exercício de fica", "Usei o liberador pode ao final de cada repetição"]'::jsonb
);

-- ---- MÓDULO 4 — VIR QUANDO CHAMADO ----

insert into training_steps (module_id, order_index, title, objective, explanation, training, common_error, practical_task, checklist)
values (
  (select id from training_modules where order_index = 4 and product = 'dogflow_7dias'),
  0,
  'Recall Básico',
  'O cão vai aprender a correr até você quando chamado.',
  '"Vem!" é o comando que salva vida. Literalmente.

O cão que vem quando chamado não corre para a rua quando a porta abre. Não avança sobre o outro cão. Não some no parque.

E é também o comando mais fácil de estragar. Como? Chamando o cão quando vai dar banho que ele odeia. Chamando para cortar a unha. Chamando com raiva.

Se o cão aprendeu que "vem" precede algo chato — ele não vai mais vir.

A partir de hoje: "vem" sempre precede algo ótimo. Sempre.',
  'Fase 1 — Recall curto (5 minutos):

1. Fique a 2 metros do cão, mas não olhe para ele (finja que está fazendo outra coisa)
2. De repente, chame com entusiasmo: "[Nome], vem!" — uma vez, em tom de festa
3. Abaixe-se levemente, bata palma, sorria — faça parecer que você tem a coisa mais incrível do mundo
4. Quando o cão correr até você: festa total, "Sim! Sim! Sim!", petisco, carinho exagerado
5. Repita 6 vezes, aumentando a distância a cada repetição

Fase 2 — Recall com a pessoa virando de costas (5 minutos):

6. Vire de costas para o cão (instinto de perseguição se ativa)
7. Chame o nome e comece a caminhar afastando
8. Quando ele alcançar: festa e petisco
9. Repita 4 vezes',
  'Chamar o cão, ele demorar, e quando ele chegar você ainda estar com cara de bravo. O cão chegou — mesmo que tarde — e o comportamento correto foi vir. Recompense SEMPRE que ele vier, não importa o tempo que levou.',
  'Ao longo do dia, faça mini recalls escondidos: some de um cômodo, chame o cão com entusiasmo, quando ele aparecer: festa e petisco. Isso mantém o "vem" sempre associado à melhor coisa possível.',
  '["O cão veio quando chamado (pelo menos 5 de 6 vezes)", "A festa na chegada foi real e entusiasmada", "Nunca repeti o comando mais de uma vez", "Não chamei para nada chato hoje", "Fiz pelo menos 3 mini recalls espontâneos ao longo do dia"]'::jsonb
);

insert into training_steps (module_id, order_index, title, objective, explanation, training, common_error, practical_task, checklist)
values (
  (select id from training_modules where order_index = 4 and product = 'dogflow_7dias'),
  1,
  'Recall com Distração',
  'O cão vai vir quando chamado mesmo diante de algo interessante.',
  'Na vida real, o recall precisa competir com o cheiro de outro cão, o barulho de uma criança brincando, um passarinho voando. O treino só tem valor se funciona com distração.',
  '1. Deixe o cão cheirando algo no chão (um brinquedo, um petisco de distração menor)
2. Chame o nome uma vez com entusiasmo
3. Se ele largar e vir: festa enorme — esse é o maior acerto da semana
4. Se ele ignorar: mova-se, bata palma, faça barulho — concorra com a distração
5. Quando vier: petisco do melhor que você tiver
6. Repita 5 vezes',
  'Chamar o cão quando não pode garantir o sucesso. Se ele está olhando para outro cão pela janela e você sabe que não vai vir, não chame — você está ensinando que ignorar funciona. Só chame quando puder garantir que ele vem.',
  'Teste o recall em cômodo diferente do treino: cozinha, corredor, quarto. O cão precisa aprender que o comando vale em qualquer lugar, não só no espaço de treino.',
  '["O cão veio com distração presente (pelo menos 3 de 5 vezes)", "Testei o recall em um cômodo diferente do treino", "Quando ele veio com distração, a festa foi maior do que o normal"]'::jsonb
);

-- ---- MÓDULO 5 — PASSEIO SEM PUXAR ----

insert into training_steps (module_id, order_index, title, objective, explanation, training, common_error, practical_task, checklist)
values (
  (select id from training_modules where order_index = 5 and product = 'dogflow_7dias'),
  0,
  'Guia Frouxa — Parar e Esperar',
  'O cão vai aprender a caminhar ao lado de você com guia frouxa.',
  'O cão puxa a guia porque puxar funciona. Toda vez que ele puxou e você continuou andando, você ensinou que puxar é a forma correta de se mover na rua.

Não é maldade. Não é dominância. É lógica de consequências.

Para ensinar o passeio correto, a regra é simples: puxar trava o passeio; guia frouxa avança o passeio.

Isso vai ser frustrante nos primeiros dias porque você vai parar muito. Mas após 3 a 5 dias consistentes, o cão aprende a equação e para de puxar.',
  'Método parar-e-esperar:

1. Comece a caminhar
2. Assim que a guia ficar tensa: PARE completamente. Plante os pés. Não fale nada.
3. Espere o cão olhar para você ou voltar até você
4. Quando a guia ficar frouxa: diga "Sim!" e continue caminhando (avançar é a recompensa)
5. Repita toda vez que a guia ficar tensa
6. Pratique por 10 minutos

Adicionando reforço para posição correta:

7. Quando o cão estiver andando ao seu lado com guia frouxa, diga "bora" ou "junto" e dê petisco
8. Isso marca e reforça a posição correta',
  'Brigar com a guia — puxar de volta, sacudir. O cão vai puxar mais. Ao invés disso: pare. Só pare. A imobilidade total é muito mais eficaz do que qualquer reação.',
  'No próximo passeio real, use apenas o método parar-e-esperar. Avise-se que vai demorar mais do que o normal. E vá — isso é o treino.',
  '["Parei toda vez que a guia ficou tensa (sem ceder nenhuma vez)", "O cão olhou para mim ou voltou ao meu lado pelo menos uma vez", "Não puxei a guia de volta em nenhum momento", "Pratiquei por pelo menos 10 minutos", "Percebi alguma melhora em relação ao passeio normal"]'::jsonb
);

insert into training_steps (module_id, order_index, title, objective, explanation, training, common_error, practical_task, checklist)
values (
  (select id from training_modules where order_index = 5 and product = 'dogflow_7dias'),
  1,
  'Mudança de Direção',
  'O cão vai prestar atenção em você durante o passeio e acompanhar mudanças de direção.',
  'No passeio ideal, o cão olha para você regularmente porque não sabe para onde você vai virar. Você é o GPS dele. Para criar isso, use mudanças de direção imprevisíveis.',
  '1. Caminhe e, sem avisar, mude de direção (esquerda, direita, volta completa)
2. O cão vai ficar surpreso e olhar para você — nesse momento: "Sim!" + petisco
3. Repita as mudanças de direção durante todo o passeio
4. Faça pelo menos 5 mudanças em 10 minutos
5. O cão vai começar a manter o olho em você com mais frequência',
  'Avisar antes de mudar de direção. "Vem, vira aqui." Se você avisa, o cão aprende a esperar o aviso. Mudanças sem aviso ensinam atenção constante.',
  'No próximo passeio, faça pelo menos 5 mudanças de direção inesperadas. Observe se o cão começa a olhar para você com mais frequência após a terceira ou quarta mudança.',
  '["Fiz pelo menos 5 mudanças de direção sem avisar", "O cão olhou para mim após as mudanças", "Recompense quando guia frouxa e cão ao lado", "O passeio ficou menos tenso do que o normal"]'::jsonb
);

-- ---- MÓDULO 6 — NÃO PULAR ----

insert into training_steps (module_id, order_index, title, objective, explanation, training, common_error, practical_task, checklist)
values (
  (select id from training_modules where order_index = 6 and product = 'dogflow_7dias'),
  0,
  'Quatro Patas no Chão',
  'O cão vai aprender a cumprimentar pessoas com as quatro patas no chão.',
  'O cão pula porque funcionou. Toda vez que ele pulou e alguém riu, afagou ou deu atenção — mesmo que fosse atenção negativa, "não, para, não faz isso" — ele aprendeu que pular é a forma de conseguir contato.

O cão pula por amor. É uma tentativa de cumprimentar da forma que os cães fazem entre si — focinho a focinho. Como você está no alto e ele em baixo, ele sobe.

Para ensinar que quatro patas no chão é melhor que pular:
— Patas no chão → atenção, carinho, contato
— Patas no ar → você vira de costas, ignora completamente, sem falar nada',
  'Método ignorar + recompensar quatro patas:

1. Chegue em casa ou entre na sala onde o cão está
2. Se ele pular: vire completamente de costas, cruzar os braços, sem olhar, sem falar, sem empurrar
3. Quando ele colocar as quatro patas no chão (mesmo por um segundo): vire-se, agache, carinho e petisco imediatos
4. Se ele pular de novo: costas de volta
5. Repita 8 a 10 vezes

Adicionando o comando "pé" (4 patas no chão):

6. Quando ele colocar as patas no chão: diga "pé" e recompense
7. Com o tempo, antecipe: diga "pé" antes que ele pule (quando você já vê que vai pular)
8. Recompense cada vez que quatro patas ficarem no chão com o comando',
  'Empurrar o cão para baixo com as mãos ou joelhos. O cão interpreta como brincadeira — contato físico é atenção, e atenção é o que ele quer. Mais eficaz: sem contato algum. Costas. Silêncio.',
  'Treine a chegada em casa. Quando entrar, repita o protocolo 3 vezes antes de cumprimentar definitivamente. O momento de chegada é o mais crítico — é quando o cão está mais excitado.',
  '["Virei de costas toda vez que o cão pulou (sem exceção)", "Dei atenção imediatamente quando as quatro patas estavam no chão", "Não empurrei o cão em nenhum momento", "O cão demorou menos para colocar as patas no chão na última repetição", "Ensinei alguém da casa a fazer o mesmo protocolo"]'::jsonb
);

insert into training_steps (module_id, order_index, title, objective, explanation, training, common_error, practical_task, checklist)
values (
  (select id from training_modules where order_index = 6 and product = 'dogflow_7dias'),
  1,
  'Cumprimento com Visita',
  'O cão vai receber visita com quatro patas no chão, sem pular.',
  'O problema com pular em visita é que você não controla o que a visita faz. A visita ri, afaga, diz "que fofinho" quando o cão pula — e destroça dias de treino em 5 segundos.

A solução: peça para a visita seguir o protocolo. E prepare o cão antes dela chegar.',
  '1. Antes da visita chegar: sessão de 5 minutos de "pé" para esquentar o comando
2. Quando a visita entrar: instrua-a rapidamente — "Ele está aprendendo a não pular. Por favor, quando ele pular, vire de costas. Quando ele colocar as patas no chão, pode dar carinho"
3. Fique com petisco na mão durante o cumprimento
4. Se o cão mantiver as quatro patas no chão durante o cumprimento: "Sim!" + petisco
5. Repita com diferentes pessoas ao longo dos próximos dias',
  'Pedir "para! desce! sai!" enquanto segura o cão pelo colar durante o cumprimento. O cão está contido, não está aprendendo. Prefira o protocolo: avise a visita e recompense quatro patas.',
  'Ensaie com alguém de casa o protocolo do cumprimento: pessoa entra, cão tende a pular, costas, quatro patas, atenção. 5 repetições hoje.',
  '["Pratiquei o cumprimento controlado com pelo menos uma pessoa", "A pessoa seguiu o protocolo (costas quando pula, atenção quando quatro patas)", "O cão teve pelo menos 3 cumprimentos com quatro patas no chão", "Expliquei o protocolo para outros membros da casa"]'::jsonb
);

-- ---- MÓDULO 7 — ROTINA CONSOLIDADA ----

insert into training_steps (module_id, order_index, title, objective, explanation, training, common_error, practical_task, checklist)
values (
  (select id from training_modules where order_index = 7 and product = 'dogflow_7dias'),
  0,
  'Circuito dos 6 Comandos',
  'Revisar todos os comandos aprendidos durante a semana em uma sessão integrada.',
  'Parabéns — você chegou ao Dia 7.

Esta semana você ensinou seu cão a:
— Responder ao nome e dar atenção
— Sentar por comando
— Ficar parado em posição
— Vir quando chamado
— Caminhar com guia frouxa
— Cumprimentar pessoas com quatro patas no chão

O Dia 7 não é sobre novo conteúdo. É sobre consolidação. Você vai fazer uma sessão que encadeia os comandos como uma rotina fluida.',
  'Circuito completo (faça 2 vezes):

1. Nome + Atenção — chame o nome, aguarde 3 segundos de contato visual → "Sim!" + petisco
2. Senta — peça senta sem petisco na mão → "Sim!" + petisco
3. Fica — peça fica, recue 2 passos, volte → "Sim!" + petisco + "pode"
4. Vem — afaste-se, chame com entusiasmo → festa e petisco
5. Junto — caminhe 20 passos com guia frouxa, mude de direção 2 vezes → "Sim!" quando guia frouxa
6. Pé — convide alguém para um cumprimento controlado → "Sim!" quando quatro patas no chão

Depois do circuito: brinque. Esse é o presente do dia.',
  'Querer testar tudo junto em ambiente com muita distração no Dia 7. O circuito é para consolidar em ambiente controlado. Situações do mundo real vêm depois, com a prática contínua.',
  'Faça o circuito completo uma vez de manhã e uma vez à noite. Esta é a rotina que você vai repetir nos próximos 30 dias para que os comportamentos se tornem automáticos.',
  '["Fiz o circuito completo dos 6 comandos (manhã)", "Fiz o circuito completo dos 6 comandos (noite)", "O cão respondeu a todos os 6 comandos", "Celebrei o final do desafio com brincadeira ou petisco especial"]'::jsonb
);

insert into training_steps (module_id, order_index, title, objective, explanation, training, common_error, practical_task, checklist)
values (
  (select id from training_modules where order_index = 7 and product = 'dogflow_7dias'),
  1,
  'Rotina Permanente',
  'Estabelecer a rotina diária de treino que mantém e expande o que o cão aprendeu.',
  'O maior erro após um desafio de 7 dias é parar.

O cão não "aprendeu para sempre" após 7 dias — ele aprendeu o suficiente para você continuar. Como um músculo, o comportamento precisa de uso constante para ficar forte. Sem treino, ele enfraquece.

A boa notícia: a manutenção é muito mais rápida do que o aprendizado inicial. 5 minutos por dia mantém tudo que você construiu. 10 minutos por dia avança.',
  'Rotina sugerida — 10 minutos diários:

Manhã (3 min): Circuito rápido — senta, fica, vem

Antes do passeio (5 min): Guia frouxa nos primeiros 5 minutos do passeio como treino

Antes do jantar (2 min): Senta + fica antes de colocar a tigela

Os próximos comandos ficam mais fáceis com esta base:
— Deitar (down): extensão natural do sentar
— Não pegar comida do chão (leave it): controle de impulso avançado
— Aguardar na porta: extensão do fica
— Latido controlado: substituto de comportamento + silêncio',
  'Abandonar o treino quando o cão "parece que já aprendeu". O comportamento que não é reforçado volta a enfraquecer, especialmente em situações novas ou de alta excitação.',
  'Escreva no celular os horários de treino para os próximos 30 dias. O treino de 5 minutos antes do passeio é o mais fácil de manter: o passeio já acontece, basta começar 5 minutos antes.',
  '["Defini os 3 momentos de treino da minha rotina diária", "Agendei lembretes para os próximos 7 dias no celular", "Entendi que 5 a 10 minutos diários são suficientes para manutenção", "Concluí o Desafio 7 Dias DogFlow!"]'::jsonb
);

-- =============================================
-- FIM DA MIGRATION
-- =============================================
-- Verificação rápida após rodar:
-- select count(*) from training_modules; -- deve retornar 8
-- select count(*) from training_steps;   -- deve retornar 16
