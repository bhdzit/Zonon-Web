<div class="content-wrapper">
  <section class="content-header">
    <h1>Clientes</h1>
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
            <h3 class="box-title">Tabla de Clientes</h3>
            <button class="btn btn-primary pull-right" onclick="agregarCliente()">Agregar Cliente</button>
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <table id="example1" class="table table-bordered table-striped">
              <thead>
                <tr role="row">
                      <th>No.</th>
                      <th>Clientes</th>
                      <th >Paquete</th>
                      <th>Tipo de Contrato</th>
                      <th>Fecha de Contrato</th>
                      <th>Status</th>
                      <th>Opciones</th></tr>
              </thead>
              <tbody id="clientListTable">
<!--                  <tr>
                  <td>3</td>
                  <td>Christeen</td>
                  <td>Basico</td>
                  <td>1</td>
                  <td>2000-12-12</td>
                  <td>Activo</td>

                </tr>-->

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
      function deleteRow(btn) {
        var row = btn.parentNode.parentNode;
        row.parentNode.removeChild(row);
      }
        var table=document.getElementById("clientListTable");
        var content="";

        $.ajax({
            url:"http://127.0.0.1/wisp-admin/api/v1/clientsdata.php",
            data:{"key":"123"},
            type:"GET"

          }).done(function(res){
            const json=JSON.parse(res);

            for (var i in json)  {
              var cliente=json[i];
                var a={"nombre":"Bryan"};
              content='<tr>'+
              '<td >'+json[i]["wc_id"]+'</td>'+
              '<td>'+json[i]["wc_name"]+" "+json[i]["wc_last_name"]+'</td>'+
              '<td>'+json[i]["wc_pkg"]+'</td>'+
              '<td>'+json[i]["wc_contract"]+'</td>'+
              '<td>'+json[i]["wc_date"]+'</td>'+
              '<td>Activo</td>'+

              '<td><i class=\"fas fa-user-edit\" style=color:#000;  onclick=\"editClient('+a+');\"></i>'+
              '<i class="fas fa-user-minus" style=color:#000; onclick="deleteRow(this)"></i></td>'
              ' </tr>';
              $('#clientListTable').append(content);

            }

            //  table.innerHTML=content;
            $(function () {
                $('#example1').DataTable()

            })
            });

      </script>
