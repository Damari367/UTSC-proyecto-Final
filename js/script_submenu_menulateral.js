//variables para controlar el submenu por click y hover
var subMenuActivo = false;
var subMenuHover = false;
$(function() {
	//Evento ready para iniciar con el submenu visible
	$(document).ready(function(e) {
		subMenu_show();
		subMenuActivo = true;
	});
	//Evento keydown para ocultar submenu y menu lateral
	$(document).on('keydown', function(event) {
		if(event.which == 27) {
			if($('#subMenu').hasClass('submenu_visible')) {
				subMenu_hidden();
				subMenuActivo = false;
			}
			if($('#navigation').hasClass('item-open')) {
				menu_lateral_click();
			}
		}
	});
	//Evento click en el contenido de la pagina para ocultar submenu y menu lateral
	$('.container-fluid').click(
		function() {
			if($('#subMenu').hasClass('submenu_visible')) {
				subMenu_hidden();
				subMenuActivo = false;
			}
			if($('#navigation').hasClass('item-open')) {
				menu_lateral_click();
			}
		}
	);
	//Evento click del subMenu
	$('#btnSubMenu').click(
		function() {
			if(subMenuActivo == false) {
				subMenu_show();
				subMenuActivo = true;
			} else {
				subMenu_hidden();
				subMenuActivo = false;
			}
		}
	);
	//Evento hover del subMenu
	$('#menuItem').hover(
		function() {
			if(subMenuHover == false) {
				subMenu_show();
				subMenuHover = true;
			} else {
				subMenu_hidden();
				subMenuHover = false;
				subMenuActivo = false;
			}
		}
	);
	//Evento click del menu lateral
	$('.item-menu-click').click(
		function() {
			menu_lateral_click();
		}
	);
	//Funcion para mostrar el subMenu incluyente
	var subMenu_show = function() {
		if($('#subMenu').hasClass('submenu_oculto')) {
			$('#subMenu').stop().animate({'top':'115%'},200);
			
			$('#subMenu').removeClass('submenu_oculto');
			$('#subMenu').addClass('submenu_visible');
		}
	}
	//Funcion para ocultar el subMenu incluyente
	var subMenu_hidden = function() {
		if($('#subMenu').hasClass('submenu_visible')) {
			if($('#subMenu').hasClass('submenu_vinculacion')) {
				$('#subMenu').stop().animate({'top':'-25%'},200);
			} else {
				$('#subMenu').stop().animate({'top':'0%'},200);
			}
			
			$('#subMenu').removeClass('submenu_visible');
			$('#subMenu').addClass('submenu_oculto');
		}
	}
	//Funcion para mostrar u ocultar el menu lateral
	var menu_lateral_click = function() {
		if($('#navigation').hasClass('item-close')) {
			$('.item-menu .item-menu-a').stop().animate({'marginLeft':'-230px'},200);
			$('.item-menu .divli').stop().animate({'marginLeft':'-230px'},200);
			
			$('#navigation').removeClass('item-close');
			$('#navigation').addClass('item-open');
			$('#icono-click').removeClass('glyphicon glyphicon-chevron-left');
			$('#icono-click').addClass('glyphicon glyphicon-chevron-right');
		} else {
			$('.item-menu .item-menu-a').stop().animate({'marginLeft':'0px'},200);
			$('.item-menu .divli').stop().animate({'marginLeft':'0px'},200);
			
			$('#navigation').removeClass('item-open');
			$('#navigation').addClass('item-close');
			$('#icono-click').removeClass('glyphicon glyphicon-chevron-right');
			$('#icono-click').addClass('glyphicon glyphicon-chevron-left');
		}
	}
});