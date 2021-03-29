var timer;

$(document).ready(() => {
    if($(".resultsContainer").length >= 1)
        outputAllAppointments();
    //else if($(".saitProgramsContainer").length >= 1) {
    //   setAllSaitPrograms($(".saitProgramsContainer"));
    //}
})

$("#searchBox").keydown((event) => {
    if(event.key !== "Enter")   return;

    clearTimeout(timer);
    var textbox = $(event.target);
    var value = textbox.val();
    searchAppointments(value);
})

$("#resetButton").click((event) => {
    $("[name=saitId]").attr("value", null);
    $("[name=firstName]").attr("value", null);
    $("[name=lastName]").attr("value", null);
    $("[name=studentPhone]").attr("value", null);
    $("[name=studentEmail]").attr("value", null);
    $("[name=personalEmail]").attr("value", null);
    $("[name=academicStatus]").attr("value", null);
    $("[name=comments]").val(null);
})

$("#deleteAppointmentModal").on("show.bs.modal", (event) => {
    var button = $(event.relatedTarget);
    console.log("log")
    var apptId = $("[name=apptId]").val();
    $("#deleteAppointmentConfButton").data("apptId", apptId);
})

$("#deleteAppointmentConfButton").click((event) => {
    var apptId = $(event.target).data("apptId");

    $.ajax({
        url: `/api/appointments/${apptId}`,
        type: "DELETE",
        success: (data, status, xhr) => {

            if(xhr.status != 202) {
                alert("could not delete appointment");
                return;
            }
            
            alert(`#${apptId} is successfully deleted.`);
            window.location.replace("/appointment");
        }
    })
})

function outputAllAppointments(){
    
    $.get("/api/appointments", {}, results => {
        outputAppointments(results, $(".resultsContainer"));
    })
}

function searchAppointments(searchTerm) {
    var query = {};
    query.saitId = searchTerm;
    query.apptId = searchTerm;
    $.get("/api/appointments", query, results => {
        outputAppointments(results, $(".resultsContainer"));
    });
}

function outputAppointments(results, container){
    container.html("");
    //Make single result to Array
    if(!Array.isArray(results)) {
        results = [results];    
    }

    var html = `<table class="table table-sm table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Appointment ID</th>
                                <th scope="col">SAIT ID</th>
                                <th scope="col">Advisor ID</th>
                                <th scope="col">Meeting Type</th>
                                <th scope="col">Start Date</th>
                                <th scope="col">End Date</th>
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
    if(postData == null) return alert("Appointment object is null");
    var start = new Date(postData.startDate);
    start.setHours(start.getHours() + 6);
    
    var end = new Date(postData.endDate);
    end.setHours(end.getHours() + 6);

    return `<tr>
                <td><a href="/appointment/info/${postData.apptId}">${postData.apptId}</td>
                <td><a href="/student/info/${postData.saitId}">${postData.saitId}</a></td>
                <td>${postData.advisorId}</td>
                <td>${postData.meetingType}</td>
                <td>${start.toLocaleString()}</td>
                <td>${end.toLocaleString()}</td>
                <td>${postData.meetingNotes}</td>
            </tr>`;
}