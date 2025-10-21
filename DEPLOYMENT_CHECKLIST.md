# ✅ Deployment Checklist

## Pre-Deployment Checklist

### Local Setup
- [ ] Git repository initialized
- [ ] All files committed
- [ ] MongoDB Atlas data inserted (10 equations)
- [ ] Local testing completed
- [ ] No console errors

### GitHub Setup
- [ ] GitHub account created
- [ ] Repository created: `algebra-balance-lab`
- [ ] Local repository connected to GitHub
- [ ] All files pushed to GitHub
- [ ] Repository is public

### Vercel Setup
- [ ] Vercel account created
- [ ] GitHub connected to Vercel
- [ ] Project imported from GitHub
- [ ] Environment variables set:
  - [ ] `MONGODB_URI`
  - [ ] `NODE_ENV=production`
  - [ ] `PORT=5000`

## Post-Deployment Checklist

### Functionality Tests
- [ ] Home page loads
- [ ] Navigation works
- [ ] Equation Solver loads
- [ ] All 3 difficulty levels work
- [ ] Balance scale is interactive
- [ ] Answer submission works
- [ ] Dashboard shows statistics

### API Tests
- [ ] `/api/health` returns OK
- [ ] `/api/equations` returns 10 equations
- [ ] `/api/equations?difficulty=easy` returns 2 equations
- [ ] `/api/equations?difficulty=medium` returns 4 equations
- [ ] `/api/equations?difficulty=hard` returns 4 equations

### Performance Tests
- [ ] Page loads quickly
- [ ] No console errors
- [ ] Mobile responsive
- [ ] All images load
- [ ] API responses are fast

### Final Verification
- [ ] App URL is accessible
- [ ] All features working
- [ ] No broken links
- [ ] Professional appearance
- [ ] Ready for students to use

## Quick Commands

### Git Commands
```bash
# Check status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Deploy to production"

# Push to GitHub
git push origin main
```

### Vercel Commands (Optional)
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from local
vercel

# Deploy to production
vercel --prod
```

### Test Commands
```bash
# Test local backend
cd backend
node server.js

# Test local frontend
npm start

# Test data insertion
cd backend
node alternative-insert.js
```

## Environment Variables for Vercel

```
MONGODB_URI=mongodb+srv://varunbyna157_db_user:JTGeBrpZy6lCSsTa@cluster0.mgbx7np.mongodb.net/algebra-balance-lab
NODE_ENV=production
PORT=5000
```

## Expected URLs After Deployment

- **Frontend**: `https://your-app-name.vercel.app`
- **API Health**: `https://your-app-name.vercel.app/api/health`
- **API Equations**: `https://your-app-name.vercel.app/api/equations`
- **GitHub Repo**: `https://github.com/YOUR_USERNAME/algebra-balance-lab`

## Troubleshooting Quick Fixes

### If equations don't load:
1. Check MongoDB Atlas connection
2. Verify environment variables
3. Run data insertion script
4. Check Vercel function logs

### If build fails:
1. Check package.json dependencies
2. Verify Node.js version
3. Check for TypeScript errors
4. Review Vercel build logs

### If API not working:
1. Check vercel.json configuration
2. Verify backend folder structure
3. Test API endpoints manually
4. Check environment variables

## Success Indicators

✅ **Deployment Successful When:**
- App loads without errors
- All 10 equations are available
- Balance scale is interactive
- API endpoints return data
- Mobile responsive design works
- Professional URL is live

🎉 **Your Algebra Balance Lab is ready for students!**
