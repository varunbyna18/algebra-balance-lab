@echo off
echo 🚀 Deploying Algebra Balance Lab to GitHub and Vercel
echo.

echo 📝 Step 1: Adding all changes to Git...
git add .
echo ✅ Files added to Git

echo.
echo 📝 Step 2: Committing changes...
git commit -m "Deploy: Update application for production"
echo ✅ Changes committed

echo.
echo 📝 Step 3: Pushing to GitHub...
git push origin main
echo ✅ Pushed to GitHub

echo.
echo 🎉 Deployment complete!
echo.
echo 📋 Next steps:
echo 1. Go to https://github.com/YOUR_USERNAME/algebra-balance-lab
echo 2. Copy the repository URL
echo 3. Go to https://vercel.com
echo 4. Import your GitHub repository
echo 5. Set environment variables:
echo    - MONGODB_URI=mongodb+srv://varunbyna157_db_user:JTGeBrpZy6lCSsTa@cluster0.mgbx7np.mongodb.net/algebra-balance-lab
echo    - NODE_ENV=production
echo 6. Deploy!
echo.
echo 🌐 Your app will be live at: https://your-app-name.vercel.app
echo.
pause
