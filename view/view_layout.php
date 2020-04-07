<!DOCTYPE html>
<html>
<?php 	 include("content/head_view.php");?>
<body class="hold-transition skin-blue sidebar-mini">
<div class="wrapper">
	<?php 	 include("content/header_view.php");?>

	<?php

			 $view= new controllerView();
			 $rute=$view->getViewsController();

	 		  include("content/menu_view.php");
			 	require_once($rute);
	 		


?>

		</div>
	</body>
</html>
