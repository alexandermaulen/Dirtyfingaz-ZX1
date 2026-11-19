# Etapa 1 — Auditoría inicial ZP → ZX1 (2026-11-19)

## Fuentes inspeccionadas
- ZX1 `creator-zx1.html` — blob `41cc1985032ac87afe50408122bc6d9d5ddf1101`
- ZX1 `creator-engine.html` — blob `d14cd62fc2745b00e807d605940334e2dafd70f3`
- ZP `creator.html` — blob `56f09918c48ee5e2d730340b4af1cc3384145794`
- ZP `creator-engine.html` — blob `d980ed7dbc85d6f84ce1a00dbeea6d5ba9118f5d`
- ZP `zp-ui-system.css` — blob `48dc90d43b3f61f7216519c71ca2fecb8f98aabe`

## Hallazgos confirmados
1. Ambos frontends tienen la misma estructura base de rejilla: 16 columnas de pasos × 9 filas de PAD, con numeración superior y celdas `.c`.
2. Las reglas CSS base inspeccionadas para `.scr.pr`, `.gr`, `.c`, `.c.on` y `.c.hd2` son sustancialmente iguales entre ZP y ZX1. Por tanto, copiar solo esas reglas no resolverá por sí solo la diferencia visual reportada.
3. ZP activa el modo mediante `.scr.classList.toggle('pr')` y sincroniza la clase `lit` del botón PATTERN EDIT.
4. ZX1 convierte PATTERN EDIT en un botón HTML nativo para mejorar la activación táctil en Safari/iOS y mantiene un estado accesible `aria-pressed`. Debe preservarse esta mejora.
5. ZX1 ya tiene gestos de arrastre por celdas y envía comandos nativos de selección PAD y toggle de paso; tiene además Piano Roll con notas MIDI. Esas rutas deben conservarse y auditarse antes de cambiar handlers.
6. ZX1 contiene menús de patrones y transport, utilidades y puente hacia el motor ZX1. No reemplazar este puente ni los comandos por el motor ZP.
7. ZP separa su motor mediante un iframe oculto y su propia mensajería. Ese runtime NO se portará a ZX1.
8. Los archivos de engine de ZP y ZX1 tienen contenidos y tamaños distintos; se consideran referencias para comprender intención, nunca fuentes de reemplazo.

## Riesgos / verificaciones aún necesarias
- Identificar las reglas CSS posteriores que sobrescriben la rejilla en ZX1 y el layout responsive que produce la apariencia real.
- Verificar en runtime el tamaño calculado de ambos modos LCD antes/después; no alterar sus dimensiones.
- Comprobar si la diferencia pixelada viene de cascada CSS, contenedor/viewport, tipografía cargada, estados de clase o sincronización de render.
- Auditar el evento PATTERN EDIT completo y los mensajes de estado del motor ZX1.
- Confirmar scroll/zoom horizontal y comportamiento de pointer capture en iOS.
- No se ejecutaron pruebas de navegador ni de audio en esta auditoría estática.

## Plan inmediato
1. Comparar reglas CSS finales (incluidas media queries y overrides al final del documento).
2. Trazar el flujo PATTERN EDIT → apertura/cierre → render de pasos → estado del motor.
3. Proponer un cambio visual acotado a la GUI, sin tocar el engine.
4. Probar y revisar cada etapa antes de continuar.

## Estado
Auditoría estática inicial completada. Sin modificaciones en archivos de aplicación. Rama de trabajo: `feature/zp-step-sequencer-zx1`.
