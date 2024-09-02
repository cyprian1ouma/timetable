$(document).ready(function(){
    const rooms =[],// = ['Room A', 'Room B', 'Room C'];
        lecturers = [],
        courses=[],
        units = []

    function getrooms(){
        const dfd=$.Deferred()
        $.getJSON(
            "../controllers/timetableoperations.php",
            {
                getrooms:true
            },
            (data)=>{
                // rooms=[...data] // spread operators 
                data.forEach((room)=>{
                    rooms.push(room.name)
                })
                dfd.resolve()
            }
        )
        return dfd.promise()
    }
   
    function getlecturers(){
        const dfd=$.Deferred()
        $.getJSON(
            "../controllers/timetableoperations.php",
            {
                getlecturers:true
            },
            (data)=>{
                data.forEach((lecturer)=>{
                    lecturers.push({name:lecturer.name,maxConsecutiveHours: 2, assignedSlots: []})
                })
                dfd.resolve()
            }
        )
        return dfd.promise()
    }

    function getcourses(){
        const dfd=$.Deferred()
        $.getJSON(
            "../controllers/timetableoperations.php",
            {
                getcourseunits:true
            },
            (data)=>{
                data.forEach((course)=>{
                    const courseunits=course.units
                    courses.push({name:course.name,units:courseunits.split(",")})
                })
                dfd.resolve()
            }
        )
        return dfd.promise()
    }

    function getunits(){
        const dfd=$.Deferred()
        $.getJSON(
            "../controllers/timetableoperations.php",
            {
                getlecturercourses:true
            },
            (data)=>{
                data.forEach((unit)=>{
                    units.push({ name: unit.name, lecturer: unit.lecturer, course: unit.course, hoursPerDay: 4, maxHoursPerWeek: 8, assignedSlots: []})
                })
                dfd.resolve()
            }
        )
        return dfd.promise()
    }

    getrooms().done(()=>{
        //     const lecturers = [
        //     { name: 'Dr. Smith', maxConsecutiveHours: 2, assignedSlots: [] },
        //     { name: 'Prof. Johnson', maxConsecutiveHours: 2, assignedSlots: [] },
        //     { name: 'Dr. Williams', maxConsecutiveHours: 2, assignedSlots: [] }
        // ];
        getlecturers().done(()=>{
            getcourses().done(()=>{
                getunits().done(()=>{
                    const timeSlots = ['7AM-9AM', '9AM-11AM', '11AM-1PM', '2PM-4PM', '4PM-6PM'];
                    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

                    let timetable = {};

                    rooms.forEach(room => {
                        timetable[room] = {};
                        days.forEach(day => {
                            timetable[room][day] = {};
                            timeSlots.forEach(slot => {
                                timetable[room][day][slot] = { course: null, unit: null, lecturer: null };
                            });
                        });
                    });

                    function canAssign(lecturer, unit, slot) {
                        const assignedSlots = lecturer.assignedSlots;
                        if (assignedSlots.length === 0) return true;

                        // Check max consecutive hours
                        for (let i = 0; i < assignedSlots.length; i++) {
                            const previousSlot = assignedSlots[i];
                            const [prevStart, prevEnd] = previousSlot.split('-');
                            const [currStart, currEnd] = slot.split('-');
                            const prevStartHour = parseInt(prevStart);
                            const prevEndHour = parseInt(prevEnd);
                            const currStartHour = parseInt(currStart);
                            const currEndHour = parseInt(currEnd);

                            if (Math.abs(currStartHour - prevEndHour) === 0) {
                                const consecutiveHours = prevEndHour - prevStartHour + currEndHour - currStartHour;
                                if (consecutiveHours > lecturer.maxConsecutiveHours) {
                                    return false;
                                }
                            }
                        }

                        // Check max hours per week for the unit
                        const totalHoursAssigned = unit.assignedSlots.length * 2; // Each slot is 2 hours
                        if (totalHoursAssigned + 2 > unit.maxHoursPerWeek) {
                            return false;
                        }

                        return true;
                    }

                    function generateTimetable() {
                        days.forEach(day => {
                            units.forEach(unit => {
                                let lecturer = lecturers.find(l => l.name === unit.lecturer);
                                let remainingHours = unit.hoursPerDay;

                                timeSlots.forEach(slot => {
                                    if (remainingHours > 0 && canAssign(lecturer, unit, slot)) {
                                        rooms.forEach(room => {
                                            if (!timetable[room][day][slot].unit) {
                                                timetable[room][day][slot] = { course: unit.course, unit: unit.name, lecturer: lecturer.name };

                                                lecturer.assignedSlots.push(slot);
                                                unit.assignedSlots.push(slot);

                                                remainingHours -= 2;

                                                if (unit.assignedSlots.length >= unit.hoursPerDay / 2) {
                                                    remainingHours = 0;
                                                }
                                            }
                                        });
                                    }
                                });
                            });
                        });
                    }

                    generateTimetable();

                    function printRoomTimetables() {
                        const container = document.getElementById('room-timetable-container');

                        rooms.forEach(room => {
                            let html = `<h2>Timetable for ${room}</h2>`;
                            html += '<table>';
                            html += '<thead><tr><th>Day/Time</th>';

                            // Generate time slots header
                            timeSlots.forEach(slot => {
                                html += `<th>${slot}</th>`;
                            });
                            html += '</tr></thead><tbody>';

                            // Generate table rows for each day
                            days.forEach(day => {
                                html += `<tr><td>${day}</td>`;
                                timeSlots.forEach(slot => {
                                    const { course, unit, lecturer } = timetable[room][day][slot];
                                    if (course && unit && lecturer) {
                                        html += `<td>${course}<br>${unit}<br>${lecturer}</td>`;
                                    } else {
                                        html += `<td>---</td>`;
                                    }
                                });
                                html += '</tr>';
                            });

                            html += '</tbody></table>';
                            container.innerHTML += html;
                        });
                    }

                    printRoomTimetables();
                    // })
                })
            })
        })
    })
        // const courses = [
        //     { name: 'BTech', units: ['Math', 'Physics', 'Statistics'] },
        //     { name: 'Math', units: ['Calculus', 'Algebra', 'Geometry'] }
        // ];

        // const units = [
        //     { name: 'Math', lecturer: 'Dr. Smith', course: 'BTech', hoursPerDay: 4, maxHoursPerWeek: 8, assignedSlots: [] },
        //     { name: 'Physics', lecturer: 'Prof. Johnson', course: 'BTech', hoursPerDay: 4, maxHoursPerWeek: 8, assignedSlots: [] },
        //     { name: 'Statistics', lecturer: 'Dr. Williams', course: 'BTech', hoursPerDay: 4, maxHoursPerWeek: 6, assignedSlots: [] },
        //     { name: 'Calculus', lecturer: 'Dr. Smith', course: 'Math', hoursPerDay: 4, maxHoursPerWeek: 6, assignedSlots: [] },
        //     { name: 'Algebra', lecturer: 'Prof. Johnson', course: 'Math', hoursPerDay: 4, maxHoursPerWeek: 6, assignedSlots: [] },
        //     { name: 'Geometry', lecturer: 'Dr. Williams', course: 'Math', hoursPerDay: 4, maxHoursPerWeek: 4, assignedSlots: [] }
        // ];
})

