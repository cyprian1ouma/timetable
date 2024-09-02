<?php
    require_once "db.php";

       class Units extends db{

           function checkunitsdetails( $unitid,$unitcode ,$unitname){
            $sql= "CALL`sp_checkunits`({$unitid}, '{$unitcode}','{$unitname}')";
            return $this ->getData($sql)->rowCount();
           }


           function saveunitsdetails($unitid,$unitcode ,$unitname,$unitprogramme, $unitsemester,$unitschool,$unitstatus ,$unitdescription){
             if($this->checkunitsdetails($unitid,$unitcode ,$unitname)){
                return ["statu"=>"exists","message"=>"exists"];
             } else {
                 $sql = "CALL `sp_saveunits`({$unitid}, '{$unitcode}' ,'{$unitname}', '{$unitprogramme}', '{$unitsemester }','{$unitschool}' ,'{$unitstatus }',
                 '{$unitdescription}' ,{$this->userid} , '{$this->platform}')";
                 $this->getData($sql);
                 return ["status"=>"success","message"=>"success"];
             }
           }

           function getunitdetails($unitid, $unitcode, $unitname){
            $sql ="`sp_getunitsdetails`({$unitid},'{$unitcode}','{$unitname}')";
            return $this->getJSON($sql);
           }

           function deleteunits($unitid, $unitcode){
            $sql="CALL `sp_deleteunits`({$unitid}, '{$unitcode}')";
            return $this->getData($sql);
           }
       }

?>