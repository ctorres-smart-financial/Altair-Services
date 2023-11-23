#!/bin/bash
# author: Andres (andreshm0608@gmail.com)
# Crear y actualizar el archivo Crontab

#Timezone
export TZ=America/Bogota

# Obtener el directorio actual
SCRIPT_DIR=$(dirname "$(readlink -f "$0")")
tempfile=$(mktemp)

# Nombre del archivo de cron
CRON_FILE="ScriptSchedule.txt"

# Creación del archivo con la última versión del horario
if [ ! -e "$SCRIPT_DIR/$CRON_FILE" ]; then
  crontab -l > "$CRON_FILE"
fi

# tempfile obtiene las entradas actuales del crontab
crontab -l > "$tempfile.actual"

# Este horario es el que usara el sistema LOCAL
# El script se asegura de encontrar las modificaciones o adiciones.
# shellcheck disable=SC2129
echo "00 09 * * * $SCRIPT_DIR/GenerateTestReport.sh" >> "$tempfile"
echo "30 10 * * * $SCRIPT_DIR/GenerateTestReport.sh" >> "$tempfile"
echo "00 13 * * * $SCRIPT_DIR/GenerateTestReport.sh" >> "$tempfile"
echo "30 16 * * * $SCRIPT_DIR/GenerateTestReport.sh" >> "$tempfile"

# Comparar el contenido actual con el contenido anterior
if ! cmp -s "$tempfile.actual" "$tempfile"; then
  # Establecer el crontab actualizado
  crontab "$tempfile"

  # Actualiza el archivo ScriptSchedule.txt con la ultima version del crontab
  crontab -l > "$CRON_FILE"
fi

# Eliminar los archivos temporales
rm "$tempfile" "$tempfile.actual"

