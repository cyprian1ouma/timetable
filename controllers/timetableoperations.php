<?php
    require_once("../models/timetable.php");

    $timetable=new timetable();

    if(isset($_GET['getrooms'])){
        echo $timetable->getrooms();
    }

    if(isset($_GET['getlecturers'])){
        echo $timetable->getlecturers();
    }

    if(isset($_GET['getcourseunits'])){
        echo $timetable->getcourseunits();
    }

    if(isset($_GET['getlecturercourses'])){
        echo $timetable->getunitlecturercourses();
    }


?>