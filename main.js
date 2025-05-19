const categories = {
  "Autoestima": [
    "Cuide de si mesmo como cuidaria de alguém que você ama.",
    "Você é suficiente, exatamente como é.",
    "Valorize suas conquistas, por menores que sejam.",
    "Aceitar-se é iniciar um lindo processo de transformação.",
    "A sua opinião sobre você é mais importante do que a dos outros.",
    "Compare-se menos, celebre suas singularidades.",
  ],
  "Resiliência": [
    "Cada desafio é uma oportunidade para crescer.",
    "Confie na capacidade que você tem de superar momentos difíceis.",
    "Fracassos são passos para o sucesso.",
    "A adversidade revela forças que não conhecíamos.",
    "Permita-se recomeçar quantas vezes for necessário.",
    "A calma diante das dificuldades é sinal de coragem.",
  ],
  "Autoconhecimento": [
    "Olhe para dentro e descubra sua verdade.",
    "Questionar-se é o primeiro ato do despertar.",
    "Seja honesto consigo mesmo: a mudança começa aí.",
    "O autoconhecimento é a chave para escolhas mais conscientes.",
    "Sinta, escute e respeite suas emoções.",
    "Permita-se conhecer quem você é agora.",
  ],
  "Relacionamentos": [
    "Relações saudáveis exigem diálogo e escuta ativa.",
    "Dizer 'não' também é um ato de amor próprio.",
    "Empatia é o melhor presente que podemos oferecer ao outro.",
    "Valorize as pequenas gentilezas do dia a dia.",
    "É saudável impor limites, inclusive com quem amamos.",
    "O respeito é a base de qualquer relação verdadeira.",
  ],
  "Gratidão": [
    "A gratidão transforma o que temos em suficiente.",
    "Reconheça e celebre as pequenas alegrias do cotidiano.",
    "Ser grato libera leveza e amor.",
    "Olhe ao redor: há motivos para agradecer, mesmo nos dias difíceis.",
    "Agradecer conecta mente e coração.",
    "Cultivar gratidão é um caminho para a felicidade.",
  ],
  "Luto": [
    "Permita-se viver o luto no seu tempo e do seu jeito.",
    "Sentir saudade é também uma forma de amor.",
    "Nenhum sentimento é errado durante o luto; acolha o que vier.",
    "Você não precisa ser forte o tempo todo.",
    "O processo de luto não é linear, respeite seus altos e baixos.",
    "Compartilhar sua dor pode aliviar o peso do coração.",
    "A memória de quem se foi pode ser um abrigo de carinho.",
    "Dê a si mesmo compaixão ao vivenciar perdas.",
    "O luto é um processo, não um obstáculo a ser superado.",
    "Permita-se procurar apoio quando necessário."
  ]
};

const categorySelect = document.getElementById('category');
const drawBtn = document.getElementById('draw-card-btn');
const cardDiv = document.getElementById('card');
const cardTextDiv = document.getElementById('card-text');
const historyList = document.getElementById('history-list');

// Populate category selector
function populateCategories() {
  for (const cat in categories) {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    categorySelect.appendChild(opt);
  }
}
populateCategories();

// Util to shuffle array (Fisher-Yates)
function shuffle(array) {
  let cur = array.length, rand;
  while (cur !== 0) {
    rand = Math.floor(Math.random() * cur);
    cur--;
    [array[cur], array[rand]] = [array[rand], array[cur]];
  }
  return array;
}

let cardQueue = [];
let currentCategory = categorySelect.value;
let revealedHistory = [];

// (Re)shuffle cards for current category
function refreshCardQueue(cat) {
  cardQueue = shuffle([...categories[cat]]);
}

function showCard(text) {
  cardDiv.classList.add('hidden');
  setTimeout(() => {
    cardTextDiv.textContent = `"${text}"`;
    cardDiv.classList.remove('hidden');
  }, 200);
}

function updateHistory() {
  historyList.innerHTML = '';
  revealedHistory.slice().reverse().forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    historyList.appendChild(li);
  });
}

// Draw card handler
drawBtn.addEventListener('click', () => {
  if (cardQueue.length === 0) {
    // If all phrases are drawn, reshuffle for new session
    refreshCardQueue(currentCategory);
  }
  const card = cardQueue.pop();
  if (card) {
    showCard(card);
    revealedHistory.push(card);
    updateHistory();
  }
});

// Switch category handler
categorySelect.addEventListener('change', (e) => {
  currentCategory = e.target.value;
  refreshCardQueue(currentCategory);
  revealedHistory = [];
  cardDiv.classList.add('hidden');
  updateHistory();
});

// Initial state
categorySelect.selectedIndex = 0;
refreshCardQueue(categorySelect.value);
cardDiv.classList.add('hidden');
updateHistory();