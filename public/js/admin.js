$(document).ready(() => {
    if ($(".resultsContainer").length >= 1)
        outputAllUsers();
})


function outputAllUsers() {
    $.get("/api/admin", {}, results => {
        outputUsers(results, $(".resultsContainer"));
    })
}

function outputUsers(results, container) {
    container.html("");
    rowNum = 1;
    //Make single result to Array
    if (!Array.isArray(results)) {
        results = [results];
    }

    var html = `<table class="table table-sm table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">SAIT ID</th>
                                <th scope="col">FIRST</th>
                                <th scope="col">LAST</th>
                                <th scope="col">Accept</th>
                                <th scope="col">Decline</th>
                            </tr>
                        </thead>
                        <tbody>`;

    results.forEach(result => {
        html += createUsersTableRowHtml(result);
    });
    html += "</tbody> </table>";

    container.append(html);

    if (results.length === 0) {
        container.append("<span class='noResults'>No result's</span>");
    }
}

function createUsersTableRowHtml(postData) {
    //Testing 
    if (postData == null) return alert("User object is null");

    return `<tr>
                <th scope="row">${rowNum++}</th>
                <td>${postData.saitId}</td>
                <td>${postData.firstName}</td>
                <td>${postData.lastName}</td>
                <td> <a href="api/admin/request/accept/${postData.saitId}"><i class='material-icons' style='color: green;'>check</i></a></td>
                <td> <a href="api/admin/request/decline/${postData.saitId}"><i class='material-icons' style='color: red;'>remove_circle_outline</i></a></td>
            </tr>`;
}