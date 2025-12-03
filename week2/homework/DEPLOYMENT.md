# Deployment Guide

This guide covers deploying the Collaborative Coding Platform to various hosting services.

## Deployment Option 1: Render (Recommended)

**Render** offers a free tier with Docker support and is perfect for this application.

### Prerequisites
- GitHub account
- Render account (sign up at https://render.com)

### Steps

1. **Push your code to GitHub**

```bash
git init
git add .
git commit -m "Initial commit: collaborative coding platform"
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. **Create a Web Service on Render**
   - Go to https://dashboard.render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure the service:
     - **Name**: collaborative-coding-platform
     - **Environment**: Docker
     - **Region**: Choose closest to you
     - **Branch**: main
     - **Instance Type**: Free

3. **Environment Variables** (Optional)
   - Add any environment variables if needed
   - `NODE_ENV=production` (automatically set)

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your Docker container

5. **Access Your App**
   - Your app will be available at: `https://your-app-name.onrender.com`

### Pros of Render
- ✅ Free tier with 750 hours/month
- ✅ Automatic SSL certificates
- ✅ Docker support
- ✅ WebSocket support
- ✅ Deploy from GitHub
- ✅ Automatic deploys on push

### Cons of Render
- ⚠️ Free tier spins down after 15 minutes of inactivity
- ⚠️ Cold start takes 30-60 seconds

---

## Deployment Option 2: Railway

**Railway** offers $5 free credit per month and excellent developer experience.

### Steps

1. **Install Railway CLI**

```bash
npm i -g @railway/cli
```

2. **Login to Railway**

```bash
railway login
```

3. **Initialize and Deploy**

```bash
railway init
railway up
```

4. **Add Domain**

```bash
railway domain
```

### Pros of Railway
- ✅ Great developer experience
- ✅ No cold starts
- ✅ Fast deployments
- ✅ WebSocket support

### Cons of Railway
- ⚠️ Requires payment method
- ⚠️ No permanent free tier

---

## Deployment Option 3: Fly.io

**Fly.io** offers edge deployment with good free tier.

### Steps

1. **Install Fly CLI**

```bash
# Windows (PowerShell)
iwr https://fly.io/install.ps1 -useb | iex

# Mac/Linux
curl -L https://fly.io/install.sh | sh
```

2. **Login and Launch**

```bash
fly auth login
fly launch
```

3. **Deploy**

```bash
fly deploy
```

### Pros of Fly.io
- ✅ Edge deployment (fast globally)
- ✅ Excellent Docker support
- ✅ WebSocket support
- ✅ Good free tier

### Cons of Fly.io
- ⚠️ More complex configuration
- ⚠️ Requires credit card

---

## Deployment Option 4: Heroku

**Heroku** is a classic PaaS with good Docker support.

### Steps

1. **Install Heroku CLI**

Download from https://devcenter.heroku.com/articles/heroku-cli

2. **Login**

```bash
heroku login
```

3. **Create App**

```bash
heroku create your-app-name
```

4. **Set Stack to Container**

```bash
heroku stack:set container
```

5. **Deploy**

```bash
git push heroku main
```

### Pros of Heroku
- ✅ Mature platform
- ✅ Good documentation
- ✅ Add-ons ecosystem

### Cons of Heroku
- ⚠️ No free tier anymore (starts at $7/month)

---

## Post-Deployment

### Update Client Environment

If deploying separately, update the client's `.env` file:

```env
VITE_SERVER_URL=https://your-deployed-url.com
```

Then rebuild the client:

```bash
cd client
npm run build
```

### Test Your Deployment

1. Open your deployed URL
2. Create a new session
3. Open the session in multiple browser tabs/windows
4. Test real-time collaboration
5. Test code execution for JavaScript and Python
6. Check that syntax highlighting works

### Monitoring

- Check application logs on your platform
- Monitor WebSocket connections
- Track session creation and usage

---

## Cost Comparison

| Service | Free Tier | Paid Tier | Best For |
|---------|-----------|-----------|----------|
| **Render** | 750hrs/month | $7/month | Hobby projects |
| **Railway** | $5 credit/month | Pay as you go | Development |
| **Fly.io** | 3 VMs free | Pay as you go | Global apps |
| **Heroku** | None | $7+/month | Enterprise |

---

## Recommendation

For this homework project, I recommend **Render** because:
- Free tier is sufficient
- Easy to set up
- Good for demos and portfolio
- Supports all features we need (Docker, WebSocket, etc.)

The only downside is cold starts, but for a homework/portfolio project, this is acceptable.
