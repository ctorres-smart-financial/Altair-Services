
# Altair Services

Altair Services es una aplicación web que permite verificar la salud de los servicios base a las condiciones que se especifiquen en el apartado "Tests" de tu colleción de Postman.

## Tabla de Contenido

- [Caracteristicas](#Características)
- [Instalación de Herramientas](#Instalación-de-Herramientas)
- [Instalación de Librerías](#instalación-de-librerías)
- [Configuración Inicial](#Configuración-Inicial)
- [Cambiar Colección](#Cambiar-Colección)
- [Usabilidad](#Usabilidad)
- [Soporte](#Soporte)


## Características

- Automatización de reportes por horario.
- Diseño responsivo.
- Generación de reportes con información detallada.
- Historial de reportes creados.
## Instalación de Herramientas
Internamente, el proyecto ejecuta comandos unix, por lo que es necesario ejecutar la aplicación en cualquier dispositivo que use una distribución Linux (Preferiblemente Debian).

## Java
La versión mínima requerida para Java es la 17
```bash
sudo apt install openjdk-17-jdk openjdk-17-jre
```
(Comando funcional solo para versiones iguales o posteriores a ubuntu 20.04)

## NodeJs
La versión mínima requerida para NodeJs es la 18.

### Via NVM (Node Version Manager)
El uso de NVM es recomendado para sistemas operativos Linux. Si no lo tiene instalado, Siga los siguientes pasos:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```

Luego, debe editar su archivo de inicialización .bashrc para que la shell identifique este nuevo programa.
```bash
nano ~/.bashrc
```
Se ubicará al final del archivo y pegará el siguiente código:
```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```
Luego de guardar los cambios, cierre y vuelva a abrir su terminal.
Para verificar si todo salió bien, use el siguiente comando:
```bash
nvm --version
```

Si ese comando retorna la versión instalada de NVM, quiere decir que está listo para instalar la versión necesaria de NodeJs:

```bash
nvm install 18
```

### Via NodeSource
```bash
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash - sudo apt install nodejs
``` 
## Instalación de Librerías

### Librería de Newman
```bash
npm install -g newman
```

### Tipo de reporte que usará Newman
```bash
npm install -g newman-reporter-htmlextra
```

## Configuración Inicial

Al trabajar con comandos Unix, necesitamos rutas específicas que ayuden a la aplicación a reconocer ciertos programas o directorios (Tales como newman, por ejemplo).

En la carpeta raíz del proyecto, busca el archivo application-prod.properties por esta ruta de directorios: ```.../src/main/resources/```.

En aquel archivo habrá ciertas variables con identificadores explícitos para evitar inconvenientes. Por ahora, vamos a concentrarnos en las últimas dos líneas:

```
node.path=changethispath
newman.path=changethispath
```

Debes cambiar "changethispath" por la ruta absoluta en la que se situan las dependencias que se instalaron previamente. Para saber esta ruta, basta con usar:
```bash
which node && which newman
```

La primera ruta que nos imprime la consola pertenece a la ruta de nodeJs, la segunda ruta pertenece a Newman. Al colocar correctamente estas rutas en los valores de las variables, deberia quedar algo así:

```
node.path=/home/YourUser/.nvm/versions/node/v18.18.2/bin/node
newman.path=/home/YourUser/.nvm/versions/node/v18.18.2/bin/newman
```

Finalmente, las variables restantes refieren a directorios que hacen parte del arbol de directorios del proyecto. Cabe reiterar que es necesario especificarlos, ya que la aplicación trabaja con comandos de la Shell.

Desde la carpeta raíz del proyecto, la ruta de directorios es el siguiente:

- Api Directory (.../src/main/resources/static/api),
- HTML reports directory (.../src/main/resources/static/api/reports/htmlextra),
- XML reports directory (.../src/main/resources/static/api/reports/xml)
- Bash Scripts (.../src/main/resources/static/api/bash-scripts)

Puedes situarte en cada uno de estos directorios y hacer uso del comando `pwd`. Este comando te retornará la ruta absoluta del directorio en la cual te situas.

Las variables deberían quedar algo similar a esto:

```
api.directory=/home/YourUser/AltairServices/src/main/resources/static/api
reports.html=/home/YourUser/AltairServices/src/main/resources/static/api/reports/htmlextra
reports.xml=/home/YourUser/AltairServices/src/main/resources/static/api/reports/xml
bash.scripts=/home/YourUser/AltairServices/src/main/resources/static/api/bash-scripts

node.path=/home/YourUser/.nvm/versions/node/v18.18.2/bin/node
newman.path=/home/YourUser/.nvm/versions/node/v18.18.2/bin/newman
```

_La variable 'server.port' hace referencia al puerto con el que se inicializará el servidor, esto es totalmente personalizable._

¡La configuración ya estaría lista! Sitúate en la carpeta raíz del proyecto y, al ejecutar este comando, ya tendrías la aplicación desplegada.

```bash
mvn spring-boot:run -f pom.xml 
```

## Cambiar Colección
___(En una versión posterior, se implementará variabilidad y será mucho más fácil)___

Si deseas cambiar la colección con la que la aplicación va a testear los servicios, deberás seguir ciertos pasos:

Desde la carpeta raíz del proyecto, sitúate en la siguiente ruta de directorios: ```.../src/main/resources/static/api```. En este directorio, deberás pegar el archivo producto de la exportación de tu colección de __Postman__, es decir, un archivo .json. Antes de seguir, asegúrate de copiar el nombre exacto de aquel archivo .json.

Ahora, redirígete a la siguiente ruta de directorios: ```.../src/main/java/com/smart/altairservices/service/```

Encontrarás un archivo llamado __ScriptService.java__. Dentro de él habrá una variable llamada __collectionName__, específicamente en la línea 64. En el valor de esa variable habrá dobles comillas (""). Entre estas dos, eliminarás lo que haya antes y pegarás el nombre del archivo __sin la extensión__. Por ejemplo, si la colección que he puesto en ```.../src/main/resources/static/api``` se llama __BDV-MINUEVACOLECCION.json__, en la variable __collectionName__ del archivo __ScriptService.java__ pondría lo siguiente:
```
String collectionName = "BDV-MINUEVACOLECCION";
```

Necesitarás volver a redesplegar la aplicación con ```mvn spring-boot:run -f pom.xml ``` para que se reflejen los nuevos cambios.

Tu colección a este punto ya debería estar siendo registrada por la aplicación, sin embargo, si deseas que tu equipo de trabajo tenga a su disposición la descarga de la nueva colección, puedes modificar el HTML:

En la carpeta raíz del proyecto, ve a la siguiente ruta de directorios: ```.../src/main/resources/static```. En esa carpeta, encontrarás un archivo llamado __index.html__. Es un archivo extenso y complejo, pero debes concentrarte en la línea 32 que hace referencia a una etiqueta <a>. Busca los atributos __download__ y __href__, y en su valor, coloca el nombre completo de tu colección. Siguiendo el ejemplo anterior, si mi nueva colección es __BDV-MINUEVACOLECCION.json__, la etiqueta <a> debe quedar asi:
```html
<a style="width: 100px; padding: 4px" href="api/BDV-MINUEVACOLECCION.json" class="nav-link text-white btn" title="Vinculo de Descarga" download="BDV-MINUEVACOLECCION.json">
Descargar </a>
```
## Usabilidad

Puedes decidir en qué momento quieres generar un reporte simplemente pulsando el botón "Generar Reporte" que se sitúa en el primer apartado de la aplicación, sin embargo, la aplicación está programada para automatizar la ejecución de los reportes en un horario específico:

- 1er Test Automatizado: 08:00
- 2do Test Automatizado: 10:30
- 3er Test Automatizado: 13:00
- 4to Test Automatizado: 16:30

Tenga en cuenta que la generación de los reportes generalmente tarda entre 15 minutos.

Los reportes evalúan dos condiciones (Específicados en la pestaña "tests" de la colección de Postman):
- Que el código dé respuesta del servicio sea 200.
- Que el tiempo dé respuesta es menos o igual a 1500 ms

Para comprobar a qué colección de Postman está testeando la aplicación, puedes descargar la colección con el botón "Descargar" que aparece en la parte superior de la página (Leer la sección __Cambiar Colección__).

En el segundo apartado de la página se brinda un resumen con información precisa del último reporte generado por la aplicación.

Por último, el tercer apartado ofrece el historial de los 10 últimos reportes creados.
__(En versiones posteriores, el historial de reportes se extenderá)__

La página ha sido optimizada para ser cómodamente usable en teléfonos moviles y, en general, en pantallas pequeñas.
## Soporte

Cualquier bug, inconsistencia o sugerencia, puedes reportarlo por mi correo electrónico __ahernandez@smart-financial-systems.com__.