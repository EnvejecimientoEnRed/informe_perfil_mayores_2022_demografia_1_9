/*
* FUNCIONES TOOLTIP
*/
function getInTooltip(tooltip) {
    tooltip.style('display','block').style('opacity', 1);
}

function getOutTooltip(tooltip) {
    tooltip.style('display','none').style('opacity', 0);
}

function positionTooltip(event, tooltip) {
    let x = event.pageX;
    let y = event.pageY;

    //Posición
    let left = window.innerWidth / 2 > x ? 'left' : 'right';
    let horizontalPos = left == 'left' ? 20 : -160;

    tooltip.style('top', y - 80 + 'px');
    tooltip.style('left', (x + horizontalPos) + 'px');
}

export {
    getInTooltip,
    getOutTooltip,
    positionTooltip
}