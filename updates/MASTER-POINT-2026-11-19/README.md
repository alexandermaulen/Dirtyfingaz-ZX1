# ZX1 — Punto maestro 2026-11-19

Este directorio registra el punto de partida aprobado antes de portar la interfaz Step Sequencer de ZP a ZX1.

## Snapshot protegido
- Repositorio: `alexandermaulen/Dirtyfingaz-ZX1`
- Rama de producción observada: `main`
- Commit base exacto: `c2eb4e2e8162b1b2bccb5de56d5ba230ba0234d6`
- Rama de respaldo: `backup/master-point-2026-11-19` (creada desde ese commit exacto)
- Tag planeado: `zx1-master-point-2026-11-19` (no creado por esta integración; la herramienta GitHub disponible no expone creación de tags)
- Archivos de aplicación NO modificados al crear este punto.

## Alcance
Este punto protege el código ZX1 previo a la integración visual/funcional del Step Sequencer. La carpeta de documentación se agrega en `main` como commit separado; la rama de respaldo conserva el snapshot puro anterior.

## Regla arquitectónica innegociable
**No copiar el motor de ZP encima del motor de ZX1.** Se conserva el motor, el modelo de datos, el sistema de patrones, samples, asignaciones y reproducción de ZX1. De ZP se portan selectivamente presentación, CSS, componentes visuales y gestos/interacciones compatibles, adaptados a las APIs ya existentes de ZX1.

## Protección
No hacer reset/force-push de `main`, no desplegar ni sobrescribir archivos de producción como parte de una restauración sin autorización expresa. Antes de restaurar, comparar el estado actual con el commit base y preservar cualquier trabajo posterior.

Consulta `MASTER-SPECIFICATION.md`, `BASELINE-METADATA.json` y `RESTORE-INSTRUCTIONS.md`.
