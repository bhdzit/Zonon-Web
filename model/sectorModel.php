<?php
require_once "../core/db.php";
  class SectorModel extends db{

      public function setNewSector($json){
    		$db=new db();
        $sql='insert into `wisp_sector` values'.
    			'(null,\''.
    			$json->{"wsct_name"}.'\','.
    			'\''.$json->{"wsct_dist"}.'\','.
    			'\''.$json->{"wsct_antennatype"}.'\','.
          'INET_ATON(\''.$json->{"wsct_address"}.'\'),'.
          $json->{"wsct_tower"}.','.
          '\''.$json->{"wsct_description"}.
          '\');';
          $db::executeQuery($sql);
          if($json->{"wsct_antennatype"}==1){
    #        echo ("adsasd");
        //     $db::executeQuery("DROP TRIGGER IF EXISTS `ìnsert_sectorial_anttena_data`;");
          $id=$db::getLastInsertionID();
            $db::executeQuery("INSERT INTO `wisp_sec_ant` (`wsec_id`, `wsec_deg`,`wsec_rank`)".
                              " values (".$id.",80,120)");
      }

//      $db::executeQuery("DROP TRIGGER IF EXISTS `ìnsert_sectorial_anttena_data`;");
    }
    public function deleteSector($id){
      $db=new db();
      $sql="DELETE FROM `wisp_sector` WHERE wsct_id=".$id;
      echo $sql;
      $db::executeQuery($sql);
    }

    function getData($id){
      $db=new db();
    $sql=  "select * from `wisp_sec_ant` where wsec_id=".$id;
#    echo $sql;
    $res=$db->getQuery($sql);
    echo ("{\"wsec_id\" : \"".$res["wsec_id"]."\",\"wsec_deg\":\"".$res[1]."\",\"wsec_rank\":\"".$res[2]."\"}");



    }

    public function updateSector($json){
      $db=new db();
      $sql='UPDATE `wisp_sector` SET '.
        'wsct_name=\''.$json->{"wsct_name"}.'\','.
        'wsct_dist=\''.$json->{"wsct_dist"}.'\','.
        'wsct_antenna=\''.$json->{"wsct_antennatype"}.'\','.
        'wsct_address=INET_ATON(\''.$json->{"wsct_address"}.'\'),'.
        'wsct_tower=\''.$json->{"wsct_tower"}.'\','.
        'wsct_description=\''.$json->{"wsct_description"}.'\''.
        ' WHERE wsct_id='.$json->{"wsct_id"}.';';
        echo($sql);
     $bool=$db::executeQuery($sql);
        if($json->{"wsct_antennatype"}==1){
          $sql="UPDATE `wisp_sec_ant` SET ".
              "wsec_deg=\"".$json->{"wsct_deg"}.
              "\" ,wsec_rank=\"".$json->{"wsct_apper"}.
              "\" where wsec_id=\"".$json->{"wsct_id"}."\";";
        }
        $db::executeQuery($sql);

    }

  }
?>
