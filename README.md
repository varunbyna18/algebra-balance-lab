# Algebra Balance Lab

A comprehensive web application that helps users understand and solve basic algebraic equations through interactive visualizations and real-time feedback.

## Features

- **Interactive Balance Scale**: Visual representation of equations with real-time balance feedback
- **Multiple Difficulty Levels**: Easy, Medium, and Hard equations
- **Progress Tracking**: Detailed statistics and performance analytics
- **Responsive Design**: Works seamlessly across all devices
- **Real-time Feedback**: Instant verification of answers with visual cues

## Technology Stack

### Frontend
- React.js with React Router for navigation
- Recharts for data visualization
- Axios for API communication
- Responsive CSS with modern design

### Backend
- Node.js with Express.js
- MongoDB for data persistence
- RESTful API with JSON communication
- CORS enabled for cross-origin requests

## Project Structure

```
algebra-balance-lab/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Navbar.css
│   │   │   ├── BalanceScale.js
│   │   │   └── BalanceScale.css
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Home.css
│   │   │   ├── EquationSolver.js
│   │   │   ├── EquationSolver.css
│   │   │   ├── Dashboard.js
│   │   │   └── Dashboard.css
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   └── vercel.json
├── backend/
│   ├── models/
│   │   ├── Equation.js
│   │   └── Attempt.js
│   ├── routes/
│   │   ├── equations.js
│   │   └── attempts.js
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   └── vercel.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start MongoDB (if running locally):
   ```bash
   mongod
   ```

4. Seed the database with sample equations:
   ```bash
   npm run seed
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3000`

### Quick Start (Both Frontend and Backend)

From the root directory, you can install all dependencies and start both servers:

1. Install all dependencies:
   ```bash
   npm run install-all
   ```

2. Start frontend only:
   ```bash
   npm run dev
   ```

3. Start backend only (in a separate terminal):
   ```bash
   npm run backend
   ```

## API Endpoints

### Equations
- `GET /api/equations` - Get all equations (optional difficulty filter)
- `GET /api/equations/:id` - Get specific equation
- `POST /api/equations/verify` - Verify user answer

### Attempts
- `POST /api/attempts` - Record new attempt
- `GET /api/attempts/:userId` - Get user statistics
- `GET /api/attempts/:userId/stats` - Get detailed progress data

## Pages

### Home Page
- Introduction to the application
- Feature overview with visual elements
- Navigation to other sections
- Difficulty level explanations

### Equation Solver Page
- Interactive equation solving interface
- Real-time balance scale visualization
- Difficulty filtering
- Answer verification with feedback
- Progress tracking

### Dashboard Page
- Performance statistics and charts
- Accuracy tracking by difficulty
- Daily progress visualization
- Recent attempts history
- Achievement system

## Key Features

### Interactive Balance Scale
- Visual representation of equation balance
- Real-time tilt based on user input
- Color-coded feedback for correct/incorrect answers
- Step-by-step calculation display

### Progress Tracking
- Total attempts and accuracy percentage
- Performance breakdown by difficulty
- Daily progress charts
- Achievement badges

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interactions
- Optimized performance

## Development

### Adding New Equations
Equations are stored in MongoDB with the following structure:
```javascript
{
  equation: "2x + 4 = 10",
  difficulty: "easy",
  solution: 3,
  variables: [{ name: "x", coefficient: 2 }],
  constants: [{ value: 4, side: "left" }, { value: 10, side: "right" }],
  description: "Linear equation with coefficient"
}
```

### Customizing the Balance Scale
The balance scale component can be customized by modifying:
- Colors and styling in `BalanceScale.css`
- Animation timing and effects
- Visual feedback indicators

## 🚀 Deployment

### Quick Deploy to Vercel

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Deploy to production"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Set environment variables:
     ```
     MONGODB_URI=mongodb+srv://varunbyna157_db_user:JTGeBrpZy6lCSsTa@cluster0.mgbx7np.mongodb.net/algebra-balance-lab
     NODE_ENV=production
     ```

3. **Deploy automatically!**

### Manual Deployment Steps

1. **Initialize Git:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create GitHub Repository:**
   - Create new repo on GitHub
   - Connect local repo: `git remote add origin https://github.com/YOUR_USERNAME/algebra-balance-lab.git`
   - Push: `git push -u origin main`

3. **Deploy to Vercel:**
   - Import GitHub repository in Vercel
   - Configure build settings
   - Set environment variables
   - Deploy!

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

## 🌐 Live Demo

[View Live Application](https://your-app-name.vercel.app)

## 📊 Production Features

✅ **10 Complex Algebra Questions** (Easy, Medium, Hard)
✅ **Interactive Balance Scale** visualization  
✅ **Real-time Feedback** on answers
✅ **MongoDB Atlas** cloud database
✅ **Responsive Design** for all devices
✅ **Automatic Deployments** from GitHub

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.