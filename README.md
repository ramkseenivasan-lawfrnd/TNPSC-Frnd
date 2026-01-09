# 🎓 TNPSC_Frnd: AI Exam Preceptor

**TNPSC_Frnd** is a high-performance, AI-powered preparation assistant specifically designed for aspirants of the **Tamil Nadu Public Service Commission (TNPSC)**. By leveraging the **Gemini 3 Flash** model, it provides real-time tutoring, current affairs analysis with search grounding, and deep-dive analysis of Previous Year Questions (PYQs).

---

## 🚀 Key Features

### 🧠 AI Preceptor (Personal Tutor)
- **Syllabus-Aware**: Instant answers linked directly to TNPSC Units (including Unit 8: TN History/Culture and Unit 9: Development Administration).
- **Streaming UI**: Human-like responses that appear in real-time.
- **Bilingual Support**: Toggle seamlessly between **Tamil (தமிழ்)** and **English**.

### 📰 Smart Current Affairs
- **Google Search Grounding**: Fetches the latest government policies and news.
- **TN-Specific Impact**: Automatically identifies how national news affects the state of Tamil Nadu.
- **Verified Sources**: Includes direct links to official news and government portals.

### 📄 PYQ Analyzer
- **Multimodal Uploads**: Drag and drop PDF question papers or snap photos of exam pages.
- **Automated Solving**: AI identifies questions within documents and provides detailed explanations.
- **Syllabus Mapping**: Links every question to its relevant portion in the official syllabus.

### 📈 Exam Predictor
- **Trend Analysis**: Uses historical data from the last 5 years to predict high-probability topics for upcoming Group I, II, and IV exams.
- **Probability Scores**: Visualizes topic importance using intuitive progress bars.

### 📁 Knowledge Bank
- **Persistent Storage**: Save complex explanations or news analysis to your local "Knowledge Bank" for offline revision.

---

## 🛠️ Technical Stack

- **Frontend**: React 19 (ES6 Modules)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI Engine**: `@google/genai` (Gemini 3 Flash & 2.5 Flash)
- **Grounding**: Google Search & Maps API integration

---

## ⚙️ Environment Configuration

To run this application, you need a Google AI Studio API Key.

### Local Setup
1. Define your key in a `.env` file:
   ```env
   VITE_API_KEY=your_gemini_api_key_here
   ```

### Vercel Deployment
For security and compatibility, add the following Environment Variables in your Vercel Project Settings:
- `API_KEY`: Your Gemini Key
- `VITE_API_KEY`: Your Gemini Key (Duplicate for build-time compatibility)

---

## 📜 System Instructions & Safety

The AI is governed by strict system instructions to ensure academic integrity:
- **Clean Output**: All Markdown symbols (`###`, `**`) are stripped for a professional, plain-text reading experience.
- **Accuracy First**: The model is instructed to prioritize official TNPSC sources and government press releases.
- **Encouraging Tone**: Designed to act as a supportive mentor for long-term preparation.

---

## 👨‍🏫 Usage Tips

1. **Unit 8 & 9**: When asking about Tamil culture or administration, use the **Tamil** language setting for more nuanced and culturally accurate responses.
2. **Clear History**: Use the 'Trash' icon in the Chat Preceptor to start a fresh topic for better context management.
3. **Save for Later**: Use the 'Bookmark' icon on any analysis to keep it in your permanent study list.

---
*Built with ❤️ for TNPSC Aspirants.*
