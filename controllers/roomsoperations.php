<?php
  require_once "../models/rooms.php";
   $Rooms = new Rooms();
  if(isset($_POST["saverooms"])){
    $roomid =$_POST["roomid"]; 
    $roomnumber=$_POST["roomnumber"];
    $block=$_POST["block"];
    $department=$_POST["department"]; 
    $capacity=$_POST["capacity"];
    $classlab =$_POST["classlab"];
    $roomstatus=$_POST["roomstatus"];

    $response= $Rooms->saverooms($roomid, $roomnumber,$block ,$department ,$capacity,$classlab ,$roomstatus);
    echo json_encode($response);
  }
  if(isset($_GET["getroom"])){
    $roomid=$_GET["roomid"];
    $roomnumber=$_GET["roomnumber"];

    $response =$Rooms->getroom($roomid, $roomnumber);
    echo $response;
  }
  if(isset($_GET["getroomdetails"])){
    $roomid=$_GET["roomid"];
    $response=$Rooms->getroomdetails($roomid);
    echo $response;
  }
  if(isset($_POST["deleterooms"])){
    $roomid=$_POST["roomid"];
    $roomnumber=$_POST["roomnumber"];

    $response=$Rooms->deleterooms($roomid, $roomnumber);
    echo json_encode($response);
  }

  if(isset($_GET['getroomnames'])){
    echo $Rooms->getroomsnames();
  }
  
?>