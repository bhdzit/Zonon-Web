const mapmarck='<svg width="50" height="50" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="broadcast-tower" class="svg-inline--fa fa-broadcast-tower fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M150.94 192h33.73c11.01 0 18.61-10.83 14.86-21.18-4.93-13.58-7.55-27.98-7.55-42.82s2.62-29.24 7.55-42.82C203.29 74.83 195.68 64 184.67 64h-33.73c-7.01 0-13.46 4.49-15.41 11.23C130.64 92.21 128 109.88 128 128c0 18.12 2.64 35.79 7.54 52.76 1.94 6.74 8.39 11.24 15.4 11.24zM89.92 23.34C95.56 12.72 87.97 0 75.96 0H40.63c-6.27 0-12.14 3.59-14.74 9.31C9.4 45.54 0 85.65 0 128c0 24.75 3.12 68.33 26.69 118.86 2.62 5.63 8.42 9.14 14.61 9.14h34.84c12.02 0 19.61-12.74 13.95-23.37-49.78-93.32-16.71-178.15-.17-209.29zM614.06 9.29C611.46 3.58 605.6 0 599.33 0h-35.42c-11.98 0-19.66 12.66-14.02 23.25 18.27 34.29 48.42 119.42.28 209.23-5.72 10.68 1.8 23.52 13.91 23.52h35.23c6.27 0 12.13-3.58 14.73-9.29C630.57 210.48 640 170.36 640 128s-9.42-82.48-25.94-118.71zM489.06 64h-33.73c-11.01 0-18.61 10.83-14.86 21.18 4.93 13.58 7.55 27.98 7.55 42.82s-2.62 29.24-7.55 42.82c-3.76 10.35 3.85 21.18 14.86 21.18h33.73c7.02 0 13.46-4.49 15.41-11.24 4.9-16.97 7.53-34.64 7.53-52.76 0-18.12-2.64-35.79-7.54-52.76-1.94-6.75-8.39-11.24-15.4-11.24zm-116.3 100.12c7.05-10.29 11.2-22.71 11.2-36.12 0-35.35-28.63-64-63.96-64-35.32 0-63.96 28.65-63.96 64 0 13.41 4.15 25.83 11.2 36.12l-130.5 313.41c-3.4 8.15.46 17.52 8.61 20.92l29.51 12.31c8.15 3.4 17.52-.46 20.91-8.61L244.96 384h150.07l49.2 118.15c3.4 8.16 12.76 12.01 20.91 8.61l29.51-12.31c8.15-3.4 12-12.77 8.61-20.92l-130.5-313.41zM271.62 320L320 203.81 368.38 320h-96.76z"></path></svg>';
var marker;
var map;
function agregarCliente(){
  Swal.fire({
  title: 'Agregar Torre',
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
map   = new H.Map(
    document.getElementById('mapContainer'),
    maptypes.vector.normal.map,
    {
      zoom: 13,
      center: { lat:20.297461, lng:-99.186517}
    });

}
function agregarTorre(){
const { value: formValues } = Swal.fire({
  title: 'Agregar Cliente',
  html: getTorreHtmlLayout(),
  width:'60%',
  showClass: {
    popup: 'animated fadeInDown faster'

  },

  hideClass: {
    popup: 'animated fadeOutUp faster'
  },
  preConfirm:function(){
    $.ajax({
        url:"./controller/tower.php",
        data:{"acction":"setTower","wt_name":$("#torreNombre").val(),"wt_altura":$("#torreAltura").val(),"wt_point":$("#torrePoint").val()},
        type:"POST"
      }).done(function(res){
                      const Toast = Swal.mixin({
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 3000,
                      timerProgressBar: true,
                      onOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                      })

                      Toast.fire({
                            icon: 'success',
                            title: 'Signed in successfully'
                      })
                          setTowerData();
                      });

    }

});
setMap();
$(".mapPoint").each(function(){
  addMarck({lat:$(this).find("input")[0].value,lng:$(this).find("input")[1].value})
    console.log($(this).find("input")[0].value);
    });


}
function editTower(json){

  Swal.fire({
    title: 'Modificar  Torre',
    html: getTorreHtmlLayout(),
    width:'60%',
    showClass: {
      popup: 'animated fadeInDown faster'
    },
    hideClass: {
      popup: 'animated fadeOutUp faster'
    },
    preConfirm:function(){
      $.ajax({
          url:"./controller/tower.php",
          data:{"acction":"updateTower","wt_id":json.wt_id,"wt_name":$("#torreNombre").val(),"wt_altura":$("#torreAltura").val(),"wt_point":$("#torrePoint").val()},
          type:"POST"
        }).done(function(res){

                        const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        onOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                          }
                        })

                        Toast.fire({
                              icon: 'success',
                              title: 'Signed in successfully'
                        })
                            setTowerData();

                        });

    }

  });

  $("#torreNombre").val(json.wt_name);
  $("#torreAltura").val(json.wt_Altura);
  $("#torrePoint").val(json.wt_ST_Y+","+json.wt_ST_X);
  setMap();
  map.addEventListener('tap', function(evt){
    //alert("asdasd");
    map.removeObject(marker);
    var coord = map.screenToGeo(evt.currentPointer.viewportX,
            evt.currentPointer.viewportY);

    addMarck({lat:coord.lat,lng:coord.lng});
  });
  addMarck({lat:json.wt_ST_Y,lng:json.wt_ST_X})

}
function showTowerPosition(lat,lng){
        Swal.fire({
        title: 'Ubicacion de Torre',
        html: '<div style="width: 100%; height: 380px" id="mapContainer"></div>',
        width:'60%',
        showClass: {
          popup: 'animated fadeInDown faster'
        },
        hideClass: {
          popup: 'animated fadeOutUp faster'
        }
      });

setMap();
addMarck({lat:lat,lng:lng});
}
function setMap(){

 var platform = new H.service.Platform({
   'apikey': 'SEI-1bn-6vSC9G7pEalClDrOHK1w38l5IUSl_XrE5s0'
   });

    // Obtain the default map types from the platform object
    var defaultLayers = platform.createDefaultLayers();

    //Step 2: initialize a map - this map is centered over Europe
    map = new H.Map(document.getElementById('mapContainer'),
      defaultLayers.vector.normal.map,{
      center: { lat:20.297461, lng:-99.186517},
      zoom: 15,
      pixelRatio: window.devicePixelRatio || 1
    });
      // add a resize listener to make sure that the map occupies the whole container
  window.addEventListener('resize', () => map.getViewPort().resize());

  //Step 3: make the map interactive
  // MapEvents enables the event system
  // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
  var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

  // Create the default UI components
  var ui = H.ui.UI.createDefault(map, defaultLayers);

  // Now use the map as required...
  window.onload = function () {
    moveMapToBerlin(map);
  }

}
function getCords(evt){
    var coord = map.screenToGeo(evt.currentPointer.viewportX,
            evt.currentPointer.viewportY);

    addMarck({lat:coord.lat,lng:coord.lng});
      $("#torrePoint").val(coord.lat+","+coord.lng);
      map.removeEventListener("tap",getCords);
}
function addMarck(cords){
  var icon = new H.map.Icon(mapmarck);
  marker = new H.map.Marker(cords, {icon: icon});
//
  map.addObject(marker);

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
      zoom: 20,
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
function getTorreHtmlLayout(){
  return '<div class="form-group row">'+
  '  <div class="col-sm-6">'+
    '<input type="text" class="form-control swal2-input" id="torreNombre" placeholder="Nombre">'+
    '  </div>'+
    '  <div class="col-sm-6">'+
    '<input type="number" class="form-control swal2-input" id="torreAltura" placeholder="Altura">'+
      '<input  type="hidden"class="form-control swal2-input" id="torrePoint" >'+
    '  </div>'+
    '  <div class="col-sm-12 ">'+
    '<div style="width: 100%; height: 380px" id="mapContainer"></div>'+
    '  </div>'+
    '  </div>'+
    '  <script type="text/javascript">setMap()</script>';

}
