<?php

require("../model/SectorModel.php");
  class SectorController{
    function __construct() {

      $acction=$_POST["acction"];
      if($acction=="setSector"){
        self::setNewSector();
      }
      if($acction=="delete"){
        self::deleteSector();
      }
      if($acction=="updateSector"){
        self::updateSector();
      }
      if($acction=="getData"){
        self::getSecotrData($_POST["id"]);
      }

  }
    function setNewSector(){
      $data="{\"wsct_name\":\"".$_POST["wsct_name"].
        "\",\"wsct_dist\":\"".$_POST["wsct_dist"].
        "\",\"wsct_antennatype\":\"".$_POST["wsct_antennatype"].
        "\",\"wsct_address\":\"".$_POST["wsct_address"].
        "\",\"wsct_tower\":\"".$_POST["wsct_tower"].
        "\",\"wsct_description\":\"".$_POST["wsct_description"].
        "\"}";
        $json=json_decode($data);

    $model= new SectorModel();
    $model->setNewSector($json);

    }
    function getSecotrData($id){


$model= new SectorModel();
$model->getData($id);
    }

    function deleteSector(){
      $id=$_POST["ws_id"];
  //    echo $id;
      $model=new SectorModel();
      $model->deleteSector($id);

    }

    function updateSector(){
      $data="{\"wsct_id\":\"".$_POST["wsct_id"].
        "\",\"wsct_name\":\"".$_POST["wsct_name"].
        "\",\"wsct_dist\":\"".$_POST["wsct_dist"].
        "\",\"wsct_antennatype\":\"".$_POST["wsct_antennatype"].
        "\",\"wsct_address\":\"".$_POST["wsct_address"].
        "\",\"wsct_tower\":\"".$_POST["wsct_tower"].
        "\",\"wsct_deg\":\"".$_POST["wsct_deg"].
        "\",\"wsct_apper\":\"".$_POST["wsct_apper"].
        "\",\"wsct_description\":\"".$_POST["wsct_description"].
        "\"}";
        $json=json_decode($data);

        $model= new SectorModel();
        $model->updateSector($json);

    }

  }
  new SectorController();
?>
