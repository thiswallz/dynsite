INDICACIONES CONFIGURAR AMBIENTE DESARROLLO
===========================================

Se asume que tenemos instalado en nuestro equipo NODE.JS y NPM

1.-INSTALAR DEPENDENCIAS GULP (desde package.json):
npm install --save-dev


TAREAS PRECONFIGURADAS (desde gulpfile.js)
==============================================

gulp deployDev
Permite generar una distribución con todos los estilos CSS (conctenados y minificados) y de todas las librerías JS del proyecto en un sólo archivo concatenado, minificado y ofuscado.
El archivo resultante lo encontramos en el directorio /DIST.

gulp deployQA
Equivalente a deployDev pero con las librerías de ApiGateway para el ambiente de QA.

gulp deployProd
Equivalente a deployDev pero con las librerías de ApiGateway para el ambiente de Producción.

LIBRERIAS
==============================================
CRONOMETRO =  https://siddii.github.io/angular-timer/index.html
MAPAS = https://ngmap.github.io/#/!map-lazy-inint.html;
share redes sociales = https://github.com/720kb/angular-socialshare# dynsite
