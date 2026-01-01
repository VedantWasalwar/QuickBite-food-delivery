@echo off
echo ========================================
echo    GitHub Auto Update Script
echo ========================================
echo.

echo [1/3] Adding all changes to staging...
git add .
if %errorlevel% neq 0 (
    echo ERROR: Failed to add files!
    pause
    exit /b 1
)
echo ✓ Files added successfully
echo.

echo [2/3] Committing changes...
git commit -m "Auto update: %date% %time%"
if %errorlevel% neq 0 (
    echo ERROR: Failed to commit!
    pause
    exit /b 1
)
echo ✓ Changes committed
echo.

echo [3/3] Pushing to GitHub...
git push origin main
if %errorlevel% neq 0 (
    echo ERROR: Failed to push!
    pause
    exit /b 1
)
echo ✓ Successfully pushed to GitHub
echo.

echo ========================================
echo    Update Complete! ✅
echo ========================================
echo.
echo Repository: https://github.com/VedantWasalwar/QuickBite-food-delivery
echo.
pause

