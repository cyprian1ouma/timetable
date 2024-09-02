<?php
    require_once("../models/courses.php");
    $courses= new courses;


     if(isset($_POST["savecourses"])){
        $courseid=$_POST["courseid"];
        $coursecode=$_POST["coursecode"];
        $coursename=$_POST["coursename"];
        $semester=$_POST["semester"]??'';
        $description=$_POST["description"]??'';

        $response=$courses->savecourses($courseid,$coursecode,$coursename,$semester,$description);
        echo json_encode($response);
     }

     if(isset($_GET["getcourses"])){
      echo $courses-> getcourses();
     }

     if(isset($_POST["deletecourses"]))
         $courseid=$_POST["courseid"];
         $response=$courses->deletecourses($courseid);
         echo json_encode($response);
?>