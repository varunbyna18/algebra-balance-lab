# MongoDB Atlas Setup Guide

This guide will help you connect your Algebra Balance Lab application to MongoDB Atlas.

## Prerequisites
- A MongoDB Atlas account (free tier available)
- Your application code (already set up)

## Step 1: Create a MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Click "Try Free" and create an account
3. Choose the free tier (M0 Sandbox)

## Step 2: Create a New Cluster

1. Click "Build a Database"
2. Choose "M0 Sandbox" (Free tier)
3. Select a cloud provider and region (choose one closest to you)
4. Give your cluster a name (e.g., "algebra-balance-lab")
5. Click "Create Cluster"

## Step 3: Set Up Database Access

1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create a username and password (save these!)
5. Set privileges to "Read and write to any database"
6. Click "Add User"

## Step 4: Set Up Network Access

1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Choose "Allow access from anywhere" (0.0.0.0/0) for development
   - For production, add only your server's IP address
4. Click "Confirm"

## Step 5: Get Your Connection String

1. Go to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select "Node.js" as the driver
5. Copy the connection string

## Step 6: Configure Your Application

1. Open `backend/.env` file
2. Replace the placeholder connection string with your actual MongoDB Atlas connection string:

```
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/algebra-balance-lab?retryWrites=true&w=majority
```

**Important:** Replace:
- `your-username` with your database username
- `your-password` with your database password
- `your-cluster` with your actual cluster name

## Step 7: Test the Connection

1. Make sure your backend server is running
2. Run the seed script to populate your Atlas database:
   ```bash
   cd backend
   npm run seed
   ```

## Step 8: Verify Connection

1. Check your MongoDB Atlas dashboard
2. Go to "Browse Collections"
3. You should see your `algebra-balance-lab` database with `equations` collection
4. The collection should contain your 10 algebra questions

## Security Best Practices

1. **Never commit your `.env` file to version control**
2. **Use environment variables in production**
3. **Restrict network access to specific IPs in production**
4. **Use strong passwords for database users**
5. **Regularly rotate database passwords**

## Troubleshooting

### Connection Issues
- Verify your connection string is correct
- Check that your IP address is whitelisted
- Ensure your database user has proper permissions

### Environment Variables
- Make sure `.env` file is in the `backend` directory
- Verify the `MONGODB_URI` variable name matches exactly
- Restart your server after changing environment variables

### Database Issues
- Check that the database name in the connection string matches your intended database
- Verify the collection names match your application code

## Example Connection String Format

```
mongodb+srv://username:password@cluster0.abc123.mongodb.net/algebra-balance-lab?retryWrites=true&w=majority
```

Where:
- `username`: Your database username
- `password`: Your database password  
- `cluster0.abc123`: Your cluster identifier
- `algebra-balance-lab`: Your database name

## Next Steps

Once connected to MongoDB Atlas:
1. Your data will be stored in the cloud
2. You can access it from anywhere
3. You get automatic backups and monitoring
4. You can scale as your application grows

For production deployment, consider:
- Setting up proper environment variables
- Configuring proper network access rules
- Setting up database monitoring and alerts
