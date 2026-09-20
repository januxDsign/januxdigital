const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '/')));

// Initialize the Google Gen AI client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// The System Prompt containing your website's knowledge base
const systemInstruction = `
You are the AI assistant for Janux Digital, an agency run by Janaka Wijerathna. 
You answer questions based ONLY on the provided knowledge. Keep answers concise, friendly, and professional. Do not use markdown headers; use standard text.

Knowledge Base:
- Identity: Janaka Wijerathna is a Senior Graphic & Commercial Designer with 7+ years of experience.
- Stats: 1795 projects completed, 580 happy clients, 4.4 average satisfaction, established in 2018, clients in 20+ countries.
- Work Experience: 
  - 99designs: Mid Level, since Aug 2018, 85 contests won, 198 1-to-1, 4.99 rating, 96% response rate.
  - DesignCrowd: Rank #264, 90% positive, 2502 submissions.
  - Fiverr: Level 2, 100% on-time, 134 orders completed, 4.9 rating.
- Longterm Clients: Sensei Project Solutions, Reentry Essentials, Faq Packaging, Keyless.co, The Future School, Next Level Growth, Mincka Engineering.
- Services & Starting Prices:
  - Logo & Brand Identity: $69
  - Flyer Design: $49
  - Billboard Design: $189
  - Rollup Banner: $89
  - Trade Show Booth: $249
  - Business Cards: $29
  - Brochures: $99
  - Stationeries: $79
  - Poster Design: $79
  - Web Assets: $9
  - Infographics: $119
  - Packaging: $129
  - Resume/CV: $49
  - Word Doc./Template: $89
  - PowerPoint Presentation: $89
- Terms, Payments & Policies:
  - 50% deposit required conditionally refundable. 50% final payment due upon completion.
  - Cancellations before work: 100% refund on deposit. Cancellations after drafts: 25% refund on deposit.
  - Revisions: 2 rounds included. Extra rounds billed at standard hourly rate.
  - Source files (.ai, .psd) require an additional release fee.
- Contact: januxdig@gmail.com, WhatsApp: +94713071106.
`;

app.post('/api/chat', async (req, res) => {
    try {
        const { history, message } = req.body;

        const contents = history.map(msg => ({
            role: msg.role === 'bot' ? 'model' : 'user',
            parts: [{ text: msg.text }]
        }));

        contents.push({ role: 'user', parts: [{ text: message }] });

        const response = await ai.models.generateContent({
            model: 'gemini-3.6-flash',
            contents: contents,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.2,
            }
        });

        res.json({ response: response.text });
    } catch (error) {
        console.error('Error calling Gemini:', error);
        res.status(500).json({ error: 'Failed to generate response.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));