# Restaurar el punto maestro ZX1

## Referencia protegida
- Rama: `backup/master-point-2026-11-19`
- Commit base: `c2eb4e2e8162b1b2bccb5de56d5ba230ba0234d6`
- Tag previsto: `zx1-master-point-2026-11-19` (pendiente de creación manual/API compatible).

## Procedimiento seguro
1. Inspeccionar el HEAD actual de `main` y la rama de respaldo.
2. Comparar los cambios posteriores con el commit base; identificar archivos y datos que deban conservarse.
3. Crear una rama de restauración desde el snapshot protegido.
4. Recuperar solo los archivos o cambios solicitados; no resetear `main` ni hacer force-push.
5. Ejecutar pruebas y revisión visual antes de cualquier merge/despliegue.
6. Publicar únicamente con autorización expresa.

## Comando conversacional
Cuando el usuario diga **«volver a punto maestro»**, resolver esta carpeta y la rama protegida, mostrar la diferencia entre el estado actual y el snapshot, y preparar una restauración segura. La frase por sí sola no autoriza borrar cambios posteriores ni desplegar.

## Validación
La restauración es correcta si el commit base coincide exactamente y se mantienen intactos los archivos posteriores no seleccionados para revertir.
