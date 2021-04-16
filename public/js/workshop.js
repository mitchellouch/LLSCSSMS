var timer;

$("#resetButton").click((event) => {
    $("[name=workshopID]").attr("value", null);
    $("[name=workshopType]").attr("value", null);
    $("[name=WorkshopDesc]").attr("value", null);
    $("[name=workshopDate]").attr("value", null);
    $("[name=workshopFacilitator]").attr("value", null);
    $("[name=workshopRequest]").attr("value", null);
    $("[name=requestProgram]").attr("value", null);
    $("[name=requestSchool]").attr("value", null);
    $("[name=requestContact]").attr("value", null);
    $("[name=numAttendees]").attr("value", null);
    $("[name=workshopLength]").attr("value", null);
    $("[name=avgRating]").attr("value", null);
    $("[name=comments]").val(null);
    $("[name=requestProgram]").attr("disabled", 'disabled');
    $("[name=requestSchool]").attr("disabled", 'disabled');
    $("[name=requestContact]").attr("disabled", 'disabled');
})

$(document).ready(() => {
    if($(".resultsContainer").length >= 1)
        outputAllWorkshops();
    else {
        if ($("[name=workshopRequest]").is(':checked')) {
            $("[name=requestProgram]").removeAttr("disabled");
            $("[name=requestSchool]").removeAttr("disabled");
            $("[name=requestContact]").removeAttr("disabled");
        } else {
            $("[name=requestProgram]").attr("disabled", 'disabled');
            $("[name=requestSchool]").attr("disabled", 'disabled');
            $("[name=requestContact]").attr("disabled", 'disabled');
        }
    }
})

$("[name=workshopRequest]").click((event) => {
    if ($("[name=workshopRequest]").is(':checked')) {
        $("[name=requestProgram]").removeAttr("disabled");
        $("[name=requestSchool]").removeAttr("disabled");
        $("[name=requestContact]").removeAttr("disabled");
    } else {
        $("[name=requestProgram]").attr("disabled", 'disabled');
        $("[name=requestSchool]").attr("disabled", 'disabled');
        $("[name=requestContact]").attr("disabled", 'disabled');
    }
})

$("#searchBox").keyup((event) => {
    var textbox = $(event.target);
    var value = textbox.val();
    searchWorkshops(value);
})

$("#deleteWorkshopModal").on("show.bs.modal", (event) => {
    var button = $(event.relatedTarget);
    console.log("log")
    var workshopID = $("[name=workshopID]").val();
    $("#deleteWorkshopConfButton").data("workshopID", workshopID);
})

$("#deleteWorkshopConfButton").click((event) => {
    var workshopID = $(event.target).data("workshopID");

    $.ajax({
        url: `/api/workshops/${workshopID}`,
        type: "DELETE",
        success: (data, status, xhr) => {

            if(xhr.status != 202) {
                alert("could not delete workshop");
                return;
            }
            
            alert(`#${workshopID} is successfully deleted.`);
            window.location.replace("/workshop");
        }
    })
})

function outputAllWorkshops(){
    
    $.get("/api/workshops", {}, results => {
        outputWorkshops(results, $(".resultsContainer"));
    })
}

function searchWorkshops(searchTerm) {
    var query = {};
    query.workshopID = searchTerm;
    $.get("/api/workshops", query, results => {
        outputWorkshops(results, $(".resultsContainer"));
    });
}

function outputWorkshops(results, container){
    container.html("");
    //Make single result to Array
    if(!Array.isArray(results)) {
        results = [results];    
    }

    var html = `<table class="table table-sm table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Workshop ID</th>
                                <th scope="col">Workshop Type</th>
                                <th scope="col">Facilitator</th>
                                <th scope="col">Requested by Program?</th>
                                <th scope="col">Date</th>
                                <th scope="col">Length</th>
                                <th scope="col">Comments</th>
                            </tr>
                        </thead>
                        <tbody>`;
    
    results.forEach(result => {
        html += createWorkshopsTableRowHtml(result);
    });
    html += "</tbody> </table>";
    
    container.append(html);

    if(results.length === 0) {
        container.append("<span class='noResults'>No result's</span>");
    }
}

function createWorkshopsTableRowHtml(postData){
    if(postData == null) return alert("Workshop object is null");
    var start = new Date(postData.workshopDate);
    start.setHours(start.getHours() - 1);

    /**var newDate = new Date(start.getTime()+start.getTimezoneOffset()*60*1000);
    var offset = start.getTimezoneOffset() / 60;
    var hours = start.getHours();
    newDate.setHours(hours - offset);
    start = newDate;

    
    
    var newDate1 = new Date(end.getTime()+end.getTimezoneOffset()*60*1000);
    var offset1 = end.getTimezoneOffset() / 60;
    var hours1 = end.getHours();
    newDate1.setHours(hours1 - offset1);
    end = newDate1;**/

    return `<tr>
                <td><a href="/workshop/info/${postData.workshopID}">${postData.workshopID}</td>
                <td>${postData.workshopType}</td>
                <td>${postData.workshopFacilitator}</td>
                <td>${postData.workshopRequest}</td>
                <td>${start.toLocaleString()}</td>
                <td>${postData.workshopLength} hrs</td>
                <td>${postData.comments}</td>
            </tr>`;
}