@echo off
echo Starting Algebra Balance Lab Frontend...
echo.

echo Starting Frontend Server...
start "Frontend Server" cmd /k "npm start"

echo.
echo Frontend server is starting up...
echo Frontend: http://localhost:3000
echo.
echo Note: Backend should be running separately on http://localhost:5000
echo.
echo Press any key to exit...
pause > nul
