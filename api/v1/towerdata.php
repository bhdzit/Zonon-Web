<?php
  class TowerData{
    function __construct($key) {

      $result=self::connectionDB();
      self::getClietesList($result);
    }
    function getClietesList($result){
      $json="";
      if ($result->num_rows > 0) {
          // output data of each row
            $json = "{";
          while($row = $result->fetch_array() ) {
           $json .= "\"".$row[0]."\"".':{ "wt_id" :"'.$row[0].'",'.
                                      '"wt_name" : "'.$row[1].'",'.
                                      '"wt_Altura" : "'.$row[2].'",'.
                                      '"wt_ST_X" : "'.$row[4].'",'.
                                      '"wt_ST_Y" : "'.$row[5].'"'.

                                      //,,,,,,, ST_X(`wc_maps`),wc_date,wp_id,wp_name
                                    '},';
                                //    var_dump($row);


          }
          //  $json=;
            echo substr($json, 0, -1).'}';
      //  echo json_encode($myArray);
      } else {
          echo "0 results";
      }

    }
    protected function connectionDB(){
      $conn=new mysqli("127.0.0.1:3406", "cliente", "IT25697", "wisp");
      if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
      }

      $sql = "select *,ST_Y(`wt_point`), ST_X(`wt_point`) from `wisp_tower`;";
      $result = $conn->query($sql);
          $conn->close();
      return $result;

    }

  }



  new TowerData($_GET["key"]);
?>
