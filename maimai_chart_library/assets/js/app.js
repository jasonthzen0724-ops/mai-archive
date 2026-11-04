// 1. 譜面資料庫 (填入你的 YouTube 影片連結)
const charts = [
  {
    id: "melodiniq",
    title: "Melodiniq",
    artist: "onoken a.k.a. owl＊tree",
    designer: "譜師名義",
    bpm: 185,
    difficulty: "Master",
    level: "14+",
    folder: "chart/melodiniq/", // 相對資料夾路徑
    youtubeUrl: "https://www.youtube.com/embed/-ETn7R8KcjA" // 👈 影片網址嵌入點
  }
];

// 2. 渲染卡片邏輯
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
    
    card.innerHTML = `
      <div class="card-cover" style="height: 160px; background-image: url('${coverPath}'), radial-gradient(circle, #00f0ff33, #111721); background-size: cover; background-position: center; position: relative;">
        <span class="diff-badge ${chart.difficulty.toLowerCase()}" style="position: absolute; top: 10px; right: 10px; padding: 4px 8px; border-radius: 4px; font-weight: bold; background: #bb73ff; color: #fff; font-size: 11px;">
          ${chart.difficulty.toUpperCase()} ${chart.level}
        </span>
      </div>
      <div class="card-body" style="padding: 16px; display: flex; flex-direction: column; justify-content: space-between; background: #151e2a; border-radius: 0 0 12px 12px;">
        <div>
          <h3 class="card-title" style="margin: 0 0 5px; font-size: 16px; color: #fff;">${chart.title}</h3>
          <p class="card-artist" style="margin: 0 0 12px; font-size: 12px; color: #8995a6;">${chart.artist}</p>
        </div>
        <div class="card-info" style="display: flex; justify-content: space-between; font-size: 11px; color: #8592a3; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 10px; margin-bottom: 12px;">
          <span>BPM: ${chart.bpm}</span>
          <span>譜師: ${chart.designer}</span>
        </div>
        <button class="card-btn" onclick="openModal('${chart.id}')" style="width: 100%; padding: 10px; background: transparent; border: 1px solid #00f0ff; color: #00f0ff; border-radius: 4px; cursor: pointer; font-weight: bold;">
          觀看預覽影片與下載
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

  // 💡 關鍵修正：將彈窗左側改為嵌入 YouTube 播放器 (支援畫質與變速播放)
  if (modalCover) {
    modalCover.innerHTML = `
      <iframe 
        src="${chart.youtubeUrl}?autoplay=1" 
        style="width: 100%; height: 280px; border: 0; border-radius: 6px;" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>
    `;
  }

  if (downloadLink) downloadLink.href = zipPath;
  if (detailModal) detailModal.hidden = false;
};

// 關閉 Modal
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

  renderCharts(charts);
});
