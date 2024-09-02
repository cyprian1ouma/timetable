<?php
  require_once("db.php");
  class courses extends db{
    function checkcourses($courseid,$coursecode,$coursename){
        $sql ="CALL `sp_checkcourses`({$courseid},'{$coursecode}' ,'{$coursename}'";
        return $this ->getData($sql)->rowCount();
    }

    function savecourses($courseid,$coursecode,$coursename,$semester,$description){
        if($this->checkcourses($courseid,$coursecode,$coursename)){
         return["status"=>"exists","message"=>"exists"];
        }else{
            $sql= "CALL `sp_savecourses`({$courseid},'{$coursecode}','{$coursename}','{$semester}',
            '{ $description}',{$this->userid}, '{$this->platform}')";
            $this->getData($sql);
            return["status"=>"success","message"=>"success"];
        }
    }

    function getcourses(){
        $sql="CALL `sp_getcourses`()";
        return $this->getJSON($sql);
    }
    function deletecourses($courseid){
        $sql ="CALL `sp_deletecourses`({$courseid},'{$this->userid}','{ $this->platform}')";
        $this->getData($sql);
        return["status"=>"success", "message"=>"success"];
    }
  } 
?>