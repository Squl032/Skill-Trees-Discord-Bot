# 🤖 Discord 自動建立伺服器與 Skill Trees Hash 檢查器（支援 Webhook 通知）

本專案是一個使用 `discord.js-selfbot-v13` 製作的 Discord 自用機器人（Selfbot），會自動建立 Discord 伺服器並計算 MurmurHash3 的實驗標籤 `2025-02_skill_trees`，判斷是否命中指定的實驗組範圍（例如 10–20、60–100）。

命中後，會透過 Webhook 發送伺服器邀請連結、帳號 Token、Hash 值與伺服器 ID 至指定頻道。

---

## 📦 功能簡介

- 🏗️ 自動建立 Discord 伺服器
- 🔍 根據 Hash 值篩選特定實驗分組
- 🔗 建立永久邀請連結
- 📩 Webhook 自動發送命中資訊
- ✅ 支援本地與雲端執行（Replit 可用）

---

## ⚙️ 使用方式

### 1️⃣ 安裝依賴
```bash
npm install
```

### 2️⃣ 設定 `.env`
```env
DISCORD_TOKEN=你的Selfbot帳號Token
WEBHOOK_URL=你的Webhook網址
```

### 3️⃣ 執行程式
```bash
node index.js
```

---

## 🌐 關於 Replit

如需使用 Replit 執行此程式，可自行加上 `Express` + `UptimeRobot` 做簡易掛機伺服器。是否使用、風險與可行性請自行斟酌，請務必避免帳號被誤判為機器人操作。

---

## ⚠️ 注意事項

- ⚠️ 本專案使用的是 Discord Selfbot（自用機器人），違反 Discord 使用條款（ToS），**請自行承擔風險**。
- ✅ 僅限學術與研究用途，**請勿用於大量刷伺服器或濫用行為**。
- 🔒 請勿公開帳號 Token，Webhook 頻道建議設為私人。

---

## 📊 分組範圍參考（Skill Trees）

| 分組         | Hash 範圍            |
|--------------|----------------------|
| Control 組   | 0–10、20–60          |
| Treatment 組 | 10–20、60–100        |
| None         | 100–10000（無實驗標籤） |

程式會嘗試命中 Treatment 組範圍。

---

## 🙋 常見問題 FAQ

**Q1. 我要怎麼取得帳號 Token？**  
請自行查詢相關教學，注意使用者帳號進行自動操作會違反 Discord 條款。

**Q2. Webhook 會包含 Token 嗎？**  
會。為了方便你記錄命中結果與登入帳號，請設定 Webhook 頻道為私人可見。

**Q3. 可以跑無限次直到命中嗎？**  
可。只要將程式中的 `break` 改為 `continue` 即可讓它持續尋找下一個命中。

---

## 📁 專案結構

```
├── index.js          主程式：建立伺服器與 Webhook 發送
├── server.js         （可選）簡易伺服器：可搭配 UptimeRobot
├── .env              環境變數設定檔
├── package.json      套件與啟動設定
```

---

## 👨‍🏫 教學作者

由 @Squl032 製作，靈感來自 [@bytexenon](https://gist.github.com/bytexenon) 所撰寫的  
[Make Discord Server With a Tag](https://gist.githubusercontent.com/bytexenon/db8e7dce72bb6a21aa2277de834de1d1/raw/58ca10f91e3686571059052bbacc0f88a7ecb49a/Make%2520Discord%2520Server%2520With%2520a%2520Tag.md)

---

## ❗免責聲明

本專案僅供技術研究使用，不得用於：

- Discord 帳號自動化註冊或刷伺服器

- 濫用邀請、試圖規避 Discord 安全系統

- 違反 Discord TOS 的其他行為

使用者應自負風險與法律責任。

---

> 📘 請務必遵守 Discord 使用條款，勿將本專案用於惡意或違規用途。
