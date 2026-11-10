# DIRTYFINGAZ ZX1 · Especificación maestra sincronizada

> Fuente canónica: Notion · CM-ZX1 · Encuesta maestra y plan de ejecución. Snapshot actualizado al 10-11-2026 con decisiones, comentarios, inventario, checklist y feedback de ejecución. Notion continúa como fuente editable; este archivo versiona la especificación junto al código.

# DIRTYFINGAZ ZX1 · Registro maestro vigente

**Propósito:** concentrar las decisiones vigentes, el inventario de controles, el orden de ejecución y la validación del Creator. Este documento reemplaza las instrucciones antiguas que contradicen el enfoque actual. Se conserva una sola línea de desarrollo y un único repositorio.

## Panel de ejecución · Encuesta maestra CM-ZX1

Las casillas marcadas indican que la respuesta o decisión está confirmada y documentada, por lo que su ficha está lista para ejecutarse. **No significan que la función ya esté implementada ni probada.** Las tareas de implementación se marcan como terminadas únicamente después de cambiar el repositorio y verificar las pruebas. Usa las fichas detalladas y la auditoría de respuestas más abajo como fuente de requisitos.

### Superficie, reglas e inventario

- [x] CM-ZX1-01 · Superficie inicial lista según la decisión consolidada; las opciones literales originales no se recuperaron en la auditoría.
- [x] CM-ZX1-02 · Organización de la interfaz lista según la decisión consolidada; las opciones literales originales no se recuperaron en la auditoría.
- [x] CM-ZX1-03 · Proyecto vacío al iniciar, sin procesos ni paneles automáticos; UTILITY abre/cierra con toques sucesivos.
- [ ] CM-ZX1-04 · Confirmar etiquetas cortas, IDs únicos y convención PAD\_01 en adelante; no asumir la propuesta como aprobada.
- [x] CM-ZX1-05 · Usar ficha individual por control, separando identidad, presentación y función.
- [x] CM-ZX1-06 · Cubrir los nueve módulos aprobados en el inventario.
- [x] CM-ZX1-07 · Retirar la ventana antigua de configuración y sus controles tras revisar dependencias internas.
- [x] CM-ZX1-08 · Entrar directamente a la superficie principal, sin ventana superpuesta automática.

### Navegación, versiones y proyecto

- [x] CM-ZX1-09 · Navegación híbrida inferior que conserva el estado de cada módulo.
- [x] CM-ZX1-10 · Guardado manual de versiones, sin autosave de historial.
- [x] CM-ZX1-11 · Versiones de proyecto completo y de módulos individuales.
- [x] CM-ZX1-12 · Versiones secuenciales, navegables y restaurables.
- [x] CM-ZX1-13 · Aplicar la decisión posterior: una sola línea de desarrollo, sin ramas.
- [x] CM-ZX1-14 · Cancelar flujos alternativos y trabajar en un único repositorio.
- [x] CM-ZX1-15 · BTN\_HOME vuelve atrás; no abre el menú del sistema ni expulsa sin historial válido.
- [x] CM-ZX1-16 · BTN\_PROJECT ofrece opciones de proyecto, CAMBIAR TEMA y CONFIGURACIÓN futura.

### UTILITY, transporte, patrones y bancos

- [x] CM-ZX1-17 · Implementar el panel/menú UTILITY y los grupos, herramientas y búsqueda definidos.
- [x] CM-ZX1-18 · Un botón REC con armado, cuenta previa, overdub y grabación MIDI/audio.
- [x] CM-ZX1-19 · Un BTN\_PLAY gestiona internamente PLAY, STOP y CONTINUE coordinado con REC.
- [x] CM-ZX1-20 · BTN\_STOP separa detener, reiniciar, detener grabación y liberar notas.
- [x] CM-ZX1-21 · Un BPM global para transporte, metrónomo, patrones, secuenciador y efectos.
- [x] CM-ZX1-22 · LOOP define límites independientes del estado PLAY y admite grabación en loop.
- [x] CM-ZX1-23 · Menú central de patrones en lista; duplicar crea copia independiente y la semántica de clonar se define antes de implementarlo.
- [x] CM-ZX1-24 · Cinco bancos exclusivos A-E, nueve asignaciones cada uno e independientes de PATTERN\_ID.

### Encoders, PADs y edición de audio

- [x] CM-ZX1-25 · ENCODER\_LX actúa según el contexto, sin scroll global; IN en sample y movimiento horizontal en Piano Roll.
- [x] CM-ZX1-26 · ENCODER\_RX ajusta OUT/longitud, duración, velocity, pitch o el parámetro enfocado.
- [x] CM-ZX1-27 · ENCODER\_VALUE ajusta/elige/confirma; doble toque restaura y SHIFT da precisión.
- [x] CM-ZX1-28 · BTN\_SHIFT activa temporalmente precisión e indicador visual.
- [x] CM-ZX1-29 · KNOB\_MASTER controla solo la salida final, muestra nivel y admite SHIFT/restauración.
- [x] CM-ZX1-30 · ADSR independiente por PAD: ATTACK, DECAY, SUSTAIN y RELEASE.
- [x] CM-ZX1-31 · Panel ADSR híbrido: perillas compactas y curva desplegable.
- [x] CM-ZX1-32 · Curva táctil sincronizada, con zoom, cuadrícula, precisión y restauración.
- [x] CM-ZX1-33 · Al cambiar de PAD, cargar sus valores sin alterar voces activas; mantener panel y contraer la curva.
- [x] CM-ZX1-34 · BTN\_EXIT cierra/cancela el contexto y nunca abandona Creator.
- [x] CM-ZX1-35 · BTN\_COPY/PASTE copia contenido contextual tipado y evita mezclas incompatibles.
- [x] CM-ZX1-36 · Excluir BTN\_REMAIN; no reasignar automáticamente su espacio.
- [x] CM-ZX1-37 · BTN\_DEL elimina solo el elemento permitido según el contexto.
- [x] CM-ZX1-38 · Mantener pulsado REC abre modalidades; una sola tecla física y modos internos MIDI/AUDIO/OVERDUB.
- [x] CM-ZX1-39 · BTN\_CHOP usa cortes manuales.
- [x] CM-ZX1-40 · BTN\_SAMPLEEDIT ofrece operaciones definidas y separa edición destructiva/no destructiva.
- [x] CM-ZX1-41 · BTN\_PUSHENTER confirma, abre, aplica o ejecuta según foco y contexto.
- [x] CM-ZX1-42 · BTN\_PADSETTING administra solo el PAD seleccionado y conserva asignaciones por banco.
- [x] CM-ZX1-43 · BTN\_EFXSETTING separa buses/cadenas y admite efectos, routing, sends, grupos y returns.
- [x] CM-ZX1-44 · FILTER y DRIVE son procesadores independientes aunque compartan panel.
- [x] CM-ZX1-45 · Ubicación del RESONATOR dentro de EFX SETTING confirmada; mantener pendiente su ficha funcional detallada.

### Mixer y efectos

- [x] CM-ZX1-46 · ISOLATOR de tres bandas, controles KILL/SOLO, crossover, destinos y bypass.
- [x] CM-ZX1-47 · DELAY con tiempo/sync/divisiones, modulación, ruteo y bypass.
- [x] CM-ZX1-48 · CHORUS con voces, profundidad, anchura y sync opcional.
- [x] CM-ZX1-49 · FLANGER con MANUAL, feedback, estéreo, sync y THROUGH ZERO.
- [x] CM-ZX1-50 · PHASER con etapas configurables, sync opcional y visualización de fase.
- [x] CM-ZX1-51 · DISTORTION con algoritmos diferenciados, compensación de salida y controles aprobados.
- [x] CM-ZX1-52 · COMPRESSOR con sidechain, filtro detector, medidor de reducción y ruteo aprobado.
- [x] CM-ZX1-53 · EQ táctil con nodos libres hasta 24 por instancia, cada uno con frecuencia, ganancia y Q.
- [x] CM-ZX1-54 · REVERB con tipos, reflexiones tempranas/tardías, FREEZE y controles aprobados.
- [x] CM-ZX1-55 · FILTER con modelos, pendiente y modulación; independiente de FILTERDRIVE.
- [x] CM-ZX1-56 · BITCRUSH mantiene BIT DEPTH y SAMPLE RATE independientes y combinables.
- [x] CM-ZX1-57 · SATURATOR prioriza color armónico y carácter analógico; independiente de DISTORTION y con compensación de salida.
- [ ] CM-ZX1-58 · Definir y confirmar la encuesta de BTN\_LIMITER antes de implementarla.

### Exclusiones y forma de ejecución

- BTN\_GATE está excluido del inventario y de la secuencia de encuestas; BTN\_REMAIN está excluido como control físico (CM-ZX1-36).
- Ejecutar únicamente fichas marcadas como listas; trabajar de forma secuencial sobre el único repositorio.
- Antes de tocar GUI y motor en conjunto, definir contrato, archivos responsables y pruebas.
- Tras cada ficha: implementar, probar, registrar archivos/cambios y mantener sin marcar como terminada cualquier tarea aún no verificada.
- CM-ZX1-01 y CM-ZX1-02 tienen decisión consolidada, pero la auditoría no recuperó sus opciones literales. CM-ZX1-45 tiene ubicación confirmada, no parámetros detallados. CM-ZX1-58 aún requiere respuesta.

## 1. Reglas maestras del proyecto

- Un único repositorio y una sola línea de desarrollo. No crear ramas nuevas ni flujos alternativos.
- HISTORIAL usa versiones secuenciales restaurables, sin ramificaciones.
- Separar GUI (componentes, layout y estados) del motor (audio, eventos y persistencia).
- Antes de cambios que afecten ambas capas, definir contrato de integración, archivos responsables y pruebas.
- No convertir recomendaciones en decisiones aprobadas sin confirmación del usuario.
- No marcar tareas como terminadas hasta implementarlas y verificarlas.
- No abrir paneles, menús, ventanas ni procesos automáticamente al iniciar Creator.
- El inventario cubre nueve módulos. Agente y herramientas auxiliares quedan fuera de esta etapa.
- Cada control tendrá ficha: ID, etiqueta visible, módulo, ubicación, estados visuales, comportamiento esperado, evento, responsable técnico y validación.

## 2. Decisiones confirmadas

### CM-ZX1-01 · Superficie inicial

Estado: Confirmado.

- Matriz de PADs.
- Transporte Play, Stop, REC y BPM.
- Encoder VALUE y controles rápidos.
- La superficie inicial debe estar lista para tocar, con módulos secundarios fuera de la vista inicial.

### CM-ZX1-02 · Organización

Estado: Confirmado.

- PADs al centro y controles principales alrededor.
- Transporte fijo en la interfaz.
- Herramientas secundarias en paneles desplegables.
- Navegación por pestañas.
- Ningún panel, modal o pantalla de inicio debe abrirse automáticamente.

### CM-ZX1-03 · Estado inicial

Estado: Confirmado.

- Proyecto nuevo y vacío.
- PADs vacíos.
- Sin apertura automática de bibliotecas o exploradores.
- Sin reproducción ni procesos de audio al entrar.
- UTILITY abre con el primer toque y cierra con el segundo.

### CM-ZX1-04 · Identificación

Estado: Pendiente de confirmación del usuario. La propuesta de etiquetas cortas, IDs únicos y PAD\_01 en adelante no debe tratarse como aprobada hasta recibir confirmación.

- Etiquetas cortas y legibles en los controles.
- ID interno único por control.
- PADs identificados PAD\_01 en adelante.
- No mostrar IDs técnicos permanentemente debajo de los controles.
- El inventario completo se construye control por control.

### CM-ZX1-05 · Ficha de inventario

Estado: Confirmado.
Cada control registra identidad, módulo, ubicación, estados visuales, comportamiento, tipo, evento y módulo responsable. Identidad, presentación visual y función programática deben mantenerse separadas.

### CM-ZX1-06 · Módulos del inventario

Estado: Confirmado.

1. PADs y matriz.
2. Transporte.
3. Encoders y controles físicos simulados.
4. Editor de audio.
5. Secuenciador y patrones.
6. Mixer y efectos.
7. Gestión de proyectos y archivos.
8. Navegación y paneles.
9. Sistema y configuración.

### CM-ZX1-07 · Antigua ventana de configuración

Estado: Confirmado.
Eliminar la ventana antigua y sus controles asociados: EDIT LAYOUT, DEFAULT/CUSTOM, AUTOSAVE, DUPLICATE/RENAME/DELETE, RESTORE DEFAULT y THEME/COLOR. Antes de retirar lógica compartida, comprobar si alguna preferencia interna es necesaria para otra función.

### CM-ZX1-08 · Ventana inicial superpuesta

Estado: Confirmado.
No mostrar Function Menu Sample ni otra ventana superpuesta al iniciar. Entrar directamente a la superficie principal. Las herramientas no eliminadas expresamente se abren solo bajo solicitud.

### CM-ZX1-09 · Navegación

Estado: Confirmado.

- Sistema híbrido de pestañas principales y acceso secundario a herramientas.
- Navegación ubicada en la parte inferior.
- Cada módulo conserva su estado al cambiar de sección.

### HISTORIAL · CM-ZX1-10 a CM-ZX1-14

Estado: Especificación conceptual confirmada; implementación pendiente.

- Guardado manual, solo cuando el usuario lo solicite.
- Versiones de proyecto completo y de módulos individuales.
- Numeración secuencial y nombre personalizado, por ejemplo V001 · BASE INICIAL.
- Navegar entre versiones anteriores y posteriores, restaurar estados.
- Sin ramas ni líneas alternativas. CM-ZX1-13 y CM-ZX1-14 quedan anuladas como propuestas de ramificación.

### CM-ZX1-15 · BTN\_HOME

Estado: Confirmado.

- ID: BTN\_HOME. Etiqueta: ←.
- Acción: BACK.
- Regresar a la pantalla anterior, con destino esperado MAIN de la página anfitriona cuando Creator esté integrado.
- No abrir el menú de sistema ni expulsar al usuario si no existe historial de navegación válido.

### CM-ZX1-16 · BTN\_PROJECT

Estado: Confirmado.

- Abrir menú de opciones de proyecto.
- Añadir al final CAMBIAR TEMA y CONFIGURACIÓN.
- CONFIGURACIÓN abrirá un panel general nuevo, cuyo contenido se definirá más adelante.
- CAMBIAR TEMA no llevará la aclaración «(visual)».
- Estas opciones nuevas no reintroducen la antigua ventana eliminada en CM-ZX1-07.

### CM-ZX1-17 y CM-ZX1-18A/B/C · BTN\_UTILITY

Estado: Confirmado conceptualmente; implementación y validación pendientes.
UTILITY ofrece panel y menú de herramientas. Los grupos abren y cierran independientemente, permiten varios abiertos, recuerdan estado y orden, se pueden reordenar y cuentan con buscador.

Orden inicial de grupos:

1. Edición rápida.
2. Metrónomo y tempo.
3. Cuantización.
4. Audio.
5. Rendimiento.
6. Tonalidad y afinación.
7. Master y seguridad.
8. Análisis y control.

Presentación híbrida: descripción breve, favoritos, iconos, atajos y búsqueda resaltada. Acciones rápidas como botones compactos; ajustes complejos como filas desplegables.

Herramientas solicitadas:

- Copiar PAD, copiar valor y pegar en el último seleccionado.
- Metrónomo: volumen, acento y cuenta previa.
- Tempo: BPM, tap tempo y compás.
- Tonalidad y escala del proyecto.
- Afinador mediante micrófono.
- Snap/cuantización: 1/4, 1/8, 1/16, triplets y off.
- Selección de entrada/salida: micrófono, auriculares y Bluetooth.
- Latencia y tamaño de buffer.
- Medidores de CPU y memoria.
- Nivel master: peak y LUFS.
- Panic / All Notes Off.
- Atajos y gestos.
- Detector de BPM.
- Guía de escalas y acordes resaltada en Piano Roll, con mostrar/ocultar.

### CM-ZX1-18 · BTN\_REC

Estado: Confirmado conceptualmente; implementación y validación pendientes.

- Un único botón REC.
- Toggle iniciar/detener.
- Preparar/armar grabación.
- Cuenta previa.
- Overdub.
- Grabación de audio externo desde la entrada seleccionada.
- Grabación MIDI de la ejecución de PADs.
- Diferenciar internamente modos MIDI, AUDIO y OVERDUB sin multiplicar botones físicos.

### CM-ZX1-19 · BTN\_PLAY

Estado: Confirmado conceptualmente; implementación y validación pendientes.

- Un único botón físico BTN\_PLAY.
- Gestiona estados PLAY, STOP y CONTINUE internamente.
- Coordinar sus transiciones con REC.

### CM-ZX1-20 · BTN\_STOP

Estado: Confirmado conceptualmente; implementación y validación pendientes.

- STOP detiene reproducción.
- RESET detiene y vuelve al inicio.
- RECORD detiene también la grabación.
- RELEASE libera notas MIDI y sonidos activos.
- STOP y CONTINUE son funciones separadas; la posición del transporte se gestiona explícitamente.

### CM-ZX1-21 · BTN\_BPM

Estado: Confirmado conceptualmente; implementación y validación pendientes.

- Ajuste de tempo.
- Tap tempo.
- Sincronización.
- Presets.
- Un único estado global de BPM compartido por secuenciador, metrónomo, patrones y efectos.

### CM-ZX1-22 · BTN\_LOOP

Estado: Confirmado conceptualmente; implementación y validación pendientes.

- Toggle de loop.
- Grabación durante loop.
- Los límites del loop son independientes del estado PLAY. El transporte decide cuándo reproducir y REC gestiona la grabación.

### CM-ZX1-23 · BTN\_PATTERNSELECT

Estado: Confirmado conceptualmente; implementación y validación pendientes.

- Primera pulsación expande un menú en la pantalla central; segunda pulsación lo contrae.
- Presentación tipo lista, sin ventana externa.
- Opciones:
  1. PAT\_CREATE · CREATE PATTERN.
  2. PAT\_SELECT · PATTERN SELECT.
  3. PAT\_LOOP · LOOP PATTERN SELECTED.
  4. PAT\_DUPLICATE · DUPLICATE PATTERN.
  5. PAT\_CLONE · CLONE PATTERN.
  6. PAT\_COPY\_MIDI · COPY MIDI PATTERN.
  7. PAT\_PASTE\_MIDI · PASTE MIDI PATTERN.
  8. PAT\_DELETE · DELETE PATTERN.
- Duplicar genera una copia independiente.
- Clonar mantiene una relación con el original; su semántica exacta se definirá antes de implementar.

### Bancos de PADs A-E · Corrección de arquitectura

Estado: Confirmado en su separación de entidades; interacción detallada pendiente.

- Cinco bancos exclusivos de PADs: A, B, C, D y E.
- Etiquetas visibles sencillas: A-E. Eliminar el esquema anterior A/F, B/G, C/H y D/I.
- Los samples pertenecen a los PADs de cada banco.
- BANK\_ID y PATTERN\_ID son entidades independientes.
- Cambiar de banco no cambia el patrón seleccionado.
- Cambiar de patrón no cambia el banco activo.
- Los datos MIDI y los pasos pertenecen a patrones, no a bancos.
- Pendiente: definir selección, feedback visual, persistencia de asignaciones y comportamiento durante reproducción.

## 3. Inventario de controles detectados hasta ahora

**Importante:** inventario preliminar, no exhaustivo. Se debe seguir inspeccionando todos los archivos y módulos antes de declararlo completo.

| Módulo | Controles o familias identificadas |
| --- | --- |
| PADs y matriz | 9 PADs: PAD\_01 a PAD\_09; bancos A-E; controles de PAD |
| Transporte | BTN\_HOME, BTN\_PLAY, BTN\_STOP, BTN\_REC, BTN\_BPM, BTN\_LOOP |
| Navegación/sistema | BTN\_PROJECT, BTN\_UTILITY, navegación por pestañas |
| Secuenciador | BTN\_PATTERNSELECT, rejilla de pasos y herramientas Piano Roll |
| Editor de audio | CHOP, SAMPLEEDIT, DEL, BROWSE, TRNS, IN, OUT |
| Mixer/efectos | EFXSETTING, FILTERDRIVE, RESONATOR, ISOLATOR, DELAY, MFX |
| Controles físicos simulados | Encoder VALUE, encoder secundario, encoder de trim y cuatro knobs |
| Gestión de proyectos | IMPORT/EXPORT y controles del Project Manager |
| PAD Settings | MUTE, SOLO, PREVIEW, BROWSE y CLOSE |

Acciones detectadas en el código anterior son referencias de auditoría, no necesariamente comportamientos aprobados. Cada ficha debe contrastarse con el código vigente y con la respuesta del usuario.

## 4. Checklist maestro · Orden de ejecución

Marcar solo al completar y verificar cada paso.

### Fase 1 · Auditoría e inventario

- [x] 1.1 Revisar el árbol completo del repositorio y localizar todos los módulos.
- [ ] 1.2 Identificar cada botón, PAD, encoder, knob, selector, pestaña y control dinámico.
- [ ] 1.3 Asignar un ID único y etiqueta visible a cada control.
- [ ] 1.4 Registrar módulo, ubicación y estados visuales.
- [ ] 1.5 Registrar acción actual del código y evento asociado.
- [ ] 1.6 Encuestar al usuario sobre el comportamiento deseado, control por control.
- [ ] 1.7 Consolidar las fichas y marcar inventario como completo solo tras revisar todos los módulos.

### Fase 2 · Especificación funcional

- [ ] 2.1 Cerrar la definición de los cinco bancos A-E.
- [ ] 2.2 Cerrar la definición de los controles de cada módulo.
- [ ] 2.3 Definir estados visuales y transiciones de cada control.
- [ ] 2.4 Definir contratos GUI ↔ motor para cada familia de eventos.
- [ ] 2.5 Resolver dependencias entre transporte, REC, loop, BPM y secuenciador.
- [ ] 2.6 Definir el panel nuevo CONFIGURACIÓN y la opción CAMBIAR TEMA.

### Fase 3 · Arquitectura e implementación

- [ ] 3.1 Confirmar estructura real de archivos y responsabilidades.
- [ ] 3.2 Mantener GUI y motor desacoplados mediante IDs y eventos estables.
- [ ] 3.3 Implementar estados visuales según las fichas aprobadas.
- [ ] 3.4 Implementar la lógica de bancos PAD A-E, independiente de patrones.
- [ ] 3.5 Implementar transporte, grabación y loop.
- [ ] 3.6 Implementar secuenciador, patrones y Piano Roll.
- [ ] 3.7 Implementar editor de audio, mixer y efectos.
- [ ] 3.8 Implementar UTILITY, PROJECT, navegación e HISTORIAL.
- [ ] 3.9 Registrar cada cambio y su relación con las fichas del inventario.

### Fase 4 · Integración y pruebas

- [ ] 4.1 Verificar que cada control emita el evento correcto.
- [ ] 4.2 Verificar que el motor responda al evento correcto.
- [ ] 4.3 Verificar sincronización de estados GUI y motor.
- [ ] 4.4 Probar combinaciones entre PLAY, STOP, REC, LOOP y BPM.
- [ ] 4.5 Probar independencia BANK\_ID / PATTERN\_ID.
- [ ] 4.6 Probar persistencia y restauración de proyectos y módulos.
- [ ] 4.7 Probar apertura/cierre de paneles sin pérdida de estado.
- [ ] 4.8 Probar en Safari/iPhone y registrar resultados reales.
- [ ] 4.9 Corregir errores y repetir las pruebas afectadas.

### Fase 5 · Publicación y control de versiones

- [ ] 5.1 Revisar los cambios en la única línea de desarrollo.
- [ ] 5.2 Ejecutar validación completa antes de publicar.
- [ ] 5.3 Solicitar confirmación antes de cualquier publicación que el usuario deba aprobar.
- [ ] 5.4 Publicar y verificar la versión resultante.
- [ ] 5.5 Crear una versión manual de HISTORIAL cuando el usuario lo solicite.
- [ ] 5.6 Registrar commit, archivos modificados, pruebas y resultado.

## 5. Estado actual y próximo control

- Especificaciones CM-ZX1-01 a CM-ZX1-23: decisiones funcionales registradas según su estado individual.
- Inventario total: en curso, todavía no exhaustivo.
- Implementación y validación: pendientes por ficha, salvo las funciones que ya se hayan verificado expresamente en el repositorio.
- Bancos PAD A-E: definición funcional ya encuestada en CM-ZX1-24; conservar la independencia entre bancos y patrones.
- Próxima encuesta de efectos: CM-ZX1-58 · BTN\_LIMITER.
- BTN\_GATE queda excluido del inventario de controles y de la secuencia de encuestas por decisión del usuario.

## 6. Registro de cambios

- 2026-11-09/10: reorganización del documento como registro maestro vigente.
- Se eliminan del plan operativo las instrucciones antiguas sobre ramas, flujos alternativos y promoción entre ramas.
- Se consolida la separación entre bancos de PADs y patrones.
- Se conserva la distinción entre decisiones confirmadas, especificaciones pendientes e implementación validada.
- 2026-11-10: se actualiza la encuesta de efectos hasta CM-ZX1-57; se excluye BTN\_GATE y se establece BTN\_LIMITER como siguiente control de encuesta.

## 7. Decisiones recientes · Mixer y efectos

### CM-ZX1-56 · BTN\_BITCRUSH

Estado: Decisión funcional confirmada; implementación y validación pendientes.

- Panel completo BITCRUSH.
- BIT DEPTH y SAMPLE RATE son parámetros independientes: pueden utilizarse por separado o combinarse.
- DOWNSAMPLING, QUANTIZATION, DITHER, JITTER y generador de NOISE.
- FILTER y DRIVE.
- WET / DRY y procesamiento STEREO.
- Destinos MASTER, PAD y GROUP / BUS.
- SENDS y RETURNS.
- Automatización, presets, visualizador de resolución/waveform y bypass individual/global.

### CM-ZX1-57 · BTN\_SATURATOR

Estado: Decisión funcional confirmada; implementación y validación pendientes.

- Panel completo SATURATOR; DRIVE y selección TYPE: Analog, Tape, Tube, Transformer, Soft Clip y Hard Clip.
- INPUT, OUTPUT, BIAS, SYMMETRY, WARMTH y HARMONICS.
- MULTIBAND, OVERSAMPLING, TONE y FILTER.
- PARALLEL y WET / DRY.
- Destinos MASTER, PAD y GROUP / BUS; SENDS y RETURNS.
- Automatización, presets, visualizador de waveform/armónicos y bypass individual/global.
- SATURATOR es independiente de DISTORTION. Prioriza color armónico, densidad y carácter analógico. OUTPUT compensa la ganancia para comparar sin sesgo de volumen.

### Exclusión · BTN\_GATE

Estado: Excluido por decisión del usuario el 2026-11-10.

- No continuar la encuesta de BTN\_GATE.
- No incluir BTN\_GATE como control aprobado del inventario ni crear un botón físico para él.

### CM-ZX1-58 · BTN\_LIMITER

Estado: Siguiente control propuesto para encuesta; funciones todavía no definidas.

## 8. Auditoría y consolidación de decisiones CM-ZX1-24 a CM-ZX1-55

Estado de esta consolidación: reconstruida a partir de las respuestas y decisiones disponibles en el historial de trabajo. Las especificaciones son conceptualmente confirmadas; implementación y validación permanecen pendientes salvo evidencia expresa posterior.

### CM-ZX1-24 · BTN\_BANK\_A a BTN\_BANK\_E

- Cinco bancos independientes: A, B, C, D y E.
- Un solo banco activo a la vez; cambio inmediato.
- Conservar el PAD seleccionado al cambiar de banco.
- Cambiar de banco no corta samples que ya están sonando.
- Se permite cambiar durante playback y recording.
- Cada banco mantiene nueve asignaciones independientes.
- Etiquetas visibles A-E; se descarta el esquema anterior A/F, B/G, C/H, D/I y E/J.
- BANK\_ID es independiente de PATTERN\_ID. Samples pertenecen a PADs/bancos; MIDI y pasos pertenecen a patrones.

### CM-ZX1-25 · ENCODER\_LX

- Navegar opciones del contexto activo, sin actuar como scroll global.
- En edición de sample: mover/ajustar IN.
- En Piano Roll: mover nota horizontalmente.
- Mantener pulsado habilita opciones secundarias contextuales.

### CM-ZX1-26 · ENCODER\_RX

- En edición de sample: ajustar OUT y longitud.
- En Piano Roll: ajustar duración, velocity, pitch y movimiento vertical de notas.
- En otros módulos: ajustar el parámetro enfocado.
- Mantener pulsado habilita opciones secundarias contextuales.

### CM-ZX1-27 · ENCODER\_VALUE

- Ajustar el valor enfocado.
- Recorrer opciones de menú.
- Pulsar para confirmar/aplicar.
- Doble pulsación para restaurar el valor predeterminado.
- SHIFT permite ajuste de precisión.

### CM-ZX1-28 · BTN\_SHIFT

- Mantener presionado para activar modo de precisión momentáneo.
- Mostrar indicador visual mientras está activo.
- Aplicar a ENCODER\_LX, ENCODER\_RX, ENCODER\_VALUE y movimientos/valores MIDI.

### CM-ZX1-29 · KNOB\_MASTER

- Ubicación: esquina superior izquierda.
- Controla exclusivamente el nivel final de salida.
- Muestra el nivel de señal.
- SHIFT activa ajuste de precisión.
- Doble pulsación restaura el valor predeterminado.

### CM-ZX1-30 a CM-ZX1-33 · Controles ADSR

- Cuatro perillas: CTRL 0 = ATTACK, CTRL 1 = DECAY, CTRL 2 = SUSTAIN, CTRL 3 = RELEASE.
- Sustituyen las perillas anteriores de esa zona; KNOB\_MASTER permanece separado.
- Cada control afecta al PAD seleccionado.
- Envolvente independiente por PAD; no mezclar valores entre PADs ni bancos.
- Panel ADSR con perillas compactas y curva desplegable al tocar; mostrar valores numéricos y actualizar curva en tiempo real.
- Curva táctil directamente manipulable, bidireccional, con zoom y cuadrícula.
- SHIFT para precisión y restauración de valores predeterminados.
- Al cambiar de PAD, cargar su envolvente guardada y actualizar controles/curva; conservar los valores de cada PAD.
- Las voces que ya están sonando no cambian retroactivamente.
- El panel permanece abierto al cambiar PAD; la curva ampliada vuelve a vista compacta.
- El usuario indicó que el bloque ADSR estaba bien y pidió continuar.

### CM-ZX1-34 · BTN\_EXIT

- Cerrar panel o menú.
- Salir de herramienta o modo.
- Cancelar operación sin aplicar cambios.
- Regresar a la superficie principal del Creator.
- Salir del estado contextual y volver al estado anterior del módulo.
- Nunca abandonar Creator; BTN\_HOME es el control para volver al host.

### CM-ZX1-35 · BTN\_COPY

- Copia contextual y tipada.
- Tipos admitidos: PAD completo, sample y puntos IN/OUT, ADSR, FX, patrón MIDI, pasos del secuenciador, notas seleccionadas del Piano Roll y valor de parámetro.
- No copiar automatizaciones ni selección múltiple.
- PASTE debe reconocer el tipo de contenido y evitar mezclas incompatibles entre bancos y patrones.

### CM-ZX1-36 · BTN\_REMAIN

- Excluido por decisión del usuario: retirar el botón físico.
- No reasignar automáticamente el espacio que ocupaba.

### CM-ZX1-37 · BTN\_DEL

- Eliminar sample asignado al PAD, notas MIDI seleccionadas o elemento/contenido seleccionado según el contexto.
- No eliminar el PAD completo, pasos, patrón completo ni automatizaciones.
- Eliminación contextual.

### CM-ZX1-38 · BTN\_REC · Modalidades de grabación

- Mantener un solo botón físico REC.
- Mantener pulsado abre modalidades.
- Pulsación corta ejecuta la acción principal REC según el estado del transporte.
- Modalidades internas MIDI, AUDIO y OVERDUB.
- Mostrar el modo seleccionado y el estado de armado.
- Decisión conceptual confirmada; implementación y validación pendientes.

### CM-ZX1-39 · BTN\_CHOP

- Selección confirmada: modo MANUAL.
- Permite definir manualmente puntos de corte sobre la waveform.

### CM-ZX1-40 · BTN\_SAMPLEEDIT

- Funciones: TRIM, REVERSE, NORMALIZE, FADE, PITCH, TIME STRETCH y CHOP.
- Separar modos DESTRUCTIVE y NON-DESTRUCTIVE.
- El modo no destructivo conserva el original y trabaja con parámetros/versión derivada; el destructivo aplica cambios al audio objetivo.

### CM-ZX1-41 · BTN\_PUSHENTER

- Acciones contextuales: CONFIRM, OPEN, APPLY y EXECUTE.
- La acción depende del foco y estado del módulo.
- No ejecutar simultáneamente acciones incompatibles.

### CM-ZX1-42 · BTN\_PADSETTING

- Funciones seleccionadas: PANEL, QUICK, SAMPLE, ADSR, PITCH, VOLUME, PAN, EFFECTS, CHOKE, ROUTING y RESET.
- Administra exclusivamente parámetros del PAD seleccionado.
- Cada asignación conserva sus valores en bancos A-E; no sobrescribir otros PADs ni bancos.

### CM-ZX1-43 · BTN\_EFXSETTING

- Funciones: PANEL, MASTER, PAD, REVERB, DELAY, CHORUS, FLANGER, PHASER, DISTORTION, COMPRESSOR, EQ, FILTER, DRIVE, CHAIN, PRESETS y BYPASS.
- Buses MASTER y PAD separados; cadenas independientes y bypass por efecto.
- Incorporar SEND, GROUP, BUS, SEND LEVEL, ROUTING, PARALLEL FX y RETURN.
- Routing pertenece al mixer; no debe confundirse con datos MIDI de patrones.
- Separar bancos, PADs, grupos y patrones.

### CM-ZX1-44 · BTN\_FILTERDRIVE

- Funciones: CUTOFF, RESONANCE, DRIVE, FILTER, LOWPASS, HIGHPASS, BANDPASS, NOTCH, PER-PAD, MASTER, PRESETS, VISUAL, PANEL y AUTOMATION.
- FILTER y DRIVE son procesadores independientes aunque compartan panel.
- Automatización de cutoff, resonancia y saturación.
- FILTER ENVELOPE no fue seleccionado ni aprobado.

### CM-ZX1-45 · RESONATOR

- No aparece como botón físico individual en la distribución visual inspeccionada.
- Ubicación aprobada: dentro de EFX SETTING, como procesador independiente, sin botón físico propio.
- Mantiene parámetros, presets, automatización y bypass independientes.
- Las funciones detalladas del resonador no quedaron aprobadas en esta decisión.

### CM-ZX1-46 · ISOLATOR

- Procesador independiente dentro de EFX SETTING.
- Panel de tres bandas LOW / MID / HIGH.
- KILL y SOLO por banda.
- GAIN independiente por banda.
- CROSSOVER ajustable.
- Destinos MASTER, PAD y GROUP.
- Integración SENDS / RETURNS.
- Automatización, presets, visualizador de bandas/frecuencias y bypass individual/global.

### CM-ZX1-47 · BTN\_DELAY

- Panel; TIME; sincronización BPM; divisiones 1/4, 1/8, 1/16, puntillos y tresillos.
- FEEDBACK, PING PONG, STEREO, FILTER, SATURATION y MODULATION.
- WET / DRY.
- Destinos MASTER, PAD y GROUP; SENDS / RETURNS.
- Automatización, presets, visualizador de ecos/sync y bypass.
- Tiempo sincronizado y tiempo libre son modos diferenciados.

### CM-ZX1-48 · BTN\_CHORUS

- Panel; RATE, DEPTH, VOICES, DELAY, FEEDBACK, STEREO y SPREAD.
- SYNC opcional; FILTER y ANALOG.
- WET / DRY.
- Destinos MASTER, PAD y GROUP; SENDS / RETURNS.
- Automatización, presets, visualizador de modulación/voces y bypass.
- Permitir desde engrosamiento sutil hasta modulación pronunciada.

### CM-ZX1-49 · BTN\_FLANGER

- Panel; RATE, DEPTH, MANUAL (retardo base), FEEDBACK, STEREO y SYNC.
- PHASE, POLARITY, FILTER y THROUGH ZERO.
- WET / DRY.
- Destinos MASTER, PAD y GROUP; SENDS / RETURNS.
- Automatización, presets, visualizador de onda/modulación y bypass.

### CM-ZX1-50 · BTN\_PHASER

- Panel; RATE, DEPTH y STAGES configurable.
- FEEDBACK, CENTER, SPREAD, STEREO y SYNC opcional.
- PHASE, RESONANCE, FILTER y ANALOG.
- WET / DRY.
- Destinos MASTER, PAD y GROUP; SENDS / RETURNS.
- Automatización, presets, visualizador de etapas/barrido/muescas de fase y bypass.

### CM-ZX1-51 · BTN\_DISTORTION

- Panel; DRIVE, TYPE, INPUT GAIN, OUTPUT, TONE, FILTER y SYMMETRY.
- BITCRUSH y SAMPLE RATE REDUCTION como algoritmos seleccionables separados.
- MULTIBAND, OVERSAMPLING y PARALLEL.
- WET / DRY.
- Destinos MASTER, PAD y GROUP; SENDS / RETURNS.
- Automatización, presets, visualizador de waveform/saturación y bypass.
- OUTPUT compensa el volumen generado por DRIVE.

### CM-ZX1-52 · BTN\_COMPRESSOR

- Panel; THRESHOLD, RATIO, ATTACK, RELEASE, KNEE y MAKEUP GAIN.
- INPUT, OUTPUT, SIDECHAIN y SIDECHAIN FILTER.
- LOOKAHEAD, AUTO ATTACK/RELEASE, PARALLEL, MULTIBAND y STEREO LINK.
- Medidor GAIN REDUCTION.
- WET / DRY.
- Destinos MASTER, PAD y GROUP; SENDS / RETURNS.
- Automatización, presets, visualizador de compresión/waveform y bypass.
- Comentario recuperado parcialmente: SIDECHAIN con selección de fuente, filtro del detector y medidor Gain Reduction para compresión normal, ducking y control dinámico entre PAD, GROUP y MASTER. El comentario original quedó truncado después de «MA»; no se reconstruye el fragmento faltante.

### CM-ZX1-53 · BTN\_EQ

- Panel; bandas configurables; LOW CUT / HIGH CUT.
- LOW SHELF / HIGH SHELF; BELL / PEAK; NOTCH.
- FREQUENCY, GAIN y Q.
- SPECTRUM, DYNAMIC EQ, MID / SIDE, STEREO L/R y EQ MATCH.
- Destinos MASTER, PAD y GROUP; SENDS / RETURNS.
- Automatización, presets, curva interactiva/espectro y bypass.
- Curva manipulable táctilmente: mover puntos para frecuencia/ganancia y gesto secundario para Q.

#### CM-ZX1-53A · EQ de nodos libres

- Crear puntos EQ libremente, máximo 24 por instancia.
- Cada punto tiene frecuencia, ganancia y Q.
- Nodos táctiles, configurables y eliminables individualmente.
- Sin distribución fija de bandas.
- Recomendación técnica registrada: cada nodo dinámico debe tener ID propio y tipo de filtro seleccionable; el motor procesa los nodos activos hasta el máximo de 24.

### CM-ZX1-54 · BTN\_REVERB

- Panel; tipos ROOM, HALL, PLATE, CHAMBER, SPRING y SHIMMER.
- DECAY, PRE-DELAY, SIZE, DIFFUSION y DAMPING.
- EARLY REFLECTIONS y LATE REFLECTIONS independientes.
- MODULATION, STEREO, FREEZE, FILTER y DUCKING.
- SYNC opcional; WET / DRY.
- Destinos MASTER, PAD y GROUP; SENDS / RETURNS.
- Automatización, presets, visualizador de espacio/cola y bypass.
- FREEZE conserva la cola sin incorporar señal nueva.

### CM-ZX1-55 · BTN\_FILTER

- Panel; LOW PASS, HIGH PASS, BAND PASS, NOTCH, COMB y FORMANT.
- CUTOFF, RESONANCE y SLOPE configurable.
- DRIVE, KEYTRACK, ENVELOPE FOLLOWER y LFO.
- Automatización y MORPH.
- STEREO y MID / SIDE.
- Destinos MASTER, PAD y GROUP; SENDS / RETURNS.
- Presets, visualizador de respuesta en frecuencia, WET / DRY y bypass.
- FILTER y FILTERDRIVE son independientes. FILTER ofrece modelos de respuesta, pendiente configurable y modulación asignable.

## 9. Resultado de auditoría y límites de recuperación

- CM-ZX1-24 a CM-ZX1-55 quedan consolidadas en este registro a partir de la información disponible.
- CM-ZX1-36 BTN\_REMAIN y BTN\_GATE quedan documentados como exclusiones, no como controles aprobados.
- CM-ZX1-13 y CM-ZX1-14 se conservan como anuladas/canceladas respecto de la propuesta de ramificación.
- El comentario de CM-ZX1-52 está incompleto en el historial recuperado; se registra solo la parte legible.
- Las decisiones CM-ZX1-01 a CM-ZX1-23 ya existían en las secciones anteriores, pero algunas están agrupadas y no reproducen literalmente cada opción original del cuestionario. Esta auditoría no certifica literalidad completa de cada pregunta antigua.
- CM-ZX1-56 y CM-ZX1-57 están registradas en la sección 7.
- CM-ZX1-58 · BTN\_LIMITER permanece como próxima encuesta; todavía no tiene respuesta aprobada.

## 10. Auditoría de conversaciones ChatGPT · Respuestas originales CM-ZX1

Esta sección complementa las fichas funcionales. Distingue entre: (a) respuestas/opciones confirmadas por el usuario en chats; (b) aclaraciones o decisiones posteriores; (c) preguntas sin respuesta recuperable. No convierte propuestas del asistente en selecciones del usuario. Cuando no se recuperó el texto literal, se indica expresamente.

### CM-ZX1-01 a CM-ZX1-08 · Inicio e inventario

- **CM-ZX1-01:** consta como confirmada en el historial de trabajo y en el registro maestro. No se recuperó en esta búsqueda la respuesta literal ni la lista exacta de opciones seleccionadas. Mantener la especificación ya registrada como decisión consolidada, sin atribuirle opciones literales no recuperadas.
- **CM-ZX1-02:** consta como confirmada en el historial de trabajo y en el registro maestro. No se recuperó en esta búsqueda la respuesta literal ni la lista exacta de opciones seleccionadas.
- **CM-ZX1-03:** confirmación del usuario recuperada: proyecto nuevo/vacío; PADs vacíos; no abrir bibliotecas ni exploradores automáticamente; no reproducir audio ni iniciar procesos al entrar; UTILITY abre/cierra con toques sucesivos. Comentario recuperado: quiere nombrar cada botón visible para diseñar el layout y asignar funciones.
- **CM-ZX1-04:** NO CONFIRMADA. Se presentó una propuesta de etiquetas cortas, IDs únicos, PAD\_01 en adelante, inventario y nombres técnicos en EDIT LAYOUT. El usuario debía confirmar o modificar la propuesta; no se recuperó aceptación. Mantener pendiente y no tratar como decisión aprobada.
- **CM-ZX1-05:** se aceptó el inventario individual y modular, con ficha por control. No se recuperó selección literal de opciones. La decisión consolidada de la ficha permanece en la sección 2.
- **CM-ZX1-06:** selección confirmada de nueve módulos: PADs y matriz; Transporte; Encoders y controles físicos simulados; Editor de audio; Secuenciador y patrones; Mixer y efectos; Gestión de proyectos y archivos; Navegación y paneles; Sistema y configuración. Comentario/corrección: quitar Function Menu Sample y no desplegar al abrir la ventana con EDIT LAYOUT, DEFAULT/CUSTOM, AUTOSAVE, DUPLICATE/RENAME/DELETE, RESTORE DEFAULT y THEME/COLOR.
- **CM-ZX1-07:** selección exacta recuperada: `remove_all`. El usuario pidió precisar qué significaba quitar Function Menu Sample. La decisión quedó aclarada como eliminación de la ventana antigua y sus controles asociados, no solo ocultarla al inicio.
- **CM-ZX1-08:** selección exacta: `other`. Comentario literal: “Ventana que se sobre pone al abrir la app”. Decisión: no mostrar esa ventana superpuesta al iniciar Creator.

### CM-ZX1-09 a CM-ZX1-16 · Navegación, historial y proyecto

- **CM-ZX1-09:** selección/decisión recuperada: navegación híbrida, ubicada abajo, conservando estado. Aclaración adicional: añadir historial para atrás/adelante y usar un nombre simple.
- **CM-ZX1-10:** selección exacta: `manual`. Comentario vacío. No versiones automáticas.
- **CM-ZX1-11:** selección exacta: `both`, proyecto completo y módulo individual. Comentario vacío.
- **CM-ZX1-12:** selección exacta: `both`. Comentario vacío.
- **CM-ZX1-13:** selección inicial exacta: `branch`. Comentario literal: “B”. Esta decisión fue posteriormente anulada por instrucción expresa de trabajar sobre un único repositorio y una sola línea, sin crear ramas.
- **CM-ZX1-14:** cancelada/anulada por instrucción expresa: “Detente borra esto trabajemos sobre 1 repo sin crear ramas solo un enfoque”. No es una decisión funcional activa.
- **CM-ZX1-15 · BTN\_HOME:** selección exacta: `back`. Comentario literal: “Es para cuando integre la app a mi pagina dejalo omitir prefiero regresar a la pantalla anterior que es el main de mi pagina”. Destino esperado: MAIN de la página anfitriona.
- **CM-ZX1-16 · BTN\_PROJECT:** selección exacta: `project`. Añadir al final CAMBIAR TEMA y CONFIGURACIÓN. CONFIGURACIÓN quedó como futura (`future`). Corrección literal: “Cambiar tema quita (visual)”. No reintroducir la ventana antigua de CM-ZX1-07.

### CM-ZX1-17 a CM-ZX1-23 · UTILITY y transporte

- **CM-ZX1-17 · BTN\_UTILITY:** selecciones exactas: `panel`, `menu`. Herramientas solicitadas: edición rápida de PADs/valores; metrónomo; tempo/BPM; tonalidad/escala; afinador; cuantización; entrada/salida y rendimiento de audio; medidores master; panic; atajos/gestos; detector BPM; guía de escalas/acordes con mostrar/ocultar.
- **CM-ZX1-18 · BTN\_REC:** selecciones exactas: `toggle`, `arm`, `count`, `overdub`, `audio`, `midi`. Comentario literal: “REC debería distinguir entre grabación MIDI, audio y overdub, pero mantener una experiencia de control unificada desde el botón.”
- **CM-ZX1-19 · BTN\_PLAY:** selecciones exactas: `toggle`, `record`, `continue`. Comentario vacío. Ratificación posterior: “Criterio técnico: mantener un único botón físico y gestionar internamente los estados PLAY, STOP y CONTINUE.”
- **CM-ZX1-20 · BTN\_STOP:** selecciones exactas: `stop`, `reset`, `record`, `release`. Comentario literal: “separar STOP de CONTINUE. STOP debe controlar la detención; la posición del transporte y el estado de REC deben gestionarse explícitamente.”
- **CM-ZX1-21 · BTN\_BPM:** selecciones exactas: `adjust`, `tap`, `sync`, `presets`. Comentario literal: “centralizar el tempo en un único estado global para evitar diferencias entre el secuenciador, metrónomo, patrones y efectos.”
- **CM-ZX1-22 · BTN\_LOOP:** selecciones exactas: `toggle`, `record`. Comentario literal: “separar los límites del bucle del estado PLAY. Así, LOOP define qué intervalo se repite, mientras el transporte decide cuándo reproducir.”
- **CM-ZX1-23 · BTN\_PATTERNSELECT:** comportamiento seleccionado: expandir/contraer al pulsar; mostrar en pantalla central CREATE PATTERN, PATTERN SELECT, LOOP PATTERN SELECTED, DUPLICATE PATTERN, CLONE PATTERN, COPY MIDI PATTERN, PASTE MIDI PATTERN y DELETE PATTERN. Presentación elegida: `list`. Comentario literal: “separar las operaciones de duplicación y clonación. Duplicar puede crear una copia independiente; clonar puede mantener una relación con el original si esa es la semántica que definimos.”

### CM-ZX1-24 a CM-ZX1-37 · Bancos y controles físicos

- **CM-ZX1-24 · BANK A-E:** confirmado: selección exclusiva; cambio inmediato; conservar PAD seleccionado; cambiar durante samples/reproducción/grabación sin cortar voces; nueve asignaciones independientes por banco; resaltar banco activo; BANK\_ID independiente de PATTERN\_ID. Comentario registrado como confirmación de esta separación.
- **CM-ZX1-25 · ENCODER\_LX:** confirmado: navegar contexto activo; giro modifica valores; función automática según módulo; pulsación prolongada abre opciones secundarias; no hace scroll global del DAW. En sample mueve IN; en Piano Roll mueve una nota MIDI horizontalmente. No se recuperó un comentario separado adicional.
- **CM-ZX1-26 · ENCODER\_RX:** confirmado: mover OUT/longitud de selección del sample; duración, VELOCITY y altura tonal de notas MIDI; ajustar parámetro del elemento seleccionado; pulsación prolongada para opciones secundarias. Comentario literal: “Mover una nota midi verticalmente”.
- **CM-ZX1-27 · ENCODER\_VALUE:** confirmado: ajustar valor/foco; recorrer opciones del menú; pulsar para confirmar/aplicar; adaptar la función al módulo; doble pulsación restaura predeterminado. Aclaración sobre SHIFT: precisión para valores y posicionamiento horizontal MIDI.
- **CM-ZX1-28 · BTN\_SHIFT:** confirmado: indicador visual; afecta Lx/Rx/VALUE; pasos menores para mover notas horizontalmente y ajustar parámetros; mantener presionado activa precisión. Sin comentario adicional.
- **CM-ZX1-29 · KNOB\_MASTER:** confirmado: volumen general/final independiente de PADs y efectos; mostrar nivel; SHIFT para precisión; doble pulsación restaura predeterminado. Ubicación indicada: esquina superior izquierda.
- **CM-ZX1-30 · ADSR por PAD:** confirmado: “Solo sobre el PAD seleccionado. Cada PAD conserva su propia envolvente.” Comentario literal: “envolvente independiente por PAD, para que cada sonido del kit tenga su propio carácter.” CTRL 0 = ATTACK; CTRL 1 = DECAY; CTRL 2 = SUSTAIN; CTRL 3 = RELEASE.
- **CM-ZX1-31 · Panel ADSR:** confirmado: “Perillas compactas y curva ADSR desplegable al tocar el panel.” Comentario literal: “recomiendo el modo híbrido. Mantiene la superficie compacta y permite consultar la curva completa cuando necesites editar el comportamiento del sonido con mayor precisión.”
- **CM-ZX1-32 · Edición de curva ADSR:** selecciones recuperadas: mover puntos de curva directamente con el dedo; manipulación táctil y perillas sincronizadas; ampliar curva para ajustes precisos; actualizar curva y escuchar resultado mientras se modifica; cuadrícula de tiempo/nivel; SHIFT para precisión adicional; restaurar valores predeterminados. Comentario literal: “sincronizar curva, perillas y motor de audio mediante un único estado ADSR por PAD”.
- **CM-ZX1-33 · Cambio de PAD con ADSR:** selecciones recuperadas: cargar inmediatamente envolvente del nuevo PAD; conservar valores independientes; actualizar perillas/curva; no modificar voces que ya suenan; mantener panel ADSR abierto; permitir previsualización de envolvente; cerrar automáticamente la curva desplegada al cambiar de PAD. Comentario literal recuperado: “separar la selección del PAD de las voces que ya están sonando”. La decisión consolidada posterior mantiene el panel abierto y vuelve la curva ampliada a vista compacta.
- **CM-ZX1-34 · BTN\_EXIT:** selecciones: cerrar panel/menú; salir de herramienta/modo; cancelar sin aplicar; regresar a superficie principal; salir de selección/edición contextual; volver al estado anterior. Comentario literal: “recomiendo que EXIT cierre el contexto activo y cancele operaciones pendientes, pero nunca abandone el Creator…”; BTN\_HOME se reserva para volver al host.
- **CM-ZX1-35 · BTN\_COPY:** selecciones: PAD completo; sample IN/OUT; ADSR; efectos/parámetros; patrón MIDI; pasos de secuenciador; notas Piano Roll; valor individual. Comentario literal: “Seleccionar algo apretar copy para copiar ese contexto”. Se aceptó estructura temporal tipada para PASTE.
- **CM-ZX1-36 · BTN\_REMAIN:** selección inicial: tiempo restante del sample; memoria disponible/utilizada; duración restante IN/OUT; información restante según módulo. Cambio posterior expreso: “Quita este boton”. Estado final: botón excluido y sin reasignación automática del espacio.
- **CM-ZX1-37 · BTN\_DEL:** alcance confirmado: eliminar solo sample asignado al PAD seleccionado, notas MIDI seleccionadas y elemento/contenido actualmente seleccionado; respetar contexto activo y no borrar otros PADs, bancos o patrones. Exclusiones confirmadas: no eliminar PAD completo, pasos del secuenciador, patrón MIDI completo ni automatizaciones.

### CM-ZX1-38 a CM-ZX1-45 · Edición y primeras funciones de efectos

- **CM-ZX1-38 · BTN\_REC / gesto de modalidades:** selección recuperada: mantener pulsado REC. Comentario literal: “mantener un solo botón físico REC y resolver las modalidades desde el estado interno del transporte.” Complementa CM-ZX1-18, no la reemplaza.
- **CM-ZX1-39 · BTN\_CHOP:** selección recuperada: `manual`. En el mismo mensaje el usuario indicó: “Dejame seleccionar mas de una opcion en las encuestas”. Esa frase establece una regla para las encuestas; no es una especificación adicional de CHOP.
- **CM-ZX1-40 · BTN\_SAMPLEEDIT:** selecciones exactas: `trim`, `reverse`, `normalize`, `fade`, `pitch`, `time`, `destructive`, `nondestructive`, `chop`. Comentario literal: “mantener edición destructiva y no destructiva como modos diferenciados. Así puedes experimentar sin perder el sample original.”
- **CM-ZX1-41 · BTN\_PUSHENTER:** selecciones exactas: `confirm`, `open`, `apply`, `execute`. Comentario: confirmación contextual según menú/herramienta/foco, evitando acciones incompatibles simultáneas.
- **CM-ZX1-42 · BTN\_PADSETTING:** selecciones exactas: `panel`, `quick`, `sample`, `adsr`, `pitch`, `volume`, `pan`, `effects`, `choke`, `routing`, `reset`. Comentario: gestionar parámetros del PAD seleccionado, con asignaciones independientes en bancos A-E.
- **CM-ZX1-43 · BTN\_EFXSETTING:** selecciones exactas: `panel`, `master`, `pad`, `reverb`, `delay`, `chorus`, `flanger`, `phaser`, `distortion`, `compressor`, `eq`, `filter`, `drive`, `chain`, `presets`, `bypass`. Comentario literal: “separar los buses MASTER y PAD, con cadenas de efectos independientes y bypass por efecto. Esto permite procesar cada sonido sin alterar innecesariamente la mezcla global. Que pueda hacer envios o grupos como fl studio”. Se añadieron SEND/GROUP/BUS/RETURN y routing como decisión funcional.
- **CM-ZX1-44 · BTN\_FILTERDRIVE:** selecciones exactas: `cutoff`, `resonance`, `drive`, `filter`, `lowpass`, `highpass`, `bandpass`, `notch`, `perpad`, `master`, `presets`, `visual`, `panel`, `automation`. Comentario literal: “separar el filtro del drive como procesadores independientes, aunque compartan un mismo panel. Así podrás automatizar cutoff, resonancia y saturación sin limitarte a un simple interruptor.”
- **CM-ZX1-45 · RESONATOR:** no se recuperó una respuesta original de selección de parámetros. Sí se confirmó después su ubicación dentro de EFX SETTING como procesador independiente, sin botón físico propio. La lista de funciones detalladas sigue sin confirmación recuperada. Una referencia de handler o una mención de ubicación no demuestra que exista un botón físico visible.

### CM-ZX1-46 a CM-ZX1-57 · Procesadores de efectos

- **CM-ZX1-46 · ISOLATOR:** selecciones exactas: `panel`, `low`, `mid`, `high`, `kill`, `solo`, `gain`, `frequency`, `master`, `pad`, `group`, `send`, `automation`, `presets`, `visual`, `bypass`. Comentario literal: “recomiendo un isolator de tres bandas con crossover ajustable, controles KILL y SOLO, y ruteo compatible con MASTER, PAD y GROUP. Así funciona como herramienta de mezcla y performance.”
- **CM-ZX1-47 · BTN\_DELAY:** selecciones exactas: `panel`, `time`, `sync`, `division`, `feedback`, `pingpong`, `stereo`, `filter`, `saturation`, `modulation`, `wetdry`, `master`, `pad`, `group`, `send`, `automation`, `presets`, `visual`, `bypass`. Comentario: “Sin comentario adicional.”
- **CM-ZX1-48 · BTN\_CHORUS:** selecciones exactas: `panel`, `rate`, `depth`, `voices`, `delay`, `feedback`, `stereo`, `spread`, `sync`, `filter`, `analog`, `wetdry`, `master`, `pad`, `group`, `send`, `automation`, `presets`, `visual`, `bypass`. Comentario literal: “permitir sincronización al BPM sin obligarla. Un chorus con control de voces, profundidad y anchura estéreo ofrece desde engrosamiento sutil hasta modulación pronunciada.”
- **CM-ZX1-49 · BTN\_FLANGER:** selecciones exactas: `panel`, `rate`, `depth`, `manual`, `feedback`, `stereo`, `sync`, `phase`, `polarity`, `filter`, `throughzero`, `wetdry`, `master`, `pad`, `group`, `send`, `automation`, `presets`, `visual`, `bypass`. Comentario: “Sin comentario adicional.”
- **CM-ZX1-50 · BTN\_PHASER:** selecciones exactas: `panel`, `rate`, `depth`, `stages`, `feedback`, `center`, `spread`, `stereo`, `sync`, `phase`, `resonance`, `filter`, `analog`, `wetdry`, `master`, `pad`, `group`, `send`, `automation`, `presets`, `visual`, `bypass`. Comentario recuperado: etapas configurables, sincronización opcional, frecuencia central ajustable y visualización de muescas de fase.
- **CM-ZX1-51 · BTN\_DISTORTION:** selecciones exactas: `panel`, `drive`, `type`, `gain`, `output`, `tone`, `filter`, `symmetry`, `bitcrush`, `sample`, `multiband`, `oversampling`, `parallel`, `wetdry`, `master`, `pad`, `group`, `send`, `automation`, `presets`, `visual`, `bypass`. Comentario recuperado: DISTORTION, BITCRUSH y reducción de sample rate como algoritmos seleccionables separados; OVERSAMPLING para calidad interna; OUTPUT para compensar volumen.
- **CM-ZX1-52 · BTN\_COMPRESSOR:** selecciones exactas: `panel`, `threshold`, `ratio`, `attack`, `release`, `knee`, `makeup`, `input`, `output`, `sidechain`, `filter`, `lookahead`, `auto`, `parallel`, `multiband`, `stereo`, `meter`, `wetdry`, `master`, `pad`, `group`, `send`, `automation`, `presets`, `visual`, `bypass`. Comentario original recuperado: “recomiendo implementar SIDECHAIN con selección de fuente, filtro del detector y medidor de Gain Reduction. Esto permitirá compresión convencional, ducking y control dinámico entre PAD, GROUP y MASTER.”
- **CM-ZX1-53 · BTN\_EQ:** selecciones exactas: `panel`, `bands`, `lowcut`, `highcut`, `low shelf`, `high shelf`, `bell`, `notch`, `frequency`, `gain`, `q`, `spectrum`, `dynamic`, `mid side`, `stereo`, `matching`, `master`, `pad`, `group`, `send`, `automation`, `presets`, `visual`, `bypass`. Comentario literal: “recomiendo que la curva EQ sea manipulable directamente con gestos táctiles: mover puntos para frecuencia y ganancia, y ajustar Q mediante gesto secundario. Así el ecualizador funciona como instrumento visual y no solo como una colección de perillas. Dejame crear los puntos de eq que quiera un limite de 24”.
- **CM-ZX1-53A · EQ de nodos libres:** máximo 24 puntos por instancia; cada punto tiene frecuencia, ganancia y Q; crear, manipular y eliminar nodos individualmente.
- **CM-ZX1-54 · BTN\_REVERB:** selecciones exactas: `panel`, `type`, `decay`, `predelay`, `size`, `diffusion`, `damping`, `early`, `late`, `modulation`, `stereo`, `freeze`, `filter`, `ducking`, `sync`, `wetdry`, `master`, `pad`, `group`, `send`, `automation`, `presets`, `visual`, `bypass`. Comentario literal: separar EARLY y LATE REFLECTIONS; FREEZE conserva la cola sin incorporar señal nueva.
- **CM-ZX1-55 · BTN\_FILTER:** selecciones exactas: `panel`, `lowpass`, `highpass`, `bandpass`, `notch`, `comb`, `formant`, `cutoff`, `resonance`, `slope`, `drive`, `keytrack`, `envelope`, `lfo`, `automation`, `morph`, `stereo`, `mid side`, `master`, `pad`, `group`, `send`, `presets`, `visual`, `wetdry`, `bypass`. Comentario literal: separar FILTER y FILTERDRIVE; ofrecer modelos de respuesta, pendiente configurable y modulación asignable.
- **CM-ZX1-56 · BTN\_BITCRUSH:** selecciones exactas: `panel`, `bits`, `samplerate`, `downsample`, `quantization`, `dither`, `jitter`, `noise`, `filter`, `drive`, `mix`, `stereo`, `master`, `pad`, `group`, `send`, `automation`, `presets`, `visual`, `bypass`. Comentario literal: “mantener BIT DEPTH y SAMPLE RATE como parámetros independientes. Así puedes crear degradación digital de resolución, reducción de frecuencia de muestreo o combinar ambos procesos.”
- **CM-ZX1-57 · BTN\_SATURATOR:** selecciones exactas: `panel`, `drive`, `type`, `input`, `output`, `bias`, `symmetry`, `warmth`, `harmonics`, `multiband`, `oversampling`, `tone`, `filter`, `parallel`, `wetdry`, `master`, `pad`, `group`, `send`, `automation`, `presets`, `visual`, `bypass`. Comentario literal: “SATURATOR debe distinguirse de DISTORTION: priorizar color armónico, densidad y carácter analógico, con compensación de salida para comparar el sonido procesado sin sesgo de volumen.”

### Reglas de encuesta recuperadas de las conversaciones

- El usuario pidió expresamente: “Dejame seleccionar mas de una opcion en las encuestas”.
- Regla permanente: permitir selecciones múltiples cuando la pregunta lo admita; usar selección única solo cuando las alternativas sean necesariamente excluyentes.
- Cada pregunta debe tener su propio campo de comentario.
- Una pregunta por vez y consolidación antes de avanzar.
- CM-ZX1-58 · BTN\_LIMITER fue presentado como siguiente encuesta, pero todavía no tiene respuesta del usuario registrada.

### Resultado de la auditoría

- Se recuperaron respuestas explícitas y comentarios para la mayoría de CM-ZX1-03 a CM-ZX1-57.
- CM-ZX1-01 y CM-ZX1-02 constan como confirmadas en el historial de trabajo, pero esta búsqueda no recuperó sus respuestas literales/opciones.
- CM-ZX1-04 permanece sin confirmar.
- CM-ZX1-05 está consolidada como decisión, pero no se recuperó su selección literal.
- CM-ZX1-13 y CM-ZX1-14 quedan anuladas por la decisión posterior de una sola línea de desarrollo.
- CM-ZX1-45 tiene ubicación posterior confirmada, pero no selección original de parámetros recuperada.
- CM-ZX1-52 tiene comentario completo recuperado en esta búsqueda; prevalece el texto completo aquí registrado sobre la captura anterior truncada.
- CM-ZX1-58 sigue pendiente.
- Esta auditoría recupera la evidencia disponible en conversaciones y memoria contextual; no certifica que se hayan inspeccionado todos los mensajes originales de cada chat ni que todas las respuestas se hayan conservado literalmente en su primer registro.

## 9. Bitácora de ejecución y feedback · 2026-11-10

### Auditoría inicial del repositorio

- [x] Fase 1.1: árbol completo de `alexandermaulen/Dirtyfingaz-ZX1` revisado en `main`; `main` y `auxiliary` apuntan al mismo commit `a0186f8a5a0f8669f51853b8d751126ad59fafef`.

- Archivos actuales: `index.html`, `creator-engine.html`, `zp-agent.js`, `zp-agent-registry.json`, `zp-core.js`, `zp-layout.css`, `zp-layout.js`, `zp-storage.js`, `zp-ui-system.css`, `vendor/lame.min.js`, `README.md` y workflow de Pages.
- La interfaz vigente del repositorio contiene una matriz de 9 PADs, no 16. La GUI reside en `index.html` y el motor aislado en `creator-engine.html`.
- El registro `zp-agent-registry.json` todavía declara rutas que no existen en el árbol actual (`creator.html`, `radio-worker.mjs`, `sw.js`). Registrar como deuda de documentación/contrato; no asumir que esos módulos están implementados.
- La auditoría estática identificó controles de proyecto, PAD, Piano Roll, transporte, encoders y panel contextual. La identificación dinámica y el inventario completo siguen abiertos; no marcar 1.2–1.7 como terminados.

### Publicación y discrepancia pendiente

- Workflow `42756610601`: `success`, commit publicado declarado por Actions `a0186f8a5a0f8669f51853b8d751126ad59fafef`.
- `main` y `auxiliary` permanecen sincronizadas.
- La lectura de la URL pública de Pages devolvió una interfaz distinta, rotulada `DIRTYFINGAZCREATOR · 2.0`, con 16 PADs. No coincide con el `index.html` de `main`, que contiene el Creator ZX1 de 9 PADs. Pendiente verificar origen/caché/configuración de Pages antes de declarar validada la publicación.

### Últimos cambios de código verificados

- Bancos A–E: almacenamiento por clave `projectId + bank + pad`, migración v3 y refresco de vista durante reproducción.
- Encoders Lx/Rx: targets contextuales de Sample Editor y Piano Roll; opciones secundarias con panel de retención; commit MIDI separado del trim de sample.
- Validaciones anteriores: sintaxis de scripts inline, `zp-layout.js` y JSON del registro correctas. No equivalen a prueba funcional en Safari/iPhone.

### Estado de ejecución

- Fase 1.1 completada por auditoría del árbol.
- Fase 1.2 en curso; no asignar etiquetas/IDs definitivos hasta resolver CM-ZX1-04 y completar el inventario dinámico.
- No se modificaron las fichas de decisiones aprobadas ni se marcaron implementaciones como terminadas sin pruebas.
- Próximo orden: completar inventario y contratos; revisar la discrepancia de Pages; ejecutar fichas aprobadas por dependencias; solicitar la decisión faltante de CM-ZX1-58 antes de implementar BTN\_LIMITER.

### Implementación en curso · separación BANK\_ID / PATTERN\_ID · 2026-11-10

Commits en `main` (y sincronizados en `auxiliary` al mismo HEAD `6d5ada17538460d02f47aa2beca2ea0e96eb9c4b`):

- `28b715d`: primera refactorización del motor para que pasos y notas MIDI se almacenen por `PATTERN_ID`, no por banco.
- `ac4f41d`: selector A–E pasa a `creator.bank.select`; BTN\_PATTERNSELECT abre el gestor de patrones.
- `e1842fa`: persistencia de loop de patrón y refresco del estado del gestor.
- `15b7d0d`: Creator inicia en proyecto nuevo y vacío; no restaura automáticamente `current` ni crea AudioContext al entrar.
- `eda6588`: se retiraron los submenús heredados SYSTEM CONFIG / SYSTEM CTRL / SYSTEM INIT; el menú PROJECT queda con PROJECT MANAGER, CAMBIAR TEMA y CONFIGURACIÓN.
- `611dea6`: registro técnico corregido: GUI `index.html`; worker y service worker identificados como ausentes/fuera de alcance; contrato BANK\_ID/PATTERN\_ID documentado.
- `6d5ada1`: README actualizado con el nuevo modelo.

### Contrato y validación realizada

- `BANK_ID` A–E conserva únicamente muestras por PAD. `PATTERN_ID` conserva secuencias y notas MIDI por PAD. Cambiar banco no cambia patrón; cambiar patrón no cambia banco.
- Persistencia v8: patrones `PATTERN_01`, `PATTERN_02`, etc.; migración de proyectos antiguos con datos por banco A–E a patrones independientes `PATTERN_01`–`PATTERN_05`.
- Gestor implementado: crear, seleccionar, loop del patrón seleccionado, duplicar como copia independiente, copiar/pegar MIDI y eliminar. CLONE PATTERN queda deshabilitado hasta definir su semántica, según la decisión pendiente.
- Prueba aislada de migración: datos de A y B migraron a `PATTERN_01` y `PATTERN_02`, conservando pasos, MIDI, banco activo y orden de patrones.
- Prueba de independencia: la modificación de un patrón no altera el otro.
- Sintaxis de todos los scripts inline de `index.html` y `creator-engine.html`: correcta.
- No se ha realizado aún prueba funcional en navegador/Safari. No marcar fichas de implementación como terminadas hasta esa validación.

### Publicación

- Último commit `6d5ada17538460d02f47aa2beca2ea0e96eb9c4b` tiene workflow Pages `42757578346` en curso al momento de esta anotación.
- `main` y `auxiliary` sincronizadas. Pendiente confirmar resultado del workflow y volver a comprobar la URL pública.

### BTN\_UTILITY y menú PROJECT · implementación en curso · 2026-11-10

Commits adicionales en `main` (se mantendrá `auxiliary` sincronizada al HEAD):

- `acd143f` / `d2799ea`: núcleo de Utility: metrónomo con nivel, BPM manual, TAP tempo, tonalidad/escala, cuantización de notas MIDI, estado de AudioContext, detector BPM y PANIC.
- `be685f6` / `98b2370`: panel UTILITY con 12 grupos, apertura múltiple, búsqueda, orden persistente, controles PAD/valores y lectura de estado del motor.
- `1346928` / `0f7fe94`: afinador con acceso explícito al micrófono, estimación de frecuencia/nota/cents y parada de stream; PANIC también detiene el afinador.
- `d9aec8f` / `524370f`: feedback visual del afinador y medidor master; guía de escalas y acordes.
- `2546735`: coordinación de overlays PROJECT / PATTERN / UTILITY para evitar paneles simultáneos superpuestos.
- `9735efa` / `9b2476e`: contrato de Utility y menú PROJECT añadido al registro técnico y README.
- `617360d`: etiqueta del menú corregida a PROJECT MENU y limpieza de metrónomo/micrófono al salir de la página.

### Herramientas conectadas en UTILITY

- PAD / VALORES: seleccionar PAD y ajustar volumen, pitch y filtro.
- METRÓNOMO: activar/desactivar y ajustar nivel.
- TEMPO / BPM: decremento/incremento, TAP y valor directo.
- TONALIDAD / ESCALA: raíz y modo; GUÍA ESCALAS / ACORDES muestra notas y tríadas.
- AFINADOR: entrada de micrófono bajo acción explícita, frecuencia, nota y cents.
- CUANTIZACIÓN: activar/desactivar y divisiones 1/4, 1/8, 1/16 y 1/32, aplicada al crear/editar notas MIDI.
- AUDIO / RENDIMIENTO: estado AudioContext, sample rate y latencia.
- MEDIDORES MASTER: peak en vivo cuando el motor de audio está activo.
- PANIC: detiene transporte, metrónomo, micrófono y suspende AudioContext.
- ATAJOS / GESTOS: guía contextual.
- DETECTOR BPM: analiza el sample del PAD activo y estima BPM.
- Los grupos admiten apertura independiente/múltiple, búsqueda, reordenamiento y persistencia local. El panel inicia cerrado.

### Validación estática y pruebas aisladas

- Sintaxis de scripts inline GUI/motor, `zp-layout.js`, `zp-storage.js` y JSON: correcta.
- Migración legacy A–E → PATTERN\_01–05: aprobada en prueba aislada, con pasos, notas MIDI, banco activo y orden conservados.
- Independencia BANK\_ID/PATTERN\_ID: verificada en prueba aislada.
- Afinador con señal sintética 440 Hz: estimó A4 a 440.37 Hz, desviación de +1 cent.
- Detector BPM con tren sintético de pulsos a 120 BPM: estimó 120 BPM.
- Inicio sin restauración automática: verificado estáticamente; no existe llamada `loadSession()` al arrancar y la inicialización no llama `audio()`.
- Menús PROJECT / PATTERN / UTILITY cerrados por defecto; no se encontró el enlace erróneo de UTILITY a cambio de envolvente.
- Prueba real en Safari/iPhone y pruebas de permisos de micrófono todavía pendientes. No marcar la implementación como validada en dispositivo.

### Publicación

- Último commit: `9b2476e259f2b387d1338aecb1d68f34f0de7342`.
- Workflow Pages `42757971001` en curso al momento de esta anotación.
- `main` y `auxiliary` sincronizadas al mismo commit.

### Transporte, REC y LOOP · implementación en curso · 2026-11-10

Commits adicionales:

- `ca3f6e4`: modelo de grabación y loop: `recordMode`, armado REC, count-in, overdub, loop IN/OUT, loop recording, BPM sync y seguimiento de voces activas.
- `7d4f8a1`: transporte PLAY/CONTINUE, STOP sin reset, RESET, detener REC, liberar voces, count-in y captura AUDIO con MediaRecorder hacia el sample del PAD/banco activo.
- `5f88d9a`: comandos de modos REC, límites de loop, loop record, presets BPM y estado de sincronía.
- `3ccf4c9`: el motor publica estado de transporte al host para actualizar PLAY/PAUSE/CONTINUE, REC armado/grabando, LOOP y BPM SYNC en la GUI.
- `77fee36`: interfaz con botón STOP independiente; menú de acciones por pulsación larga para STOP, REC, BPM SYNC y LOOP; se retiró el control separado RECORD SETTING, dejando REC como único botón físico de grabación.
- `a0de645`: protección de datos: overdub queda activado por defecto para evitar borrar patrones al armar REC; modo MIDI por defecto; captura de audio y afinador no comparten simultáneamente la entrada de micrófono; limpieza al abandonar la página.
- `39c60da`: contrato de transporte actualizado en `zp-agent-registry.json`.

### Comportamiento incorporado

- PLAY alterna reproducción/pausa y al volver continúa desde el paso guardado. El botón muestra PLAY, PAUSE o CONTINUE.
- STOP detiene sin reiniciar posición. Mantener pulsado abre RESET POSITION, STOP RECORDING y RELEASE NOTES.
- REC corto arma/desarma; si el transporte ya está en marcha, inicia grabación. Mantener pulsado abre MIDI/AUDIO, OVERDUB, COUNT-IN y ARM/DISARM.
- MIDI REC registra disparos de PAD en el patrón. AUDIO REC captura micrófono y guarda el audio en el PAD/banco activo al detener la grabación.
- COUNT-IN realiza cuatro pulsos antes de iniciar REC. Puede cancelarse desarmando REC.
- OVERDUB está ON por defecto para preservar el patrón existente. Si se desactiva, el siguiente inicio de MIDI REC limpia el patrón activo antes de grabar.
- LOOP mantiene límites independientes `loopStart` / `loopEnd`; el menú permite fijar IN/OUT desde el paso actual. LOOP RECORD mantiene la grabación al volver al inicio del loop; sin ese modo, la grabación termina al primer wrap.
- BPM comparte el mismo estado global entre transporte, metrónomo, secuenciador y render; BPM SYNC mantiene un estado de sincronización publicado al host y el menú contiene TAP y presets.
- RELEASE NOTES detiene nodos de voz activos; PANIC detiene transporte, metrónomo, afinador y voces, y suspende AudioContext.

### Pruebas aisladas realizadas

- Sintaxis de scripts inline GUI/motor correcta tras los cambios.
- PLAY desde paso 5 mantiene posición 5; STOP conserva posición y cambia etiqueta a CONTINUE; RESET vuelve al loopStart y etiqueta PLAY.
- REC arma y desarma sin iniciar audio ni transporte.
- RELEASE NOTES detiene y elimina nodos de voz registrados.
- LOOP con límites 4–8: al llegar al OUT vuelve al IN; con LOOP RECORD conserva grabación; sin LOOP RECORD detiene la grabación al primer wrap; con LOOP desactivado detiene transporte al OUT.
- Captura MediaRecorder y prueba de permisos/micrófono aún no ejecutadas en Safari/iPhone. BPM SYNC externo y MIDI hardware deben validarse con el host/dispositivo real.

### Pendientes de validación

- Prueba funcional real en Safari/iPhone: permisos de micrófono, Audio REC, afinador, metrónomo, count-in y liberación de voces.
- Confirmar integración de BPM SYNC con el host; el motor publica el estado, pero aún no se ha validado recepción de reloj externo.
- Verificar que el workflow Pages y el sitio público sirven la misma versión del artefacto.

### Corrección de referencias de commits · 2026-11-10

En la anotación anterior, tres abreviaturas fueron transcritas incorrectamente. Las referencias verificadas en el historial real de GitHub son:

- `ca3f4d5`: Add recording and loop state with voice tracking.
- `530fefd`: Implement PLAY continue, REC arming and loop transport.
- `1196257`: Add REC modes, STOP actions, loop boundaries and BPM sync.
- `8b92d07`: Add dedicated STOP and long-press transport menus.
- `72911a0`: Guard count-in cancellation and REC disarm.
- `3ccf4c9`: Publish live transport state to GUI.
- `77fee36`: Reflect PLAY REC LOOP and BPM sync states in GUI.
- `a0de645`: Protect pattern data and manage microphone sessions.
- `39c60da`: Record conservative transport defaults.

Los commits están en la línea `main`; se sincronizará `auxiliary` al mismo HEAD después de cerrar la validación de esta tanda.

### Continuidad de ejecución y sincronización · 2026-11-10 · actualización

- Revisión del registro maestro y del contrato Markdown de Notion realizada antes de editar esta bitácora.
- Se recuperó la secuencia de transporte/REC/LOOP ya implementada y documentada: PLAY/CONTINUE, STOP independiente, RESET, armado REC, MIDI/AUDIO, count-in, overdub, límites LOOP, LOOP RECORD, BPM SYNC y estados publicados a GUI.
- Se verificaron en GitHub los commits recientes de transporte: `8b92d07`, `72911a0`, `3ccf4c9`, `77fee36`, `a0de645`, `39c60da`, `3014075`, `48b17ea` y `0ccb725`.
- La rama `auxiliary` se sincronizó con `main` tras detectar que estaba atrasada. Comparación posterior pendiente de lectura final; el objetivo es que ambas queden en el mismo SHA.
- `.github/workflows/pages.yml` sí contiene disparador `push` para `main` y `workflow_dispatch`. El workflow exitoso `42757971001` corresponde a la tanda anterior con HEAD `9b2476e`; no se debe atribuir ese éxito a commits posteriores sin verificar el run asociado a `0ccb725`.
- La publicación del último HEAD y la respuesta servida por la URL Pages siguen pendientes de comprobación. No declarar el deploy actual como validado.
- Se confirma que `index.html` conecta los botones A–E con `creator.bank.select`; el código que muestra `creator.pattern.select` en el motor pertenece a una superficie heredada interna y no debe confundirse con el enlace vigente de la GUI. La prueba de independencia BANK\_ID/PATTERN\_ID ya está documentada como aislada; falta Safari/iPhone.
- No se modificaron decisiones funcionales ni se marcaron nuevas fichas como implementadas por esta actualización.

### Transporte y grabación · cierre de implementación estática · 2026-11-10

HEAD técnico de esta tanda: `0ccb72520226b982ec8398c9c9488f73daaed2d6`.

- `ca3f4d5`: estado de grabación/loop y seguimiento de voces.
- `530fefd`: PLAY/CONTINUE, STOP conservando posición, REC armado y límites de loop.
- `1196257`: modos REC MIDI/AUDIO, OVERDUB, COUNT-IN, RESET, RELEASE NOTES, LOOP IN/OUT, LOOP RECORD y BPM SYNC/presets.
- `8b92d07`: botón STOP independiente y menús de pulsación larga REC/STOP/BPM/LOOP; retirado RECORD SETTING.
- `72911a0`: cancelación segura de COUNT-IN cuando se desarma REC.
- `3ccf4c9`: publicación de estado transporte al host.
- `77fee36`: feedback GUI PLAY/STOP/CONTINUE, REC, LOOP y BPM SYNC.
- `a0de645`: OVERDUB ON por defecto para preservar patrones; gestión exclusiva de sesiones de micrófono y limpieza al salir.
- `3014075` / `48b17ea`: etiqueta STOP durante reproducción.
- `0ccb725`: versión de snapshot y contrato técnico actualizados a v10.

### Validaciones aisladas

- Scripts GUI/motor, `zp-layout.js`, `zp-storage.js` y JSON: sintaxis válida.
- Comandos de transporte y REC: una única inscripción por comando.
- PLAY desde paso 5: mantiene posición 5; STOP conserva posición y muestra CONTINUE; RESET vuelve al loop IN y muestra PLAY.
- REC arma y desarma sin arrancar transporte ni crear AudioContext.
- RELEASE NOTES detiene y retira nodos de voz activos.
- LOOP IN 4 / OUT 8: con LOOP activo vuelve a IN; con LOOP RECORD continúa grabando; sin LOOP RECORD finaliza la toma al primer wrap; sin LOOP detiene al llegar a OUT.
- Afinador con tono sintético 440 Hz: A4 a 440.37 Hz, desviación aproximada +1 cent.
- Migración de patrones legacy y separación BANK\_ID/PATTERN\_ID: aprobadas en prueba aislada.

### Límites aún no verificados

- No se ha ejecutado prueba física en Safari/iPhone. MediaRecorder, permisos de micrófono, afinador, count-in y audio REC requieren validación en dispositivo.
- BPM SYNC publica su estado al host; la recepción y sincronización con reloj externo todavía no está verificada.
- El sitio público continúa mostrando una versión anterior aunque el artefacto Pages inspeccionado sí contiene el HTML actualizado. Despliegue público pendiente de resolución.

### Verificación de continuidad · 2026-11-10 · cierre de esta tanda

- HEAD vigente de `main`: `0ccb72520226b982ec8398c9c9488f73daaed2d6` (`Update project snapshot schema version`).
- `auxiliary` fue sincronizada con ese HEAD. Comparación GitHub posterior: `main` y `auxiliary` idénticas, 0 commits de diferencia.
- Corrección de auditoría: la GUI activa de `index.html` conecta A–E mediante `creator.bank.select`. La referencia `creator.pattern.select` encontrada en el markup interno del motor es heredada y no representa el enlace de los botones A–E en la GUI vigente. Mantener como válida la separación BANK\_ID/PATTERN\_ID y no reabrir ese defecto sin nueva evidencia.
- `.github/workflows/pages.yml` contiene `push` sobre `main` y `workflow_dispatch`; el despliegue debe dispararse con commits en `main`.
- Comprobación de la URL pública `https://alexandermaulen.github.io/Dirtyfingaz-ZX1/`: continúa sirviendo `DIRTYFINGAZCREATOR · 2.0`, matriz de 16 PADs y menú heredado. No coincide con el `index.html` actual del repositorio (Creator ZX1 de 9 PADs). La publicación visible sigue sin validar.
- El workflow `42757971001` registrado anteriormente terminó en `success`, pero corresponde al HEAD anterior `9b2476e`; no acredita que `0ccb725` esté publicado. No atribuir ese éxito a la versión actual.
- No ejecutar un nuevo despliegue manual ni cambiar configuración de Pages sin autorización específica de publicación. Continuar con auditoría, implementación y pruebas locales/aisladas mientras se conserva esta discrepancia como bloqueo de publicación.

### Publicación Pages · verificación de artefacto · 2026-11-10

- Workflow `42758679124`: `success`, commit `0ccb72520226b982ec8398c9c9488f73daaed2d6`.
- GitHub Actions registró la creación del deployment Pages para ese SHA y evaluó el environment URL correcto: `https://alexandermaulen.github.io/Dirtyfingaz-ZX1/`.
- Artefacto `github-pages`, ID `13735734803`, SHA-256 `83541dada9a3a4f11f8d40156135ce93621827765e1d3be281160632602f8795`.
- Se descargó y examinó el artefacto: contiene `index.html`, `creator-engine.html`, `zp-layout.js`, `zp-storage.js` y `zp-agent-registry.json` actualizados. Verificado: Utility Center, Pattern Manager, STOP dedicado, modos REC y eliminación del auto-restore.
- La vista web disponible de la URL pública sigue devolviendo el HTML antiguo de 16 PADs. La lectura con query-string de cache-busting no es accesible desde el verificador. Por tanto, el workflow y el artefacto están verificados, pero la respuesta HTTP real de Pages en un navegador no queda confirmada. No marcar DEPLOY PUBLICADO/VALIDADO hasta probarlo en Safari o resolver la discrepancia.
- `main` y `auxiliary` están sincronizadas al SHA `0ccb72520226b982ec8398c9c9488f73daaed2d6`.

### HOME / EXIT / PUSHENTER, ADSR y PAD SETTINGS · 2026-11-10

Commits verificados:

- `48c2839`: HOME solicita `zp-host-home-request` cuando Creator está integrado; standalone permanece abierto. EXIT deja de abrir Project y cierra contexto.
- `ecd9b60` + `1006f5f`: EXIT también cierra el dock de encoders y corrige salida del modo Pattern Edit.
- `212c769`: comandos de lectura, edición, reset y preview ADSR por PAD.
- `0ed2d61` + `7ae59e1`: cuatro perillas compactas A/D/S/R, curva táctil, sincronización curva/perillas, zoom, grid, SHIFT fino, LISTEN, RESTORE; panel persistente al cambiar PAD y curva cerrada al cambiar.
- `f309db0`: estado por PAD para pan, choke, routing y sends de delay/reverb; buses GROUP\_A/GROUP\_B y seguimiento de voces para choke.
- `eecc57f`: comandos PAD setting get/set/reset.
- `4446491`: panel PAD SETTING con QUICK, SAMPLE, ADSR, PITCH, VOLUME, PAN, EFFECTS, CHOKE, ROUTING y RESET.
- `0d9fbe8`: control PAN incorporado también en UTILITY.
- `849f1b8`: snapshot de proyecto actualizado a v11 y reset/restauración de los nuevos parámetros.
- `236601d` + `8dba63c`: contrato y README actualizados.

### Comportamiento PAD/ADSR

- Cada PAD conserva su envolvente independiente. El preview usa el PAD seleccionado.
- SHIFT funciona por presión mantenida y activa precisión; ya no abre PAD SETTINGS al tocar un PAD.
- PAD SETTING permite ajustar volumen, pitch, pan, sends de delay/reverb, choke group y routing MASTER/GROUP\_A/GROUP\_B.
- RESET restablece los parámetros de PAD y su ADSR, sin borrar el sample asignado.
- El audio aplica pan estéreo, buses de salida, choke por grupo y sends de delay/reverb.
- PUSHENTER ejecuta el elemento contextual enfocado; en el menú de sistema confirma la selección.

### Validación actual

- Sintaxis de scripts GUI/motor, layout, storage y JSON válida.
- Se verificó que los comandos ADSR y PAD SETTING existen una sola vez, que los parámetros por PAD se incluyen en snapshot v11 y que el audio conecta pan/routing/choke.
- Pruebas físicas de perillas táctiles, curve drag, pan estéreo, choke audible y routing de buses pendientes en Safari/iPhone.

### Pendientes secuenciales inmediatos

- Completar SAMPLE EDIT y CHOP manual, COPY/PASTE tipado y DEL contextual.
- Implementar EFX SETTING como panel de módulos y sus contratos; continuar por RESONATOR, ISOLATOR y procesadores de la secuencia CM-ZX1.
- CM-ZX1-58 BTN\_LIMITER continúa pendiente de respuesta del usuario.

### Ejecución de respuestas ya entregadas · 2026-11-10 · feedback GitHub ↔ Notion

**Prioridad del usuario:** ejecutar primero las decisiones ya respondidas y no continuar con nuevas preguntas de la encuesta maestra hasta implementar y verificar esa etapa. Las preguntas pendientes CM-ZX1-04, la ficha funcional de CM-ZX1-45 y CM-ZX1-58 no deben bloquear los requisitos independientes que ya están confirmados.

**Recuperación de respuestas previas:**

- CM-ZX1-02: selección múltiple confirmada: PADs al centro y controles principales alrededor; transporte fijo en la parte superior y también fijo en la parte inferior (ambas opciones fueron seleccionadas y se conservan como respuesta literal, sin resolver unilateralmente la coexistencia). Herramientas secundarias en paneles desplegables y navegación por pestañas. Comentario literal: «No quiero que se abra nada / Niun panel de inicio al abrir la seccion ‘creator’ de la pagina.»
- CM-ZX1-03: PADs vacíos, proyecto nuevo y vacío, no abrir bibliotecas/exploradores ni activar audio/procesos al entrar. UTILITY abre con el primer toque y cierra con el segundo. Comentario literal: «Que el boton utility de abajo sea para abrir un menu si lo apreto se se despliega el menu y cuando lo vuelva a apretar se cierre / Tambien quiero ponerle nombre a cada boton que se ve para trabajar la interfaz layout e ir asignando funciones.»
- Instrucción del usuario del 2026-11-09: ejecutar la lista y construir la app antes de continuar preguntando.

**Cambios incorporados al repositorio ****`alexandermaulen/Dirtyfingaz-ZX1`****:**

- `CM-ZX1-SURVEY.md`: snapshot versionado de la encuesta maestra completa, inventario, checklist y bitácora; Notion continúa como fuente canónica editable.
- `README.md`: enlaza la especificación maestra y documenta alcance/validación.
- `zp-agent-registry.json`: añade trazabilidad encuesta→código, reglas de ejecución y pendientes.
- `index.html`: UTILITY reorganizado en los ocho grupos definidos por la encuesta; conserva apertura múltiple, orden persistente, añade favoritos por herramienta, filtro de favoritos, descripciones y resaltado de coincidencias en búsqueda. Incluye controles UI de acento, cuenta previa y compás; cuantización ofrece OFF, divisiones regulares y triplets.
- `creator-engine.html`: añade acento en el primer pulso, compases 2/4, 3/4, 4/4, 5/4, 6/8 y 7/8, persistencia del compás/acento y cuantización triplet 1/4T, 1/8T y 1/16T; OFF desactiva cuantización.
- `scripts/validate-zx1.mjs` y `.github/workflows/pages.yml`: se añadió validación automatizada de sintaxis JavaScript inline, JSON, cobertura del snapshot y contratos de comandos antes de publicar.

**Pendientes reales identificados en UTILITY:** selección/ruteo explícito de dispositivos de entrada/salida; métricas de carga CPU y memoria cuando el navegador las exponga; medidor LUFS real (el medidor actual es peak); copiar PAD, copiar valor y pegar en último seleccionado. La API web de Safari no expone carga CPU ni memoria general, por lo que no se deben mostrar estimaciones inventadas. Falta validación física en Safari/iPhone.

**Estado de CI:** el primer run con el validador falló por escape incorrecto de la expresión regular del script de validación. Se corrigió en `scripts/validate-zx1.mjs` (commit `6cc800e4befb0022006ab658c2150825424eb1c4`). El rerun posterior todavía debe verificarse. El fallo fue del validador recién añadido, no evidencia de un error funcional de la app.

**Reglas de cierre:** no marcar CM-ZX1-17 ni los requisitos nuevos como implementados/verificados hasta que el run de validación termine en success y se ejecuten pruebas funcionales. No avanzar a CM-ZX1-58 ni abrir nuevas preguntas hasta agotar los requisitos ya contestados. Mantener CM-ZX1-04, CM-ZX1-45 detallado y CM-ZX1-58 como decisiones pendientes, no inventadas.

### Cierre de tanda de implementación UTILITY · 2026-11-10

**HEAD GitHub:** `bdae8f73160ea09e69dc34eddc12f5a31696ba4c`.

- `main` y `auxiliary` verificadas idénticas en el mismo SHA; 0 commits de diferencia.
- `CM-ZX1-SURVEY.md` actualizado después de incorporar este feedback de Notion.
- `zp-agent-registry.json` incluye los ocho grupos UTILITY, contratos de acento/compás/cuenta previa, cuantización triplet y lista de requisitos aún abiertos.
- `index.html` y `creator-engine.html` conectan controles de metrónomo: nivel, acento en primer pulso, cuenta previa y compás; compases admitidos 2/4, 3/4, 4/4, 5/4, 6/8 y 7/8.
- Cuantización incluye OFF, 1/4, 1/8, 1/16, 1/32 y triplets 1/4T, 1/8T, 1/16T; el motor guarda división y estado en snapshot del proyecto.
- UTILITY mantiene múltiples grupos abiertos, orden persistente, favoritos por herramienta, filtro FAVORITES ONLY y resaltado de coincidencias de búsqueda.
- Validador corregido y ejecutado en GitHub Actions: run `42759671730`, job `deploy`, paso `Validate source and survey contracts` = success; deploy del mismo SHA `6cc800e4` = success. La versión más reciente del snapshot/registry tiene otro run `42759714830` en cola al momento de esta anotación; verificar su resultado antes de marcar el estado final de esa revisión.
- La validación automatizada cubre sintaxis de scripts inline, JSON del registro, grupos UTILITY, comandos declarados y presencia de CM-ZX1-01/58 en el snapshot. No reemplaza pruebas de interacción en navegador.

**No cerrar todavía:** selección/ruteo de entrada y salida, métricas reales CPU/memoria (no expuestas por Safari), LUFS real, copiar PAD/valor/pegar, y pruebas físicas en Safari/iPhone. El master meter sigue siendo peak-only. El resto de las fichas confirmadas de HISTORIAL, editor, mixer/efectos y controles debe seguir ejecutándose por orden y validarse individualmente. No iniciar preguntas nuevas hasta ejecutar ese backlog.

### Verificación externa de publicación · 2026-11-10

- La URL pública `https://alexandermaulen.github.io/Dirtyfingaz-ZX1/` se volvió a inspeccionar después de la tanda UTILITY. Continúa sirviendo `DIRTYFINGAZCREATOR · 2.0`, matriz de 16 slots y menú SYSTEM heredado. No corresponde al `index.html` de `main`, que es Creator ZX1 con matriz de 9 PADs y los módulos actuales.
- Run `42759714830` para HEAD `bdae8f73160ea09e69dc34eddc12f5a31696ba4c`: `success`, incluido el paso de validación y el deploy. Esto valida el workflow/artefacto, pero no resuelve la discrepancia de contenido que devuelve la URL pública.
- Run `42759761373` asociado al snapshot actualizado `bce884088a6d8fb5769b4275b3f9ec4ac79578f1` estaba en cola al momento de esta anotación.
- Mantener PUBLICACIÓN PÚBLICA como bloqueada/no verificada hasta resolver por qué Pages sirve la versión de 16 PADs. No marcar publicación final como correcta basándose únicamente en el éxito de Actions.
- Siguiente ejecución del backlog ya respondido: HISTORIAL CM-ZX1-10 a CM-ZX1-14 (versiones manuales de proyecto/módulo, secuencia V001..., navegación y restauración), seguida por el inventario control-por-control y las familias de Sample Editor/Mixer/FX. No avanzar la encuesta a CM-ZX1-58 ni abrir nuevas preguntas mientras haya decisiones respondidas sin ejecutar.

### Reinicio de ejecución integrada · 2026-11-10 · revisión 3 pasadas

**Fuente canónica:** Notion «CM-ZX1 · Encuesta maestra y plan de ejecución». Se retoma el backlog confirmado CM-ZX1-01 a CM-ZX1-57; no se abren encuestas nuevas ni se altera el alcance excluido. CM-ZX1-04, la ficha funcional detallada de CM-ZX1-45 y CM-ZX1-58 siguen pendientes de decisión, no se inventan.

**Auditoría de inicio:** se volvió a leer el registro maestro completo, se revisaron index.html, creator-engine.html, zp-layout.js, zp-storage.js, zp-agent-registry.json, scripts/validate-zx1.mjs y .github/workflows/pages.yml. Se confirmó que el árbol ya contiene implementaciones previas de bancos A-E, Lx/Rx, ADSR, UTILITY, transporte/REC/LOOP, Sample Edit, CHOP manual, COPY/PASTE y DEL; cada una conserva su estado de validación real y no se presume terminada por estar descrita.

**Hallazgo prioritario PADs:** index.html contiene el contenedor #pads, el generador original de nueve PADs y estilos de matriz. No se encontró una regla CSS explícita que oculte .pads. La causa runtime exacta de la ausencia no pudo reproducirse todavía en Safari/iPhone ni en un navegador remoto. Para proteger la superficie se añadió un guard CSS y un bootstrap idempotente posterior al inicializador principal: completa cualquier PAD faltante hasta PAD_01–PAD_09, sin duplicar los existentes. El segundo inicializador sigue enlazando los eventos de PAD cuando el DOM está disponible.

**Cambios nuevos:**
- index.html: guard de visibilidad de la matriz y zp-pad-bootstrap de nueve PADs.
- scripts/validate-zx1.mjs: prueba aislada del bootstrap con DOM simulado, comprobando exactamente nueve nodos e IDs consecutivos.
- Commits: 75fe754eb2ecc5a369c852cdf173cc132a72afe3 (GUI), c89f9297568f9e0513b6ab17bf4c59ff677c9fa5 (prueba inicial), 05883b6074ba36e70f864dda5748d64efd292b28 (corrección del extractor de la prueba).
- main y auxiliary verificadas idénticas en 05883b6074ba36e70f864dda5748d64efd292b28 antes de actualizar este snapshot; no se creó ninguna rama nueva. La rama preexistente test no se modificó.

**Tres pasadas de revisión:**
1. Fuente/DOM: verificados contenedor, IDs, guard CSS y bootstrap idempotente en el archivo de interfaz.
2. Contrato de prueba: harness VM revisado y ejecutado de forma aislada en Node.js con DOM simulado. Primera ejecución crea 9 PADs; segunda ejecución conserva 9 sin duplicar; IDs PAD_01–PAD_09 y contador = 9. Resultado: PASS. Se corrigió la extracción del script para evitar un regex mal escapado.
3. Integración/publicación: verificadas las dos ramas operativas idénticas en el HEAD 052dd1e7b49ab43ec71a82a81c8760f3b8bc4fc3 y revisado el workflow. No se obtuvo un run/artefacto nuevo verificable para ese HEAD; la URL pública tampoco pudo leerse con el navegador de verificación. Por lo tanto, no declarar CI, PADs visibles en runtime ni despliegue final como verificados todavía.

**Siguiente orden obligatorio:** (1) obtener resultado de CI/artefacto del HEAD actual y verificar que el artefacto contiene el bootstrap; (2) resolver la discrepancia Pages/CDN que anteriormente devolvía 16 slots; (3) probar los nueve PADs en navegador real; (4) implementar HISTORIAL CM-ZX1-10–14 con snapshots manuales de proyecto y módulo, IDs V001..., navegación y restauración; (5) continuar fichas confirmadas pendientes en secuencia, empezando por inventario control-por-control y contratos GUI↔motor. No marcar tareas como terminadas hasta superar sus pruebas.
### HISTORIAL · implementación inicial conectada · 2026-11-10

**Implementación en código (no solo especificación):**
- `zp-storage.js`: IndexedDB pasa a versión 4 y crea `projectHistory`, con snapshots por `projectId + version`, listado secuencial y recuperación por versión.
- Identificadores manuales V001, V002...; no se genera snapshot automático al guardar o editar el proyecto.
- Snapshots completos contienen estado del motor, nombre del proyecto y muestras de todos los bancos.
- Snapshots por módulo disponibles: PADS, SEQUENCER, MIXER_FX, TRANSPORT, TONAL y SAMPLE_EDITOR. Cada snapshot parcial conserva los campos del módulo y no reemplaza campos de otros módulos al restaurar.
- Restauración de proyecto/módulo, recuperación de buffers de muestras cuando aplica, navegación anterior/siguiente y confirmación explícita antes de reemplazar el estado activo.
- `creator-engine.html`: comandos `creator.history.create`, `creator.history.list`, `creator.history.restore` conectados al motor.
- `index.html`: acceso HISTORY en PROJECT MANAGER, creación de snapshots de proyecto/módulo, lista secuencial, anterior/siguiente y restauración.
- `scripts/validate-zx1.mjs`: comprobaciones de sintaxis de `zp-storage.js` y contratos de almacenamiento, motor y controles GUI para historial. Se corrigió la comprobación de IDs secuenciales para apuntar al módulo de almacenamiento correcto.

**Revisión de código:** se inspeccionaron los cuatro archivos modificados y se corrigieron dos detalles encontrados: regex de validación V### y escritura duplicada de muestras durante restauración. Los snapshots completos también guardan/restauran el nombre del proyecto.

**Estado de validación:** cambios confirmados en `main` y `auxiliary`, idénticas. La prueba automatizada de GitHub Actions para el HEAD actual aún no está confirmada; tampoco se ha probado IndexedDB real, restauración de buffers en Safari ni el despliegue público. Por tanto HISTORIAL queda **implementado en fuente, pendiente de validación runtime**. No marcar terminado todavía.

**Siguiente paso técnico:** conseguir una ejecución nueva del workflow Pages sobre el HEAD actual; inspeccionar logs/artefacto; realizar prueba de navegador para crear V001, V002 de proyecto, snapshots de módulo, navegación, restauración completa/parcial y persistencia después de recargar. Después continuar con las fichas CM-ZX1 confirmadas en orden.
**Prueba de lógica ejecutada en esta sesión (aislada sobre el código recuperado de GitHub):**
- Los cuatro artefactos JS (scripts inline de `index.html`, `creator-engine.html`, `zp-storage.js` y cuerpo del validador `.mjs`) compilan sin error de sintaxis.
- Bootstrap PAD: primera ejecución crea nueve nodos; segunda ejecución mantiene nueve; IDs PAD_01–PAD_09 correctos.
- Función real `saveHistorySnapshot` extraída de `zp-storage.js`, ejecutada con transacción simulada: produce V001 y V002 y mantiene el `projectId`.
- Contrato de módulos extraído del motor: PROJECT, PADS, SEQUENCER, MIXER_FX, TRANSPORT, TONAL y SAMPLE_EDITOR.
- Esto prueba sintaxis y lógica aislada. No prueba la implementación real de IndexedDB, la transacción/cursor del navegador, el audio, Safari ni el deploy.