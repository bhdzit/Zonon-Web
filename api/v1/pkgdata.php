<?php
  class PkgData{
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
           $json .= "\"".$row[0]."\"".':{ "wp_id" :"'.$row[0].'",'.
                                      '"wp_name" : "'.$row[1].'",'.
                                      '"wp_tx" : "'.$row[2].'",'.
                                      '"wp_rx" : "'.$row[3].'",'.
                                      '"wp_price" : "'.$row[4].'",'.
                                      '"wp_description" : "'.$row[5].'"'.

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

      $sql = "select * from `wisp_pkg`;";
      $result = $conn->query($sql);
          $conn->close();
      return $result;

    }

  }



  new PkgData($_GET["key"]);
?>
