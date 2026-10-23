/**
 * CONFIGURAÇÃO CENTRAL DA CHÁCARA VISTA DA SERRA
 * ------------------------------------------------------------
 * Este é o único arquivo que precisa ser editado para alterar
 * telefone, textos principais, comodidades e fotos do site.
 *
 * Fotos: ficam em /public/fotos. Cada foto tem duas versões:
 *   nome.webp      (1600 px, usada em telas grandes)
 *   nome-800.webp  (800 px, usada em celulares)
 * Para trocar uma foto, substitua os dois arquivos mantendo o nome.
 * Para adicionar, coloque os arquivos na pasta e inclua um item em `photos`.
 */

/** WhatsApp no formato internacional, apenas dígitos: 55 + DDD + número. */
export const WHATSAPP_NUMBER = '5531988690602'

/** Telefone para exibição. */
export const PHONE_DISPLAY = '(31) 98869-0602'

export const SITE = {
  name: 'Chácara Vista da Serra',
  city: 'Congonhas',
  state: 'Minas Gerais',
  stateCode: 'MG',
  /** Endereço público definitivo (usado em SEO). */
  url: 'https://chacara-vista-da-serra.github.io/',
  timeZone: 'America/Sao_Paulo',
} as const

export const LOCATION_LABEL = `${SITE.city} - ${SITE.stateCode}`

export const TEXTS = {
  heroEyebrow: `${SITE.city} · ${SITE.state}`,
  heroTitle: 'Seu próximo momento especial começa aqui.',
  heroLead:
    'Conheça a Chácara Vista da Serra, em Congonhas, Minas Gerais. Um convite para desacelerar, reunir pessoas especiais e planejar momentos de lazer em meio à natureza.',
  aboutTitle: 'Um lugar para viver bons momentos.',
  aboutParagraphs: [
    'Há lugares que pedem calma: o gramado amplo, as árvores em volta, o fim de tarde na beira da piscina. A Chácara Vista da Serra foi pensada para quem quer sair da rotina sem ir longe, e reunir quem importa em um espaço tranquilo, cercado de verde.',
    'Seja para um almoço demorado em família, uma tarde com amigos ou um dia inteiro de descanso, o ritmo é você quem decide. Escolha a data, fale diretamente com a proprietária e planeje o seu dia com tranquilidade.',
  ],
  experiencesTitle: 'Momentos que merecem um lugar especial.',
  bookingTitle: 'Escolha o dia. Vamos planejar sua visita.',
  bookingNotice:
    'A data selecionada será enviada à proprietária para consulta de disponibilidade. A locação só será confirmada após o atendimento.',
  /** Mensagem genérica (botão flutuante, cabeçalho e rodapé). */
  genericMessage:
    'Olá! Tudo bem? Vim pelo site e gostaria de saber mais sobre a locação da Chácara Vista da Serra, em Congonhas - MG.',
}

/** Estrutura confirmada pelas fotos enviadas pela proprietária. */
export const AMENITIES = [
  'Piscina com iluminação noturna',
  'Área coberta com balcão',
  'Churrasqueira',
  'Campo de futebol gramado',
  'Mesa de sinuca',
  'Cozinha',
  'Quartos',
  'Varanda com vista para a serra',
  'Banheiros de apoio',
  'Amplo gramado arborizado',
  'Espaço para veículos',
]

export const EXPERIENCES = [
  {
    title: 'Reuniões em família',
    text: 'Um dia sem pressa para colocar a conversa em dia, com espaço para as crianças correrem e os mais velhos descansarem.',
  },
  {
    title: 'Encontros entre amigos',
    text: 'Futebol no gramado, sinuca, piscina e aquele churrasco que se estende até o fim da tarde.',
  },
  {
    title: 'Celebrações particulares',
    text: 'Aniversários, conquistas e datas especiais comemoradas em um ambiente reservado, ao ar livre.',
  },
  {
    title: 'Dias de descanso e lazer',
    text: 'Uma pausa da cidade para respirar, olhar a paisagem e simplesmente aproveitar o dia.',
  },
]

export const OCCASIONS = [
  'Reunião em família',
  'Encontro entre amigos',
  'Celebração particular',
  'Dia de descanso e lazer',
  'Outra ocasião',
]

export type Photo = {
  /** Nome do arquivo em /public/fotos, sem extensão. */
  file: string
  alt: string
  caption: string
  orientation: 'landscape' | 'portrait'
}

/** Fotos da galeria, na ordem de exibição. */
export const PHOTOS: Photo[] = [
  { file: 'piscina-area-coberta', alt: 'Piscina com deck de pedra e área coberta ao fundo', caption: 'Piscina e área coberta', orientation: 'landscape' },
  { file: 'varanda-serra', alt: 'Varanda de madeira com vista para a piscina e as montanhas ao fundo', caption: 'Varanda com vista para a serra', orientation: 'portrait' },
  { file: 'entardecer-gramado', alt: 'Gramado, piscina iluminada e pergolado com luzes ao entardecer', caption: 'Fim de tarde', orientation: 'portrait' },
  { file: 'caminho-arborizado', alt: 'Caminho de pedras entre árvores e gramado, levando ao campo de futebol', caption: 'Caminho arborizado', orientation: 'landscape' },
  { file: 'piscina-noite', alt: 'Piscina com iluminação azul à noite e varal de luzes ao fundo', caption: 'Piscina à noite', orientation: 'portrait' },
  { file: 'fachada-ipe', alt: 'Casa principal vista do campo, com árvore florida em primeiro plano', caption: 'A casa vista do campo', orientation: 'portrait' },
  { file: 'gramado-campo', alt: 'Amplo gramado com trave de futebol cercado por árvores', caption: 'Campo gramado', orientation: 'landscape' },
  { file: 'vista-varanda', alt: 'Vista do alto para o gramado, o campo e a piscina em dia de céu azul', caption: 'Vista do alto', orientation: 'portrait' },
  { file: 'churrasqueira', alt: 'Churrasqueira de alvenaria com bancada de granito e pia', caption: 'Churrasqueira', orientation: 'portrait' },
  { file: 'sinuca', alt: 'Mesa de sinuca com tecido vermelho e tacos ao fundo', caption: 'Sinuca', orientation: 'portrait' },
  { file: 'cozinha-bar', alt: 'Cozinha com balcão de granito, banquetas e parede de azulejos decorados', caption: 'Cozinha com balcão', orientation: 'portrait' },
  { file: 'escada-sinuca', alt: 'Sala com escada de madeira e mesa de sinuca', caption: 'Sala de jogos', orientation: 'portrait' },
  { file: 'sala-tv', alt: 'Sala com televisão, cômoda de madeira e poltronas', caption: 'Sala de estar', orientation: 'portrait' },
  { file: 'quarto', alt: 'Quarto com cama de casal e piso de madeira', caption: 'Quarto', orientation: 'portrait' },
  { file: 'cozinha-rustica', alt: 'Cozinha com bancadas de granito e armários de madeira rústica', caption: 'Cozinha', orientation: 'portrait' },
  { file: 'banheiro-coletivo-pias', alt: 'Bancada com três pias e espelho amplo', caption: 'Banheiros de apoio', orientation: 'landscape' },
  { file: 'banheiro-suite', alt: 'Banheiro com box de vidro e bancada de granito', caption: 'Banheiro', orientation: 'portrait' },
  { file: 'banheiro-suite-2', alt: 'Banheiro com pastilhas decorativas e bancada de granito', caption: 'Banheiro', orientation: 'portrait' },
  { file: 'banheiro-coletivo-cabines', alt: 'Banheiro com cabines de granito e portas de vidro', caption: 'Banheiros de apoio', orientation: 'landscape' },
  { file: 'banheiro-coletivo', alt: 'Banheiro com bancada dupla e divisória de granito', caption: 'Banheiros de apoio', orientation: 'landscape' },
]

/** Fotos usadas fora da galeria. */
export const FEATURE_PHOTOS = {
  heroDesktop: 'piscina-area-coberta',
  heroMobile: 'vista-varanda',
  aboutMain: 'varanda-serra',
  aboutSecondary: 'fachada-ipe',
  experiences: 'entardecer-gramado',
  booking: 'piscina-noite',
}

export const FAQ = [
  {
    q: 'Como consultar a disponibilidade?',
    a: 'Escolha a data no calendário da seção “Solicitar locação” e toque em “Solicitar locação pelo WhatsApp”. A mensagem já vai pronta com a data escolhida, e a proprietária responde informando se o dia está livre.',
  },
  {
    q: 'Posso solicitar uma data durante a semana?',
    a: 'Sim. É possível consultar qualquer dia, de segunda a domingo. A disponibilidade de cada data é confirmada diretamente com a proprietária.',
  },
  {
    q: 'A chácara pode ser alugada aos finais de semana?',
    a: 'Sim. Sábados, domingos e feriados também podem ser consultados, sempre mediante confirmação de disponibilidade.',
  },
  {
    q: 'Como consultar os valores?',
    a: 'Os valores e as condições da locação são tratados diretamente com a proprietária, pelo WhatsApp, de acordo com a data e o que você está planejando.',
  },
  {
    q: 'A seleção da data confirma a reserva?',
    a: 'Não. Escolher a data no site apenas prepara a mensagem de consulta. A locação só é confirmada depois do atendimento com a proprietária.',
  },
  {
    q: 'Como falar diretamente com a proprietária?',
    a: `Pelo WhatsApp ${PHONE_DISPLAY}. Use o botão verde no canto da tela ou o botão de solicitação ao lado do calendário.`,
  },
]

/** Caminho de um arquivo em /public respeitando o endereço base do site. */
export function asset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

export function photoSrc(file: string, size: 'sm' | 'lg' = 'lg') {
  return asset(`fotos/${file}${size === 'sm' ? '-800' : ''}.webp`)
}
