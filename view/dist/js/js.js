const mapmarck='<svg width="25" height="25" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="broadcast-tower" class="svg-inline--fa fa-broadcast-tower fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M150.94 192h33.73c11.01 0 18.61-10.83 14.86-21.18-4.93-13.58-7.55-27.98-7.55-42.82s2.62-29.24 7.55-42.82C203.29 74.83 195.68 64 184.67 64h-33.73c-7.01 0-13.46 4.49-15.41 11.23C130.64 92.21 128 109.88 128 128c0 18.12 2.64 35.79 7.54 52.76 1.94 6.74 8.39 11.24 15.4 11.24zM89.92 23.34C95.56 12.72 87.97 0 75.96 0H40.63c-6.27 0-12.14 3.59-14.74 9.31C9.4 45.54 0 85.65 0 128c0 24.75 3.12 68.33 26.69 118.86 2.62 5.63 8.42 9.14 14.61 9.14h34.84c12.02 0 19.61-12.74 13.95-23.37-49.78-93.32-16.71-178.15-.17-209.29zM614.06 9.29C611.46 3.58 605.6 0 599.33 0h-35.42c-11.98 0-19.66 12.66-14.02 23.25 18.27 34.29 48.42 119.42.28 209.23-5.72 10.68 1.8 23.52 13.91 23.52h35.23c6.27 0 12.13-3.58 14.73-9.29C630.57 210.48 640 170.36 640 128s-9.42-82.48-25.94-118.71zM489.06 64h-33.73c-11.01 0-18.61 10.83-14.86 21.18 4.93 13.58 7.55 27.98 7.55 42.82s-2.62 29.24-7.55 42.82c-3.76 10.35 3.85 21.18 14.86 21.18h33.73c7.02 0 13.46-4.49 15.41-11.24 4.9-16.97 7.53-34.64 7.53-52.76 0-18.12-2.64-35.79-7.54-52.76-1.94-6.75-8.39-11.24-15.4-11.24zm-116.3 100.12c7.05-10.29 11.2-22.71 11.2-36.12 0-35.35-28.63-64-63.96-64-35.32 0-63.96 28.65-63.96 64 0 13.41 4.15 25.83 11.2 36.12l-130.5 313.41c-3.4 8.15.46 17.52 8.61 20.92l29.51 12.31c8.15 3.4 17.52-.46 20.91-8.61L244.96 384h150.07l49.2 118.15c3.4 8.16 12.76 12.01 20.91 8.61l29.51-12.31c8.15-3.4 12-12.77 8.61-20.92l-130.5-313.41zM271.62 320L320 203.81 368.38 320h-96.76z"></path></svg>';
var circlesvg='<svg width="10" height="10"  aria-hidden="true" focusable="false" data-prefix="far" data-icon="circle" class="svg-inline--fa fa-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200z"></path></svg>';

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

    map.addEventListener('tap',function(evt){
      var coord = map.screenToGeo(evt.currentPointer.viewportX,
              evt.currentPointer.viewportY);
        if(marker!=null)map.removeObject(marker);
        addMarck({lat:coord.lat,lng:coord.lng});
        $("#torrePoint").val(coord.lat+","+coord.lng);
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
  marker=null;
  map.addEventListener('tap',function(evt){
    var coord = map.screenToGeo(evt.currentPointer.viewportX,
            evt.currentPointer.viewportY);
if(marker!=null)map.removeObject(marker);
    addMarck({lat:coord.lat,lng:coord.lng});
      $("#torrePoint").val(coord.lat+","+coord.lng);
  });
  addMarck({lat:json.wt_ST_Y,lng:json.wt_ST_X})

}
function showTowerPosition(lng,lat){
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
  //  moveMapToBerlin(map);
  }

}
function getCords(evt){
    var coord = map.screenToGeo(evt.currentPointer.viewportX,
            evt.currentPointer.viewportY);

    addMarck({lat:coord.lat,lng:coord.lng});
      $("#torrePoint").val(coord.lat+","+coord.lng);
  //    map.removeEventListener("tap",getCords);
}
function addMarck(cords){

  var icon = new H.map.Icon(mapmarck);
  marker = new H.map.Marker(cords, {icon: icon});
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
function agregarSector(){
  Swal.fire({
  title: 'Agregar Sector',
  html: getSectorHtlmLayout(),
  width:'60%',
  showClass: {
    popup: 'animated fadeInDown faster'
  },
  hideClass: {
    popup: 'animated fadeOutUp faster'
  },

  preConfirm:function(){
    $.ajax({
        url:"./controller/sectorController.php",
        data:{"acction":"setSector",
            "wsct_name":$("#wsct_name").val(),
            "wsct_dist":$("#wsct_dist").val(),
            "wsct_antennatype":$("#wsct_antennatype").val(),
            "wsct_address":$("#wsct_address").val(),
            "wsct_tower":$("#wsct_tower").val(),
          "wsct_description":$("#wsct_description").val()  },
        type:"POST"
      }).done(function(res){
        alert(res);
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
                          setSectorData();
                      });


    }
});
setMap();
setSectorTowerAndAntennasEvents();
}
function setSectorTowerAndAntennasEvents(){
return  $.ajax({
      url:"http://127.0.0.1/wisp-admin/api/v1/towerdata.php",
      data:{"key":"123"},
      type:"GET"

    }).done(function(res){
    var object;
      const json=JSON.parse(res);



      for (var i in json)  {
        var cliente=json[i];
        $("#wsct_tower").append(" <option value=\""+json[i]["wt_id"]+"\">"+json[i]["wt_name"]+"</option>");
      }
      $("#wsct_tower").change(function(evt){
          var lat=json[$("#wsct_tower").val()]["wt_ST_Y"], lng=json[$("#wsct_tower").val()]["wt_ST_X"];
        if(object!=null){
          map.removeObject(object);
          map.removeObject(marker);
          }
          object= ($("#wsct_antennatype").val()==1) ? object=dreawSectoralAntenna(lat,lng,$("#wsct_dist").val()):object=dreawOmniAntenna(lat,lng,800);
          addMarck({lat:lat ,lng:lng});
          map.addObject(object);
      });

      $("#wsct_antennatype").change(function(){
          $("#apperdiv").toggleClass( "hide",function(evt){
            if(evt)$(this).addClass("hide");
            else $(this).removeClass("hide");
          });
        var antennatype=$("#wsct_antennatype").val();
        if(object!=null){
          map.removeObject(object);
          map.removeObject(marker);
          }
        if(antennatype!=0 && $("#wsct_tower").val()!=0){

        var lat=json[$("#wsct_tower").val()]["wt_ST_Y"], lng=json[$("#wsct_tower").val()]["wt_ST_X"];
          object= (antennatype==1) ? object=dreawSectoralAntenna(lat,lng,$("#wsct_dist").val()):object=dreawOmniAntenna(lat,lng,800);
          addMarck({lat:lat ,lng:lng});
          map.addObject(object);
        }
      });

      $("#wsct_dist").change(function(evt){

        if(antennatype!=0 && $("#wsct_tower").val()!=0){

          if($("#wsct_antennatype").val()==2){

          object.getObjects()[0].setRadius($("#wsct_dist").val());
          // use circle's updated geometry for outline polyline
          var outlineLinestring = object.getObjects()[0].getGeometry().getExterior();

          // extract first point of the outline LineString and push it to the end, so the outline has a closed geometry
          outlineLinestring.pushPoint(outlineLinestring.extractPoint(0));
          object.getObjects()[1].setGeometry(outlineLinestring);
        }
        if($("#wsct_antennatype").val()==1){

          var lat=json[$("#wsct_tower").val()]["wt_ST_Y"], lng=json[$("#wsct_tower").val()]["wt_ST_X"];

          map.removeObject(object);
          object=dreawSectoralAntenna(lat,lng,$("#wsct_dist").val());
          map.addObject(object);

        }
        }
      });
      $("#apper").change(function(){
        var lat=json[$("#wsct_tower").val()]["wt_ST_Y"], lng=json[$("#wsct_tower").val()]["wt_ST_X"];

        map.removeObject(object);
        object=dreawSectoralAntenna(lat,lng,$("#wsct_dist").val());
        map.addObject(object);
      });

    });


}
function editSector(json){
  Swal.fire({
  title: 'Editar Sector',
  html: getSectorHtlmLayout(),
  width:'60%',
  showClass: {
    popup: 'animated fadeInDown faster'
  },
  hideClass: {
    popup: 'animated fadeOutUp faster'
  },

  preConfirm:function(){
    $.ajax({
        url:"./controller/sectorController.php",
        data:{"acction":"updateSector",
            "wsct_id":json.ws_id,
            "wsct_name":$("#wsct_name").val(),
            "wsct_dist":$("#wsct_dist").val(),
            "wsct_antennatype":$("#wsct_antennatype").val(),
            "wsct_address":$("#wsct_address").val(),
            "wsct_tower":$("#wsct_tower").val(),
            "wsct_description":$("#wsct_description").val(),
            "wsct_apper":$("#apper").val(),
            "wsct_deg":$("#deg").val()
          },
        type:"POST"
      }).done(function(res){
        console.log(res);
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
                          setSectorData();
                      });


    }
});
setSectorTowerAndAntennasEvents().then(function(){
  setMap();
  if(json.wsct_antenna_id==1){
          getSectorialAntennaData(json.ws_id).then(function(){
              $("#apper").trigger('change');
          });
  }

  $("#wsct_name").val(json.ws_name);
  $("#wsct_antennatype").val(json.wsct_antenna_id);
  $("#wsct_antennatype").trigger('change');
  $("#wsct_tower").val(json.wsct_tower_id);
  $("#wsct_tower").trigger('change');
  $("#wsct_address").val(json.wsct_ip);
  $("#wsct_description").val(json.wsct_description);
  $("#wsct_dist").val(json.ws_dist);

});

}
function getSectorialAntennaData(id){
  return $.ajax({
      url:"./controller/sectorController.php",
      data:{"acction":"getData", "id":id},
      type:"POST"
    }).done(function(res){
      res=JSON.parse(res);
      $("#apper").val(res["wsec_rank"]);
      $("#deg").val(res["wsec_deg"]);

    });


}
function dreawOmniAntenna(lat,lng,dist){


  var circle = new H.map.Circle({lat:lat,lng:lng},dist,
        {
          style: {fillColor: 'rgba(250, 250, 0, 0.7)', lineWidth: 0}
        }
      ),
      circleOutline = new H.map.Polyline(
        circle.getGeometry().getExterior(),
        {
          style: {lineWidth: 8, strokeColor: 'rgba(255, 0, 0, 0)'}
        }
      ),
      circleGroup = new H.map.Group({
        volatility: true, // mark the group as volatile for smooth dragging of all it's objects
        objects: [circle, circleOutline]
      }),
      circleTimeout;

  // ensure that the objects can receive drag events
  circle.draggable = true;
  circleOutline.draggable = true;

  // extract first point of the circle outline polyline's LineString and
  // push it to the end, so the outline has a closed geometry
  circleOutline.getGeometry().pushPoint(circleOutline.getGeometry().extractPoint(0));

  // add group with circle and it's outline (polyline)
//  map.addObject(circleGroup);

  // event listener for circle group to show outline (polyline) if moved in with mouse (or touched on touch devices)
  circleGroup.addEventListener('pointerenter', function(evt) {
    var currentStyle = circleOutline.getStyle(),
        newStyle = currentStyle.getCopy({
          strokeColor: 'rgb(255, 0, 0)'
        });

    if (circleTimeout) {
      clearTimeout(circleTimeout);
      circleTimeout = null;
    }
    // show outline
    circleOutline.setStyle(newStyle);
  }, true);

  // event listener for circle group to hide outline if moved out with mouse (or released finger on touch devices)
  // the outline is hidden on touch devices after specific timeout
  circleGroup.addEventListener('pointerleave', function(evt) {
    var currentStyle = circleOutline.getStyle(),
        newStyle = currentStyle.getCopy({
          strokeColor: 'rgba(255, 0, 0, 0)'
        }),
        timeout = (evt.currentPointer.type == 'touch') ? 1000 : 0;

    circleTimeout = setTimeout(function() {
      circleOutline.setStyle(newStyle);
    }, timeout);
    document.body.style.cursor = 'default';
  }, true);

  // event listener for circle group to change the cursor if mouse position is over the outline polyline (resizing is allowed)
  circleGroup.addEventListener('pointermove', function(evt) {
    if (evt.target instanceof H.map.Polyline) {
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = 'default'
    }
  }, true);

  // event listener for circle group to resize the geo circle object if dragging over outline polyline
  circleGroup.addEventListener('drag', function(evt) {
    var pointer = evt.currentPointer,
        distanceFromCenterInMeters = circle.getCenter().distance(map.screenToGeo(pointer.viewportX, pointer.viewportY));

    // if resizing is alloved, set the circle's radius
    if (evt.target instanceof H.map.Polyline) {
      circle.setRadius(distanceFromCenterInMeters);

      // use circle's updated geometry for outline polyline
      var outlineLinestring = circle.getGeometry().getExterior();

      // extract first point of the outline LineString and push it to the end, so the outline has a closed geometry
      outlineLinestring.pushPoint(outlineLinestring.extractPoint(0));
      circleOutline.setGeometry(outlineLinestring);

      // prevent event from bubling, so map doesn't receive this event and doesn't pan
      $("#wsct_dist").val(parseInt(circle.getRadius(),10));
      evt.stopPropagation();
    }
  }, true);
 return circleGroup;
//  alert(circle.getGeometry());

}
function dreawSectoralAntenna(lat,lng,d){
  var lineString = new H.geo.LineString();
  lineString.pushPoint({lat:lat,lng:lng});
  var apertura=$("#apper").val()/2,deg=$("#deg").val();

  //i=(-88-(45))=-133
  //-88+45=-43
  //-133<-44
var limit=((deg*1)+apertura);

var i=(deg-apertura)*1;
    //console.dir(typeof i+"<"+ typeof limit+"||"+deg+","+apertura);
   for(i;i<limit;i++){
      //   console.log((deg-apertura)+"<"+limit+"||"+deg+","+apertura);
       var point=getLatLng(toRad(lat),d,i,toRad(lng));

        lineString.pushPoint({lat:point.lat, lng:point.lng});
//i++;
     };
lineString.pushPoint({lat:lat,lng:lng});
     var svgCircle = '',
      polyline = new H.map.Polyline(
        lineString,
        {
          style: {fillColor: 'rgba(150, 100, 0, .8)', lineWidth: 10}
        }
      ),
      verticeGroup = new H.map.Group({
        visibility: false
      }),
      mainGroup = new H.map.Group({
        volatility: true, // mark the group as volatile for smooth dragging of all it's objects
        objects: [polyline, verticeGroup]
      }),
      polylineTimeout;

  // ensure that the polyline can receive drag events
  polyline.draggable = true;

  // create markers for each polyline's vertice which will be used for dragging
  //  console.log(polyline.getGeometry().getPointCount());
  polyline.getGeometry().eachLatLngAlt(function(lat, lng, alt, index) {
    if(index==(polyline.getGeometry().getPointCount()/2)){
    var vertice = new H.map.Marker(
      {lat, lng},
      {
        icon: new H.map.Icon(circlesvg)
      }
    );
    vertice.draggable = true;
    vertice.setData({'verticeIndex': index})
    verticeGroup.addObject(vertice);
  }
  });

  // add group with polyline and it's vertices (markers) on the map
  map.addObject(mainGroup);

  // event listener for main group to show markers if moved in with mouse (or touched on touch devices)
  mainGroup.addEventListener('pointerenter', function(evt) {
    if (polylineTimeout) {
      clearTimeout(polylineTimeout);
      polylineTimeout = null;
    }

    // show vertice markers
    verticeGroup.setVisibility(true);
  }, true);

  // event listener for main group to hide vertice markers if moved out with mouse (or released finger on touch devices)
  // the vertice markers are hidden on touch devices after specific timeout
  mainGroup.addEventListener('pointerleave', function(evt) {
    var timeout = (evt.currentPointer.type == 'touch') ? 1000 : 0;

    // hide vertice markers
    polylineTimeout = setTimeout(function() {
      verticeGroup.setVisibility(false);
    }, timeout);
  }, true);

  // event listener for vertice markers group to change the cursor to pointer if mouse position enters this group
  verticeGroup.addEventListener('pointerenter', function(evt) {
    document.body.style.cursor = 'pointer';
  }, true);

  // event listener for vertice markers group to change the cursor to default if mouse leaves this group
  verticeGroup.addEventListener('pointerleave', function(evt) {
    document.body.style.cursor = 'default';
  }, true);

  // event listener for vertice markers group to resize the geo polyline object if dragging over markers
  verticeGroup.addEventListener('drag', function(evt) {
    var pointer = evt.currentPointer,
        geoLineString = polyline.getGeometry(),
        geoPoint = map.screenToGeo(pointer.viewportX, pointer.viewportY);

    // set new position for vertice marker
    evt.target.setGeometry(geoPoint);

    // set new position for polyline's vertice
  //  console.log(geoPoint);
//    map.removeObject(mainGroup);
var origen=new H.math.Point (lat,lng);

//  console.log(geoPoint.distance({lat:lat,lng:lng}));

var λ1=lng,λ2=geoPoint.lng;
var φ1=lat,φ2=geoPoint.lat;
  var y = Math.sin(λ2-λ1) * Math.cos(φ2);
var x = Math.cos(φ1)*Math.sin(φ2) -
        Math.sin(φ1)*Math.cos(φ2)*Math.cos(λ2-λ1);
var brng = toDeg(Math.atan2(y, x));


$("#wsct_dist").val(parseInt(geoPoint.distance({lat:lat,lng:lng}),10));
$("#deg").val(parseInt(brng));
  var line = new H.geo.LineString();
  line.pushPoint({lat:lat,lng:lng});
    var apertura=$("#apper").val()/2;
     for(var i=brng-apertura;i<brng+apertura;){
        var point=getLatLng(toRad(lat),geoPoint.distance({lat:lat,lng:lng}),i,toRad(lng));
        line.pushPoint({lat:point.lat, lng:point.lng});
        i++;
     };
     line.pushPoint({lat:lat,lng:lng});
     polyline.setGeometry(line);

    // stop propagating the drag event, so the map doesn't move
    evt.stopPropagation();
  }, true);


return mainGroup;
}
function getLatLng(lat1,dist,brng,lon1){
// dist = typeof(dist)=='number' ? dist : typeof(dist)=='string' && dist.trim()!='' ? +dist : NaN;
  dist = dist/6371000;  // convert dist to angular distance in radians
  brng = toRad(brng);  //
//  var lat1 = this._lat.toRad(), lon1 = this._lon.toRad();

  var lat2 = Math.asin( Math.sin(lat1)*Math.cos(dist) +
                        Math.cos(lat1)*Math.sin(dist)*Math.cos(brng) );
  var lon2 = lon1 + Math.atan2(Math.sin(brng)*Math.sin(dist)*Math.cos(lat1),
                               Math.cos(dist)-Math.sin(lat1)*Math.sin(lat2));
  lon2 = (lon2+3*Math.PI) % (2*Math.PI) - Math.PI;  // normalise to -180..+180º
//console.log(dist);
  return ({lat:toDeg(lat2), lng:toDeg(lon2)});
}
function toRad(Value) {
    /** Converts numeric degrees to radians */
    return Value * Math.PI / 180;
}
function toDeg(Value) {
    /** Converts numeric degrees to radians */
    return Value *  180/Math.PI;
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
function getSectorHtlmLayout(){
  /*
            "wsct_address":,
            "wsct_description"*/
  return '<div class="form-group row">'+
              '<div class="col-sm-4">'+
                '<input type="text" class="form-control swal2-input" id="wsct_name" placeholder="Nombre">'+
               '</div>'+
            '  <div class="col-sm-4">'+
            '      <select id="wsct_antennatype" class="custom-select swal2-input">'+
            '      <option value="0" selected="">Tipo de Antena</option>'+
            '      <option value="1">Sectorial</option>'+
            '      <option value="2">Omnidirectional</option>'+
            '      </select>'+
            '  </div>'+
            '  <div class="col-sm-4">'+
            '      <select id="wsct_tower" class="custom-select swal2-input">'+
            '      <option  value="0" selected="">Torre</option>'+

            '      </select>'+
            '  </div>'+
            '<div class="col-sm-4">'+
              '<input  type="text" class="form-control swal2-input" id="wsct_address" placeholder="IP" >'+
             '</div>'+
             '<div class="col-sm-4">'+
               '<input  type="text" class="form-control swal2-input" id="wsct_description" placeholder="descripcion" >'+
              '</div>'+
             '<div class="col-sm-2 distance container">'+
               '<input style="max-width:100%;" type="number" class="form-control swal2-input" id="wsct_dist" placeholder="Distancia" value="800">'+
              '</div>'+
             '<div id="apperdiv" class="col-sm-2 hide">'+
             '      <select id="apper" class="custom-select swal2-input">'+
             '      <option  value="0" selected="">Apertura</option>'+
             '      <option  value="30" >30°</option>'+
             '      <option  value="90" >90°</option>'+
             '      <option  value="120" >120°</option>'+
             '      </select>'+
             '  </div>'+
              '</div>'+
           '<input style="max-width:100%;" type="number" class="swal2-input db" id="deg" hidden value="-88">'+
            '  <div class="col-sm-12 ">'+
          '<div style="width: 100%; height: 380px" id="mapContainer"></div>'+
        '</div>'+
        '  <script type="text/javascript">setMap()</script>';

}
