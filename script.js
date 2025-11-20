const resources = [
  {
    title: '小升初数学思维冲刺题库（含解析）',
    grade: '小学',
    subject: '数学',
    price: 19,
    tags: ['思维训练', '小升初'],
    description: '精选 200 道逻辑、应用题，附详细思路与解题模板，适合 5-6 年级提分冲刺。',
  },
  {
    title: '初一英语语法黄金手册',
    grade: '初中',
    subject: '英语',
    price: 15,
    tags: ['语法', '课本同步'],
    description: '覆盖初一上/下册核心语法，例句 + 练习 + 课堂检测，支持打印。',
  },
  {
    title: '小学语文阅读理解专项训练（70 篇）',
    grade: '小学',
    subject: '语文',
    price: 12,
    tags: ['阅读', '素养提升'],
    description: '短文 + 解析 + 高频题型拆解，培养审题与关键信息提取能力。',
  },
  {
    title: '初二物理实验报告模板与满分示例',
    grade: '初中',
    subject: '科学',
    price: 18,
    tags: ['实验', '报告范文'],
    description: '覆盖 12 个核心实验，提供实验原理、数据记录、误差分析与答题示范。',
  },
  {
    title: '英语口语家长共学卡（30 天）',
    grade: '小学',
    subject: '英语',
    price: 29,
    tags: ['口语', '家长陪练'],
    description: '每日 10 分钟亲子口语打卡，AI 纠音 + 口语评分，支持家长监督提醒。',
  },
  {
    title: '初中数学函数与图像精讲微课包',
    grade: '初中',
    subject: '数学',
    price: 32,
    tags: ['微课', '提分'],
    description: '12 节短课 + 配套讲义 + 课后巩固练习，强化函数与图像核心考点。',
  },
];

const resourceList = document.getElementById('resourceList');
const gradeFilter = document.getElementById('gradeFilter');
const subjectFilter = document.getElementById('subjectFilter');
const searchInput = document.getElementById('searchInput');

function createResourceCard(resource) {
  const card = document.createElement('article');
  card.className = 'card';

  const header = document.createElement('div');
  header.className = 'card__header';
  header.innerHTML = `
    <div>
      <p class="card__meta">${resource.grade} · ${resource.subject}</p>
      <h3 class="card__title">${resource.title}</h3>
    </div>
    <span class="price">￥${resource.price}</span>
  `;

  const tags = document.createElement('div');
  tags.className = 'card__tags';
  resource.tags.forEach((tag) => {
    const el = document.createElement('span');
    el.className = 'tag';
    el.textContent = tag;
    tags.appendChild(el);
  });

  const desc = document.createElement('p');
  desc.className = 'card__desc';
  desc.textContent = resource.description;

  const footer = document.createElement('div');
  footer.className = 'card__footer';
  footer.innerHTML = `
    <button class="btn-small" aria-label="预览${resource.title}">预览摘要</button>
    <button class="btn-small" aria-label="购买${resource.title}">立即购买</button>
  `;

  card.append(header, tags, desc, footer);
  return card;
}

function renderResources() {
  const grade = gradeFilter.value;
  const subject = subjectFilter.value;
  const keyword = searchInput.value.trim().toLowerCase();

  resourceList.innerHTML = '';

  resources
    .filter((item) => (grade === 'all' ? true : item.grade === grade))
    .filter((item) => (subject === 'all' ? true : item.subject === subject))
    .filter((item) =>
      keyword === ''
        ? true
        : `${item.title}${item.description}${item.tags.join('')}`.toLowerCase().includes(keyword)
    )
    .forEach((resource) => resourceList.appendChild(createResourceCard(resource)));

  if (!resourceList.children.length) {
    const empty = document.createElement('p');
    empty.textContent = '未找到匹配的文档，请更换关键词或筛选条件。';
    empty.style.color = 'var(--muted)';
    resourceList.appendChild(empty);
  }
}

[gradeFilter, subjectFilter, searchInput].forEach((el) => el.addEventListener('input', renderResources));

renderResources();
