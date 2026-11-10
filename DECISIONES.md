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

- INC-001 · RESUELTA EN ESTA RAMA. El README de `mejoras/auditoria` ahora exige trabajar en una rama seleccionada y mantener `main` sin cambios hasta revisión. El README de `main` permanece intacto.
- INC-002 · El último workflow conocido de Pages, run `42771493943`, falló en la comprobación del toggle PATTERN EDIT. Evidencia: log del job `deploy`, que informa `PATTERN EDIT open/close toggle contract missing`. La sintaxis de los scripts inline y de `zp-storage.js` sí pasó. El despliegue fue omitido.
- INC-003 · RESUELTA EN ESTA RAMA. Se agregó `.github/workflows/audit.yml`, limitado a `mejoras/auditoria`, con permisos `contents: read` y sin despliegue.
- INC-004 · RESUELTA EN ESTA RAMA. El validador ahora reconoce el listener real de PATTERN EDIT y la ejecución `42775583089` pasó.

- INC-005 · ABIERTA, REQUIERE QA MANUAL. La extracción web pública consultada el 2026-11-10 mostró una interfaz de 16 pads y controles antiguos. Sin embargo, el último despliegue Pages exitoso identificado es el run `42770853965` (SHA `46f17094`), cuyo `index.html` contiene el bootstrap de 9 pads y no contiene `EDIT LAYOUT` ni `PAD_16`. La discrepancia puede deberse a caché/indexación o a la configuración real de Pages; no se afirma todavía cuál es la causa. Confirmar en navegador real y revisar la fuente de Pages antes de publicar.

- INC-006 · CANDIDATA, REQUIERE CONFIRMACIÓN. El botón Copilot en `zp-agent.js` abre `https://github.com/alexandermaulen/Dirtyfingaz-ZP/agents`, que apunta al repositorio anterior `Dirtyfingaz-ZP`, no al repositorio actual `Dirtyfingaz-ZX1`. Puede ser intencional; se conserva sin cambio hasta confirmar el destino esperado.

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

### AUD-DEC-006 · Corrección de sintaxis del test de integridad

- Fecha: 2026-11-10
- Decisión: expresar los patrones de rutas y comandos como literales RegExp con escapes JavaScript simples y validar el script en CI inmediatamente después de cada cambio.
- Motivo: la primera versión del bloque de integridad produjo `SyntaxError: Invalid regular expression flags` en Node 22; la evidencia provino de la ejecución `42775728435`.
- Alternativas descartadas: eliminar las comprobaciones nuevas o ocultar el fallo del test.
- Impacto: se conserva la cobertura de rutas y comandos, corrigiendo únicamente el test.

### AUD-DEC-007 · Sintaxis de todos los módulos JavaScript

- Fecha: 2026-11-10
- Decisión: validar sintaxis Node de los módulos JavaScript propios y del recurso LAME local, además de los scripts inline HTML.
- Motivo: la validación anterior solo analizaba scripts inline y `zp-storage.js`; módulos cargados por la aplicación podían quedar fuera del gate.
- Alternativas descartadas: instalar un bundler o un linter externo solo para parsing.
- Impacto: el workflow ejecuta parsing con `node:vm`, sin instalar dependencias ni ejecutar código de navegador.

## Evidencia de validación reproducible

- Run `42775964903` · commit `83319472dff64c7a280cae7021c4b37dd6b43fc5` · PASS.
- Salida real: `index.html (6 inline scripts)`, `creator-engine.html (1 inline script)`, `zp-storage.js`, `zp-core.js`, `zp-layout.js`, `zp-agent.js`, `vendor/lame.min.js` con sintaxis OK.
- Salida real: `Repository integrity checks: local assets and 13 agent commands`, `ZX1 survey contracts OK: 8 UTILITY groups`, `Registry JSON OK`.
- Los runs `42775728435` y `42775774498` fallaron durante el desarrollo de la prueba ampliada (expresión regular mal escapada); el fallo se corrigió y el run posterior indicado arriba pasó.

### AUD-DEC-008 · Actualización de estado de AUD-004 en la encuesta

- Fecha: 2026-11-10
- Decisión: registrar por separado el PASS de CI de auditoría, el estado pendiente de Pages y el QA táctil/audible físico.
- Motivo: el texto anterior agrupaba CI y despliegue como pendientes, aunque la validación aislada ya había pasado.
- Alternativas descartadas: declarar el despliegue o la prueba física como completados sin evidencia.
- Impacto: la encuesta distingue validación estática en CI de despliegue y pruebas reales en dispositivo.

## Registro de cambios

| Fecha | Cambio | Evidencia / verificación |
|---|---|---|
| 2026-11-10 | Inicio de auditoría y creación de esta bitácora | Repositorio, árbol recursivo, SHA de main y workflow inspeccionados |
| 2026-11-10 | Corrección de aserción PATTERN EDIT | Se alinea el validador con el listener real que recibe el evento y ejecuta preventDefault; el comportamiento de la GUI no se modifica |
| 2026-11-10 | CI aislado y documentación del flujo | Workflow de auditoría solo ejecuta validación en `mejoras/auditoria`; README deja de prescribir trabajo directo en main |
| 2026-11-10 | Pruebas de integridad ampliadas | Se añaden verificaciones de existencia de recursos locales y correspondencia de los 13 comandos estáticos del agente con el motor |
| 2026-11-10 | Protección del job Pages | Se añade condición de rama main al job de despliegue para bloquear publicaciones manuales desde mejoras/auditoria |
| 2026-11-10 | Corrección del test de integridad | Se corrige el escape de las expresiones regulares que causó SyntaxError en la primera ejecución ampliada; CI posterior PASS en run 42775826234 |
| 2026-11-10 | Estado de incongruencias | INC-001, INC-003 e INC-004 resueltas en la rama; INC-005 queda abierta por discrepancia entre extracción web y fuente desplegada |
| 2026-11-10 | Cobertura de sintaxis ampliada | Se añaden los módulos zp-core, zp-layout, zp-agent y LAME al parsing Node del workflow; run 42775964903 PASS con los siete grupos de scripts/recursos y 13 comandos del agente |
| 2026-11-10 | Estado AUD-004 sincronizado | Encuesta distingue CI PASS en rama, Pages pendiente y QA táctil/audible pendiente; evidencia run 42776026158 |
