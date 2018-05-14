var global_lang = lang_es;
$(function(){
    var map, markerIndex = 0, markersCoords = {};
    map = new jvm.Map({
        container: $('#map'),
        map: 'world_merc',
        backgroundColor: "transparent", 
        markers: coords.map(function(h){
            // console.log( parseInt( Math.random().toString().substr(0,6) )) ;
            // console.log(h.coords[0]);
            if(h.coords[0] == 38.345997
                || h.coords[0] == 39.469906
                || h.coords[0] == 38.345996
                || h.coords[0] == 42.598724
                || h.coords[0] == 43.18284
                || h.coords[0] == 42.989624
                || h.coords[0] == 42.695393
                || h.coords[0] == 42.878212
                || h.coords[0] == 39.986355
                || h.coords[0] == 47.99901
                || h.coords[0] == 38.907192
                || h.coords[0] == 41.580093
                || h.coords[0] == 37.77493
                || h.coords[0] == 9.748917
                || h.coords[0] == -2.170998
                || h.coords[0] == -35.4259
                || h.coords[0] == 33.97159
                || h.coords[0] == -34.68741
                || h.coords[0] == -34.720634
                || h.coords[0] == -34.76118
                || h.coords[0] == -34.90111
                || h.coords[0] == -32.299885
                || h.coords[0] == -22.906847
                || h.coords[0] == 39.99967
                || h.coords[0] == 57.70887
                || h.coords[0] == -2.170998

            ){  
                return { latLng: h.coords } 
            }
            return { 
                latLng: [ 
                    offsetCoords(h,h.coords[0]),
                    offsetCoords(h,h.coords[1]) 
                ]
            } 
        }),
        zoomMax: 500,
        zoomOnScrollSpeed: 1,
        series: {
            regions: [{
                scale: {
                    1: '#acc7c2',
                    2: '#83b1aa',
                    3: '#5fa69c',
                    4: '#a2c9c3',
                    5: '#6ab3ab',
                    6: '#0fa79d',
                },
                attribute: 'fill',
                values: regiones,
            }],           
            markers: [{
                attribute: 'image',
                scale: {
                    banco: 'icons/icono-banco.png',
                    institucion: 'icons/icono-institucional.png',
                    real: 'icons/icono-real.png',
                    universidad: 'icons/icono-universidad.png',
                    institucion: 'icons/icono-institucional.png',
                },
                values: lang_es.reduce(function(p, c, i){ p[i] = c.icono; return p }, {}),                    
            }],
        },
        onRegionOver: function(){
            return false;
        },
        onMarkerClick: function(e, code){
            myOnMarkerTipShow(e, code);
        },
        onMarkerTipShow: function(event, label, index){
            return false;
        },
        onRegionTipShow: function(){
            return false; // Al ponerse encima de los iconos
        },            
        onMarkerOver: function(){
            return false;
        }                   
    });

    /* custom code*/
    $("body").on("click",".tarjeta-cerrar",function()
    {
        removeTarjeta();
    });

    // Restaurar zoom original
    $(".home").on("click", function()
    {
        map.reset();
        map.series.regions[0].setValues(regiones);
    });

    $(".buscar").on("click", function()
    {
        $("#buscador").val("");
        $("image").css("display","block");
        if($(".language-container:visible").length != 0){
           $(".language-container").toggle(); 
        }
        $(".buscar-container").toggle();
    });

    $(".language").on("click", function()
    {
        if($(".buscar-container:visible").length != 0){
           $(".buscar-container").toggle(); 
        }
         $(".language-container").toggle();
    });

    // Buscador
    $("#buscador").on("keydown", function(e)
    {
        bucasdorAction();
    });

    $("#nav img, .language-container img").on("click", function()
    {
        removeTarjeta();
    });
    $("#cerrar").on("click", function()
    {
        $("#buscador").val("");
        $("image").css("display","block");
    });

    // Cambiar idioma
    $(".language-container img").on("click", function()
    {
        $(".language-container").toggle();
        // console.log($(this).attr("data-language"));
        switch($(this).attr("data-language")) {
            case "es":
                global_lang = lang_es;
                break;
            case "en":
                global_lang = lang_en;
                break;
            case "pt":
                global_lang = lang_pt;
                break;
        }
        $("image").attr( "name", function( i, val )
        {
            return global_lang[$(this).attr("data-index")].institucion.toLowerCase();
        });
    });

    var initial_text = `
        <div class="logo-universia"><img src="img/logo1.png" /></div>
        <div class="touch-bottom">
            <img src="icons/icono-touch.png" class="icon-touch" />
            <h5>`+global_lang[global_lang.length-1].initial_title+`</h5>
            <p>`+global_lang[global_lang.length-1].initial_text+`</p>
        </div>`;

    $("#initial-touch").html(initial_text);

    $("#initial-touch").on("click",function()
    {
        $(this).remove();
    });
    $("image").attr( "name", function( i, val )
    {
      return global_lang[$(this).attr("data-index")].institucion.toLowerCase();
    });
});

function myOnMarkerTipShow(e, code)
{
    removeTarjeta()
    var info = global_lang;
    console.log(code);
    console.log(coords[code].coords[0]);
    console.log(coords[code].coords[1]);
    var tarjetaClass= "tarjeta-"+info[code].icono;
    var tarjetaId = "tarjeta-"+code;
    var html = `
    <div class="`+tarjetaClass+` tarjeta_container tarjeta-`+code+`">
        <div class="titulo-container">
            <h1 class="tarjeta_titulo">`+info[code].institucion+`</h1>
        </div>
        <div class="texto-container">
            <div class="redes-sociales">
            `+redes(info,code)+`
            </div>
            <h2 class="persona">`+info[code].persona+`</h2>
            <h5 class="cargo">`+info[code].cargo+`</h5>
        </div>
        <div class="tarjeta-cerrar" data-tarjeta="`+code+`"></div>
    </div>`
    ;
    function redes(info,code){
        if(code==13){
            return `<a href="https://twitter.com/UniversiaMex" target="_blank" style="text-decoration: none;margin:0 15px;">
                <img src="icons/icono-twitter.png" class="icono-twitter" style="margin: 0px;width: 24px;">
            </a>             
            <a href="https://twitter.com/santanderunimx" target="_blank" style="text-decoration: none;margin:0 15px;">
                <img src="icons/icono-twitter.png" class="icono-twitter" style="margin: 0px;width: 24px;">
            </a>
            <a href="https://www.instagram.com/universia_mx/" target="_blank" style="text-decoration: none;margin:0 15px;">
                <img src="icons/icono-instagram.png" class="icono-instagram" style="margin: 0px;width: 24px;">
            </a>           
            <a href="https://www.instagram.com/santanderunimx" target="_blank" style="text-decoration: none;margin:0 15px;">
                <img src="icons/icono-instagram.png" class="icono-instagram" style="margin: 0px;width: 24px;">
            </a>
            <a href="https://www.facebook.com/universia.mexico/" target="_blank" style="text-decoration: none;margin:0 15px;">
                <img src="icons/icono-facebook.png" class="icono-facebook" style="margin: 0px;width: 24px;">
            </a>          
            <a href="https://www.facebook.com/santanderunimx" target="_blank" style="text-decoration: none;margin:0 15px;">
                <img src="icons/icono-facebook.png" class="icono-facebook" style="margin: 0px;width: 24px;">
            </a>
            <a href="https://www.linkedin.com/company/28158455/" target="_blank" style="text-decoration: none;margin:0 15px;">
                <img src="icons/icono-linkedin.png" class="icono-linkedin" style="margin: 0px;width: 24px;">
            </a>`
        }

        return showRedesSociales(info[code].twitter,"twitter")+
        showRedesSociales(info[code].instagram,"instagram")+
        showRedesSociales(info[code].facebook,"facebook")+
        showRedesSociales(info[code].linkedin,"linkedin");
        
    }

    $("body").append(html);
}   

function removeTarjeta()
{
    $(".tarjeta_container").remove();
}

function offsetCoords(index, coord)
{   
    // console.log(Math.random() * (0.3 - 0.1) + 0.1);
    // return coord +  Math.random() * (max - min) + min;
    return coord +  ( Math.random() * (0.3 - 0.1) + 0.1 );
}

function bucasdorAction(argument,element)
{
    $("image").css("display","none");
    setTimeout( function(){ 
       var texto = $("#buscador").val().toLowerCase();
       // console.log(typeof(texto));
        if($("#buscador").val() == ""){
            $("image").css("display","block");
        }
        $("image[name*='"+texto+"']").css("display","block");
    }, 1);
}

function showRedesSociales(link, red)
{
    if(link !== "x"){
        return `<a href="`+link+`" target="_blank"><img src="icons/icono-`+red+`.png" class="icono-`+red+`"/></a>`;
    }else{
        return "";
    }
}