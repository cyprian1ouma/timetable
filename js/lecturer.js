$(document).ready(function(){
    const lectureridfield=$("#lecturerid"),
         registrationnumberfield =$("#lecturerregistrationnumber"),
         lecturertitlefield =$("#lecturerprofessionaltitle"),
         fullnamefield=$("#lecturerfullnames"),
         genderfield=$("#lecturergender"),
         phonenumberfield=$("#phonenumber"),
         emailaddressfield=$("#emailaddress"),
         programfield=$("#programmes"),
         unitfield=$("#unitdetails"),
         nationalityfield=$("#nationality"),
         fieldofstudyfiled=$("#lecturerfieldofstudy"),
         specificationfield=$("#specifications"),
         departmentfield=$("#departmentofemployment"),
         //savebutton, table, modules and notifications
         savelecturerbutton=$("#savelecturersHere"),
         lecturertable=$("#Lecturerregistrationtable"),
         lecturermodal=$("#lecturermodal"),
         lecturerdetailsnotification=$("#lecturerdetailsnotifications"),
         lecturernotification=$("#lecturernotificatins");
         // saving the lectures
    savelecturerbutton.on("click", ()=>{
        
        const lecturerid=lectureridfield.val(),
            registrationnumber=registrationnumberfield.val(),
            title =lecturertitlefield.val(),
            fullname=fullnamefield.val(),
            gender=genderfield.val(),
            phonenumber=phonenumberfield.val(),
            emailaddress=emailaddressfield.val(),
            programme=programfield.val(),
            units=unitfield.val(),
            nationality=nationalityfield.val(),
            fieldofstudy=fieldofstudyfiled.val(),
            specialization =specificationfield.val(),
            department=departmentfield.val();

      
        let errors =""
        if(registrationnumber==""){
            errors="Please insert the registration number"
            registrationnumberfield.focus()
        }else if(title==""){
            errors="Please choose the title for lecturer"
            lecturertitlefield.focus()
        }else if(fullname==""){
            errors="Please insert full name for the lecturer"
            fullnamefield.focus()
        }else if(gender==""){
            errors="Please choose the gender for the lecturer"
            genderfield.focus()
        }else if(phonenumber==""){
            errors="please input lecturers phone number"
            phonenumberfield.focus()
        }else if(emailaddress==""){
            errors="Please insert the lecturer email address"
            emailaddressfield.focus()
        }else if(programme==""){
            errors="Please insert the program"
            programfield.focus()
        }else if(units==""){
            errors="Please insert the units"
            unitfield.focus()
        }else if(nationality==""){
            errors="Please insert the nationality of the lecturer"
            nationalityfield.focus()
        }else if(fieldofstudy==""){
            errors="Please insert the field of study for the lecturer"
            fieldofstudyfiled.focus()
        }else if(specialization==""){
            errors ="Please input the area of specialization of the lecturer"
            specificationfield.focus()
        }else if(department==""){
            errors="Please insert the departent of the lecturer"
            departmentfield.focus()
        }
        if(errors==""){
            $.post(
                "../controllers/lecturersoperations.php",
                {
                    savelecturers: true,
                    lecturerid,
                    registrationnumber,
                    title,
                    fullname,
                    gender,
                    phonenumber,
                    emailaddress,
                    programme,
                    units,
                    nationality,
                    fieldofstudy,
                    specialization,
                    department
                },
                (data)=>{
                    if(isJSON(data)){
                        data = JSON.parse(data);
                        if(data.status=="success"){
                            lecturerdetailsnotification.html(showAlert("success",`Lecturer ${fullname} was saved successfully`));
                            // get the details
                            getlecturers();
                            clearlecturerfields();

                        }else if(data.status=="exists"){
                            lecturerdetailsnotification.html(showAlert("info", `Lecturer ${fullname} already exists`));
                        }
                    }else{
                            lecturerdetailsnotification.html(showAlert("danger",`sorry an error has occured ${data}`));
                        }
                    
                })                
        }
        else{

            lecturerdetailsnotification.html(showAlert("info", errors))
        }
    })

    function clearlecturerfields(){
        registrationnumberfield.val("")
        lecturertitlefield.val("")
        fullnamefield.val("")
        genderfield.val("")
        phonenumberfield.val("")
        emailaddressfield.val("")
        programfield.val("")
        unitfield.val("")
        nationalityfield.val("")
        fieldofstudyfiled.val("")
        specificationfield.val("")
        departmentfield.val("")
    }
    
    function getlecturers(){
        $.getJSON(
            "../controllers/lecturersoperations.php",
            {
                getlecturer:true,
            },
            (data)=>{
                let results="";
                data.forEach((lecturer,i)=>{
                    results+=`<tr data-id ="${lecturer.lecturerid}">`;
                    results+=`<td>${lecturer.registrationnumber}</td>`;
                    results+=`<td>${lecturer.title}</td>`;
                    results+=`<td>${lecturer.fullname}</td>`;
                    results+=`<td>${lecturer.gender}</td>`;
                    results+=`<td>${lecturer.phonenumber}</td>`;
                    results+=`<td>${lecturer.emailaddress}</td>`;
                    results+=`<td>${lecturer.programme}</td>`;
                    results+=`<td>${lecturer.units}</td>`;
                    results+=`<td>${lecturer.nationality}</td>`;
                    results+=`<td>${lecturer.fieldofstudy}</td>`;
                    results+=`<td>${lecturer.specialization}</td>`;
                    results+=`<td>${lecturer.department}</td>`;
                    
                    // edit and delete icon
                    results += `<td><a href="#" class="edit"><i class="fal fa-edit fa-lg fa-fw"></i></a></td>`;
                    results += `<td><a href="#" class="delete"><i class="fal fa-trash-alt fa-lg fa-fw text-danger"></i></a></td></tr>`;
                });
                lecturertable.find("tbody").html(results);

            }


        )
    }


    lecturertable.on("click",".edit",function(){
        const parent=$(this).closest("tr");
              lecturerid=parent.attr("data-id");
              $.getJSON(
                "../controllers/lecturersoperations.php",
                {
                    getlecturerdetails:true,
                    lecturerid
                },
                (data)=>{
                    data=data[0],
                    lectureridfield.val(data.lecturerid),
                    registrationnumberfield.val(data.registrationnumber),
                    lecturertitlefield.val(data.title),
                    fullnamefield.val(data.fullname),
                    genderfield.val(data.gender),
                    phonenumberfield.val(data.phonenumber),
                    emailaddressfield.val(data.emailaddress),
                    programfield.val(data.programme),
                    unitfield.val(data.units),
                    nationalityfield.val(data.nationality),
                    fieldofstudyfiled.val(data.fieldofstudy),
                    specificationfield.val(data.specialization),
                    departmentfield.val(data.department),
                    lecturernotification.html(""),
                    lecturermodal.modal("show");

                });
    });

    lecturertable.on("click",".delete",function(){
        const parent=$(this).closest("tr");
            lecturerid=parent.attr("data-id");
            registrationnumber = parent.find("td").eq(2).text(); 
            fullname = parent.find("td").eq(3).text();

            // confirm deletion with bootbox;
            bootbox.dialog({
                title: "Delete lecturer",
                message: `<i class='fal fa-question-circle fa-2x fa-fw text-primary'></i> Delete lecturers <span class='font-weight-bold'>${fullname}</span> from the system.`,
                buttons: {
                    success: {
                        label: "No, Keep",
                        className: "btn-success btn-sm",
                        callback: function() {
                            $('.bootbox').modal('hide');
                        }
                    },
                    danger: {
                        label: "Yes, Delete",
                        className: "btn-danger btn-sm",
                        callback: function() {
                            lecturernotification.html(showAlert("processing","Processing. Please wait ...",1));
                            $.post(
                                "../controllers/lecturersoperations.php",
                                {
                                    deletelecturer: true,
                                    lecturerid,
                                    registrationnumber,
                                },
                                (data) => {
                                    data = data.trim();
                                    if(isJSON(data)){
                                        data = JSON.parse(data);
                                        if(data.status == "success"){
                                            lecturernotification.html(showAlert("success", `lecturer <strong>${fullname}</strong> deleted successfully.`));
                                            getlecturers();
                                        }
                                    } else {
                                        lecturernotification.html(showAlert("danger", `Sorry, an error occurred: ${data}`));
                                    }
                                }
                            );
                        }
                    }
                }
            });
    })

})