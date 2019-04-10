const funciones = []


funciones.mensajeSinEspacios = (mensaje,reverse = false) =>{
    return (reverse) ? mensaje.replace(new RegExp("%20", 'g'), " ")
         :  mensaje.replace(new RegExp(" ", 'g'), "%20");
}

funciones.validarSiEsNumero = (numero)=>{
    if (!/^([0-9]{10})*$/.test(numero))
        return false;
    else
        return true;
}

funciones.formatoFecha = (date)=> {
    var nombreMeses = [
      "ENE", "FEB", "MAR",
      "ABR", "MAY", "JUN", "JUL",
      "AGO", "SEP", "OCT",
      "NOV", "DEC"
    ];
  
    var dia = date.getDate();
    var mesIndex = date.getMonth();
    var anio = date.getFullYear();
  
    return dia + '/' + nombreMeses[mesIndex] + '/' + anio;
  }

export default funciones;