# Especificación maestra — ZP → ZX1

## Objetivo
Recuperar en ZX1 la experiencia del Step Sequencer pixelado de ZP, prácticamente 1:1 en estética e interacción, sin sustituir la arquitectura de audio y datos de ZX1.

## Límites protegidos
- No reemplazar `creator-engine.html` de ZX1 por el motor de ZP.
- No cambiar el modelo de patrones, samples, asignaciones, bancos ni reproducción de ZX1.
- No mover ni rediseñar los controles LX/RX.
- No perder los nueve PADs ni los bancos A–E.
- No romper SAMPLE EDIT, Piano Roll ni otras funciones existentes.
- Preservar exactamente las dimensiones actuales de los dos modos LCD; medir y registrar baseline antes de tocar CSS.
- Mantener compatibilidad móvil/táctil.

## Fuentes y archivos
- ZX1 UI: `creator-zx1.html`
- ZX1 engine: `creator-engine.html` (preservar)
- ZP UI de referencia: `creator.html`
- ZP engine de referencia: `creator-engine.html` (solo lectura para entender contratos; no portar sobre ZX1)
- ZP estilos: `zp-ui-system.css`

## Step Sequencer — experiencia solicitada
### Visual
- LCD verde fosforescente, tipografía pixelada retro, textura LCD.
- Celdas y pasos activos iluminados en verde.
- Playhead animado, números de pasos pixelados e indicadores de compás.
- Jerarquía, colores, selector y lenguaje visual del Step Sequencer de ZP.
- PATTERN EDIT abre/cierra el secuenciador al alternarlo y expande el panel como en ZP, manteniendo la geometría LCD acordada.

### Edición e interacción
- Tocar una celda para activar/desactivar un paso.
- Arrastrar para dibujar pasos.
- Editar mientras reproduce; seguimiento del playhead.
- Zoom táctil y desplazamiento horizontal de la rejilla.
- Selección múltiple y resaltado de pasos/notas.
- PITCH por paso y edición MIDI individual por PAD.
- Copiar/pegar pasos y notas; undo/redo granular.
- SHIFT para edición precisa; controles contextuales y feedback LCD al operar LX/RX.
- LX navega pasos; RX modifica valores; ubicación física LX/RX no cambia.

### Patrones y bancos
- Crear y duplicar patrones.
- Copiar patrones entre bancos A–E usando las estructuras nativas ZX1.
- Selector de patrones pixelado.
- No sobrescribir ni duplicar sistemas de almacenamiento/reproducción de ZP.

## Matriz de integración
1. Auditar diferencias y contratos de datos entre ZP y ZX1.
2. Capturar screenshots/medidas de los dos modos LCD y pruebas de comportamiento actuales.
3. Portar estilos/componentes visuales del secuenciador desde ZP, aislados y adaptados a ZX1.
4. Conectar controles a funciones nativas ZX1; no importar su engine.
5. Implementar gestos táctiles/drag, zoom, scroll y playhead.
6. Completar edición MIDI, selección, clipboard y undo/redo usando el estado ZX1.
7. Integrar selector/patrones/bancos y controles LCD superiores.
8. QA móvil/desktop, reproducción, samples, PADs, SAMPLE EDIT, Piano Roll y regresiones.
9. Desplegar solo tras revisión y autorización del flujo de publicación.

## Etapas y criterios de salida
- Etapa 0: respaldo y verificación (bloqueante).
- Etapa 1: auditoría y baseline visual; ningún cambio funcional.
- Etapa 2: skin pixelado y geometría; screenshot comparativo aprobado.
- Etapa 3: abrir/cerrar, expandir, touch/drag, playhead, zoom/scroll.
- Etapa 4: MIDI por PAD, pitch/velocity/duración/microtiming, selección y clipboard.
- Etapa 5: patrones/bancos, LX/RX/SHIFT y herramientas LCD superiores.
- Etapa 6: pruebas de regresión y despliegue controlado.

Cada etapa debe probarse antes de continuar. Si una prueba rompe audio, patrones, samples, asignaciones, LCD o controles, detener y corregir antes de avanzar.
