# Manual MongoDB Atlas Data Setup Guide

Since there are SSL/TLS connection issues preventing automatic seeding, here's how to manually add the equations data to your MongoDB Atlas database.

## Step 1: Access Your MongoDB Atlas Dashboard

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Sign in to your account
3. Navigate to your cluster: **Cluster0**
4. Click on **"Browse Collections"**

## Step 2: Navigate to Your Database

1. You should see the database: **algebra-balance-lab**
2. Click on the **equations** collection
3. You should see "TOTAL DOCUMENTS: 0" (this is what we need to fix)

## Step 3: Add Equations Data

### Method 1: Using the Atlas Interface

1. Click **"INSERT DOCUMENT"** button
2. Choose **"Insert JSON"** option
3. Copy and paste the following JSON data:

```json
{
  "equation": "x + 7 = 12",
  "difficulty": "easy",
  "solution": 5,
  "variables": [{"name": "x", "coefficient": 1}],
  "constants": [{"value": 7, "side": "left"}, {"value": 12, "side": "right"}],
  "description": "Basic addition equation"
}
```

4. Click **"Insert"**
5. Repeat this process for all 10 equations (see complete list below)

### Method 2: Using MongoDB Compass (Recommended)

1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect using your Atlas connection string:
   ```
   mongodb+srv://varunbyna157_db_user:JTGeBrpZy6lCSsTa@cluster0.mgbx7np.mongodb.net/algebra-balance-lab
   ```
3. Navigate to the `equations` collection
4. Click **"ADD DATA"** → **"Import JSON or CSV file"**
5. Use the `equations-data.json` file from the backend folder

## Complete Equations Data

Here are all 10 equations to add:

### Easy Level (2 equations):
1. **x + 7 = 12** (Solution: 5)
2. **2x + 3 = 11** (Solution: 4)

### Medium Level (4 equations):
3. **3x - 5 = 10** (Solution: 5)
4. **4x + 8 = 24** (Solution: 4)
5. **5x - 12 = 18** (Solution: 6)
6. **2x + 15 = 35** (Solution: 10)

### Hard Level (4 equations):
7. **7x - 9 = 26** (Solution: 5)
8. **3x + 14 = 41** (Solution: 9)
9. **6x - 18 = 42** (Solution: 10)
10. **8x + 7 = 55** (Solution: 6)

## Step 4: Verify Data

After adding all equations:

1. In Atlas, you should see **"TOTAL DOCUMENTS: 10"**
2. Click on **"Find"** to see all equations
3. You should see all 10 equations listed

## Step 5: Test Your Application

1. Make sure your backend server is running
2. Open your React app at `http://localhost:3000`
3. The equations should now be visible in the app

## Troubleshooting

### If you still see "No equations available":
1. Check that the backend is connecting to Atlas (not localhost)
2. Verify the equations are in the `algebra-balance-lab.equations` collection
3. Check the browser console for any API errors

### If the app still connects to localhost:
1. Stop the backend server
2. Delete any local MongoDB data
3. Restart the backend server
4. The app should now connect to Atlas

## Alternative: Use MongoDB Compass

The easiest way is to use MongoDB Compass:

1. **Download Compass**: https://www.mongodb.com/products/compass
2. **Connect**: Use your Atlas connection string
3. **Import**: Use the `equations-data.json` file
4. **Verify**: Check that all 10 equations are imported

This will ensure your data is properly stored in MongoDB Atlas and accessible to your application.
