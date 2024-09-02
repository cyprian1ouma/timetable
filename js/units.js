
$(document).ready(function() {
    getexistingunits()
    const unitidfield = $("#unitid"),
          unitcodefield = $("#unitcode"),
          unitnamefield = $("#unitdetailsname"),
          unitprogrammefiled=$("#programmesdetails"),
          unitsemesterfiled=$("#semesterdetails"),
          unitschoolfield = $("#unitschooloffer"),
          unitstatusfield = $("#unitstatusdetais"),
          unitdescriptionfield = $("#unitdescriptions"),
          saveunitsbutton = $("#addenewunitsbutton"),
          unitnotifications = $("#unittablenotification"),
          unitdetailsnotifications = $("#unitsdetailsnotifications"),
          unittable = $("#unittable"),
          unitmodal = $("#unitmodal")

    // clear fileds
    // clearunitfileds();
    getexistingunits();

    saveunitsbutton.on("click", () => {
        const unitid = unitidfield.val(),
              unitcode = unitcodefield.val(),
              unitname = unitnamefield.val(),
              unitprogramme= unitprogrammefiled.val(),
              unitsemester=unitsemesterfiled.val(),
              unitschool = unitschoolfield.val(),
              unitstatus = unitstatusfield.val(),
              unitdescription = unitdescriptionfield.val()

        let errors = ""
        if(unitcode == ""){
            errors = "Please Enter the unit code"
            unitcodefield.focus()
        } else if(unitname == ""){
            errors = "Please Enter the Unit Name"
            unitnamefield.focus()
        } else if(unitprogramme==""){
            errors="Please insert the program/ course"
            unitprogrammefiled.focus()
        }else if(unitsemester==""){
            errors ="Please inser the semester in which the unit is offered"
            unitsemesterfiled.focus()
        }else if(unitschool == ""){
            errors = "Please insert the school the offer the unit specified above"
            // unitschoolfield.focus()
        } else if(unitstatus == ""){
            errors = "Please confirm the availability of the units"
            unitstatusfield.focus()
        } else if(unitdescription == ""){
            errors = "Please provide a small description of the unit"
            unitdescriptionfield.focus()
        }
        if(errors == ""){
            $.post(
                "../controllers/unitsoperations.php",
                {
                    saveunitsdetails: true,
                    unitid,
                    unitcode,
                    unitname,
                    unitprogramme,
                    unitsemester,
                    unitschool,
                    unitstatus,
                    unitdescription
                    
                },
                (data) => {
                    if(isJSON(data)){
                        data = JSON.parse(data)
                        if(data.status == "success"){
                            unitdetailsnotifications.html(showAlert("success", `The ${unitname} unit with has been saved successfully`));
                            getexistingunits();
                            clearunitfileds();
                        } else if(data.status =="exists"){
                            unitdetailsnotifications.html(showAlert("info", `The Unit ${unitname} already exists`));
                        } 
                    }else {
                            unitdetailsnotifications.html(showAlert("danger", `Sorry, an error occurred: ${data}`));
                        }
                }
            );
        }
        unitdetailsnotifications.html(showAlert("info", errors));
    });

    function clearunitfileds(){
        unitcodefield.val("");
        unitnamefield.val("");
        unitprogrammefiled.val("");
        unitsemesterfiled.val("");
        unitschoolfield.val("");
        unitstatusfield.val("");
        unitdescriptionfield.val("")
    }

    function getexistingunits(unitid,unitcode,unitname){
        $.getJSON(
            "../controllers/unitsoperations.php",
            {
                getunitdetails: true,
                unitid,
                unitcode,
                unitname
            },
            (data) => {
                let results = "";
                data.forEach((units, i) => {
                    results += `<tr data-id="${units.unitid}">`
                    results+=`<td>${Number(i+1)}</td>`
                    results += `<td>${units.unitcode}</td>`
                    results += `<td>${units.unitname}</td>`
                    results += `<td>${units.unitprogramme}</td>`
                    results += `<td>${units.unitsemester}</td>`
                    results += `<td>${units.unitschool}</td>`
                    results += `<td>${units.unitstatus}</td>`
                    results += `<td>${units.unitdescription}</td>`
                    results += `<td><a href="#" class="edit"><i class="fal fa-edit fa-lg fa-fw"></i></a></td>`;
                    results += `<td><a href="#" class="delete"><i class="fal fa-trash-alt fa-lg fa-fw text-danger"></i></a></td></tr>`;
                })
                unittable.find("tbody").html(results)
            }
        )
    }

    unittable.on("click", ".edit", function(){
        const parent = $(this).closest("tr");
        unitid = parent.attr("data-id");
        $.getJSON(
            "../controllers/unitsoperations.php",
            {
                getunitdetails: true,
                unitid,
                unicode,
                unitname
            },
            (data) => {
                data = data[0]
                unitidfield.val(data.unitid)
                unitcodefield.val(data.unitcode)
                unitnamefield.val(data.unitname)
                unitprogrammefiled.val(data.unitprogramme)
                unitsemesterfiled.val(data.unitsemester)
                unitschoolfield.val(data.school)
                unitstatusfield.val(data.status)
                unitdescriptionfield.val(data.description)
                unitnotifications.html("")
                unitmodal.modal("show")
            }
        );
    });

    unittable.on("click", ".delete", function(){
        const parent = $(this).closest("tr");
        unitid = parent.attr("data-id");
        unitname = parent.find("td").eq(2).text();

        bootbox.dialog({
            title: "Delete Units",
            message: `<i class='fal fa-question-circle fa-2x fa-fw text-primary'></i> Delete unit <span class='font-weight-bold'>${unitname}</span> from the system.`,
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
                        unitnotifications.html(showAlert("processing","Processing. Please wait ...",1));
                        $.post(
                            "../controllers/unitsoperations.php",
                            {
                                deleteunits: true,
                                unitid,
                                unitcode
                            },
                            (data) => {
                                data = data.trim();
                                if(isJSON(data)){
                                    data = JSON.parse(data);
                                    if(data.status == "success"){
                                        unitnotifications.html(showAlert("success", `Unit name <strong>${unitname}</strong> deleted successfully.`));
                                        getexistingunits();
                                    }
                                } else {
                                    unitnotifications.html(showAlert("danger", `Sorry, an error occurred: ${data}`));
                                }
                            }
                        );
                    }
                }
            }
        });
    });
});
