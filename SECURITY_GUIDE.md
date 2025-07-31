# Security Guide for LLM Chatbot

## 🔒 API Key Security

### ✅ What's Already Protected:
- `.env` file is in `.gitignore` (won't be committed to git)
- `.env.example` template file created (safe to commit)
- API key is only used in environment variables

### 🚨 Security Best Practices:

#### 1. **Never Commit API Keys**
```bash
# ✅ Good - .env file (not tracked by git)
REACT_APP_GROQ_API_KEY=gsk_your_actual_key_here

# ✅ Good - .env.example file (safe to commit)
REACT_APP_GROQ_API_KEY=your_groq_api_key_here
```

#### 2. **Environment Variables Only**
- ✅ API key only exists in `.env` file
- ✅ Never hardcode in source code
- ✅ React automatically loads `REACT_APP_*` variables

#### 3. **Deployment Security**
When deploying to platforms like Netlify, Vercel, or GitHub Pages:
- Add environment variable in platform settings
- Never commit `.env` file
- Use platform's secure environment variable system

## 🛡️ Additional Security Considerations

### **1. Rate Limiting**
- Groq has built-in rate limits (100 requests/day free)
- Consider adding client-side rate limiting for production

### **2. Input Validation**
- Current implementation is safe for portfolio use
- For production, add input sanitization

### **3. CORS (Cross-Origin Resource Sharing)**
- Groq API handles CORS properly
- No additional CORS setup needed

### **4. Error Handling**
- API errors don't expose sensitive information
- Graceful fallback to simulated responses

## 🚀 Deployment Checklist

### **Before Deploying:**
- [ ] `.env` file is in `.gitignore`
- [ ] `.env.example` file exists with template
- [ ] No API keys in source code
- [ ] Test with and without API key

### **Platform-Specific Setup:**

#### **Netlify:**
1. Go to Site Settings → Environment Variables
2. Add: `REACT_APP_GROQ_API_KEY` = your actual key
3. Redeploy

#### **Vercel:**
1. Go to Project Settings → Environment Variables
2. Add: `REACT_APP_GROQ_API_KEY` = your actual key
3. Redeploy

#### **GitHub Pages:**
1. Go to Repository Settings → Secrets and Variables → Actions
2. Add: `REACT_APP_GROQ_API_KEY` = your actual key
3. Update deployment workflow

## 🔍 Security Testing

### **Check for Exposed Keys:**
```bash
# Search for any hardcoded API keys
grep -r "gsk_" src/
grep -r "REACT_APP_GROQ_API_KEY" src/

# Check git history for API keys
git log -p | grep "gsk_"
```

### **Verify .gitignore:**
```bash
# Should show .env as ignored
git status --ignored
```

## 🆘 If API Key is Compromised:

1. **Immediately rotate the key** in Groq console
2. **Remove from git history** if accidentally committed:
   ```bash
   git filter-branch --force --index-filter \
   'git rm --cached --ignore-unmatch .env' \
   --prune-empty --tag-name-filter cat -- --all
   ```
3. **Update deployment environment variables**

## 💡 Security Tips:

- **Use different API keys** for development and production
- **Monitor API usage** in Groq console
- **Regularly rotate keys** (every 3-6 months)
- **Never share API keys** in screenshots or logs
- **Use environment-specific files** (.env.development, .env.production)

Your current setup is secure for portfolio use! The API key is properly protected and won't be exposed publicly. 🛡️ 