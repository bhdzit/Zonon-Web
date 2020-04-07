<?php
require_once "../core/db.php";
  class TowerModel extends db{

      public function setNewTower($json){
    		$db=new db();
        $sql='insert into `wisp_tower` values'.
    			'(null,\''.
    			$json->{"wt_name"}.'\','.
    			'\''.$json->{"wt_altura"}.'\','.
    			'POINT('.$json->{"wt_point"}.'));';
        $bool=$db::executeQuery($sql);

    }
    public function deleteTower($id){
      $db=new db();
      $sql="DELETE FROM `wisp_tower` WHERE wt_id=".$id;
      $db::executeQuery($sql);
    }

    public function updateTower($json){
      $db=new db();
      $sql='UPDATE `wisp_tower` SET'.
        ' wt_nombre=\''.$json->{"wt_name"}.'\','.
        'wt_altura=\''.$json->{"wt_altura"}.'\','.
        'wt_point=POINT('.$json->{"wt_point"}.') WHERE wt_id='.$json->{"wt_id"}.';';
     $bool=$db::executeQuery($sql);
    
    }

  }
?>
