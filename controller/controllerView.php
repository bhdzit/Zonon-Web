<?php
require_once ("./model/modelView.php");

class controllerView extends modelView{

	public function getViewLayout(){
		return require_once("./view/view_layout.php");
	}
	public function getViewsController(){


		if(isset($_GET["views"])){
			$route=explode("/",$_GET["views"]);
			$view=modelView::getModelViews($route[0]);
		}
		else{
			return "welcome";
		}
		return $view;

	}
}