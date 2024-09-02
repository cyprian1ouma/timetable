$(document).ready(function(){
    console.log("ready")
    const rooms = ['Room A', 'Room B', 'Room C'];
    // const lecturers=[]
    // $.getJSON(
    //     "../controllers/lecturersoperations.php",
    //     {
    //         getlecturer:true
    //     },
    //     (data)=>{
    //         data.forEach((lecturer)=>{
    //             lecturers.push({name:lecturer.fullname, maxConsecutiveHours: 2, assignedSlots: []})
    //         })
            
    //     }
    // )

    // console.log(lecturers)

    const lecturers = [
        { name: 'Dr. Smith', maxConsecutiveHours: 2, assignedSlots: [] },
        { name: 'Prof. Johnson', maxConsecutiveHours: 2, assignedSlots: [] },
        { name: 'Dr. Williams', maxConsecutiveHours: 2, assignedSlots: [] }
    ];

    const courses = [
        { name: 'BTech', units: ['Math', 'Physics', 'Statistics'] },
        { name: 'Math', units: ['Calculus', 'Algebra', 'Geometry'] }
    ];

    const units = [
        { name: 'Math', lecturer: 'Dr. Smith',course:"BTech", hoursPerDay: 4, maxHoursPerWeek: 8, assignedSlots: [] },
        { name: 'Physics', lecturer: 'Prof. Johnson',course:"BTech",  hoursPerDay: 4, maxHoursPerWeek: 8, assignedSlots: [] },
        { name: 'Statistics', lecturer: 'Dr. Williams',course:"BTech",  hoursPerDay: 4, maxHoursPerWeek: 6, assignedSlots: [] },
        { name: 'Calculus', lecturer: 'Dr. Smith',course:"Math",  hoursPerDay: 4, maxHoursPerWeek: 6, assignedSlots: [] },
        { name: 'Algebra', lecturer: 'Prof. Johnson',course:"Math",  hoursPerDay: 4, maxHoursPerWeek: 6, assignedSlots: [] },
        { name: 'Geometry', lecturer: 'Dr. Williams',course:"Math",  hoursPerDay: 4, maxHoursPerWeek: 4, assignedSlots: [] }
    ];

    const timeSlots = ['7AM-9AM', '9AM-11AM', '11AM-1PM', '2PM-4PM', '4PM-6PM'];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    let timetable = {};

    days.forEach(day => {
        timetable[day] = {};
        timeSlots.forEach(slot => {
            timetable[day][slot] = { room: null, course: null, unit: null, lecturer: null };
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
                    if (remainingHours > 0 && canAssign(lecturer, unit, slot) && !timetable[day][slot].unit) {
                        timetable[day][slot] = { room: rooms[0], course:  unit.course, unit: unit.name, lecturer: lecturer.name };

                        lecturer.assignedSlots.push(slot);
                        unit.assignedSlots.push(slot);

                        remainingHours -= 2;

                        if (unit.assignedSlots.length >= unit.hoursPerDay / 2) {
                            remainingHours = 0;
                        }
                    }
                });
            });
        });
    }

    generateTimetable();

    function printTimetablePerCourse() {
        const container = document.getElementById('timetable-container');

        courses.forEach(course => {
            let html = `<h2>Timetable for ${course.name}</h2>`;
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
                    const { unit, lecturer, room } = timetable[day][slot];
                    if (course.units.includes(unit)) {
                        html += `<td>${unit}<br>${lecturer}<br>${room}</td>`;
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

    printTimetablePerCourse();

    function printLecturerTimetables() {
        const container = document.getElementById('timetable-container');

        lecturers.forEach(lecturer => {
            let html = `<h2>Timetable for ${lecturer.name}</h2>`;
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
                    const { course, unit, room } = timetable[day][slot];
                    if (lecturer.name === timetable[day][slot].lecturer) {
                        html += `<td>${course}<br>${unit}<br>${room}</td>`;
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
    printLecturerTimetables();
})