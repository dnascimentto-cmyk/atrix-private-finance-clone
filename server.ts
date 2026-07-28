import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(express.json({ limit: '15mb' }));

const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  : null;

app.post('/api/extract-statement', async (req, res) => {
  try {
    if (!genAI) {
      return res.status(400).json({ error: 'GEMINI_API_KEY nao configurada. Configure a chave para habilitar a extracao com IA.' });
    }
    const { fileData, mimeType } = req.body;
    const result = await genAI.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { text: 'Extraia as transacoes deste extrato bancario em formato JSON com campos: date, description, amount, currency.' },
            { inlineData: { data: fileData, mimeType } },
          ],
        },
      ],
    });
    res.json({ text: result.text });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Erro ao processar extrato' });
  }
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`ATRIX server rodando na porta ${PORT}`);
});
