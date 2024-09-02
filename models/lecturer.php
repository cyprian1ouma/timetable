<?php
  require_once "../models/db.php";

  class lecturer extends db{

   function checklecturerdetails($lecturerid, $registrationnumber){
        $sql="CALL `sp_checklectuerer`({$lecturerid},'{ $registrationnumber}')";
        return $this->getData($sql)->rowCount();
   }

   function savelecturers($lecturerid, $registrationnumber,$title ,$fullname,$gender,$phonenumber,$emailaddress,
   $programme,$units,$nationality,$fieldofstudy,$specialization,$department){
      if($this->checklecturerdetails($lecturerid, $registrationnumber)){
         return ["status"=>"exists","message"=>"exists"];
      }else{
        $sql ="CALL `sp_savelectures`({$lecturerid},'{$registrationnumber}' ,'{$title }','{$fullname}','{$gender}','{$phonenumber}','{$emailaddress}',
       '{$programme}','{$units}','{$nationality}','{$fieldofstudy}','{$specialization}','{$department}',{$this->userid} , '{$this->platform}')";
       $this->getData($sql);
        return ["status"=>"success","message"=>"success"]; 
      }
   }

   function getlecturer(){
    $sql="CALL `sp_getlecturer`()";
    return $this->getJSON($sql);

   }

   function getlecturerdetails($lecturerid){
    $sql="CALL `sp_getlecturerdetails`($lecturerid)";
    return $this->getJSON($sql);
   }

   function deletelecturer($lecturerid,$registrationnumber,$userid, $platform){
    $sql="CALL `sp_deletelecturers`($lecturerid,$registrationnumber,$userid, $platform)";
    $this->getData($sql);
    return["message"=>"success","status"=>"success"];
   }

   function getlecturerunits($lecturerid){
      $sql ="CALL `sp_getlecturers`($lecturerid)";
      return $this->getData($sql);
     
   }
   function getlectunits($unitid){
      $sql ="CALL `sp_getlectunits`($unitid)";
      return $this->getData($sql);
   }

   function getalllecturers(){
      $sql="CALL `sp_getalllecturers`()";
      return $this->getJSON($sql);
   }
}
?>