@echo off
setlocal
set "ROOT=%~dp0"
set "NODE_DIR=%ROOT%.tools\node-v24.16.0-win-x64"
set "PATH=%NODE_DIR%;%PATH%"
cd /d "%ROOT%"
call "%NODE_DIR%\npm.cmd" run dev -- --host 127.0.0.1 --port 5173
