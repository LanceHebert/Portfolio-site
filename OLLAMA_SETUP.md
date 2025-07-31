# Ollama Setup Guide

## 🚀 Installing Ollama on macOS

### **Step 1: Install Command Line Tools (if not done)**
```bash
xcode-select --install
```
Wait for installation to complete (this may take 10-15 minutes).

### **Step 2: Install Ollama**
```bash
brew install ollama
```

### **Step 3: Start Ollama**
```bash
ollama serve
```
Keep this running in a terminal window.

### **Step 4: Download a Model**
Open a new terminal window and run:
```bash
ollama pull llama2
```
This downloads the Llama 2 model (~4GB, may take 10-20 minutes).

### **Step 5: Test Ollama**
```bash
ollama run llama2 "Hello, how are you?"
```

## 🎯 Your Chatbot is Ready!

Once Ollama is installed and running:
1. **Start your React app**: `npm start`
2. **Open the chatbot** at http://localhost:3000
3. **Test it** with questions about Lance

## 🔧 Troubleshooting

### **If brew install fails:**
- Wait for Command Line Tools to finish installing
- Try again: `brew install ollama`

### **If Ollama won't start:**
- Check if port 11434 is available
- Try: `lsof -ti:11434 | xargs kill -9`

### **If model download is slow:**
- This is normal for the first download
- Subsequent models will be faster

## 💡 Tips

- **Keep Ollama running** in a separate terminal
- **First response** may be slow (model loading)
- **Subsequent responses** will be faster
- **Unlimited usage** - no API limits!

## 🎉 Benefits

- ✅ **Completely free** - No usage limits
- ✅ **Privacy** - Everything runs locally
- ✅ **No API keys** needed
- ✅ **Unlimited requests**
- ✅ **Great for learning** LLM integration

Your chatbot will now use Ollama for real LLM responses! 🚀 