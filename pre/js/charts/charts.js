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

export function initChart(iframe) {
    //Desarrollo del gráfico
    d3.csv('https://raw.githubusercontent.com/CarlosMunozDiazCSIC/informe_perfil_mayores_2022_demografia_1_9/main/data/distribucion_poblacion_extranjeros.csv', function(error,data) {
        if (error) throw error;

        //Parcelamos los datos
        let totalPop = data.filter(function(item) { 
            if(item['Edad..grandes.grupos.de.edad.'] != '65+'){
                return item;
            }
        });

        let mas65Pop = data.filter(function(item) { 
            if(item['Edad..grandes.grupos.de.edad.'] == '65+'){
                return item;
            }
        });

        let currentFirst = 0;
        let stackedFirst = totalPop.map(function(item) {
            let data = {0: currentFirst, 1: currentFirst + parseFloat(item.porc_total), data: {name: item.NAME_NAC, porc_total: item.porc_total, total_pop: item.Total }};
            currentFirst = currentFirst + parseFloat(item.porc_total);
            return data;
        });

        let currentSecond = 0;
        let stackedSecond = mas65Pop.map(function(item) {
            let data = {0: currentSecond, 1: currentSecond + parseFloat(item.porc_total), data: {name: item.NAME_NAC, porc_total: item.porc_total, total_pop: item.Total }};
            currentSecond = currentSecond + parseFloat(item.porc_total);
            return data;
        });
        
        ///// Desarrollo de ambos gráficos
        let margin = {top: 10, right: 10, bottom: 30, left: 5},
            width = document.getElementById('circle--first').clientWidth - margin.left - margin.right,
            height = document.getElementById('circle--first').clientHeight - margin.top - margin.bottom;

        let chart1 = d3.select("#circle--first")
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

        let chart2 = d3.select("#circle--second")
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

        //Ejes > No habría eje Y
        let x = d3.scaleLinear()
            .domain([0,100])
            .range([0,width]);

        let xAxis = d3.axisBottom(x).ticks(5);
        
        chart1.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        chart2.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
                            
        let color = d3.scaleOrdinal()
            .range([COLOR_PRIMARY_1, COLOR_COMP_2, COLOR_COMP_1, COLOR_GREY_1, COLOR_ANAG_1, COLOR_ANAG_2, COLOR_OTHER_2]);


        function init() {
            chart1.append("g")
                .attr('class','chart-g-1')
                .selectAll("g")
                .data(stackedFirst)
                .enter()
                .append("g")
                .attr("fill", function(d) { return color(d.data.name); })
                .append("rect")
                    .attr("y", function(d) { return 0; })
                    .attr("x", function(d) { return x(d[0]); })
                    .attr("width", function(d) { return x(d[1]) - x(d[0]); })
                    .attr("height", '60px');
            
            chart2.append("g")
                .attr('class','chart-g-1')
                .selectAll("g")
                .data(stackedSecond)
                .enter()
                .append("g")
                .attr("fill", function(d) { return color(d.data.name); })
                .append("rect")
                    .attr("y", function(d) { return 0; })
                    .attr("x", function(d) { return x(d[0]); })
                    .attr("width", function(d) { return x(d[1]) - x(d[0]); })
                    .attr("height", '60px');
        }

        function animateChart() {

        }

        /////
        /////
        // Resto - Chart
        /////
        /////
        init();

        //Animación del gráfico
        document.getElementById('replay').addEventListener('click', function() {
            animateChart();
        });

        /////
        /////
        // Resto
        /////
        /////

        //Iframe
        setFixedIframeUrl('informe_perfil_mayores_2022_demografia_1_9','distribucion_poblacion_mayor_extranjera');

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