/*
var timer;
var rowNum;

$(document).ready(() => {
    if($(".resultsContainer").length >= 1)
        outputAllusers();
})

function outputAllUsers(){
    
    $.get("/api/users", {}, results => {
        outputUsers(results, $(".resultsContainer"));
    })
}


function outputUsers(results, container){
    container.html("");
    //Make single result to Array
    if(!Array.isArray(results)) {
        results = [results];    
    }

    var html = `<table class="table table-sm table-hover">
                        <thead>
                            <tr>
                                <th scope="col">SAIT ID</th>
                                <th scope="col">Last name</th>
                                <th scope="col">First name</th>
                                <th scope="col">Request</th>
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



**/