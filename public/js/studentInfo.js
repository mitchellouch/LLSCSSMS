var timer;
var rowNum;

$(document).ready(() => {
    //alert(success);

    outputAllStudents();
})

$("#searchBox").keydown((event) => {
    if(event.key !== "Enter")   return;

    clearTimeout(timer);
    var textbox = $(event.target);
    var value = textbox.val();
    var searchType;

    var reg = new RegExp('^[0-9]+$');

    if(reg.test(value) == true) {   //SAIT ID filtered
        searchType = "saitId";
        searchStudent(value, searchType);
    }
    else {
        searchType = "name";
        searchStudent(value, searchType);
    }
})

function outputAllStudents(){
    $.get("api/students", {}, results => {
        outputStudents(results, $(".resultsContainer"));
    })
}

function searchStudent(searchTerm, searchType) {
    var query = {};
    if(searchType === "saitId"){
        query.saitId = searchTerm;
    }
    else {
        query.name = searchTerm;
    }
    $.get("/api/students", query, results => {
        outputStudents(results, $(".resultsContainer"));
    });
}

function outputStudents(results, container){
    //const columns = ["#", "SAIT ID", "First", "Last"];

    container.html("");
    rowNum = 1;

    //Make single result to Array
    if(!Array.isArray(results)) {
        results = [results];    
    }

    var html = `<table class="table table-sm table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">SAIT ID</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                            </tr>
                        </thead>
                        <tbody>`;
    
    results.forEach(result => {
        html += createStudentsTableRowHtml(result);
    });
    html += "</tbody> </table>";
    
    container.append(html);

    if(results.length == 0) {
        container.append("<span class='noResults'>No result</span>");
    }
}

function createStudentsTableRowHtml(postData){
    //Testing 
    if(postData == null) return alert("Student object is null");

    return `<tr>
                <th scope="row">${rowNum++}</th>
                <td> <a href="/student/info/${postData.saitId}">${postData.saitId}</a></td>
                <td>${postData.firstName}</td>
                <td>${postData.lastName}</td>
            </tr>`;
}



// function refreshMessage() {
//     //variable success is passed from "studentRegister.pug": line 7
//     if(success == true){    
//         $("#message").removeClass("errorMessage");
//         $("#message").addClass("successMessage");
//     }
//     else {
//         $("#message").removeClass("successMessage");
//         $("#message").addClass("errorMessage");
//     }
// }