<?php
  require_once "../models/units.php";
  $units = new Units();

  if(isset($_POST["saveunitsdetails"])){
        $unitid=$_POST["unitid"];
        $unitcode=$_POST["unitcode"];
        $unitname=$_POST["unitname"];
        $unitprogramme=$_POST["unitname"];
        $unitsemester=$_POST["unitname"];
        $unitschool=$_POST["unitschool"];
        $unitstatus=$_POST["unitstatus"];
        $unitdescription=$_POST["unitdescription"];
        $response=$units->saveunitsdetails($unitid,$unitcode ,$unitname,$unitprogramme, $unitsemester,$unitschool ,$unitstatus ,$unitdescription);
        echo json_encode($response);
  }

  if(isset($_GET["getunitdetails"])){
    $unitid =$_GET["unitid"];
    $unitcode =$_GET["unitcode"];
    $unitname =$_GET["unitname"];

    $response=$units->getunitdetails($unitid, $unitcode, $unitname);
    echo $response;
  }

  if(isset($_POST["deleteunits"])){
    $unitid=$_POST["unitid"];
    $unitcode=$_POST["unitcode"];

    $response=$units->deleteunits($unitid, $unitcode);
    echo json_encode($response);
  }
  ?>