function agregarCliente(){
  Swal.fire({
  title: 'Agregar Cliente',
  html: getClientHtmlLayout(),
  width:'60%',
  showClass: {
    popup: 'animated fadeInDown faster'
  },
  hideClass: {
    popup: 'animated fadeOutUp faster'
  }
});

var platform = new H.service.Platform({
 'apikey': 'SEI-1bn-6vSC9G7pEalClDrOHK1w38l5IUSl_XrE5s0'
 });

  // Obtain the default map types from the platform object
  var maptypes = platform.createDefaultLayers();

  // Instantiate (and display) a map object:
  var map = new H.Map(
    document.getElementById('mapContainer'),
    maptypes.vector.normal.map,
    {
      zoom: 13,
      center: { lat:20.297461, lng:-99.186517}
    });

}

function editClient(json){
  alert(json);
  Swal.fire({
  title: 'Agregar Cliente',
  html: getClientHtmlLayout(),
  width:'60%',
  showClass: {
    popup: 'animated fadeInDown faster'
  },
  hideClass: {
    popup: 'animated fadeOutUp faster'
  }
});

var platform = new H.service.Platform({
 'apikey': 'SEI-1bn-6vSC9G7pEalClDrOHK1w38l5IUSl_XrE5s0'
 });

  // Obtain the default map types from the platform object
  var maptypes = platform.createDefaultLayers();

  // Instantiate (and display) a map object:
  var map = new H.Map(
    document.getElementById('mapContainer'),
    maptypes.vector.normal.map,
    {
      zoom: 13,
      center: { lat:20.297461, lng:-99.186517}
    });

}

function getClientHtmlLayout(){

  return '<div class="form-group row">'+
  '  <div class="col-sm-6">'+
        '<input type="text" class="form-control swal2-input" id="inputEmail3" placeholder="Nombre">'+
            '  </div>'+
      '  <div class="col-sm-6">'+
          '<input type="text" class="form-control swal2-input" id="inputEmail3" placeholder="Apellido">'+
      '  </div>'+
      '  <div class="col-sm-4">'+
      '      <select class="custom-select swal2-input">'+
      '      <option selected="">Paquete</option>'+
      '      <option value="1">Basico</option>'+
      '      <option value="2">Avanzado</option>'+
      '      </select>'+
      '  </div>'+
      '  <div class="col-sm-4">'+
      '      <select class="custom-select swal2-input">'+
      '      <option selected="">Contrato</option>'+
      '      <option value="1">Arendamiento</option>'+
      '      <option value="2">Prepago</option>'+
      '      </select>'+
      '  </div>'+
      '  <div class="col-sm-4">'+
      '      <select class="custom-select swal2-input">'+
      '      <option selected="">Sector</option>'+
      '      <option value="1">Cerro</option>'+
      '      <option value="2">Moreno</option>'+
      '      </select>'+
      '  </div>'+
      '  <div class="col-sm-4">'+
          '<input type="date" class="form-control " id="inputEmail3" placeholder="Fecha">'+
      '  </div>'+
      '  <div class="col-sm-4">'+
          '<input type="tel" class="form-control " id="inputEmail3" placeholder="Telefono">'+
      '  </div>'+

  '  <div class="col-sm-12 ">'+
  '<div style="width: 100%; height: 380px" id="mapContainer"></div>'+
      '  </div>'+
    '  </div>';
}
