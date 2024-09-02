<?php
    require_once "db.php";

    class Rooms extends db{

        function checkrooms($roomid, $roomnumber){
            $sql="CALL `sp_checkrooms`({$roomid}, '{$roomnumber}')";
            return $this->getData($sql)->rowCount();
        }
        function saverooms($roomid, $roomnumber,$block ,$department ,$capacity,$classlab ,$roomstatus){
            if($this->checkrooms($roomid, $roomnumber)){
                return["status"=>"exists","message"=>"exists"];
            }
            $sql="CALL `sp_saverooms`({$roomid},'{$roomnumber}','{$block}','{$department}','{$capacity}','{$classlab}','{$roomstatus}',{$this->userid},'{$this->platform}')";
            $this->getData($sql);
            return["status"=>"success","message"=>"success"];
        } 
        
        function getroom($roomid, $roomnumber){
            $sql="CALL `sp_getrooms`({$roomid},'{ $roomnumber}')";
            return $this->getJSON($sql);
        }
        function getroomdetails($roomid){
            $sql ="CALL `sp_getroomdetails`({$roomid})";
            return $this->getJSON($sql);
        }

        function deleterooms($roomid, $roomnumber){
            $sql="CALL `sp_checkrooms`({$roomid}, '{$roomnumber}')";
            $this->getData($sql);
            return["status"=>"success","message"=>"success"];
        }

        function getroomsnames(){
            $sql="CALL `sp_getroomnames`()";
            return $this->getJSON($sql);
        }
    }
?>