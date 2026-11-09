# MAI ARCHIVE - maimai 自製譜面展示庫開發規範 (AGENTS.md)

## 1. 專案目的
建立一個展示與提供下載 maimai 自製譜面的純靜態網站（MAI ARCHIVE）。創作者可發布譜面作品與 YouTube/MP4 預覽影片，玩家能在線上觀看預覽、透過雙重條件（等級與難度）篩選譜面，並下載包含 `maidata.txt`、音檔與 `bg.png` 的 ZIP 譜面包。

---

## 2. 視覺風格與 UI 規範
- **主題色系：** maimai 街機深色科技風（背景 `#080b10`、霓虹粉 `rgba(255, 0, 128, 0.15)`、水藍 `#00f0ff`）。
- **動態背景：** 背景需包含中央雙重旋轉亮光圓環（Neon Glow Rings）與極微弱科技網格。
- **難度標籤顏色規範：**
  - `BASIC`: 綠色 (`#2ecc71`)
  - `ADVANCED`: 黃色 (`#f1c40f`)
  - `EXPERT`: 紅色 (`#ff5577`)
  - `MASTER`: 紫色 (`#bb73ff`)
  - `Re:MASTER`: 白底黑字醒目標記 (`#ffffff` 底、`#000000` 字)

---

## 3. 檔案結構與目錄規範 (One-Folder-Per-Chart)
所有譜面資源統一放置於 `chart/[Song_Folder]/` 目錄下：
- `chart/[Song_Folder]/bg.png` : 譜面封面圖片（卡片頁與詳細頁共用）
- `chart/[Song_Folder]/[zipName].zip` : 提供玩家下載的 ZIP 壓縮包

---

## 4. 歌曲資料結構 (Data Schema)
資料採用 **「單曲集中化 + 多難度陣列 (rawSongs)」** 的方式定義，最後由程式自動 `flatMap` 展開為卡片資料：

```javascript
const rawSongs = [
  {
    id: "song_id",
    title: "歌曲名稱",
    artist: "曲師名稱",
    bpm: 180,
    folder: "chart/Song_Folder/",
    zipName: "Song_Filename.zip",
    difficulties: [
      { 
        difficulty: "Master", 
        level: "14+", 
        designer: "譜師名義", 
        youtubeUrl: "[https://www.youtube.com/embed/XXXXXX](https://www.youtube.com/embed/XXXXXX)" 
      }
    ]
  }
];
