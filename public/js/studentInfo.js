var timer;
var rowNum;

$(document).ready(() => {
    //alert(success);

    if($(".resultsContainer").length >= 1)  //search Page
        outputAllStudents();
        
    else{
        if($(".saitProgramsContainer").length >= 1) {  //Info, register page
            setAllSaitPrograms($(".saitProgramsContainer"));
        }

        if(studentTypeChecked !== undefined && studentTypeChecked !== 'false') {
            expandCollapsedSections(studentTypeChecked);
        }
    }

    
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

//Reset all values
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

$("#deleteStudentModal").on("show.bs.modal", (event) => {
    var button = $(event.relatedTarget);
    console.log("log")
    var saitId = $("[name=saitId]").val();
    $("#deleteStudentConfButton").data("saitId", saitId);
})

$("#deleteStudentConfButton").click((event) => {
    var saitId = $(event.target).data("saitId");

    $.ajax({
        url: `/api/students/${saitId}`,
        type: "DELETE",
        success: (data, status, xhr) => {

            if(xhr.status != 202) {
                alert("could not delete student");
                return;
            }
            
            alert(`#${saitId} is successfully deleted.`);
            window.location.replace("/student");
        }
    })
})
/*
$("#updateStudentButton").click(event => {
    
    const saitId = $("[name=saitId]").val();
    const firstName = $("[name=firstName]").val();
    const lastName = $("[name=lastName]").val();
    const studentPhone = $("[name=studentPhone]").val();
    const studentEmail = $("[name=studentEmail]").val();
    const personalEmail = $("[name=personalEmail]").val();
    const academicStatus = $("[name=academicStatus]").val();
    const comments = $("[name=comments]").val().trim();
    var condition = {};

    $.get("/api/students", { saitId: saitId }, results => {
        const result = results[0];

        if(result.firstName !== firstName)
            condition.firstName = firstName;
        if(result.lastName !== lastName)
            condition.lastName = lastName;
        if(result.studentPhone !== studentPhone)
            condition.studentPhone = studentPhone;
        if(result.studentEmail !== studentEmail)
            condition.studentEmail = studentEmail;
        if(result.personalEmail !== personalEmail)
            condition.personalEmail = personalEmail;
        if(result.academicStatus !== academicStatus)
            condition.academicStatus = academicStatus;
        if(result.comments !== comments)
            condition.comments = comments;
            console.log("#1", condition);

    });

    $.ajax({
        url: `/student/info/${saitId}`,
        type: "PUT",
        data: condition,
        success: () => location.reload()
    })
    
})*/

function outputAllStudents(){
    $.get("/api/students", {}, results => {
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

function setAllSaitPrograms(container) {
    //container.html("");

    $.get("/api/saitPrograms", results => {
        //Make single result to Array
        if(!Array.isArray(results)) {
            results = [results];    
        }

        var html = `<select class="form-select form-control" name="program">
                        <option value="">--Select program--</option>`;
        
        try{    //Student update page have programSelected variable (studentInfo.pug)
            results.forEach(result => {
                html += `<option ${result.name === programSelected ? "selected" : ""}>
                    ${result.name}
                </option>`;
            });
        }
        catch (e) { //Student register page have no programSelected variable (studentRegister.pug)
            results.forEach(result => {
                html += `<option>${result.name}</option> `
            });
        }
        html += "</select>";
        
        container.append(html);

        if(results.length == 0) {
            container.append(`<select class="form-select form-control" name="program" disabled></select>`);
        }
    });
} 

function expandCollapsedSections(typeList) {
    var list = typeList.split(",");
    var checkboxes = document.getElementsByName("studentServiceType");
    if(list.includes("EA")) {
        document.getElementById("collapseEA").classList.add("show");
        checkboxes[0].checked = true;
    }

    if(list.includes("AS")) {
        document.getElementById("collapseAS").classList.add("show");
        checkboxes[1].checked = true;
    }

    if(list.includes("FA")) {
        document.getElementById("collapseFA").classList.add("show");
        checkboxes[2].checked = true;
    }
}

