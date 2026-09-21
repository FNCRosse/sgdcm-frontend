# SGDCM · Frontend

Prototipo MVP solo-frontend del Sistema de Gestión y Digitalización de Colecciones
Museográficas del Museo de Artes y Tradiciones Populares "Luis Repetto Málaga" (PUCP).
Proyecto académico 1INF47.

Sistema **de uso exclusivamente interno** (RBAC, 5 roles), sin backend real: los datos se
sirven con MSW. Ver [`FRONTEND_DESIGN_SPEC.md`](./FRONTEND_DESIGN_SPEC.md) (fuente de verdad
de diseño) y [`PLAN.md`](./PLAN.md) (plan de fases).

## Stack

Vite + React + TypeScript · React Router · TanStack Query · Tailwind CSS · lucide-react ·
MSW · Vitest + React Testing Library.

## Empezar

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Usuarios de prueba (login mock)

_Se documentan aquí cuando exista el `AuthProvider` mock (fase 1)._

## Grafo del prototipo

`graphify-corpus/` (cápsulas del código) y `graphify-out/graph.json` están commiteados.
Antes de explorar el código a mano, usar `graphify query "<pregunta>"`.
