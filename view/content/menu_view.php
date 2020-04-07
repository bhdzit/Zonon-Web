<!-- Left side column. contains the logo and sidebar -->
<?php
 $item=explode("/",$_GET["views"]);
 ?>
<aside class="main-sidebar">

  <!-- sidebar: style can be found in sidebar.less -->
  <section class="sidebar">




    <!-- Sidebar Menu -->
    <ul class="sidebar-menu" data-widget="tree">
      <li class="header">MENU</li>
      <!-- Optionally, you can add icons to the links -->
      <li <?php if($item[0]=="home") echo " class=\"active\"";?>><a href="home"><i class="fas fa-chart-line"></i> <span> Dashboard</span></a></li>
      <li <?php if($item[0]=="torres") echo " class=\"active\"";?>><a href="torres"><i class="fas fa-broadcast-tower"></i><span> Torres</span></a></li>
      <li <?php if($item[0]=="clientes") echo " class=\"active\"";?>><a href="clientes"><i class="fas fa-users"></i> <span> Clientes</span></a></li>
      <li><a href="sectores"><i class="fas fa-wifi"></i> <span> Sectores</span></a></li>
      <li><a href="paquetes"><i class="fas fa-boxes"></i><span> Paquetes</span></a></li>
      <li><a href="contrato"><i class="fas fa-file-signature"></i> <span> Tipos de Contratos</span></a></li>
      <li><a href="pagos"><i class="fas fa-receipt"></i> <span> Pagos</span></a></li>
  <!--    <li class="treeview">
        <a href="#"><i class="fa fa-link"></i> <span>Paquetes</span>
          <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
        </a>
        <ul class="treeview-menu">
          <li><a href="#">Link in level 2</a></li>
          <li><a href="#">Link in level 2</a></li>
        </ul>
      </li>-->
    </ul>
    <!-- /.sidebar-menu -->
  </section>
  <!-- /.sidebar -->
</aside>
