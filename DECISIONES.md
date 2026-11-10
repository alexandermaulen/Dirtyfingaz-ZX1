# DECISIONES · DIRTYFINGAZ ZX1

Registro de decisiones técnicas detectadas y adoptadas durante la auditoría. Las entradas distinguen decisiones preexistentes de decisiones de auditoría.

## Contexto de auditoría

- Fecha: 2026-11-10
- Repositorio: `alexandermaulen/Dirtyfingaz-ZX1`
- Rama base observada: `main`
- SHA base: `9edbff40d9858a910d0b38aa26a268c94ed9589b`
- Rama aislada de auditoría: `mejoras/auditoria`
- Regla: no modificar `main`, no borrar archivos ni cambiar arquitectura sin justificación y aprobación.

## Decisiones preexistentes observadas

### DEC-001 · Aplicación estática servida desde la raíz

- Estado: existente
- Decisión: publicar la aplicación desde archivos estáticos en la raíz mediante GitHub Pages.
- Motivo/evidencia: `index.html` y recursos locales se encuentran en raíz; el workflow sube `.` como artefacto Pages.
- Alternativas descartadas: introducir un bundler o migrar a otro framework sin necesidad demostrada.
- Impacto: los paths relativos y los nombres de archivos forman parte del contrato de despliegue.

### DEC-002 · Separación GUI / motor de audio

- Estado: existente
- Decisión: mantener la GUI principal en `index.html` y el motor aislado en `creator-engine.html`, con dependencias de almacenamiento, core y LAME bajo recursos locales.
- Motivo/evidencia: `creator-engine.html` referencia `zp-storage.js`, `zp-core.js`, `vendor/lame.min.js` y `zp-ui-system.css`; la GUI carga `zp-agent.js` y `zp-layout.js`.
- Alternativas descartadas: fusionar GUI y motor en un único archivo o introducir build tooling sin prueba de beneficio.
- Impacto: los contratos de mensajes entre GUI y motor deben validarse sin asumir que una comprobación estática demuestra comportamiento de audio.

### DEC-003 · Contratos declarativos y trazabilidad

- Estado: existente
- Decisión: mantener `zp-agent-registry.json` como registro estructurado de contratos y `CM-ZX1-SURVEY.md` como snapshot de decisiones funcionales.
- Motivo/evidencia: el validador compara comandos, controles y reglas con el registro y la encuesta.
- Alternativas descartadas: duplicar esos contratos en otro sistema sin sincronización.
- Impacto: los cambios de implementación deben actualizar los contratos/documentación afectados.

### DEC-004 · Validación estática en CI antes de Pages

- Estado: existente, con fallo observado
- Decisión: ejecutar `node scripts/validate-zx1.mjs` antes de configurar/subir/desplegar Pages.
- Motivo/evidencia: `.github/workflows/pages.yml` tiene el validador como primer gate.
- Alternativas descartadas: desplegar si falla la validación.
- Impacto: un falso positivo del validador bloquea el despliegue completo y debe corregirse con evidencia.

### DEC-005 · Sin gestor de paquetes declarado

- Estado: observación
- Decisión de auditoría: no introducir dependencias ni instalar paquetes hasta demostrar que el proyecto los necesita.
- Motivo/evidencia: el árbol raíz no contiene `package.json`, lockfile ni configuración de gestor de paquetes; el validador usa módulos nativos de Node.
- Alternativas descartadas: añadir un gestor de paquetes preventivamente.
- Impacto: las pruebas reproducibles deben usar Node y APIs del navegador disponibles, sin inventar una instalación de dependencias.

## Decisiones de esta auditoría

### AUD-DEC-001 · Aislar los cambios en `mejoras/auditoria`

- Fecha: 2026-11-10
- Decisión: trabajar únicamente en la rama `mejoras/auditoria`, creada desde el SHA base indicado; no escribir en `main`.
- Motivo: instrucción explícita del encargo de auditoría y aislamiento de cambios.
- Alternativas descartadas: modificar `main` directamente o crear ramas adicionales.
- Impacto: los commits y pruebas de esta auditoría se ejecutan en la rama aislada.

### AUD-DEC-002 · No desplegar desde la rama de auditoría

- Fecha: 2026-11-10
- Decisión: cualquier validación agregada para esta rama debe ejecutar pruebas y no publicar GitHub Pages.
- Motivo: el usuario solicita probar antes de ejecutar en serio; el despliegue debe seguir reservado a la línea de publicación.
- Alternativas descartadas: permitir que un push de auditoría publique el sitio.
- Impacto: el gate de auditoría debe tener permisos mínimos y no invocar acciones de deploy.

## Hallazgos e incongruencias abiertas

- INC-001 · `README.md` prescribe trabajar directamente en `main` y prohíbe ramas de trabajo. Esto contradice la estrategia de esta auditoría, autorizada explícitamente para `mejoras/auditoria`. Se actualizará el texto documental en esta rama para reflejar el flujo solicitado, sin alterar la historia funcional del proyecto.
- INC-002 · El último workflow conocido de Pages, run `42771493943`, falló en la comprobación del toggle PATTERN EDIT. Evidencia: log del job `deploy`, que informa `PATTERN EDIT open/close toggle contract missing`. La sintaxis de los scripts inline y de `zp-storage.js` sí pasó. El despliegue fue omitido.
- INC-003 · El workflow actual escucha push solo en `main`; por tanto, los commits de `mejoras/auditoria` no activan automáticamente la validación existente. Se necesita una ruta de test no desplegable para obtener evidencia CI en esta rama.
- INC-004 · El validador esperaba un listener click sin parámetro, pero el código real usa `event=>{event.preventDefault();...}` para evitar la acción predeterminada del botón. El contrato funcional está presente; la aserción literal estaba obsoleta.

### AUD-DEC-003 · CI de auditoría separado del despliegue

- Fecha: 2026-11-10
- Decisión: agregar un workflow limitado a pushes de `mejoras/auditoria` que ejecute validación Node, sin permisos de Pages ni pasos de publicación.
- Motivo: el workflow de Pages escucha únicamente `main`, por lo que no entrega evidencia de pruebas en la rama aislada. Se requiere CI verificable sin desplegar.
- Alternativas descartadas: disparar el workflow de Pages desde la rama de auditoría o permitir que la rama publique el sitio.
- Impacto: los commits en la rama de auditoría ejecutan el validador y no modifican el sitio publicado.

### AUD-DEC-004 · Integridad de recursos y comandos GUI/motor

- Fecha: 2026-11-10
- Decisión: ampliar el validador Node para comprobar que los recursos locales referenciados por los HTML existen y que los comandos estáticos enviados por el agente contextual están registrados por el motor.
- Motivo: la sintaxis por sí sola no detecta rutas rotas ni divergencias entre las acciones del agente y el contrato del motor.
- Alternativas descartadas: incorporar un bundler o dependencias de terceros solo para estas comprobaciones.
- Impacto: las comprobaciones se ejecutan en CI con módulos nativos de Node y no modifican la arquitectura runtime.

### AUD-DEC-005 · Protección del despliegue Pages

- Fecha: 2026-11-10
- Decisión: condicionar el job de Pages a `github.ref == 'refs/heads/main'`, incluso cuando se invoque manualmente.
- Motivo: evitar que una ejecución manual seleccionando la rama de auditoría publique cambios no revisados.
- Alternativas descartadas: confiar solo en el filtro `push.branches`, que no restringe el evento `workflow_dispatch`.
- Impacto: la rama de auditoría conserva pruebas no desplegables; la publicación queda restringida a main.

## Registro de cambios

| Fecha | Cambio | Evidencia / verificación |
|---|---|---|
| 2026-11-10 | Inicio de auditoría y creación de esta bitácora | Repositorio, árbol recursivo, SHA de main y workflow inspeccionados |
| 2026-11-10 | Corrección de aserción PATTERN EDIT | Se alinea el validador con el listener real que recibe el evento y ejecuta preventDefault; el comportamiento de la GUI no se modifica |
| 2026-11-10 | CI aislado y documentación del flujo | Workflow de auditoría solo ejecuta validación en `mejoras/auditoria`; README deja de prescribir trabajo directo en main |
| 2026-11-10 | Pruebas de integridad ampliadas | Se añaden verificaciones de existencia de recursos locales y correspondencia de los 13 comandos estáticos del agente con el motor |
| 2026-11-10 | Protección del job Pages | Se añade condición de rama main al job de despliegue para bloquear publicaciones manuales desde mejoras/auditoria |
