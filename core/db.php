<?php

class db{

	public static $mysqlLastInsertion=1;
	protected function dbConnection(){
		$mysqlconn= new mysqli("127.0.0.1:3406", "cliente", "IT25697", "wisp");
		return $mysqlconn;
	}
	protected function getQuery($sql){
	$mysqli = self::dbConnection();
		try{


			$queryres=$mysqli->query($sql);


			if($queryres->num_rows===1||$queryres->num_rows===0){

				return $queryres->fetch_array();
			}


		}
		catch(Exception $e){
			echo "Error en la base de datos";
		}

		return $queryres;
	}
	protected function executeQuery($sql){
		$mysqli = self::dbConnection();
//		=$mysqli;
		$bool=$mysqli->query($sql);

		 self::$mysqlLastInsertion= $mysqli->insert_id;
	 	//echo $mysqli->insert_id;
		return $bool;
	}
	protected function getLastInsertionID(){
		//var_dump(self::$mysqlLastInsertion);
		return self::$mysqlLastInsertion;
	}
}
