@echo off
echo Starting Algebra Balance Lab Backend...
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "npm run dev"

echo.
echo Backend server is starting up...
echo Backend: http://localhost:5000
echo.
echo Note: Frontend should be running separately on http://localhost:3000
echo.
echo Press any key to exit...
pause > nul
