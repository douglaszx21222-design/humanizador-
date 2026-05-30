# TextoHumano — Humanizador de texto IA

Web app para humanizar texto de IA, bypaseando GPTZero, Turnitin y Winston AI.

## Deploy en Vercel (5 minutos, gratis)

### Paso 1 — Sube el proyecto a GitHub
1. Ve a https://github.com/new y crea un repositorio nuevo (puede ser privado)
2. Sube todos los archivos de esta carpeta

### Paso 2 — Conecta con Vercel
1. Ve a https://vercel.com y crea cuenta gratuita (con tu GitHub)
2. Click en **"Add New Project"**
3. Importa tu repositorio
4. Click en **"Deploy"** (sin cambiar nada)

### Paso 3 — Añade tu API Key de Anthropic
1. En Vercel, ve a tu proyecto → **Settings → Environment Variables**
2. Añade una variable:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** tu API key de https://console.anthropic.com
3. Click **Save**
4. Ve a **Deployments** → click en los tres puntos del último deploy → **Redeploy**

### ¡Listo!
Vercel te dará una URL tipo `https://tu-proyecto.vercel.app`

## Estructura del proyecto
```
humanizador/
├── api/
│   └── humanize.js     ← Backend (llama a Anthropic con tu API key)
├── public/
│   └── index.html      ← Frontend completo
└── vercel.json         ← Configuración de rutas
```

## Cómo obtener API key de Anthropic
1. Ve a https://console.anthropic.com
2. Crea cuenta → Settings → API Keys → Create Key
3. Copia la key (empieza con `sk-ant-...`)
