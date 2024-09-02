<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Room Time Table</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid #000;
            padding: 10px;
            text-align: center;
        }
        th {
            background-color: #f2f2f2;
        }
    </style>
    <?php require_once('header.txt') ?>
</head>
<body>

<div id="roomtable">
    <div class="pt-3" id="roomtablenotifications"></div>
        <table class="table table-striped">
            <thead>
            <th>#</th>
            <th>Room Number </th>
            <th>Block</th>
            <th>Department</th>
            <th>Capacity</th>
            <th>Lecture Room</th>
            <th>Lab</th>
            <th>Status</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            </thead>
            <tbody>
            </tbody>
        </table>
        <button type="button" class="btn btn-success" data-toggle="modal" data-target="#roommodal">
            Add Room
        </button>
    </div>
  <!-- roomsmodal -->
    <div class="modal" tabindex="-1" id="roommodal">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Add Rooms</h5>
                <span aria-hiden ="true">&times;</span>
            </div>
            <div class="modal-body">
                <div id="roomdetailsnotifications"></div>
                <input type="hidden" name="roomid" id="roomid" value="0">
                
                <div class="form-group">
                    <label for="roomnumber">Room Number</label>
                    <input type="text" name="roomnumber" id="roomnumber" class="form-control form-control-sm">
                </div>

                <div class="form-group">
                    <label for="block"> Block</label>
                    <select name="unitblockfield" id="unitblockfield" class="form-control form-control-sm">
                        <option value="">&lt;Choose &gt;</option>
                        <option value="0">Block A</option>
                        <option value="1">Block B</option>
                        <option value="2">Block C</option>
                        <option value="3">Block D</option>
                        <option value="4">Block E</option>
                        <option value="5">Block F</option>
                        <option value="6">Block J</option>
                        <option value="7">Block L</option>
                        <option value="8">Block N</option>
                        <option value="9">Block Q</option>
                        <option value="10">Block R</option>
                        <option value="11">Block S</option>
                        <option value="12"> Block U</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="blockdepartment">Block Department</label>
                    <input type="text" name="blockdepartment" id="blockdepartment" class="form-control form-control-sm">
                </div>

                <div class="form-group">
                    <label for="classorlab">Class/lab</label>
                    <select name="classlab" id="classlab" class="form-control form-control-sm">
                        <option value="">&lt; Choose &gt;</option>
                        <option value="1">Lecture Class</option>
                        <option value="2">Lectuer Lab</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="capacity">Capacity</label>
                    <input type="number" name="roomcapacity"  id="roomcapacity"value= 10 class="form-control form-control-sm">
                </div>
                <div class="form-group">
                    <label for="status">Room Status</label>
                    <select name="roomstatus" id="roomstatus" class="form-control form-control-sm">
                        <option value="">&lt; Choose &gt;</option>
                        <option value="0">Available</option>
                        <option value="1"> Not Available</option>
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="saveroomsdetails">Save changes</button>
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button> 
            </div>
            </div>
        </div>
    </div>
<div id="room-timetable-container"></div>
</body>
<?php require_once('footer.txt') ?>
<script src="../js/roomgeneration.js"></script>
</html>