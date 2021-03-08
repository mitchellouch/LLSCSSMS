var timer;

$(document).ready(() => {
    if($(".apptResultsContainer").length >= 1)
        outputAllAppointments();
    //else if($(".saitProgramsContainer").length >= 1) {
    //   setAllSaitPrograms($(".saitProgramsContainer"));
    //}
})

$("#apptSearchBox").keydown((event) => {
    if(event.key !== "Enter")   return;

    clearTimeout(timer);
    var textbox = $(event.target);
    var value = textbox.val();
    searchAppointments(value);
})

function outputAllAppointments(){
    $.get("/api/appointments", {}, results => {
        outputAppointments(results, $(".apptResultsContainer"));
    })
}

function searchAppointments(searchTerm) {
    var query = {};
    query.search = searchTerm;
    $.get("/api/appointments", query, results => {
        outputAppointments(results, $(".apptResultsContainer"));
    });
}

function outputAppointments(results, container){
    container.html("");
    rowNum = 1;

    //Make single result to Array
    if(!Array.isArray(results)) {
        results = [results];    
    }

    var html = `<table class="table table-sm table-hover">
                        <thead>
                            <tr>
                                <th scope="col">APPT ID</th>
                                <th scope="col">SAIT ID</th>
                                <th scope="col">Advisor ID</th>
                                <th scope="col">APPT Type</th>
                                <th scope="col">Start Date</th>
                                <th scope="col">Meeting Notes</th>
                            </tr>
                        </thead>
                        <tbody>`;
    
    results.forEach(result => {
        html += createAppointmentsTableRowHtml(result);
    });
    html += "</tbody> </table>";
    
    container.append(html);

    if(results.length == 0) {
        container.append("<span class='noResults'>No result</span>");
    }
}

function createAppointmentsTableRowHtml(postData){
    //Testing 
    if(postData == null) return alert("Appointment object is null");

    return `<tr>
                <td>${postData.apptId}</td>
                <td> <a href="/student/info/${postData.saitId}">${postData.saitId}</a></td>
                <td>${postData.advisorId}</td>
                <td>${postData.apptType}</td>
                <td>${postData.startDate}</td>
                <td>${postData.meetingNotes}</td>
            </tr>`;
}