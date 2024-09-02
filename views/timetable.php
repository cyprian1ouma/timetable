<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="../stylesheet/style.css">
    <link rel="icon" href="../images/tuk25.jfif" type="image/x-icon">
    <title>Time table Page</title>
</head>
<body>
    <div id="tuklogo">
        <div class="card text-center">
            <div class="card-header">
            <img src="../images/tuk24.png" alt="timetable logo">
            <h1>SCIT TIMETABLE AUTOMATION SYSTEM</h1>
            </div>
            <div class="card-body">
                <h2 class="card-title">Time Table Page </h2>
            </div id="navigationtostudents">
                <p>Navigate to Student Dashboard</p>
                <a href="students.php"id="studentsdashboardlink">Go to Student Dashboard</a>
        </div>
        <div id="timetablesystem">
        <div class="pt-3 pl-3" id="timetablenotifications"></div>
            <table class="table table-striped table-hover table-sm" id="timetableautomation">
                <thead>
                    <th>#</th>
                    <th>Course Code</th>
                    <th>Unit Name</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Lecturer Name</th>
                    <th>Room</th>
                    <th>Semester</th>
                    <th>Year</th>
                    <th>Group</th>
                    <th>Period</th>
                    <th>Status</th>
                    <th>&nbsp;</th> 
                    <th>&nbsp;</th>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#courseunits">
        Course Units
        </button>

        <div id="lecturerunittable">
        <div class="pt-3 pl-3" id="timetablenotifications"></div>
            <table class="table table-striped table-hover table-sm">
                <thead>
                    <th>#</th>
                    <th>Course Code</th>
                    <th>Unit Name</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Lecturer Name</th>
                    <th>Room</th>
                    <th>Semester</th>
                    <th>Year</th>
                    <th>Group</th>
                    <th>Period</th>
                    <th>Status</th>
                    <th>&nbsp;</th> 
                    <th>&nbsp;</th>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#lecturerunits">
        Lecturer Units
        </button>
        <div id="buttontogeneratetimetable">
            <button type="button" class="btn btn-primary" >Generate</button>
        </div>
    <div class="modal" tabindex="-1" id="courseunits">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Course Units</h5>
                <span aria-hiden="true">&times;</span>
            </div>
            <<div class="modal-body">
                <div class="row">
                    <div class="col form-group">
                        <label for="courseunit">Courses</label>
                        <select name="courseunit" id="courseunit" class="form-control form-control-sm">
                            <option value="">&lt;Choose &gt;</option>
                        </select>
                    </div>
                    <div class="col form-group">
                        <label for="timetableunitname">Units</label>
                        <select name="timetableunitname" id="timetableunitname" class="form-control form-control-sm">
                            <option value="">&lt;Choose &gt;</option>
                        </select>
                    </div>
                    <div class="col form-group">
                        <button class="btn btn-success btn-fw btn-sm mt-3" id="savebutton">Save</button>
                    </div>
                </div>
            </div>
            <div id="timetablesystem">
            <div class="pt-3 pl-3" id="timetablenotifications"></div>
            <table class="table table-striped table-hover table-sm" id="timetableautomation">
                <thead>
                    <th>#</th>
                    <th>Course</th>
                    <th>Unit</th>
                    <th>&nbsp;</th> 
                    <th>&nbsp;</th>
                </thead>
                <tbody></tbody>
            </table>
        </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-primary">Save changes</button>
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button> 
            </div>
            </div>
        </div> 
    </div> 
 </div>
 <div class="modal" tabindex="-1" id="lecturerunits">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Lecturer Units</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col form-group">
                    <label for="lectuere">lecturer</label>
                    <select name="lecturername" id="lecturername" class="form-control form-control-sm">
                        <option value="">&lt;Choose &gt;</option>
                    </select>
                </div>
                <div class="col form-group">
                    <label for="lectuererunits">Units</label>
                    <select name="unitname" id="unitname" class="form-control form-control-sm">
                        <option value="">&lt;Choose &gt;</option>
                    </select>
                </div>
                <div class="col form-group">
                  <button type="button"class="btn btn-success  btn-fw btn-sm  mt-3">Save</button>
                </div>
            </div>
            <div id="lecturerdetails">
            <div class="pt-3 pl-3" id="lecturertimetablenotifications"></div>
            <table class="table table-striped table-hover table-sm" id="timetableautomation">
                <thead>
                    <th>#</th>
                    <th>Leturer</th>
                    <th>Unit</th>
                    <th>&nbsp;</th> 
                    <th>&nbsp;</th>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary">Save changes</button>
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
        </div>
        </div>
    </div>
    </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</body>
</html>