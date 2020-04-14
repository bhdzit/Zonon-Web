<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
  <section class="content-header">
    <h1>Paquetes</h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i>Pauqetes</a></li>
      <li class="active">Here</li>
    </ol>
  </section>

  <!-- Main content -->
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
            <div class="box">
          <div class="box-header">
            <h3 class="box-title">Tabla de Paquetes</h3>
            <button class="btn btn-primary pull-right" onclick="agregarCliente()">Agregar Paquete</button>
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <table id="example1" class="table table-bordered table-striped">
              <thead>
                <tr role="row">
                      <th>No.</th>
                      <th>Nombre</th>
                      <th >Subida</th>
                      <th>Bajada</th>
                      <th>Precio</th>
                      <th>Descripcion</th>
                      <th>Opciones</th>
                      </tr>
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
function setPkgData(){
$("#clientListTable").empty();
$.ajax({
    url:"http://127.0.0.1/wisp-admin/api/v1/pkgdata.php",
    data:{"key":"123"},
    type:"GET"

  }).done(function(res){
    const json=JSON.parse(res);

    for (var i in json)  {
      var cliente=json[i];

      content='<tr>'+
      '<td>'+json[i]["wp_id"]+'</td>'+
      '<td>'+json[i]["wp_name"]+'</td>'+
      '<td>'+json[i]["wp_tx"]+'mb</td>'+
      '<td>'+json[i]["wp_rx"]+'mb</td>'+
      '<td>$'+json[i]["wp_price"]+'</td>'+
      '<td>'+json[i]["wp_description"]+'</td>'+
      '<td><i class=\"fas fa-edit\" style=color:#000;  onclick=\'editSector('+JSON.stringify(json[i])+');\'></i>'+
      '<i class=\"far fa-minus-square\" style=color:#000; onclick="deleteRow('+json[i]["wp_id"]+')"></i></td>'
      ' </tr>';
      $('#clientListTable').append(content);

    }

    //  table.innerHTML=content;
    $(function () {
        $('#example1').DataTable()

    })
    });
  }
  setPkgData();
</script>
