<?php
  require_once ("../models/lecturer.php");

  $lecturer= new lecturer();
  if(isset($_POST["savelecturers"])){
     $lecturerid=$_POST["lecturerid"];
     $registrationnumber=$_POST["registrationnumber"];
     $title =$_POST["title"];
     $fullname =$_POST["fullname"];
     $gender =$_POST["gender"];
     $phonenumber =$_POST["phonenumber"];
     $emailaddress =$_POST["emailaddress"];
     $programme =$_POST["programme"];
     $units =$_POST["units"];
     $nationality =$_POST["nationality"];
     $fieldofstudy =$_POST["fieldofstudy"];
     $specialization =$_POST["specialization"];
     $department =$_POST["department"];

     $response= $lecturer->savelecturers($lecturerid, $registrationnumber,$title ,$fullname,$gender,$phonenumber,$emailaddress,
     $programme,$units,$nationality,$fieldofstudy,$specialization,$department);
     echo json_encode($response);
  }

 if(isset($_GET["getlecturer"])){
    $response=$lecturer-> getlecturer();
    echo $response;
 }
 if(isset($_GET["getlecturerdetails"])){
    $lecturerid=$_GET["lecturerid"];
    $response=$lecturer-> getlecturerdetails($lecturerid);
    echo $response;
 }
 if(isset($_POST["deletelecturer"])){
    $lecturerid=$_POST["lecturerid"];
    $registrationnumber=$_POST["registrationnumber"];
    $userid=$_POST["userid"];
    $platform =$_POST["platform"];

    $response=$lecturer->deletelecturer($lecturerid,$registrationnumber,$userid, $platform);
    echo json_encode($response);
 }
 if(isset($_GET["getlecturerunits"])){
   $lecturerid=$_GET["lecturerid"];
   $response=$lecturer-> getlecturerunits($lecturerid);
   echo $response;
 }
 if(isset($_GET["getlectunits"])){
   $unitid=$_GET["unitid"];
   $responser=$lecturer-> getlectunits($unitid);
   echo $response;
 }

 if(isset($_GET['getalllecturers'])){
   echo $lecturer->getalllecturers();
 }
?>