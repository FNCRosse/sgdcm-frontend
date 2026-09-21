# Contexto del prototipo

Prototipo MVP **solo-frontend** del SGDCM (Museo de Artes y Tradiciones Populares "Luis
Repetto Málaga", PUCP), curso 1INF47. Repo independiente de la carpeta de diseño.

## Qué es

Interfaz completa navegable de las 7 páginas (ver [03-paginas-y-hu.md]), con datos
simulados vía MSW en vez de un backend real. Sirve como demo visual/funcional del sistema
final (React + FastAPI + Supabase), que no se construye en este curso.

## Qué NO incluye

- Backend real, ni FastAPI ni Supabase conectados (solo la interfaz de `AuthProvider`
  queda lista para enchufarlos después — ver [05-api-mock-msw.md]).
- Ninguna página pública ni de visitante: todo detrás de login mock, RBAC de 5 roles.
- PWA (sin `vite-plugin-pwa`, sin manifest ni service worker en este prototipo).
- App nativa iOS/Android.

## Stack

Vite + React 19 + TypeScript (strict) + React Router + TanStack Query + Tailwind CSS +
lucide-react + MSW + Vitest/RTL. Detalle y versiones en `package.json`.

## Los dos grafos

Este grafo (`graphify-corpus/` de este repo) responde sobre el CÓDIGO del prototipo.
Preguntas de diseño/marca/requisitos van al grafo de la carpeta de diseño
(`Diseño - Museo/graphify-out/`), no a este.

## Fuente de verdad

`FRONTEND_DESIGN_SPEC.md` (raíz de este repo, copia del original) y
`docs/historias-usuario.md` (22 HU). Ver también [06-estado-fases.md] para la fase actual.
