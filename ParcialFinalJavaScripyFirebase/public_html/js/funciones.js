var infoJson;

$(document).ready(function(){
   
    $.getJSON('js/colombia.json', function(data) {         
        infoJson = data;
        $.each(data, function(key, value) {
            $("#idDepartamento").append("<option value=" + value.id + ">" + value.departamento + "</option>");
        }); // close each()
    });
    
    $("#idDepartamento").change(function(){
        $("#idMunicipio").empty();
        var codDepto = parseInt($("#idDepartamento").val());        
        $.each(infoJson, function(key, value) {
            if(codDepto === infoJson[key].id){
                $.each(infoJson[key].ciudades, function(key, value){
                    $("#idMunicipio").append("<option value=" + key + ">" + value + "</option>");
                });    
            };               
        }); 
    });
    
    $("#añadirInmueble").click(function () {

        if(f_valida_repetido()){

            var codigo = $("#idCodigoInmueble").val();
            var nombre = $("#idNombreInmueble").val();
            var valor = $("#idValorInmueble").val();
            var htmlTags = "<tr><td>" + codigo + "</td><td>" + 
            nombre + "</td><td>" +
            valor + "</td></tr>";          
            $(htmlTags).appendTo($("#tablaInmuebles"));
        }else{
            alert("El codigo del producto ya fue ingresado.")
        }
    });

    function f_valida_repetido(){
        
        var validador = true;
        if ($("#tablaInmuebles").find("tr").length > 1){
            
            var filas = $("#tablaInmuebles").find("tr"); //devulve las filas del body de tu tabla segun el ejemplo que brindaste
            var resultado = "";
            for(i=0; i<filas.length; i++){ //Recorre las filas 1 a 1
                var celdas = $(filas[i]).find("td"); //devolverá las celdas de una fila
                codigo = $(celdas[0]).text();
                nombre= $(celdas[1]).text();
                valor = $(celdas[2]).text();
                                
                if(codigo === $("#idCodigoInmueble").val() )  {
                    validador = false;
                }
            }                         
        }
        return validador;      
    }

});

