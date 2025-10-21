# Algebra Balance Lab - Deployment Guide

This guide will help you deploy your Algebra Balance Lab application to GitHub and Vercel.

## Prerequisites

- GitHub account
- Vercel account
- MongoDB Atlas account (already set up)

## Step 1: Initialize Git Repository

1. **Initialize Git in your project:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Algebra Balance Lab with MongoDB Atlas integration"
   ```

2. **Create a new repository on GitHub:**
   - Go to [GitHub](https://github.com)
   - Click "New repository"
   - Name it: `algebra-balance-lab`
   - Make it public or private (your choice)
   - Don't initialize with README (we already have files)

3. **Connect your local repository to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/algebra-balance-lab.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. **Go to [Vercel](https://vercel.com)**
2. **Sign in with GitHub**
3. **Click "New Project"**
4. **Import your GitHub repository**
5. **Configure the project:**

   **Framework Preset:** Other
   **Root Directory:** `./` (root)
   **Build Command:** `npm run build`
   **Output Directory:** `build`

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy from your project directory:**
   ```bash
   vercel
   ```

## Step 3: Configure Environment Variables

In your Vercel dashboard:

1. **Go to your project settings**
2. **Navigate to "Environment Variables"**
3. **Add the following variables:**

   ```
   MONGODB_URI = mongodb+srv://varunbyna157_db_user:JTGeBrpZy6lCSsTa@cluster0.mgbx7np.mongodb.net/algebra-balance-lab
   NODE_ENV = production
   PORT = 5000
   ```

## Step 4: Update Package.json Scripts

Make sure your `package.json` has these scripts:

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "dev": "concurrently \"npm run backend\" \"npm start\"",
    "backend": "cd backend && npm run dev",
    "seed": "cd backend && npm run seed"
  }
}
```

## Step 5: Update Backend for Production

Your backend is already configured for production with:
- ✅ MongoDB Atlas connection
- ✅ CORS enabled
- ✅ Environment variable support
- ✅ Error handling

## Step 6: Deploy and Test

1. **Deploy to Vercel:**
   ```bash
   vercel --prod
   ```

2. **Test your deployment:**
   - Visit your Vercel URL
   - Check that the app loads
   - Test the equation solver
   - Verify MongoDB Atlas connection

## Step 7: Set Up Automatic Deployments

1. **In Vercel dashboard:**
   - Go to "Settings" → "Git"
   - Enable "Automatic deployments"
   - Choose "main" branch

2. **Now every push to main will auto-deploy!**

## Production URLs

After deployment, you'll have:
- **Frontend:** `https://your-app-name.vercel.app`
- **Backend API:** `https://your-app-name.vercel.app/api/equations`
- **Health Check:** `https://your-app-name.vercel.app/api/health`

## Troubleshooting

### If the app doesn't load:
1. Check Vercel function logs
2. Verify environment variables are set
3. Test MongoDB Atlas connection

### If equations don't load:
1. Run the data insertion script: `node backend/alternative-insert.js`
2. Check MongoDB Atlas dashboard
3. Verify API endpoints are working

### If build fails:
1. Check that all dependencies are in `package.json`
2. Verify build commands are correct
3. Check for TypeScript errors

## Features After Deployment

✅ **10 Complex Algebra Questions** (Easy, Medium, Hard)
✅ **Interactive Balance Scale** visualization
✅ **Real-time Feedback** on answers
✅ **MongoDB Atlas** cloud database
✅ **Responsive Design** for all devices
✅ **Automatic Deployments** from GitHub

## Next Steps

1. **Custom Domain** (optional): Add your own domain in Vercel
2. **Analytics**: Enable Vercel Analytics
3. **Monitoring**: Set up error tracking
4. **Performance**: Optimize images and assets

Your Algebra Balance Lab is now live and ready for students to use! 🎉
