@echo off
:: Configurar la terminal para que acepte tildes y emoticonos correctamente
chcp 65001 > nul
cls

echo ==================================================
echo          ASISTENTE PASO A PASO DE GIT
echo ==================================================
echo.

:: 1. CONFIGURAR NOMBRE
echo ➔ PASO 1: Configurar Nombre
set /p git_user="👤 Ingresa tu nombre de usuario de GitHub y presiona Enter: "
git config --global user.name "%git_user%"
echo 👉 Nombre configurado como: %git_user%
echo --------------------------------------------------
echo.

:: 2. CONFIGURAR CORREO
echo ➔ PASO 2: Configurar Correo
set /p git_email="📧 Ingresa tu correo de GitHub y presiona Enter: "
git config --global user.email "%git_email%"
echo 👉 Correo configurado como: %git_email%
echo --------------------------------------------------
echo.

:: 3. EJECUTAR INIT Y ADD AUTOMÁTICO
echo ➔ PASO 3: Inicializando repositorio...
git init
echo Agregando archivos al área de preparación (git add .)...
git add .
echo ✅ Carpetas y archivos preparados para el commit.
echo --------------------------------------------------
echo.

:: 4. CREAR COMMIT
echo ➔ PASO 4: Crear Commit
set /p commit_msg="✍️ Escribe el mensaje para tu commit y presiona Enter: "
git commit -m "%commit_msg%"
echo --------------------------------------------------
echo.

:: AJUSTE DE RAMA AUTOMÁTICO
git branch -M main

:: 5. VINCULAR CON GITHUB
echo ➔ PASO 5: Vincular con GitHub
set /p repo_url="🔗 Pega la URL de tu repositorio de GitHub y presiona Enter: "
git remote add origin %repo_url%
echo 👉 Repositorio vinculado.
echo --------------------------------------------------
echo.

:: 6. SUBIDA FINAL
echo ➔ PASO 6: Subiendo archivos a la nube...
git push -u origin main

echo.
echo ==================================================
echo   ¡Proceso terminado! Todo subido con éxito 🎉   
echo ==================================================
echo.
pause