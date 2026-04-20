# Sony 相機展示與管理後台系統

A Sony camera product display system built with Express.js.

## 🚀 Quick Start

```bash
npm install
npm start
```

Then open: http://localhost:3000

## 📋 Test Checklist

| URL | Expected Result |
|-----|----------------|
| `localhost:3000/` | Homepage with 3 camera models |
| `localhost:3000/product/ILCE-6700.html` | Alpha 6700 product page |
| `localhost:3000/product/ILCE-7M5.html` | Alpha 7 V product page |
| `localhost:3000/product/ILCE-1M2.html` | Alpha 1 II product page |
| `localhost:3000/product/sony-abc.html` | 404 error page |
| `localhost:3000/admin` | 403 Access Denied |
| `localhost:3000/admin?code=521` | 200 Welcome to Admin |
| `localhost:3000/test/dummy` | 404 Not Found |

## 📁 Project Structure

```
project/
├── server.js          ← Express server (main file)
├── package.json       ← Dependencies & start script
├── .gitignore         ← Ignores node_modules, logs, etc.
├── data/
│   └── lens.json      ← Camera product data
└── public/
    ├── index.html     ← Homepage
    ├── css/
    │   └── style.css  ← Styles
    └── images/
        ├── a6700.jpg  ← Replace with real camera photos!
        ├── a7m5.jpg
        └── a1m2.jpg
```

## ⚠️ Before Deploying

Replace the placeholder images in `public/images/` with real Sony camera photos.
You can download them from Sony's official website or Google Images.

## 🌐 Deploy to Render

1. Push this project to GitHub
2. Go to https://dashboard.render.com
3. New → Web Service → Connect your repo
4. Settings:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Instance: Free
5. Deploy!
