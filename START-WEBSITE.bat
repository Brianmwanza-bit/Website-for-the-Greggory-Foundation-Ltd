@echo off
setlocal
echo ================================================
echo   THE GREGGORY FOUNDATION WEBSITE LAUNCHER
echo ================================================
echo.

echo Checking Node.js and npm...
where node >nul 2>&1
if errorlevel 1 (
  echo Node.js not found in PATH. Please install from https://nodejs.org/
  pause
  exit /b 1
)
where npm >nul 2>&1
if errorlevel 1 (
  echo npm not found in PATH. Please reinstall Node.js (includes npm).
  pause
  exit /b 1
)
for /f %%v in ('node -v') do set NODE_VER=%%v
for /f %%v in ('npm -v') do set NPM_VER=%%v
echo Node: %NODE_VER%    npm: %NPM_VER%
echo.

echo Installing dependencies...
echo This may take 2-3 minutes on first run...
echo.
call npm cache verify >nul 2>&1
call npm config set fund false >nul 2>&1
call npm config set audit false >nul 2>&1
call npm install
if errorlevel 1 (
  echo npm install failed. Retrying with --force...
  call npm install --force
  if errorlevel 1 (
    echo Installation failed. Please review errors above.
    pause
    exit /b 1
  )
)

echo.
echo ================================================
echo   Starting development server...
echo ================================================
echo.
echo The website should open in your browser automatically.
echo If it doesn't, try:
echo   http://localhost:3000  ^(preferred, per vite.config.js^)
echo   or http://localhost:5173 ^(fallback^)
echo.
echo Press Ctrl+C to stop the server
echo ================================================
echo.

rem Start Vite directly to ensure port handling works even if npm scripts fail
npx vite --port 3000 --strictPort --open
if errorlevel 1 (
  echo Port 3000 unavailable or start failed. Trying port 5173...
  npx vite --port 5173 --strictPort --open
  if errorlevel 1 (
    echo Failed to start the development server. Check firewall/proxy settings and try again.
    pause
    exit /b 1
  )
)

endlocal
pause
