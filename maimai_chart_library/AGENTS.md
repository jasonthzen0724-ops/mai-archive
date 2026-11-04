# MAI ARCHIVE - maimai 自製譜面展示庫開發規範 (AGENTS.md)

## 1. 專案目的
建立一個展示與提供下載 maimai 自製譜面的純靜態網站（MAI ARCHIVE）。創作者可發布譜面作品與 MP4 預覽影片，玩家能在線上觀看預覽（支援變速播放）並下載包含 maidata.txt、track.mp3 與 bg.png 的 ZIP 譜面包。

## 2. 視覺風格與 UI 規範
- **主題色系：** maimai 街機深色科技風（背景 `#0d1117`、霓虹粉 `#ff007f`、水藍 `#00f0ff`）。
- **難度標籤顏色規範：**
  - BASIC: 綠色 (`#2ecc71`) | ADVANCED: 黃色 (`#f1c40f`) | EXPERT: 紅色 (`#e74c3c`)
  - MASTER: 紫色 (`#9b59b6`) | Re:MASTER: 紅白相間 gradients

## 3. 簡化檔案結構與自動推導規範 (One-Folder-Per-Chart)
所有譜面資源統一放置於 `/charts/[song_id]/` 目錄下：
- `/charts/[song_id]/out.mp4`       : 創作者導出的 MP4 譜面預覽影片 (線上播放器預設讀取來源)
- `/charts/[song_id]/bg.png`        : 背景/封面圖片 (亦支援 bg.jpg，若缺檔自動讀取預設圖)
- `/charts/[song_id]/[song_id].zip` : 提供玩家下載的 ZIP 壓縮包 (內含 maidata.txt, track.mp3, bg.png)

## 4. Data Schema (`assets/js/app.js` 內的 `charts` 陣列)
```json
{
  "id": "melodiniq",
  "title": "Melodiniq",
  "artist": "onoken a.k.a. owl＊tree",
  "designer": "譜師名義",
  "bpm": 185,
  "difficulty": "Master",
  "level": "14+",
  "folder": "charts/melodiniq/"
}