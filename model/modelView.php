<?php
class modelView{

	protected function getModelViews($view){

		$rutesarray=["clientes",
		"home",
		"torres",
		"sectores",
		"paquetes",
		"contratos",
		"pagos"];

		if(in_array($view,$rutesarray)){
			return "./view/modulos/".$view."_view.php";
		}else{
			return "404";
		}

	}
}
