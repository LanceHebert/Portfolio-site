# LLM Chatbot Setup Guide

Your chatbot now supports multiple LLM providers! Here's how to set it up:

## 🚀 Quick Start Options

### Option 1: Groq API (Recommended - Free & Fast)
1. **Sign up** at https://console.groq.com/
2. **Get API key** from your dashboard
3. **Create `.env` file** in your project root:
   ```
   REACT_APP_GROQ_API_KEY=your_groq_api_key_here
   ```
4. **Restart your server** - it will automatically use Groq!

**Benefits:**
- ✅ 100 free requests/day
- ✅ Very fast responses (~1 second)
- ✅ No installation needed
- ✅ Reliable and stable

### Option 2: Ollama (Local - Completely Free)
1. **Install Ollama** (after Command Line Tools finish):
   ```bash
   brew install ollama
   ```
2. **Start Ollama**:
   ```bash
   ollama serve
   ```
3. **Download a model**:
   ```bash
   ollama pull llama2
   ```
4. **Change provider** in `src/services/llmService.js`:
   ```javascript
   const LLM_PROVIDER = 'ollama';
   ```

**Benefits:**
- ✅ Completely free (unlimited usage)
- ✅ Runs locally on your computer
- ✅ No API limits
- ✅ Full control

### Option 3: Simulated Responses (Current)
- ✅ Already working
- ✅ No setup needed
- ✅ Reliable fallback

## 🔧 Configuration

### Change LLM Provider
Edit `src/services/llmService.js` and change:
```javascript
const LLM_PROVIDER = 'groq'; // or 'ollama' or 'simulated'
```

### Customize Lance's Information
Edit the `LANCE_CONTEXT` variable in `src/services/llmService.js` to update your information.

## 🎯 Testing

1. **Start your server**: `npm start`
2. **Open the chatbot** and try asking:
   - "Tell me about Lance's projects"
   - "What are Lance's skills?"
   - "How can I contact Lance?"
   - "What are Lance's interests?"

## 💡 Tips

- **Groq is fastest** for learning and testing
- **Ollama is best** for unlimited free usage
- **Simulated responses** are perfect fallback
- **All options** include your personalized information

## 🆘 Troubleshooting

- **Groq errors**: Check your API key and internet connection
- **Ollama errors**: Make sure Ollama is running (`ollama serve`)
- **Fallback**: Always falls back to simulated responses if LLM fails

Your chatbot will now give much more natural and flexible responses while maintaining your personalized information! 🚀 