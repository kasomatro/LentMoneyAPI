//Object which represents the Entry
var Entry = {
    entryID: "",
    Name: "",
    Amount: 0.0,
    LentDate: ""
}
//Initialize Page with current state of entrys
$(document).ready(function () {
    entryList();
    totalAmount();
});

// Call Web API to get a list of all entries
function entryList() {
    $.ajax({
        url: '/api/Lent/',
        type: 'GET',
        dataType: 'json',
        success: function (entrys) {
            entryListSuccess(entrys);
        },
        error: function (request, message, error) {
            handleException(request, message, error);
        }
    });
}
// Call Web API to get the total amount of all entries
function totalAmount() {
    $.ajax({
        url: '/api/GetTotalAmount',
        type: 'GET',
        dataType: 'json',
        success: function (amount) {
            //add total amount
            $("#totalAmount").html(amount);

        },
        error: function (request, message, error) {
            handleException(request, message, error);
        }
    });
}
// Call web api to delete an entry from the list
function productDelete(ctl) {
    var id = $(ctl).data("id");

    $.ajax({
        url: "/api/Lent/" + id,
        type: 'DELETE',
        success: function (product) {
            $(ctl).parents("tr").remove();
            totalAmount();
        },
        error: function (request, message, error) {
            handleException(request, message, error);
        }
    });
}

//Send a new entry to the Web api
function entryAdd(entry) {
    $.ajax({
        url: "/api/Lent",
        type: 'POST',
        contentType:
            "application/json;charset=utf-8",
        data: JSON.stringify(entry),
        success: function (entry) {
            entryAddSuccess(entry);
            totalAmount();
        },
        error: function (request, message, error) {
            handleException(request, message, error);
        }
    });
}

//Called when the user press the add button
function updateClick() {
    // Build entry object from inputs
    Entry = new Object();
    Entry.Name = $("#friendName").val();
    Entry.LentDate = $("#introdate").val();
    Entry.Amount = $("#amount").val();
    if ($("#updateButton").text().trim() ==
        "Add") {
        entryAdd(Entry);
    }
}

//calls the function to add a new row and to clear the form
function entryAddSuccess(entry) {
    entryAddRow(entry);
    formClear();
}

//clears the form
function formClear() {
    $("#friendName").val("");
    $("#introdate").val("");
    $("#amount").val("");
}

//Adds new row for each entry to table
function entryListSuccess(entrys) {
    //Iterate over the collection of data
    $.each(entrys, function (index, entry) {
        //Add a row to the Entry table
        entryAddRow(entry);
    });
}
function entryAddRow(entry) {
    //Check if <tbody> tag exists, add one if not
    if ($("#entryTable tbody").length == 0) {
        $("#entryTable").append("<tbody></tbody>");
    }
    //Append row to <table>
    $("#entryTable tbody").append(
        entryBuildTableRow(entry));
}

//Buils the new row for the table in frontend
function entryBuildTableRow(entry) {

    var entryDate = new Date(entry.lentDate);
    var ret =
        "<tr>" +
        "<td>" + entry.entryID + "</td>" +
        "<td>" + entry.name + "</td>" +
        "<td>" + entryDate.toLocaleDateString("en-US") + "</td>"
        + "<td>" + entry.amount + "</td>" + "<td>" +
        "<button type='button' " +
        "onclick='productDelete(this);' " +
        "class='btn btn-default' " +
        "data-id='" + entry.entryID + "'>" +
        "<span class='glyphicon glyphicon-remove' />" +
        "</button>" +
        "</td>" +
        "</tr>";

    return ret;
}

//Exception handeling
function handleException(request, message,
    error) {
    var msg = "";
    msg += "Code: " + request.status + "\n";
    msg += "Text: " + request.statusText + "\n";
    if (request.responseJSON != null) {
        msg += "Message" +
            request.responseJSON.Message + "\n";
    }
    alert(msg);
}

