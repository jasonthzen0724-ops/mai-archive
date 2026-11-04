// 1. 譜面資料庫 (未來新增曲目只需在此追加資料)
const charts = [
  {
    id: "melodiniq",
    title: "Melodiniq",
    artist: "onoken a.k.a. owl＊tree",
    designer: "譜師名義",
    bpm: 185,
    difficulty: "Master",
    level: "14+",
    folder: "chart/melodiniq" // 資料夾名稱 (不用管尾端有沒有斜線)
  }
];

// 2. 渲染邏輯
function renderCharts(data) {
  const chartGrid = document.getElementById("chart-grid");
  const resultCount = document.getElementById("result-count");
  const statTotal = document.getElementById("stat-total");
  const emptyState = document.getElementById("empty-state");

  if (!chartGrid) return;
  
  // 清空舊內容
  chartGrid.innerHTML = "";
  
  // 更新計數器
  if (resultCount) resultCount.textContent = String(data.length).padStart(2, '0');
  if (statTotal) statTotal.textContent = String(charts.length).padStart(2, '0');

  // 無資料時的處理
  if (data.length === 0) {
    if (emptyState) emptyState.hidden = false;
    return;
  }
  if (emptyState) emptyState.hidden = true;

  // 強制渲染每一張卡片
  data.forEach((chart) => {
    // 💡 修正 1：自動補齊資料夾斜線
    const folderPath = chart.folder.endsWith("/") ? chart.folder : `${chart.folder}/`;
    const coverPath = `${folderPath}bg.png`;

    const card = document.createElement("article");
    card.className = "chart-card";
    
    // 💡 修正 2：強制生成 HTML 卡片與預設背景 fallback
    card.innerHTML = `
      <div class="card-cover" style="background-image: url('${coverPath}'), radial-gradient(circle, #00f0ff33, #111721); height: 160px; background-size: cover; background-position: center; position: relative;">
        <span class="diff-badge ${chart.difficulty.toLowerCase()}" style="position: absolute; top: 10px; right: 10px; padding: 4px 8px; border-radius: 4px; font-weight: bold; background: #bb73ff; color: #fff;">
          ${chart.difficulty.toUpperCase()} ${chart.level}
        </span>
      </div>
      <div class="card-body" style="padding: 15px;">
        <h3 class="card-title" style="margin: 0 0 5px; font-size: 16px; color: #fff;">${chart.title}</h3>
        <p class="card-artist" style="margin: 0 0 10px; font-size: 12px; color: #8995a6;">${chart.artist}</p>
        <div class="card-info" style="display: flex; justify-content: space-between; font-size: 11px; color: #8592a3; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 8px;">
          <span>BPM: ${chart.bpm}</span>
          <span>譜師: ${chart.designer}</span>
        </div>
        <button class="card-btn" onclick="openModal('${chart.id}')" style="margin-top: 12px; width: 100%; padding: 8px; background: transparent; border: 1px solid #00f0ff; color: #00f0ff; border-radius: 4px; cursor: pointer; font-weight: bold;">
          觀看預覽影片與下載
        </button>
      </div>
    `;
    chartGrid.appendChild(card);
  });
}

// 3. Modal 彈窗與 MP4 影片播放
window.openModal = function (id) {
  const chart = charts.find((c) => c.id === id);
  if (!chart) return;

  const folderPath = chart.folder.endsWith("/") ? chart.folder : `${chart.folder}/`;
  const videoPath = `${folderPath}out.mp4`;
  const zipPath = `${folderPath}${chart.id}.zip`;

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
      <div style="color: #00f0ff; margin-bottom: 5px;">難度等級：${chart.difficulty} (${chart.level})</div>
      <div style="color: #00f0ff;">歌曲 BPM：${chart.bpm}</div>
    `;
  }

  // 載入 HTML5 影片播放器
  if (modalCover) {
    modalCover.innerHTML = `
      <video controls autoplay style="width: 100%; max-height: 280px; border-radius: 6px;">
        <source src="${videoPath}" type="video/mp4">
        您的瀏覽器不支援影片播放。
      </video>
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

  // 初始化渲染
  renderCharts(charts);
});