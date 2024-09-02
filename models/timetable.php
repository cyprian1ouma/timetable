<?php
    require_once("db.php");

    class timetable extends db{

        function getrooms(){
            $sql="CALL `sp_getrooms`()";
            return $this->getJSON($sql);
        }

        function getlecturers(){
            $sql="CALL `sp_getlecturers`()";
            return $this->getJSON($sql);
        }

        function getcourseunits(){
            $sql="CALL `sp_getcourseunits`()";
            return $this->getJSOn($sql);
        }

        function getunitlecturercourses(){
            $sql="CALL `sp_getunitlecturercourses`()";
            return $this->getJSON($sql);
        }
    }

?>