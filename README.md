# ✈ SkyDeck SV

Panel de clima aeronáutico para aeropuertos de El Salvador y Centroamérica. Muestra el **METAR** (reporte meteorológico) y el **TAF** (pronóstico) de cada aeropuerto, decodificados en español y con su **categoría de vuelo** (VFR, MVFR, IFR, LIFR). Los datos provienen del Aviation Weather Center de NOAA.

- 🔗 **Aplicación en producción:** https://vibe-coding-app-sigma.vercel.app
- 📦 **Repositorio:** https://github.com/juanwright101084-svg/vibe-coding-app
- 📝 **Proceso de Vibe Coding:** [VIBE_CODING.md](./VIBE_CODING.md)

> Proyecto de la actividad evaluada *"Implementación de Aplicación Next.js mediante Vibe Coding"* del bootcamp Full Stack Junior 36 (Kodigo Academy). Desarrollado con Claude como copiloto de IA.

## Funcionalidades

- **Portada interactiva:** el cielo cambia de color según la categoría de vuelo real de MSLP, clima en vivo por aeropuerto con rosa de vientos animada y un simulador de categoría de vuelo (techo de nubes + visibilidad).
- **Listado de aeropuertos:** mapa con Leaflet (color por categoría), capa opcional de radar de lluvia (RainViewer), búsqueda, filtros por categoría y favoritos guardados en el navegador.
- **Detalle por aeropuerto:** METAR decodificado (viento, visibilidad, nubes, QNH), hora relativa del reporte con aviso si está desactualizado, actualización automática cada 60 s, botón "Actualizar ahora" y pronóstico TAF.
- **Modo oscuro y claro**, con la preferencia guardada.
- **Estados de carga, error y 404** en las rutas con datos.
- **Pruebas unitarias** de la lógica de decodificación y de categorías (Vitest).

## Rutas

| Ruta | Tipo | Descripción |
|---|---|---|
| `/` | Server Component | Portada interactiva |
| `/airports` | Server + Client | Mapa, búsqueda, filtros y favoritos |
| `/airports/[icao]` | Server + Client | Detalle: METAR decodificado y TAF |
| `/about` | Server Component | Información del proyecto |
| `/api/metar?ids=MSLP` | Route Handler | Proxy hacia NOAA (METAR) |
| `/api/taf?ids=MSLP` | Route Handler | Proxy hacia NOAA (TAF) |

## Tecnologías

- Next.js 16 (App Router) y React
- TypeScript
- Tailwind CSS
- Leaflet (mapa) y RainViewer (radar de lluvia)
- Vitest (pruebas)
- Despliegue en Vercel

## Arquitectura

**Server Components:** páginas, `Navbar`, `SkyHero`, `FlightBadge` y `TafPanel`. Consultan la API de NOAA directamente desde `lib/` con caché de 60 s.

**Client Components:** `AirportList`, `AirportMap`, `LiveMetar`, `HomeLive`, `CategorySimulator`, `FavoriteButton`, `ThemeToggle` y `TimeAgo`. Usan `useState` y `useEffect` para interacción, actualización periódica y `localStorage`. Los datos en vivo los piden al Route Handler `/api/metar`.

app/
├─ layout.tsx · page.tsx · globals.css · icon.svg · not-found.tsx
├─ about/page.tsx
├─ airports/
│ ├─ page.tsx · loading.tsx · error.tsx
│ └─ [icao]/page.tsx · loading.tsx · error.tsx
└─ api/
├─ metar/route.ts
└─ taf/route.ts
components/ (UI: servidor y cliente)
lib/ (airports, metar, taf, decode, flightCategory, useFavorites + tests)


## Instalación y uso

Requisitos: Node.js 20.19 o superior y npm.

```bash
git clone https://github.com/juanwright101084-svg/vibe-coding-app.git
cd vibe-coding-app
npm install
```

Crea el archivo de variables de entorno a partir del ejemplo:

```bash
# macOS / Linux
cp .env.example .env.local
# Windows (cmd o PowerShell)
copy .env.example .env.local
```

Inicia el servidor de desarrollo y abre http://localhost:3000:

```bash
npm run dev
```

### Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compilación de producción |
| `npm start` | Sirve la compilación de producción |
| `npm run lint` | Análisis estático con ESLint |
| `npm test` | Pruebas unitarias con Vitest (14 pruebas) |

## Variables de entorno

Se gestionan con `.env.local` (no se sube al repositorio). El archivo `.env.example` documenta cada una:

| Variable | Descripción |
|---|---|
| `NEXT_PUBLIC_APP_NAME` | Nombre que se muestra en el navbar |
| `NEXT_PUBLIC_APP_ENV` | Entorno (`local` o `production`) |
| `AVIATION_API_URL` | URL base de la API de NOAA Aviation Weather Center (pública, sin llave) |

## Despliegue en Vercel

1. Importar el repositorio en Vercel (preset Next.js).
2. Cargar las tres variables de entorno anteriores, con `NEXT_PUBLIC_APP_ENV=production`.
3. Desplegar. Cada `git push` a `main` redespliega automáticamente.

## Fuentes de datos y atribuciones

- Datos meteorológicos: [Aviation Weather Center (NOAA)](https://aviationweather.gov)
- Mapa base: © colaboradores de [OpenStreetMap](https://www.openstreetmap.org/copyright)
- Radar de lluvia: [Weather data by RainViewer](https://www.rainviewer.com). Uso personal y educativo.
- Mapas: [Leaflet](https://leafletjs.com)

## Aviso

Proyecto educativo. La información es de referencia y **no sustituye** el briefing meteorológico oficial ni el criterio del piloto. Las categorías VFR, MVFR, IFR y LIFR siguen la convención de NOAA y no equivalen a mínimos operativos oficiales. La cobertura del radar depende de las estaciones disponibles.

## Autor

Juan Guzman. Bootcamp Full Stack Junior 36, Kodigo Academy.