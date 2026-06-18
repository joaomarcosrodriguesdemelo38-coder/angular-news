import { Article, NewsCategory, NewsResponse } from '../models/article.model';

// Helper to generate ISO date strings relative to today
function daysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

export const MOCK_NEWS: Record<NewsCategory, Article[]> = {
  general: [
    {
      source: { id: 'globo', name: 'G1 Portal' },
      author: 'Rodrigo Medeiros',
      title: 'Avanço do saneamento básico promete mudar realidade das capitais no Brasil',
      description: 'Novo marco regulatório atrai investimentos bilionários e acelera obras de tratamento de água e esgoto em diversas capitais brasileiras, impulsionando a saúde pública.',
      url: 'https://g1.globo.com/economia/saneamento-avanco-capitais',
      urlToImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
      publishedAt: daysAgo(0),
      content: 'O saneamento básico no Brasil entra em um novo ciclo histórico. Com os leilões e novas concessões, mais de 10 capitais já mostram canteiros de obras ativos que prometem universalizar a rede de água encanada e tratamento de esgoto doméstico até 2030.'
    },
    {
      source: { id: 'folha', name: 'Folha de S.Paulo' },
      author: 'Patrícia Campos',
      title: 'Turismo doméstico bate recorde histórico de faturamento no país',
      description: 'Estados do Nordeste e Sul são os destinos mais procurados por brasileiros no primeiro semestre, com alta expressiva no setor hoteleiro e na aviação civil.',
      url: 'https://www1.folha.uol.com.br/turismo/recorde-turismo-domestico',
      urlToImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      publishedAt: daysAgo(1),
      content: 'O turismo interno registrou o melhor semestre de sua história econômica recente. O faturamento combinado das empresas aéreas, hotéis e setor de eventos superou em 15% o recorde anterior.'
    },
    {
      source: { id: 'estadao', name: 'Estadão' },
      author: 'Eduardo Castro',
      title: 'Investimentos em infraestrutura verde devem dobrar até o fim da década',
      description: 'Nova política pública foca em subsídios para projetos sustentáveis e transição energética sustentável nas indústrias nacionais de grande porte.',
      url: 'https://economia.estadao.com.br/energia-verde-infraestrutura',
      urlToImage: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80',
      publishedAt: daysAgo(2),
      content: 'A transição ecológica do setor industrial brasileiro ganhou forte aliado financeiro. Bancos de desenvolvimento confirmaram linhas especiais de crédito que cobrem até 80% do investimento inicial em painéis solares.'
    }
  ],
  technology: [
    {
      source: { id: 'techcrunch', name: 'TechCrunch Br' },
      author: 'Aline Souza',
      title: 'Inteligência Artificial revoluciona desenvolvimento de software em startups',
      description: 'Novas ferramentas de código autônomo permitem que programadores criem aplicações completas na metade do tempo convencional, alterando os padrões de contratação.',
      url: 'https://techcrunch.com/artificial-intelligence-coding-evolution',
      urlToImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      publishedAt: daysAgo(0),
      content: 'A revolução no desenvolvimento de software não é mais promessa futura. Softwares integrados de auxílio de escrita de código mudaram radicalmente a velocidade de entrega técnica e o design system das novas soluções digitais.'
    },
    {
      source: { id: 'wired', name: 'Wired Brasil' },
      author: 'Lucas Nogueira',
      title: 'Computação quântica dá passos cruciais para a criptografia moderna',
      description: 'Pesquisadores brasileiros desenvolvem algoritmo estável capaz de resistir a invasões em supercomputadores quânticos de última geração.',
      url: 'https://wired.com/quantum-computing-brazil-advancements',
      urlToImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
      publishedAt: daysAgo(1),
      content: 'A segurança de dados bancários e digitais como conhecemos mudará em breve. Com o avanço das CPUs quânticas, algoritmos pós-quânticos começam a ser implementados de forma pioneira no mercado financeiro nacional.'
    },
    {
      source: { id: 'verge', name: 'The Verge' },
      author: 'Juliana Portella',
      title: 'Óculos de Realidade Aumentada buscam substituir smartphones no dia a dia',
      description: 'Lançamentos recentes trazem designs mais leves, processadores embutidos eficientes e bateria com autonomia para o dia inteiro de trabalho e lazer.',
      url: 'https://theverge.com/augmented-reality-glasses-future-mobile',
      urlToImage: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80',
      publishedAt: daysAgo(3),
      content: 'Após anos de designs robustos e desconfortáveis, a realidade aumentada finalmente entra no setor fashion. Marcas tradicionais unem-se a gigantes de tecnologia para modelos usáveis que mostram notificações.'
    }
  ],
  business: [
    {
      source: { id: 'exame', name: 'Exame' },
      author: 'Marcos Pinheiro',
      title: 'Mercado financeiro se adapta à chegada dos pagamentos offline instantâneos',
      description: 'Novas tecnologias nacionais permitem transferências eletrônicas seguras sem necessidade de conexão ativa com a internet móvel, expandindo inclusão financeira.',
      url: 'https://exame.com/negocios/pagamento-instantaneo-offline',
      urlToImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
      publishedAt: daysAgo(0),
      content: 'A inclusão financeira está a um passo da cobertura total. Com a nova regulamentação de transações sem sinal de dados, pequenos comerciantes de regiões rurais poderão receber pagamentos instantâneos com total segurança.'
    },
    {
      source: { id: 'valor', name: 'Valor Econômico' },
      author: 'Cecília Lima',
      title: 'Startups de agroenergia atraem aporte bilionário de fundos estrangeiros',
      description: 'Setor de inovação no agronegócio focado em biocombustíveis e resíduos orgânicos registra crescimento expressivo nas exportações e atrai capital europeu.',
      url: 'https://valor.globo.com/agro/agroenergia-investimentos-estrangeiros',
      urlToImage: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80',
      publishedAt: daysAgo(2),
      content: 'O agronegócio de valor agregado e ecologicamente sustentável tornou-se a nova joia do mercado brasileiro de capital de risco. A bioenergia extraída da cana e do milho de segunda safra gera grande interesse internacional.'
    }
  ],
  entertainment: [
    {
      source: { id: 'omelete', name: 'Omelete' },
      author: 'Bruno Silva',
      title: 'Séries inspiradas em videogames consolidam-se como o novo filão de Hollywood',
      description: 'Com adaptações fiéis e orçamentos grandiosos, estúdios apostam em franquias clássicas para atrair tanto gamers quanto novos públicos nas plataformas de streaming.',
      url: 'https://omelete.com.br/series/games-hollywood-sucessos',
      urlToImage: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80',
      publishedAt: daysAgo(0),
      content: 'O sucesso de público e crítica de produções recentes provou que os videogames são a nova mina de ouro para roteiros criativos de alta qualidade, desbancando os quadrinhos de super-heróis em faturamento de exibição.'
    },
    {
      source: { id: 'ign', name: 'IGN Brasil' },
      author: 'Pedro Henrique',
      title: 'Novo console de realidade virtual imersiva promete redefinir a física dos jogos',
      description: 'Controles com feedback tátil ultra-realista e displays micro-OLED 4K geram sensação de presença nunca vista antes no mercado de consoles portáteis.',
      url: 'https://br.ign.com/games/console-realidade-virtual-futuro',
      urlToImage: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=800&q=80',
      publishedAt: daysAgo(1),
      content: 'Os jogadores veteranos têm motivos para celebrar. O feedback tátil avançado simula texturas de objetos reais, o peso de ferramentas e a resistência da gravidade direto nas mãos do usuário.'
    }
  ],
  sports: [
    {
      source: { id: 'ge', name: 'Globo Esporte' },
      author: 'Camila Flores',
      title: 'Brasil sediará o Campeonato Mundial de Ginástica Artística no próximo ano',
      description: 'Federação Internacional oficializa escolha da Arena Rio como palco do evento que reunirá os principais atletas do planeta após o ciclo olímpico.',
      url: 'https://ge.globo.com/ginastica/brasil-sede-mundial-ginastica',
      urlToImage: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80',
      publishedAt: daysAgo(0),
      content: 'A ginástica brasileira ganha merecido reconhecimento em solo nacional. Com as medalhas olímpicas recentes, a torcida poderá ver de perto as principais estrelas mundiais competindo na Cidade Maravilhosa.'
    },
    {
      source: { id: 'lance', name: 'Lance!' },
      author: 'Roberto Alencar',
      title: 'Copa do Brasil tem fase de grupos mais disputada das últimas duas décadas',
      description: 'Clubes de menor expressão surpreendem favoritos tradicionais, equilibrando a competição e gerando audiência recorde nas transmissões digitais de streaming.',
      url: 'https://lance.com.br/futebol/copa-do-brasil-disputa-audiencia',
      urlToImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
      publishedAt: daysAgo(1),
      content: 'Fatores táticos e investimento em tecnologia de dados na preparação física permitiram que elencos menos badalados travassem duelos de igual para igual contra os maiores orçamentos do país.'
    }
  ],
  science: [
    {
      source: { id: 'nature', name: 'Nature Br' },
      author: 'Clara Mendes',
      title: 'Telescópio espacial descobre compostos orgânicos em atmosfera de exoplaneta próximo',
      description: 'Cientistas encontram sinais claros de vapor de água e metano na órbita de estrela anã vermelha, abrindo novas portas na busca por vida extraterrestre.',
      url: 'https://nature.com/exoplanet-organic-compounds-space-telescope',
      urlToImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
      publishedAt: daysAgo(0),
      content: 'A espectroscopia refinada do novo telescópio obteve o registro químico mais preciso de uma atmosfera extrassolar já documentado pela física astronômica moderna.'
    },
    {
      source: { id: 'galileu', name: 'Revista Galileu' },
      author: 'Thiago Neri',
      title: 'Descoberta de nova espécie na Floresta Amazônica revela compostos medicinais inéditos',
      description: 'Pesquisa conjunta entre universidades federais cataloga planta com propriedades analgésicas até dez vezes mais eficientes que os analgésicos tradicionais.',
      url: 'https://revistagalileu.globo.com/ciencia/amazonia-planta-analgesico-medicinal',
      urlToImage: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&w=800&q=80',
      publishedAt: daysAgo(3),
      content: 'A biodiversidade da floresta tropical prova mais uma vez ser a maior farmácia natural do planeta. O composto químico patenteado age diretamente no sistema nervoso periférico com raros efeitos colaterais.'
    }
  ],
  health: [
    {
      source: { id: 'einstein', name: 'Albert Einstein Saúde' },
      author: 'Dra. Vanessa Lima',
      title: 'Estudo clínico comprova benefícios do jejum intermitente sob acompanhamento médico',
      description: 'Resultados apontam melhora expressiva nos níveis de glicose no sangue, redução da gordura visceral e aumento da longevidade celular em pacientes adultos.',
      url: 'https://saude.abril.com.br/bem-estar/jejum-intermitente-beneficios-cientificos',
      urlToImage: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80',
      publishedAt: daysAgo(0),
      content: 'A ciência da nutrição avança em consensos importantes. O estudo com mais de 5 mil indivíduos analisou dados por 12 meses e apontou melhorias marcantes no perfil metabólico de pacientes.'
    },
    {
      source: { id: 'opas', name: 'OPAS Brasil' },
      author: 'Julio Cesar',
      title: 'Meditação mindfulness auxilia na redução de crises de ansiedade crônica',
      description: 'Diretrizes internacionais de psicologia começam a incluir práticas diárias de atenção plena como tratamento complementar à terapia cognitivo-comportamental.',
      url: 'https://opas.org/mindfulness-ansiedade-tratamentos',
      urlToImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
      publishedAt: daysAgo(2),
      content: 'Controlar o ritmo respiratório e modular a atividade do córtex pré-frontal via meditação ativa provou cientificamente reduzir os níveis de cortisol livre na corrente sanguínea de forma estável.'
    }
  ]
};

// Generates a mock search result
export function searchMockArticles(query: string): Article[] {
  const normalizedQuery = query.toLowerCase().trim();
  const allArticles = Object.values(MOCK_NEWS).flat();
  
  // Filter by query in title, description, or content
  return allArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(normalizedQuery) ||
      (article.description && article.description.toLowerCase().includes(normalizedQuery)) ||
      (article.content && article.content.toLowerCase().includes(normalizedQuery))
  );
}
