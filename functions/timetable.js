$(document).ready(function() {
    function generateTimeSlots() {
        var starttime = 7; 
        var endtime = 18;
        var duration = 2;
        var lunchstart = 13;
        var lunchend = 14; 

        var timeSlots = [];

        for (var i = starttime; i < endtime; i += duration) {
            var startHour = i;
            var endHour = i + duration;

            if (startHour < lunchstart && endHour > lunchstart) {
                // Adjust the end hour to exclude the lunch break
                endHour = lunchstart;
            } else if (startHour >= lunchstart && startHour < lunchend) {
                // Skip the time slot during the lunch break
                continue;
            }

            var startPeriod = startHour < 12 ? "AM" : "PM";
            var endPeriod = endHour < 12 ? "AM" : "PM";

            if (startHour > 12) startHour -= 12;
            if (endHour > 12) endHour -= 12;

            var slot = startHour + ":00 " + startPeriod + " - " + endHour + ":00 " + endPeriod;
            timeSlots.push(slot);
        }

        return timeSlots;
    }

    function populateTimeSlots() {
        var timeSlots = generateTimeSlots();
        var $timeSlotsSelect = $('#time-slots');

        $.each(timeSlots, function(index, slot) {
            $timeSlotsSelect.append($('<option></option>').val(slot).text(slot));
        });
    }  
});
