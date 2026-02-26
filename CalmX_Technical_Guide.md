# CalmX – Project Documentation
## 1. Project Abstract
**CalmX** is an AI-powered mental health ecosystem designed to combat "Corporate Lifestyle Toxicity." It addresses burnout and workspace stress by integrating proactive mood tracking, AI-based relational advisory (DeepSeek LLM), and Google Calendar automation. The system identifies toxic meeting density and provides real-time "Smart Nudges" to protect the user's mental resource.

## 2. System Architecture
- **Frontend:** React Native (Cross-platform Mobile) + NativeWind (Styling).
- **Backend:** Node.js / Express server orchestration.
- **Database:** MongoDB (User clusters, stress event logs).
- **AI Integration:** DeepSeek LLM (NLP for emotional support and conflict resolution).
- **Automation:** Google Calendar API (Burnout detection algorithm).

## 3. Core Features
- **Burnout Detection:** Analyzing calendar density to identify "High Risk" days.
- **AI Chat Support:** Context-aware counseling using DeepSeek.
- **Relational Advisory:** Scripts and strategies for workplace communication.
- **Stress Dashboard:** Visualizing wellness trends via self-reporting and automation.

## 4. Tech Stack details
- **Frontend:** React Navigation v7, Zustand (State), Axios.
- **Backend:** JWT Auth, Mongoose, Google Auth Library.
- **AI:** REST API integration with DeepSeek-Chat.
