import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Mock Translate</title>
      </head>
      <body>
        <h1>Mock Translate</h1>
        <input id="text" value="안녕하세요" />
        <button id="btn">번역</button>
        <pre id="out"></pre>

        <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
        <script>
          const out = document.getElementById('out');
          document.getElementById('btn').addEventListener('click', async () => {
            const q = document.getElementById('text').value;
            out.textContent = '요청 중...';

            try {
              const res = await axios.post('http://localhost:3001/translate', {
                q,
                source: 'ko',
                target: 'en'
              });
              out.textContent = res.data.data.translations[0].translatedText;
            } catch (e) {
              out.textContent = '에러: ' + (e.response ? JSON.stringify(e.response.data) : e.message);
            }
          });
        </script>
      </body>
    </html>
  `);
});


app.post("/translate", (req, res) => {
    const { q, source, target } = req.body;

    if (!q || !source || !target) {
        return res.status(400).json({
            error: "q, source, target 필요",
        });
    }

    res.json({
        data: {
            translations: [
                { translatedText: `[${source}→${target}] ${q}` },
            ],
        },
    });
});

app.listen(3001, () => {
    console.log("Mock Translate API running on http://localhost:3001");
});

