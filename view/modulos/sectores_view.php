
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
  <section class="content-header">
    <h1>Sectores</h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i>Sectores</a></li>
      <li class="active">Here</li>
    </ol>
  </section>

  <!-- Main content -->
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
            <div class="box">
          <div class="box-header">
            <h3 class="box-title">Tabla de Sectores</h3>
            <button class="btn btn-primary pull-right" onclick="agregarSector()">Agregar Sector</button>
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <table id="example1" class="table table-bordered table-striped">
              <thead>
                <tr role="row">
                      <th>No.</th>
                      <th>Nombre</th>
                      <th >Torre</th>
                      <th>Tipo de Antena</th>

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
<!-- /.content-wrapper -->
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
        url:"./controller/sectorController.php",
        data:{"acction":"delete","ws_id":id},
        type:"POST"

      }).done(function(res){
          setSectorData();

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
function setSectorData(){
$("#clientListTable").empty();
$.ajax({
    url:"http://127.0.0.1/wisp-admin/api/v1/sectordata.php",
    data:{"key":"123"},
    type:"GET"

  }).done(function(res){
    const json=JSON.parse(res);

    for (var i in json)  {
      var cliente=json[i];

      content='<tr>'+
      '<td >'+json[i]["ws_id"]+'</td>'+
      '<td>'+json[i]["ws_name"]+'</td>'+
      '<td>'+json[i]["ws_tower"]+'</td>'+
      '<td>'+json[i]["ws_antenna_type"]+'</td>'+
      '<td><i class=\"fas fa-edit\" style=color:#000;  onclick=\'editSector('+JSON.stringify(json[i])+');\'></i>'+
      '<i class=\"far fa-minus-square\" style=color:#000; onclick="deleteRow('+json[i]["ws_id"]+')"></i></td>'
      ' </tr>';
      $('#clientListTable').append(content);

    }

    //  table.innerHTML=content;
    $(function () {
        $('#example1').DataTable()

    })
    });
  }
  setSectorData()
</script>
