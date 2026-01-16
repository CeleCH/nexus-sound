# 🎧 Nexus Sound

**Nexus Sound** es una aplicación de escritorio para reproducir música, desarrollada con **Next.js** y **Tauri**, que permite escuchar archivos locales y reproducir contenido de YouTube en una interfaz moderna y ligera.

## ✨ Características

- 🎵 Reproducción de música local (MP3 / WAV)
- ▶️ Reproducción de videos de YouTube mediante enlace
- 🔊 Control de volumen y mute
- ⏭ Navegación básica entre canciones
- 🖥️ Aplicación de escritorio instalable para Windows
- ⚡ Rápida y ligera gracias a Tauri

## 🛠 Tecnologías utilizadas

- **Next.js** (App Router)
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Tauri** (Rust)

## 🚀 Ejecución en modo desarrollo

Para ejecutar la aplicación en modo desarrollo (web):

```bash
npm install
npm run dev
Luego abre en el navegador:

http://localhost:3000

📦 Construir la aplicación de escritorio

Para generar el instalador de escritorio (Windows):

npm run tauri build


El instalador se generará en:

src-tauri/target/release/bundle/

📄 Estructura del proyecto
nexus-sound/
├─ app/               # Frontend (Next.js)
├─ public/            # Recursos estáticos
├─ src-tauri/         # Configuración y build de Tauri
├─ package.json
├─ next.config.ts
└─ README.md

🎯 Objetivo del proyecto

Este proyecto fue desarrollado como parte de un portafolio personal, con el objetivo de demostrar habilidades en:

Desarrollo frontend moderno

Integración web → desktop

Manejo de builds de producción

Creación de aplicaciones instalables reales

📌 Estado del proyecto

🟢 Versión 1.0 – Funcional y estable
Posibles mejoras futuras:

Playlists

Soporte multiplataforma

Mejoras visuales

Integración con más fuentes de audio

👤 Autor

Desarrollado por Cele 💚