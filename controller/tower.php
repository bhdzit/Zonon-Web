<?php
require("../model/tower.php");
  class Tower{
    function __construct() {

      $acction=$_POST["acction"];
      if($acction=="setTower"){
        self::setNewTower();
      }
      if($acction=="delete"){
        self::deleteTower();
      }
      if($acction=="updateTower"){
        self::updateTower();
      }

  }
    function setNewTower(){
      $data="{\"wt_name\":\"".$_POST["wt_name"].
        "\",\"wt_altura\":\"".$_POST["wt_altura"].
        "\",\"wt_point\":\"".$_POST["wt_point"]."\"}";
        $json=json_decode($data);

    $model= new TowerModel();
    $model->setNewTower($json);
    }

    function deleteTower(){
      $id=$_POST["wt_id"];
      echo $id;
      $model=new TowerModel();
      $model->deleteTower($id);

    }

    function updateTower(){
      $data="{\"wt_id\":\"".$_POST["wt_id"].
        "\",\"wt_name\":\"".$_POST["wt_name"].
        "\",\"wt_altura\":\"".$_POST["wt_altura"].
        "\",\"wt_point\":\"".$_POST["wt_point"]."\"}";
        $json=json_decode($data);

        $model= new TowerModel();
        $model->updateTower($json);

    }

  }
  new Tower();
?>
