<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/bootstrap.css">
    <link rel="stylesheet" href="../stylesheet/style.css">
    <link rel="stylesheet" href="../css/alert.css">
    <link rel="stylesheet" href="../css/all.css">
    
    <link rel="icon" href="../images/tuk25.jfif" type="image/x-icon">
    <title>SCIT TEACHING TIMRTABLE</title>
</head>
<body>
    <main>
        <div id="container">
            <div id="tuklogo">
                <div class="card text-center">
                    <div class="card-header">
                    <img src="../images/tuk20.jfif" alt="TUK logo">
                    <h1>SCIT TEACHING TIME TABLE AUTOMATION SYSTEM</h1>
                    </div>
                    <div class="card-body">
                        <h3 class="card-title">Admin Dashboard</h3>
                        <h4 class="card-text">Admin has all the privillages to the Timetable</>
                        <h4 class="card-text"> Make sure you give Privillages accordingly </h4>
                    </div>
                </div>
            </div>

            <nav class="navbar navbar-expand-lg navbar-light bg-light ">
                <div class="container-fluid">
                    <div class="collapse navbar-collapse" id="navivagationcontent">
                    <ul class="navbar-nav me-auto mb-6 mb-lg-0" id="navlist">
                        <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="https://tukenya.ac.ke/">Home</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="admin.php">Admin</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="lecturer.php">Lectuer</a>
                        </li>
                        <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="students.php" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Students
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="students.php">Diploma's</a></li>
                            <li><a class="dropdown-item" href="students.php">Degree's</a></li>
                            <li><a class="dropdown-item" href="students.php">Masters</a></li>
                            <li><a class="dropdown-item" href="students.php">PHD</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="students.php">Others</a></li>
                        </ul>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="timetable.php" >
                            Timetable Dashboard
                        </a>
                    </ul>
                    <form class="d-flex">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    </div>
                </div>
            </nav>
            <div id="movingnav">
             <div id="navigationpannel" class="$warning">NAVIGATE THROUGH THE FOLLOWING TO ADD UNITS, ROOMS AND LECTURER FOR EFFICIENT TIMETABLE </div>
            </div>
            <!-- <nav id="detailstabid">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link" href="../views/course.php">Courses</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="../views/nit.php">Units</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="../views/room.php">Rooms</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="../views/lec.php">Lectuers</a>
                </li>
            </ul>  -->
            </nav>
            <div id="mainconatiner">
            <!-- <div id="coursetable">
               <div class="pt-3" id="coursenotifications"></div>
                <table class="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Course Code</th>
                    <th scope="col">Course Name</th>
                    <th scope="col">Semester/Term</th>
                    <th scope="col">course Description</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
                </table>
                <button type="button" class="btn btn-success" data-toggle="modal" data-target="#coursemodal">
                   Register Course
                </button>
            </div> -->
            <div id="unittable">
            <div class="pt-3" id="unittablenotification"></div>
                <table class="table table-striped">
                    <thead>
                    <th>#</th>
                    <th>Unit Code</th>
                    <th>Unit Name</th>
                    <th>School</th>
                    <th>Programme/Course</th>
                    <th>Semester</th>
                    <th>Status</th>
                    <th>Description</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                <button type="button" class="btn btn-success" data-toggle="modal" data-target="#unitmodal">
                   Register Units
                </button>
            </div>
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
            <div id="Lecturerregistrationtable">
            <div class="pt-3" id="lecturernotificatins"></div>
                <table class="table table-striped table-hover">
                    <thead>
                    <th>#</th>
                    <th>Reg No </th>
                    <th>Professional Title</th>
                    <th>Full Name</th>
                    <th>Gender</th>
                    <th>Phone Number</th>
                    <th>Email Address</th>
                    <th>Programmes/course</th>
                    <th>Units</th>
                    <th>Nationality</th>
                    <th>Field of Study</th>
                    <th>Specification</th>
                    <th>Department</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                <button type="button" class="btn btn-success" data-toggle="modal" data-target="#lecturermodal">
                   Add Lecturer
                </button>
            </div>
        </div>
    </main>
    <!-- Modals -->
    <!-- <div class="modal fade" id="coursemodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Course Details</h5>
            <span aria-hiden ="true">&times;</span>
        </div>
        <div class="modal-body">
            <input type="hidden" name="courseid" id="courseid" value="0">
            <div class="form-group">
                <label for="coursecode"> Course Code</label>
                <input type="text" name="coursecode" id="coursecode" class="form-control form-control-sm">
            </div>
            <div class="form-group">
                <label for="coursename"> Course Name</label>
                <input type="text" name="coursename" id="coursename" class="form-control form-control-sm">
            </div>
            <div class="form-group">
                <label for="coursesemester"> Course Semester/term</label>
                 <select name="coursesemester" id="coursesemester" class="form-control form-control-sm">
                    <option value="">&lt;Choose&gt;</option>
                    <option value="0">Semester 1</option>
                    <option value="1">Semester 2</option>
                    <option value="2">Semester 3</option>
                 </select>
            </div>
            <div class="form-group">
                <label for="coursedescription"> Course Description</label>
                <input type="text" name="coursedescription" id="coursedescription" class="form-control form-control-sm">
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="savecoursesdetails">Save changes</button>
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
           
        </div>
        </div>
    </div>
    </div> -->
    <div class="modal" tabindex="-1" role="dialog" id="unitmodal">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Units Details</h5>
                <span aria-hiden ="true">&times;</span>
            </div>
            <div class="modal-body">
                <div id="unitsdetailsnotifications"></div>
                <input type="hidden" name="unitid" id="unitid" value="0">
                <div id="form-group">
                    <label for="code">Unit Code </label>
                    <input type="text" name="unitcode" id="unitcode" class="form-control form-control-sm">
                </div>

                <div id="form-group">
                    <label for="code">Unit Name </label>
                    <input type="text" name="unitdetailsname" id="unitdetailsname" class="form-control form-control-sm">
                </div>

                <div id="form-group">
                    <label for="code">Programme </label>
                    <select name="programmesdetails" id="programmesdetails" class="form-control form-control-sm">
                        <option value="">&lt;Choose &gt;</option>
                        <option value="0">Information Technology(IT)</option>
                        <option value="1">Computer Technology(CT)</option>
                        <option value="2">Computer Networks(CN)</option>
                    </select>
                </div>

                <div id="form-group">
                    <label for="code">Semester</label>
                   <select name="semesterdetails" id="semesterdetails" class="form-control form-control-sm">
                    <option value="">&lt;Choose &gt;</option>
                    <option value="0">Semester 1</option>
                    <option value="2">Semester 2</option>
                    <option value="3">Semester 3</option>
                   </select>
                </div>
                
                <div id="form-group">
                    <label for="code">School </label>
                    <input type="text" name="unitschooloffer" value="SCIT" id="unitschooloffer" class="form-control form-control-sm">
                </div>

                <div id="form-group">
                   <label for="code">Status </label>
                   <select name="unitstatusdetais" id="unitstatusdetais" class="form-control form-control-sm">
                        <option value="">&lt;Choose &gt;</option>
                        <option value="0">Active</option>
                        <option value="1">Inactive</option>
                   </select>
                </div>

                <div id="form-group">
                    <label for="code">Unit Description </label>
                    <input type="text" name="unitdescriptions" id="unitdescriptions" class="form-control form-control-sm">
                </div>

            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="addenewunitsbutton">Save changes</button>
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button> 
            </div>
            </div>
        </div>
    </div>
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

    <div class="modal" tabindex="-1" id="lecturermodal">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Lecturer Details</h5>
                <span aria-hiden="true">&times;</span>
            </div>
            <div class="modal-body">
                <div id="lecturerdetailsnotifications"></div>
                <input type="hidden" name="lecturerid" id="lecturerid" value="0">

                <div class="row">
                    <div class="col form-group">
                        <label for="registrationnumber">Registration Number</label>
                        <input type="text" name="lecturerreistrationnumber" id="lecturerreistrationnumber" class="form-control form-control-sm">
                    </div>
                    <div class=" col form-group">
                        <label for="lectuererprofessionaltitle">Professional Title</label>
                        <select name="lectuererprofessionaltitle" id="lectuererprofessionaltitle" class="form-control form-control-sm">
                            <option value="">&lt; Choose &gt;</option>
                            <option value="0">Mr</option>
                            <option value="1">Mrs</option>
                            <option value="2">Ms</option>
                            <option value="3">Miss</option>
                            <option value="4">Dr</option>
                            <option value="5">Prof</option>
                        </select>
                    </div>
               </div>
               <div class="row">
                    <div class="col form-group">
                        <label for="lecturerfullname">Lecturer Full Name</label>
                        <input type="text" name="lecturerfullnames" id="lecturerfullnames" class="form-control form-control-sm">
                    </div>

                    <div class="col form-group">
                        <label for="Lecturergender">Gender</label>
                         <select name="lecturergender"id="lecturergender" class="form-control form-control-sm">
                            <option value="">&lt;Choose &gt;</option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                         </select>
                    </div>
               </div>
               <div class="row">
                    <div class="col form-group">
                        <label for="phonenumber">Phone Number</label>
                        <input type="text" name="phonenumber" id="phonenumber" class="form-control form-control-sm">
                    </div>

                    <div class="col form-group">
                        <label for="emailaddress">Email Address</label>
                        <input type="text" name="emailaddress" id="emailaddress" class="form-control form-control-sm">
                    </div>
               </div>

               <div class="row">
                    <div class="col form-group">
                        <label for="programmes">Programme/Course</label>
                        <select name="programmes" id="programmes" class="form-control form-control-sm">
                            <option value="">&lt;Choose &gt;</option>
                            <option value="0">Information Technology(IT)</option>
                            <option value="1">Computer Networks(CN)</option>
                            <option value="2">Computer Technology(CT)</option>
                        </select>
                    </div>

                    <div class="col form-group">
                        <label for="unitdetails">Unit</label>
                        <input type="text" name="unitdetails" id="unitdetails" class="form-control form-control-sm">
                    </div>
               </div>

               <div class="row">
                    <div class="col form-group">
                        <label for="nationality">Nationality</label>
                        <input type="text" name="nationality" id="nationality" class="form-control form-control-sm">
                    </div>

                    <div class="col form-group">
                        <label for="lecturerfiledofstudy">Filed of Study</label>
                        <input type="text" name="lecturerfiledofstudy" id="lecturerfiledofstudy" class="form-control form-control-sm">
                    </div>
               </div>

               <div class="row">
                    <div class="col form-group">
                        <label for="specifications">Specification</label>
                        <input type="text" name="specifications" id="specifications" class="form-control form-control-sm">
                    </div>

                    <div class="col form-group">
                        <label for="departmentofemployment">Department</label>
                        <input type="text" name="departmentofemployment" id="departmentofemployment" class="form-control form-control-sm">
                    </div>
               </div>
            </div>

            <div class="modal-footer">
            <button type="button" id="savelecturersHere"class="btn btn-primary">Save changes</button>
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button> 
            </div>
        </div>
    </div>
    <script src="../js/jquery-3.6.1.js"></script>
    <script src="../js/popper.js"></script>
    <script src="../js/bootstrap.js"></script>
    <script src="../js/functions.js"></script>
    <script src="../js/alert.js"></script>
    <script src="../js/units.js"></script>
    <script src="../js/rooms.js"></script>
    <script src="../js/lecturer.js"></script>
    <script src="../js/courses.js"></script>
</body>
</html>