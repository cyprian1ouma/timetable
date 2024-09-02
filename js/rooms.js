$(document).ready(function(){
    const roomidfield=$("#roomid"),
         roomnumerfiled=$("#roomnumber"),
         blockfield =$("#unitblockfield"),
         blockdepartmentfiled=$("#blockdepartment"),
         classlabfiled=$("#classlab"),
         roomcapacityfiled=$("#roomcapacity"),
         roomstatusfiled=$("#roomstatus"),

         // tables/modals.saves and notifications
         
         roomtable=$("#roomtable"),
         roommodal=$("#roommodal"),
         savenewroomsbutton=$("#saveroomsdetails"),
         roomdetailsnotications=$("#roomdetailsnotifications"),
         roomnotifications=$("#roomtablenotifications")

    // save button,
    savenewroomsbutton.on("click",()=>{
        const roomid=roomidfield.val(),
              roomnumber =roomnumerfiled.val(),
              block=blockfield.val(),
              department=blockdepartmentfiled.val(),
              classlab=classlabfiled.val(),
              capacity =roomcapacityfiled.val(),
              roomstatus=roomstatusfiled.val()
              
         let errors=""
     
         if(roomnumber==""){
            errors="Please insert the room number"
            roomnumerfiled.focus()
         }else if(block==""){
            errors="Please insert block where the room is found"
            blockfield.focus()
         }else if(department==""){
            errors="Please choose the departmet"
            blockdepartmentfiled.focus()
         }else if(classlab==""){
            errors="Please confirm the nature of the room"
            classlabfiled.focus()
         }else if(roomcapacity==""){
            errors="Please insert the room capacity"
            roomcapacityfiled.focus()
         }else if(roomstatus==""){
            errors="Please give the status of the room"
            roomstatusfiled.focus()
         }

         if(errors==""){
            $.post(
                "../controllers/roomsoperations.php",
                {
                    saverooms:true,
                    roomid, 
                    roomnumber,
                    block,
                    department,
                    capacity,
                    classlab,
                    roomstatus
                },
                (data)=>{
                    // console.log(data)
                    if(isJSON(data)){            
                        data =JSON.parse(data);
                        if(data.status="success"){
                            roomdetailsnotications.html(showAlert("success",`The room ${roomnumber} was saved successfully`));
                            getrooms(roomid,roomnumber);
                            clearroomfields();
                        }else if(data.status="exists"){
                            roomdetailsnotications.html(showAlert("info",`The room ${roomnumber} already exists`));
                        }
                    }else{
                            roomdetailsnotications.html(showAlert("danger",`sorry an error has occured ${data}`))
                        }
                }
            )
         }
         else {
            roomdetailsnotications.html(showAlert("info",errors));
         }
    })
    function clearroomfields(){
        roomnumerfiled.val(""),
        blockfield.val(""),
        blockdepartmentfiled.val(""),
        classlabfiled.val(""),
        roomcapacityfiled.val(""),
        roomstatusfiled.val("")
    }  
    function getrooms(roomid,roomnumber){
        $.getJSON(
            "../controllers/roomsoperations.php",
            {
                getroom:true,
                roomid,
                roomnumber
            },
            (data)=>{
                let results=""
                data.forEach((room,i)=>{
                    results+=`<tr data-id=${room.roomid}>`
                    results+=`<td>${Number(i+1)}</td>`
                    results+=`<td> ${room.roomnumber}</td>`
                    results+=`<td> ${room.block}</td>`
                    results+=`<td> ${room.department}</td>`
                    results+=`<td> ${room.capacity}</td>`
                    results+=`<td> ${room.classlab}</td>`
                    results+=`<td> ${room.roomstatus}</td>`

                    // edit and delete
                    results += `<td><a href="#" class="edit"><i class="fal fa-edit fa-lg fa-fw"></i></a></td>`;
                    results += `<td><a href="#" class="delete"><i class="fal fa-trash-alt fa-lg fa-fw text-danger"></i></a></td></tr>`;
                
                });
                roomtable.find("tbody").html(results);
            }
        )
    }

    roomtable.on("click",".edit", function(){
        const parent= $(this).closest("tr");
              roomid=parent.attr("data-id");
              $.getJSON(
                "../controllers/roomsopertions.php",
                {
                    getroomdetails:true,
                    roomid
                },
                (data)=>{
                    data=data[0],
                    roomidfield.val(data.roomid),
                    roomnumerfiled.val(data.roomnumber),
                    blockfield.val(data.block),
                    blockdepartmentfiled.val(data.department),
                    roomcapacityfiled.val(data.capacity),
                    classlabfiled.val(data.labclass),
                    roomstatusfiled.val(data.roomstatus)

                    roomnotifications.html(""),
                    roommodal.modal("show")
                }
              )
    });

    roomtable.on("click",".delete",function(){
        const parent = $(this).closest("tr");
              roomid=parent.attr("data-id");
              roomnumber.parent.find("td").eq(2).text();

              // confirm deletion with bootbox
              bootbox.dialog({
                title: "Delete rooms",
                message: `<i class='fal fa-question-circle fa-2x fa-fw text-primary'></i> Delete unit <span class='font-weight-bold'>${roomnumber}</span> from the system.`,
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
                            roomnotifications.html(showAlert("processing","Processing. Please wait ...",1));
                            $.post(
                                "../controllers/roomsoper.php",
                                {
                                    deleterooms: true,
                                    $roomid, 
                                    $roomnumber
                                },
                                (data) => {
                                    data = data.trim();
                                    if(isJSON(data)){
                                        data = JSON.parse(data);
                                        if(data.status == "success"){
                                            roomnotifications.html(showAlert("success", `room <strong>${roomnumber}</strong> deleted successfully.`));
                                            getrooms();
                                        }
                                    } else {
                                        roomnotifications.html(showAlert("danger", `Sorry, an error occurred: ${data}`));
                                    }
                                }
                            );
                        }
                    }
                }
            });
    })
})