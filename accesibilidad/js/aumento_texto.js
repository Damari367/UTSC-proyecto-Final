// JavaScript Document
//Autor: Martín Iglesias

FUENTE_DEFAULT = 14;
FUENTE_ACTUAL = 14;
FUENTE_MASPEQUENA = 10;
FUENTE_MASGRANDE = 72;

function MasTxt(div) {
FUENTE_ACTUAL = FUENTE_ACTUAL+2;
    if (FUENTE_ACTUAL > FUENTE_MASGRANDE) {
    FUENTE_ACTUAL = FUENTE_MASGRANDE
    }
var divID = document.getElementById(div);
divID.style.fontSize = FUENTE_ACTUAL+"px";
$('h1').style('font-size', FUENTE_ACTUAL + 'px', 'important');
$('h2').style('font-size', FUENTE_ACTUAL + 'px', 'important');
$('h3').style('font-size', FUENTE_ACTUAL + 'px', 'important');
$('p').style('font-size', FUENTE_ACTUAL + 'px', 'important');
$('p.lead').style('font-size', FUENTE_ACTUAL + 'px', 'important');
$('p.lead2').style('font-size', FUENTE_ACTUAL + 'px', 'important');
$('.btn').style('font-size', FUENTE_ACTUAL + 'px', 'important');
}
function MenosTxt(div) {
FUENTE_ACTUAL = FUENTE_ACTUAL-2;
    if (FUENTE_ACTUAL < FUENTE_MASPEQUENA) {
    FUENTE_ACTUAL = FUENTE_MASPEQUENA
    }
var divID = document.getElementById(div);
divID.style.fontSize = FUENTE_ACTUAL+"px";
$('h1').style('font-size', FUENTE_ACTUAL + 'px', 'important');
$('h2').style('font-size', FUENTE_ACTUAL + 'px', 'important');
$('h3').style('font-size', FUENTE_ACTUAL + 'px', 'important');
$('p').style('font-size', FUENTE_ACTUAL + 'px', 'important');
$('p.lead').style('font-size', FUENTE_ACTUAL + 'px', 'important');
$('p.lead2').style('font-size', FUENTE_ACTUAL + 'px', 'important');
$('.btn').style('font-size', FUENTE_ACTUAL + 'px', 'important');
}