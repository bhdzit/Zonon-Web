<div class="content-wrapper">
  <section class="content-header">
    <h1>Torres</h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i>Clientes</a></li>
      <li class="active">Here</li>
    </ol>
  </section>

  <!-- Main content -->
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
            <div class="box">
          <div class="box-header">
            <h3 class="box-title">Tabla de Torres</h3>
            <button class="btn btn-primary pull-right" onclick="agregarTorre()">Agregar Torres</button>
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <table id="example1" class="table table-bordered table-striped">
              <thead>
                <tr role="row">
                      <th>No.</th>
                      <th>Nombre</th>
                      <th>Altura</th>
                      <th>Ubiucacion</th>
                      <th>Opciones</th></tr>
              </thead>
              <tbody id="clientListTable">

              </tbody>
              <tfoot>
              </tfoot>
            </table>
          </div>
          <!-- /.box-body -->
        </div>
        <!-- /.box -->
      </div>
      <!-- /.col -->
    </div>
    <!-- /.row -->
  </section>


</div>
<?php
	include("view/content/footer_view.php");
?>
<script type="text/javascript">
function deleteRow(id) {
  Swal.fire({
  title: '¿Estas Seguro?',
  text: "No se podera recuperar la infromacion",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Si,Eliminarla'
}).then((result) => {
  if (result.value) {
    $.ajax({
        url:"./controller/tower.php",
        data:{"acction":"delete","wt_id":id},
        type:"POST"

      }).done(function(res){
          setTowerData();
          Swal.fire(
          'Eliminada!',
          'La torre se a elminido.',
          'success'
  )
      });
  }
});



}

  var content="";
function setTowerData(){
  $("#clientListTable").empty();
  $.ajax({
      url:"http://127.0.0.1/wisp-admin/api/v1/towerdata.php",
      data:{"key":"123"},
      type:"GET"

    }).done(function(res){
      const json=JSON.parse(res);

      for (var i in json)  {
        var cliente=json[i];

        content='<tr>'+
        '<td >'+json[i]["wt_id"]+'</td>'+
        '<td>'+json[i]["wt_name"]+'</td>'+
        '<td>'+json[i]["wt_Altura"]+'</td>'+
        '<td class="mapPoint"><input type="hidden" value=\"'+json[i]["wt_ST_Y"]+'\">'+
        '<input type="hidden" value=\"'+json[i]["wt_ST_X"]+'\">'+
        '<i onclick="showTowerPosition('+json[i]["wt_ST_X"]+","+json[i]["wt_ST_Y"]+')" class=\"fas fa-map-marker-alt\" style=color:#000;></i></td>'+
        '<td><i class=\"fas fa-edit\" style=color:#000;  onclick=\'editTower('+JSON.stringify(json[i])+');\'></i>'+
        '<i class=\"far fa-minus-square\" style=color:#000; onclick="deleteRow('+json[i]["wt_id"]+')"></i></td>'
        ' </tr>';
        $('#clientListTable').append(content);

      }

      //  table.innerHTML=content;
      $(function () {
          $('#example1').DataTable()

      })
      });
    }
    setTowerData();
</script>
