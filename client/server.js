import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


async function createServer() {
    const app = express();


    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const vite = await createViteServer({
        server: { middlewareMode: 'ssr' },
    });
    app.use(vite.middlewares);

    app.use('*', async (req, res) => {
        const url = req.originalUrl;

        let template, render;
        try {
            template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
            template = await vite.transformIndexHtml(url, template);
            render = (await vite.ssrLoadModule('src/entry-server.js')).render;
        } catch (e) {
            vite.ssrFixStacktrace(e);
            res.status(500).end(e.stack);
            return;
        }

        const appHtml = await render(url);

        const html = template.replace(`<!--ssr-outlet-->`, appHtml);

        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    });

    app.listen(5000, () => {
        console.log('Server running at localhost:5000');
    });
}

createServer();
