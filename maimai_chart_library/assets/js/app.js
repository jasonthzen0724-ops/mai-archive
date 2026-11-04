// 1. 譜面資料庫
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
    youtubeUrl: "https://www.youtube.com/embed/-ETn7R8KcjA",
    zipName: "melodiniq.zip" // 對應完整下載的壓縮包檔名
  }
];

let currentChart = null;

// 2. 主頁卡片渲染與搜尋篩選邏輯
function renderCharts() {
  const chartGrid = document.getElementById("chart-grid");
  const searchInput = document.getElementById("search-input")?.value.toLowerCase() || "";
  const diffSelect = document.getElementById("diff-select")?.value || "ALL";
  const resultCount = document.getElementById("result-count");
  const statTotal = document.getElementById("stat-total");
  const emptyState = document.getElementById("empty-state");

  if (!chartGrid) return;
  chartGrid.innerHTML = "";

  const filtered = charts.filter(chart => {
    const matchesSearch = chart.title.toLowerCase().includes(searchInput) ||
                          chart.artist.toLowerCase().includes(searchInput) ||
                          chart.designer.toLowerCase().includes(searchInput);
    const matchesDiff = (diffSelect === "ALL") || (chart.difficulty.toLowerCase() === diffSelect.toLowerCase());
    return matchesSearch && matchesDiff;
  });

  if (resultCount) resultCount.textContent = String(filtered.length).padStart(2, '0');
  if (statTotal) statTotal.textContent = String(charts.length).padStart(2, '0');

  if (filtered.length === 0) {
    if (emptyState) emptyState.hidden = false;
    return;
  }
  if (emptyState) emptyState.hidden = true;

  filtered.forEach(chart => {
    const baseFolder = chart.folder.endsWith("/") ? chart.folder : `${chart.folder}/`;
    const coverPath = `${baseFolder}bg.png`;

    const card = document.createElement("article");
    card.className = "chart-card";
    card.onclick = () => showDetail(chart.id);

    card.innerHTML = `
      <div style="height: 160px; background-image: url('${coverPath}'), linear-gradient(135deg, #00f0ff33, #111721); background-size: cover; background-position: center; position: relative;">
        <span style="position: absolute; top: 10px; right: 10px; padding: 4px 8px; border-radius: 4px; font-weight: bold; background: #bb73ff; color: #fff; font-size: 12px;">
          ${chart.difficulty.toUpperCase()} ${chart.level}
        </span>
      </div>
      <div style="padding: 16px;">
        <h3 style="margin: 0 0 5px; font-size: 18px; color: #fff;">${chart.title}</h3>
        <p style="margin: 0 0 12px; font-size: 13px; color: #8995a6;">${chart.artist}</p>
        <div style="display: flex; justify-content: space-between; font-size: 12px; color: #8592a3; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 10px;">
          <span>BPM: ${chart.bpm}</span>
          <span>譜師: ${chart.designer}</span>
        </div>
      </div>
    `;
    chartGrid.appendChild(card);
  });
}

// 3. 切換到詳細資訊頁面
window.showDetail = function(id) {
  const chart = charts.find(c => c.id === id);
  if (!chart) return;
  currentChart = chart;

  const baseFolder = chart.folder.endsWith("/") ? chart.folder : `${chart.folder}/`;
  const coverPath = `${baseFolder}bg.png`;
  const zipPath = `${baseFolder}${chart.zipName}`;

  document.getElementById("detail-title").textContent = chart.title;
  document.getElementById("detail-artist").textContent = chart.artist;
  document.getElementById("detail-bpm").textContent = chart.bpm;
  document.getElementById("detail-designer").textContent = chart.designer;
  document.getElementById("detail-diff").textContent = chart.difficulty;
  document.getElementById("detail-level").textContent = chart.level;
  
  document.getElementById("detail-badge").textContent = `${chart.difficulty.toUpperCase()} ${chart.level}`;
  document.getElementById("detail-cover-container").style.backgroundImage = `url('${coverPath}'), linear-gradient(135deg, #00f0ff33, #111721)`;
  
  // 設定下載 ZIP 的正確路徑
  const downloadBtn = document.getElementById("download-zip-btn");
  downloadBtn.href = zipPath;
  downloadBtn.setAttribute("download", chart.zipName);

  // 隱藏影片內嵌區（初始狀態）
  const videoContainer = document.getElementById("video-embed-container");
  const videoIframe = document.getElementById("video-iframe");
  videoContainer.style.display = "none";
  videoIframe.src = "";

  // 切換頁面視圖
  document.getElementById("home-view").style.display = "none";
  document.getElementById("detail-view").style.display = "block";
  window.scrollTo(0, 0);
};

// 4. 切換回到主頁
window.showHome = function() {
  document.getElementById("detail-view").style.display = "none";
  document.getElementById("home-view").style.display = "block";
  
  // 停止影片播放
  const videoIframe = document.getElementById("video-iframe");
  if (videoIframe) videoIframe.src = "";
};

// 5. 觀看完整影片（展開/播放內嵌 YouTube）
window.toggleVideoEmbed = function() {
  if (!currentChart) return;
  const videoContainer = document.getElementById("video-embed-container");
  const videoIframe = document.getElementById("video-iframe");

  if (videoContainer.style.display === "none") {
    videoIframe.src = `${currentChart.youtubeUrl}?autoplay=1`;
    videoContainer.style.display = "block";
  } else {
    videoContainer.style.display = "none";
    videoIframe.src = "";
  }
};

// 初始化事件監聽
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const diffSelect = document.getElementById("diff-select");

  if (searchInput) searchInput.addEventListener("input", renderCharts);
  if (diffSelect) diffSelect.addEventListener("change", renderCharts);

  renderCharts();
});
