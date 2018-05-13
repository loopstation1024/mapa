var global_lang = lang_es;
$(function(){
    var map, markerIndex = 0, markersCoords = {};
    map = new jvm.Map({
        container: $('#map'),
        map: 'world_merc',
        backgroundColor: "transparent", 
        markers: coords.map(function(h){
            // console.log( parseInt( Math.random().toString().substr(0,6) )) ;
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
    $("body").on("click",".tarjeta-cerrar",function(){
        removeTarjeta();
    });

    // Zoom original
    $(".home").on("click", function(){
        map.reset();
        map.series.regions[0].setValues(regiones);
    });

    $(".buscar").on("click", function(){
        $("#buscador").val("");
        if($(".language-container:visible").length != 0){
           $(".language-container").toggle(); 
        }
        $(".buscar-container").toggle();
    });

    $(".language").on("click", function(){
        if($(".buscar-container:visible").length != 0){
           $(".buscar-container").toggle(); 
        }
         $(".language-container").toggle();
    });

    // Buscador
    $("#buscador").on("keydown", function(e){
        console.log($(this).val());
    })

    $("#nav img, .language-container img").on("click", function(){
        removeTarjeta();
    });
    // Cambiar idioma
    $(".language-container img").on("click", function(){
        $(".language-container").toggle();
        console.log($(this).attr("data-language"));
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
    });

    var initial_text = `
        <div class="logo-universia"><img src="img/logo1.png" /></div>
        <div class="touch-bottom">
            <img src="icons/icono-touch.png" class="icon-touch" />
            <h5>`+global_lang[global_lang.length-1].initial_title+`</h5>
            <p>`+global_lang[global_lang.length-1].initial_text+`</p>
        </div>
    `;
    $("#initial-touch").html(initial_text);

    $("#initial-touch").on("click",function(){
        $(this).remove();
    });
});

function myOnMarkerTipShow(e, code){
    console.log(code)
    removeTarjeta()
    var info = global_lang;
    // console.log(info[code].icono);
    var tarjetaClass= "tarjeta-"+info[code].icono;
    var tarjetaId = "tarjeta-"+code;
    var html = `
    <div class="`+tarjetaClass+` tarjeta_container tarjeta-`+code+`">
        <div class="titulo-container">
            <h1 class="tarjeta_titulo">`+info[code].institucion+`</h1>
        </div>
        <div class="texto-container">
            <div class="redes-sociales">
                <a href="`+info[code].twitter+`" target="_blank"><img src="icons/icono-twitter.png" class="icono-twitter"/></a>
                <a href="`+info[code].instagram+`" target="_blank"><img src="icons/icono-pinterest.png" class="icono-pinterest"/></a>
                <a href="`+info[code].facebook+`" target="_blank"><img src="icons/icono-facebook.png" class="icono-facebook"/></a>
                <a href="`+info[code].linkedin+`" target="_blank"><img src="icons/icono-linkedin.png" class="icono-linkedin"/></a>
            </div>
            <h2 class="persona">`+info[code].persona+`</h2>
            <h5 class="cargo">`+info[code].cargo+`</h5>
        </div>
        <div class="tarjeta-cerrar" data-tarjeta="`+code+`"></div>
    </div>`
    ;
    $("body").append(html);
}   

function removeTarjeta(){
    $(".tarjeta_container").remove();
}

function offsetCoords(index, coord){
    // console.log(  coord + ( parseInt(Math.random().toString().substr(0,8)) ) );
    // console.log();
    // return coord + ( parseInt(Math.random().toString().substr(0,8)) );
    return coord +  Math.random();
}