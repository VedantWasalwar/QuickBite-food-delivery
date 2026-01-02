@echo off
echo ========================================
echo Starting Food Delivery App (External Access)
echo ========================================
echo.

REM Get local IP address
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4 Address"') do (
    set IP=%%a
    set IP=!IP:~1!
    goto :found
)

:found
echo Your Network IP: %IP%
echo.

echo Starting Backend Server (Django)...
start "Django Backend" cmd /k "cd backend && venv\Scripts\python.exe manage.py runserver 0.0.0.0:8000"

timeout /t 3 /nobreak > nul

echo Starting Frontend Server (React)...
start "React Frontend" cmd /k "cd frontend && npm run dev"

timeout /t 5 /nobreak > nul

echo.
echo ========================================
echo Servers are starting!
echo ========================================
echo.
echo Access URLs:
echo   Frontend: http://%IP%:5173
echo   Backend API: http://%IP%:8000/api/
echo   Django Admin: http://%IP%:8000/admin/
echo.
echo Local access still works:
echo   Frontend: http://localhost:5173
echo   Backend: http://127.0.0.1:8000
echo.
echo Press any key to exit this window (servers will keep running)...
pause > nul












