
<?php
header("Content-Type: application/json; charset=UTF-8");
$obj = json_decode($_GET["x"], false);

//$valor = $_REQUEST["bryan"];
require_once 'dompdf/autoload.inc.php';
use Dompdf\Dompdf;
$content ='
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
        <link href="./css/pdf.css" rel="stylesheet">




  </head>
  <body>
<div class="page-header"><h3>RECIBO DE PAGO</h3></div>

<div align="center">

<input type="hidden">

<table  height="325" border="2" cellspacing="1">
  <tbody>
    <tr>
      <td rowspan="2"><img  src="img/logo.png" width="204" height="127"></td>
      <td rowspan="2"><p align="center">
          <strong>DIRECCION</strong></p>
          <div align="center" class="col-sm-12">
            <p><span class="icon-location"></span>Emiliano Zapata #22, Xochitlan, Progreso de O. Hgo.</p>
            <p><span class="icon-mobile"></span> 7721145890</p>
            <p><span class="icon-mail-alt"></span> carlos-beto88@hotmail.com</p>
          </div>
          <br>

        </td>
      <td width="182" height="45"><h1 align="center">RECIBO</h1></td>
    </tr>
    <tr>
      <td height="40" style="text-align: center"><strong style="color: #FF0105"></strong> <strong id="pay_date"style="color: #FF0105">'.$obj->fecha_pago.'</strong></td>

    </tr>
    <tr>
      <td colspan="3"><strong id="domicilio">RECIBIMOS DE: '.$obj->nombre.'CON DOMICILIO EN: '.$obj->direccion.'</strong><p><strong></strong></p></td>
      </tr>
    <tr>
      <td bgcolor="#F0F0F0" bordercolor="#000000" width="206"><div align="center"><strong>DESCRIPCION</strong></div></td>
      <td bgcolor="#F0F0F0" bordercolor="#000000" width="206"><div align="center"><strong>Paquete</strong></div></td>
      <td bgcolor="#F0F0F0" bordercolor="#000000" width="182"><div align="center"><strong>IMPORTE</strong></div></td>
    </tr>
    <tr>
      <td height="61"><strong>Renta Mensual de Internet</strong></td>
      <td>
      '.$obj->paquete.'
      </td>
            <td style="text-align: center"><div align="center" id="prices_pkg"><strong>'.$obj->costo.'</strong></div></td>
    </tr>
    <tr>
      <td colspan="2"><div align="right"><strong>TOTAL:</strong></div></td>
      <td><div align="center"><strong id="total">'.$obj->total.'</strong></div></td>
    </tr>
      </tbody>
</table>
<p>&nbsp;</p>
<table border="1" cellspacing="1">
  <tbody>
    <tr>
      <td colspan="6" height="30" bgcolor="#F0F0F0" bordercolor="#000000"><div align="center"><strong>DETALLES DE PAGO </strong></div></td>
      </tr>
    <tr>

      <td 	width="80"><strong>FECHA DE PAGO: </strong></td>
      <td 	width="220"><div align="center"><strong  id="fecha_pago"style="color: #FF0105">'.$obj->fecha_pago.'</strong></div></td>
      <td 	width="80"><strong>PERIODO:</strong></td>
      <td   width="220"><div align="left"><strong id="rango de fecha">De:</strong>  <strong style="color: #FF0105"></strong>
      <p></p>
      <strong>A:</strong>
      <strong style="color: #FF0105"> Sábado 01 de Diciembre de 2018</strong></div>
    </tr>
    <tr>
      <td colspan="6"><p>&nbsp;</p>
        <div align="center"></div></td>
      </tr>
  </tbody>
</table>
</div>
<!-- Fin Codigo centro -->
<p></p>
</div>
</body>
</html>';
$dompdf = new Dompdf();
$dompdf->loadHtml($content);

$dompdf->render();
$pdf = $dompdf->output();
$dompdf->stream();
?>
