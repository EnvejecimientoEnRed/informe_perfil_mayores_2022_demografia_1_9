//Desarrollo de las visualizaciones
import * as d3 from 'd3';
import { numberWithCommas2 } from '../helpers';
//import { getInTooltip, getOutTooltip, positionTooltip } from './modules/tooltip';
import { setChartHeight } from '../modules/height';
import { setChartCanvas, setChartCanvasImage, setCustomCanvas, setChartCustomCanvasImage } from '../modules/canvas-image';
import { setRRSSLinks } from '../modules/rrss';
import { setFixedIframeUrl } from './chart_helpers';

//Colores fijos
const COLOR_PRIMARY_1 = '#F8B05C', 
COLOR_PRIMARY_2 = '#E37A42', 
COLOR_ANAG_1 = '#D1834F', 
COLOR_ANAG_2 = '#BF2727', 
COLOR_COMP_1 = '#528FAD', 
COLOR_COMP_2 = '#AADCE0', 
COLOR_GREY_1 = '#B5ABA4', 
COLOR_GREY_2 = '#64605A', 
COLOR_OTHER_1 = '#B58753', 
COLOR_OTHER_2 = '#731854';

export function initChart1_10(iframe) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Figura 1.9. Distribución de la población extranjera por nacionalidad en España, 2021';
    document.getElementById('subtitle').textContent = 'Comparativa entre la población total y la población con 65 y más años. Datos en valores porcentuales.';
    document.getElementById('data-source').textContent = 'Instituto Nacional de Estadística (INE): Estadística del Padrón continuo a 1 de enero de 2021. Consulta: febrero de 2022.';
    document.getElementById('data-note').textContent = "No se incluye Reino Unido dentro de la Unión Europea. En 'Otros' se encuentran: Oceanía, Centro América, Caribe y Apátridas";

    //Desarrollo del gráfico
    d3.csv('https://raw.githubusercontent.com/CarlosMunozDiazCSIC/informe-perfil-mayores-2022-demografia/main/data/distribucion_poblacion_extranjeros.csv', function(error,data) {
        if (error) throw error;

        console.log(data);

        /////
        /////
        // Resto
        /////
        /////
        //Animación del gráfico
        document.getElementById('replay').addEventListener('click', function() {
            animateChart();
        });

        //Iframe
        setFixedIframeUrl('distribucion_poblacion_mayor_extranjera');

        //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
        setRRSSLinks('distribucion_poblacion_mayor_extranjera');

        //Captura de pantalla de la visualización
        setChartCanvas();
        setCustomCanvas();

        let pngDownload = document.getElementById('pngImage');

        pngDownload.addEventListener('click', function(){
            setChartCanvasImage('distribucion_poblacion_mayor_extranjera');
            setChartCustomCanvasImage('distribucion_poblacion_mayor_extranjera');
        });

        //Altura del frame
        setChartHeight(iframe);
    });    
}

export function initChart1_11(iframe) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Figura 1.10. Comparativa de pirámides de población nacional y extranjera en España por nacionalidad, 2021';
    document.getElementById('subtitle').textContent = 'Datos en valores porcentuales.';
    document.getElementById('data-source').textContent = 'Instituto Nacional de Estadística (INE): Estadística del Padrón continuo a 1 de enero de 2021. Consulta: febrero de 2022.';
    document.getElementById('data-note').textContent = '';

    //Desarrollo del gráfico
    d3.csv('https://raw.githubusercontent.com/CarlosMunozDiazCSIC/informe-perfil-mayores-2022-demografia/main/data/piramide_extranjeros_nacional.csv', function(error,data) {
        if (error) throw error;

        /////
        /////
        // Resto
        /////
        /////
        //Animación del gráfico
        document.getElementById('replay').addEventListener('click', function() {
            animateChart();
        });

        //Iframe
        setFixedIframeUrl('piramide_espanoles_extranjeros');

        //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
        setRRSSLinks('piramide_espanoles_extranjeros');

        //Captura de pantalla de la visualización
        setChartCanvas();
        setCustomCanvas();

        let pngDownload = document.getElementById('pngImage');

        pngDownload.addEventListener('click', function(){
            setChartCanvasImage('piramide_espanoles_extranjeros');
            setChartCustomCanvasImage('piramide_espanoles_extranjeros');
        });

        //Altura del frame
        setChartHeight(iframe);
    }); 


    
}