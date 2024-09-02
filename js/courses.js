$(document).ready(()=>{
    const courseidfield=$("#courseid"),
        coursecodefield=$("#coursecode"),
        coursenamefield=$("#coursename"),
        semesterfield=$("#semester"),
        descriptionfield=$("#description"),

    // table, modals, notification

        savecourses=$("#savecoursesdetails"),
        coursetable=$("#coursetable"),
        coursedetailsnotication=$("#coursesdetailsnotifications"),
        coursetablenotifications=$("#coursenotifications")
     

        savecourses.on("click",()=>{
            const courseid=courseidfield.val(),
                  coursecode=coursecodefield.val(),
                  coursename=coursenamefield.val(),
                  semester=semesterfield.val(),
                  description=descriptionfield.val()

           let errors=""
           if(coursecode==""){
              errors="Please insert course code"
              coursecodefield.focus()
           }if(coursename==""){
              errors="Please insert course name"
              coursenamefield.focus()
           }if(semester==""){
              errors="Please input the semester field"
              semesterfield.focus()
           }if(description==""){
              errors="Please give some description of the course"
              descriptionfield.focus()
           }
           if(errors==""){
            $.post(
                "../controllers/coursesoperations.php",
                {
                    savecourses:true,
                    courseid,
                    coursecode,
                    coursename,
                    semester,
                    description
                },
                (data)=>{
                    if(isJSON(data)){
                        data=JSON.parse(data);
                        if(data.status=="success"){
                            coursedetailsnotication.html(showAlert("success", `The ${coursename}course has been saved successfully`))
                        }else if(data.status=="exists"){
                            coursedetailsnotication.html(showAlert("info",`The course ${coursename} has already exists`))
                        }
                        else{
                            coursedetailsnotication.html(showAlert("danger",`An error has occured ${data}`))
                        }
                    }
                }
            )
           }
           else{
            coursedetailsnotication.html(showAlert("info",errors))
           }

        })

})