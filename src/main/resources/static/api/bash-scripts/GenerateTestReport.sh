#!/bin/bash
# author: Andres (ahernandez@smart-financial-systems.com)
# Script para guardar el reporte del estado de los servicios

# Timezone
export TZ=America/Bogota

MONTH=$(date +"%b" | tr '[:lower:]' '[:upper:]')
DAY=$(date +"%d")
TIME=$(date +"%H%M")

# Guarda la ruta del directorio padre (ruta relativa)
API_DIR=$(dirname "$(dirname "$(readlink -f "$0")")")

# Nomenclatura de los archivos de los reportes
REPORTPATH=$API_DIR/reports/$TIME-CollectionName-Test-$DAY-$MONTH.html

# Actualiza Crontab
sh "$API_DIR"/scripts/CronConfiguration.sh

newman run "$API_DIR/Test.postman_collection.json" -r htmlextra --reporter-htmlextra-export "$REPORTPATH"
