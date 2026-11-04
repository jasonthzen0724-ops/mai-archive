// 1. 譜面資料庫 (已設定 YouTube 嵌入)
const charts = [
  {
    id: "melodiniq",
    title: "Melodiniq",
    artist: "onoken a.k.a. owl＊tree",
    designer: "譜師名義",
    bpm: 185,
    difficulty: "Master",
    level: "14+",
    folder: "chart/melodiniq/",
    youtubeUrl: "https://www.youtube.com/embed/-ETn7R8KcjA"
  }
];

// 2. 渲染卡片邏輯 (支援大小寫相容)
function renderCharts(data) {
  const chartGrid = document.getElementById("chart-grid");
  const resultCount = document.getElementById("result-count");
  const statTotal = document.getElementById("stat-total");
  const emptyState = document.getElementById("empty-state");

  if (!chartGrid) return;
  chartGrid.innerHTML = "";

  if (resultCount) resultCount.textContent = String(data.length).padStart(2, '0');
  if (statTotal) statTotal.textContent = String(charts.length).padStart(2, '0');

  if (data.length === 0) {
    if (emptyState) emptyState.hidden = false;
    return;
  }
  if (emptyState) emptyState.hidden = true;

  data.forEach((chart) => {
    const baseFolder = chart.folder.endsWith("/") ? chart.folder : `${chart.folder}/`;
    const coverPath = `${baseFolder}bg.png`;

    const card = document.createElement("article");
    card.className = "chart-card";
    card.style.cssText = "background: #151e2a; border: 1px solid rgba(0, 240, 255, 0.3); border-radius: 12px; overflow: hidden; margin-top: 20px;";

    card.innerHTML = `
      <div class="card-cover" style="height: 180px; background-image: url('${coverPath}'), linear-gradient(135deg, #00f0ff33, #111721); background-size: cover; background-position: center; position: relative;">
        <span class="diff-badge" style="position: absolute; top: 12px; right: 12px; padding: 4px 10px; border-radius: 4px; font-weight: bold; background: #bb73ff; color: #fff; font-size: 12px;">
          ${chart.difficulty.toUpperCase()} ${chart.level}
        </span>
      </div>
      <div class="card-body" style="padding: 18px; color: #fff;">
        <h3 style="margin: 0 0 6px; font-size: 18px; color: #fff;">${chart.title}</h3>
        <p style="margin: 0 0 12px; font-size: 13px; color: #8995a6;">${chart.artist}</p>
        <div style="display: flex; justify-content: space-between; font-size: 12px; color: #8592a3; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 10px; margin-bottom: 15px;">
          <span>BPM: ${chart.bpm}</span>
          <span>譜師: ${chart.designer}</span>
        </div>
        <button onclick="openModal('${chart.id}')" style="width: 100%; padding: 10px; background: rgba(0, 240, 255, 0.1); border: 1px solid #00f0ff; color: #00f0ff; border-radius: 6px; cursor: pointer; font-weight: bold;">
          ▶ 觀看預覽影片與下載
        </button>
      </div>
    `;
    chartGrid.appendChild(card);
  });
}

// 3. Modal 彈窗與 YouTube 影片嵌入
window.openModal = function (id) {
  const chart = charts.find((c) => c.id === id);
  if (!chart) return;

  const baseFolder = chart.folder.endsWith("/") ? chart.folder : `${chart.folder}/`;
  const zipPath = `${baseFolder}${chart.id}.zip`;

  const detailModal = document.getElementById("detail-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalArtist = document.getElementById("modal-artist");
  const modalMeta = document.getElementById("modal-meta");
  const modalCover = document.getElementById("modal-cover");
  const downloadLink = document.getElementById("download-link");

  if (modalTitle) modalTitle.textContent = chart.title;
  if (modalArtist) modalArtist.textContent = `曲師：${chart.artist} | 譜師：${chart.designer}`;
  if (modalMeta) {
    modalMeta.innerHTML = `
      <div style="color: #00f0ff; margin-bottom: 6px;">難度等級：${chart.difficulty} (${chart.level})</div>
      <div style="color: #00f0ff;">歌曲 BPM：${chart.bpm}</div>
    `;
  }

  if (modalCover) {
    modalCover.innerHTML = `
      <iframe 
        src="${chart.youtubeUrl}?autoplay=1" 
        style="width: 100%; height: 280px; border: 0; border-radius: 8px;" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>
    `;
  }

  if (downloadLink) downloadLink.href = zipPath;
  if (detailModal) detailModal.hidden = false;
};

// 初始化
document.addEventListener("DOMContentLoaded", () => {
  const modalClose = document.getElementById("modal-close");
  const detailModal = document.getElementById("detail-modal");
  const modalCover = document.getElementById("modal-cover");

  if (modalClose) {
    modalClose.addEventListener("click", () => {
      if (detailModal) detailModal.hidden = true;
      if (modalCover) modalCover.innerHTML = "";
    });
  }

  // 預設直接渲染所有資料
  renderCharts(charts);
});
