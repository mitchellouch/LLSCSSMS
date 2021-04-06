var timer;
var rowNum;

$(document).ready(() => {

    if($(".resultsContainer").length >= 1)  //search Page
        outputAllStudents();
        
    else{
        if($(".saitProgramsContainer").length >= 1) {  //Info, register page
            setAllSaitPrograms($(".saitProgramsContainer"));
            activateFaCheckbox();
        }
        
        if(studentServiceType !== undefined && studentServiceType.length !== 0) {
            expandCollapsedSections(studentServiceType);
        }

        if(birthDate !== undefined && birthDate.length !== 0) {
            setBirthDate(birthDate);
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
    resetCollapsedSections();
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
    if(typeList.length == 0)    return;

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

function resetCollapsedSections() {
    document.getElementById("collapseEA").classList.remove("show");
    document.getElementById("collapseAS").classList.remove("show");
    document.getElementById("collapseFA").classList.remove("show");
}

function activateFaCheckbox() {
    if($("input[name=isFundedEsl]")[0].checked)
        $("input[name=eslFundedMonths]").attr("disabled", false);
        
    $("input[name=isFundedEsl]").on("change", (e) => {
        if(e.target.checked) {
            $("input[name=eslFundedMonths]").attr("disabled", false);
        }
        else {
            $("input[name=eslFundedMonths]").attr("disabled", true);
        }
    })
    
    if($("input[name=isFundedAu]")[0].checked)
        $("input[name=auFundedMonths]").attr("disabled", false);

    $("input[name=isFundedAu]").on("change", (e) => {
        if(e.target.checked) {
            $("input[name=auFundedMonths]").attr("disabled", false);
        }
        else {
            $("input[name=auFundedMonths]").attr("disabled", true);
        }
    })
}

function setBirthDate(date) {
    var formatedDate = formatDate(date);
    document.getElementsByName("dateOfBirth")[0].value = formatedDate;
}

function formatDate(date) { //format Date object as "yyyy-mm-dd"
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + (d.getDate() + 1),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
