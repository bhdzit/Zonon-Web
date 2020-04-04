<?php
  class ClientData{
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
           $json .= "\"".$row[0]."\"".':{ "wc_id" :"'.$row[0].'",'.
                                      '"wc_name" : "'.$row[1].'",'.
                                      '"wc_last_name" : "'.$row[2].'",'.
                                      '"wc_phone" : "'.$row[3].'",'.
                                      '"wc_pkg" : "'.$row[11].'",'.
                                      '"wc_contract" : "'.$row[5].'",'.
                                      '"wc_sector" : "'.$row[6].'",'.
                                      '"ST_Y(`wc_maps`)" : "'.$row[7].'",'.
                                      '"ST_X(`wc_maps`)" : "'.$row[8].'",'.
                                      '"wc_date" : "'.$row[9].'"'.
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

      $sql = "select ws_id,wc_name,wc_last_name,wc_phone,ws_pkg,ws_contract,ws_sector,ST_Y(`ws_maps`), ST_X(`ws_maps`),ws_date,wp_id,wp_name
 from `wisp_clients` join `wisp_services` join `wisp_pkg` where wc_id=ws_id_cliente and ws_pkg=wp_id;";
      $result = $conn->query($sql);
          $conn->close();
      return $result;

    }

  }



  new ClientData($_GET["key"]);
?>
