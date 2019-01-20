<?php
header("Content-Type: application/json; charset=UTF-8");
$obj = $_GET["x"];
$total= $_GET["pago"];

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
<div class="page-header"><h3>PAGOS REALIZADOS</h3></div>

<div align="center">

<input type="hidden">

<table  height="325">
  <tbody>
    <tr>
      <th ><img  src="img/logo.png" width="204" height="127"></th>
      <th > </th>
      <th width="182" height="45">
      <p align="center"><strong>DIRECCION</strong></p>
      <div align="center" class="col-sm-12">
        <p><span class="icon-location"></span>Emiliano Zapata #22, Xochitlan, Progreso de O. Hgo.</p>
        <p><span class="icon-mobile"></span> 7721145890</p>
        <p><span class="icon-mail-alt"></span> carlos-beto88@hotmail.com</p>
      </div>
      <br>
      </th>
    </tr>
    '.$obj.'
    <tr   class="total_pays"  ><td colspan="2" class="total_pays" ><div  align="right" ><strong>Total: </strong></div></td><td class="total_pays" >$ '.$total.'</td><tr>
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
