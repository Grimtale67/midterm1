const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Bootstrap: 優先使用雲端環境分配的 PORT，否則預設使用 3000
const PORT = process.env.PORT || 3000;

// 1. Data Source: 載入 JSON 資料庫 (使用解構賦值提取 data 陣列)
const { data } = require('./data/lens.json');

// ---------------------------------------------------------
// 2. Global Middleware: Logger (全域日誌紀錄)
// ---------------------------------------------------------
app.use((req, res, next) => {
    const log = `[${new Date().toLocaleString()}] ${req.method} ${req.url}\n`;
    fs.appendFileSync(path.resolve(__dirname, './access.log'), log);
    next();
});

// ---------------------------------------------------------
// 3. Static Assets Middleware (靜態資源中間件)
// ---------------------------------------------------------
app.use(express.static(path.resolve(__dirname, './public')));

// ---------------------------------------------------------
// 4. Dynamic Route: Product Details (動態路由與參數)
// ---------------------------------------------------------
app.get('/product/:model.html', (req, res) => {
    const { model } = req.params;
    const product = data.find(item => item.model === model);

    if (!product) {
        return res.status(404)
            .set('Content-Type', 'text/html; charset=utf-8')
            .send('<h1>404 找不到型號</h1>');
    }

    res.send(`
        <div style="text-align:center; font-family:sans-serif;">
            <h1>Sony Product Info (產品資訊)</h1>
            <hr>
            <h2>${product.name}</h2>
            <p>Model: ${product.model}</p>
            <img src="${product.imageUrl}" alt="${product.name}" style="width:400px;">
            <br><br>
            <a href="/">Back to Home (回首頁)</a>
        </div>
    `);
});

// ---------------------------------------------------------
// 5. Protected Route: Admin (受保護的路由與授權)
// ---------------------------------------------------------
app.get('/admin', (req, res) => {
    const isAuth = req.query.code === '521';
    const message = isAuth ? 'Welcome to Admin (歡迎進入後台)' : 'Access Denied (暗號錯誤)';

    res.status(isAuth ? 200 : 403)
        .set('Content-Type', 'text/html; charset=utf-8')
        .send(`<h1 style="text-align:center;">${message}</h1>`);
});

// ---------------------------------------------------------
// 6. Wildcard Route: Catch-all (萬用路由 / 404 防呆)
// ---------------------------------------------------------
app.all(/.*$/, (req, res) => {
    res.status(404)
        .set('Content-Type', 'text/html; charset=utf-8')
        .send('<h1 style="text-align:center; padding-top:50px;">404 Not Found (抱歉，路徑不存在)</h1>');
});

// 7. Start Server
app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
});
