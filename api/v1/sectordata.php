<?php
  class SectorData{
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
           $json .= "\"".$row[0]."\"".':{ "ws_id" :"'.$row[0].'",'.
                                      '"ws_name" : "'.$row[1].'",'.
                                      '"ws_dist" : "'.$row[2].'",'.
                                      '"ws_tower" : "'.$row[8].'",'.
                                      '"wsct_antenna_id" : "'.$row[3].'",'.
                                      '"wsct_tower_id" : "'.$row[5].'",'.
                                      '"wsct_ip" : "'.$row[13].'",'.
                                        '"wsct_description" : "'.$row[6].'",'.
                                      '"ws_antenna_type" : "'.$row[12].'"'.


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

      $sql = "select *,INET_NTOA(`wsct_address`) from `wisp_sector` join `wisp_tower` on `wsct_tower`=`wt_id` join `wisp_antenna_type` on `wa_id`=`wsct_antenna`;;";
      $result = $conn->query($sql);
          $conn->close();
      return $result;

    }

  }



  new SectorData($_GET["key"]);
?>
