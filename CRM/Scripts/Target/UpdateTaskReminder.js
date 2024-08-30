$(document).ready(function () {
    loadReminderType();
    $("#SearchGrid").css("display", "none");
});
var db ;
///Load Task Reminder Type
function loadReminderType() {
    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
    $.ajax({
        type: "GET", //HTTP Get Method
        headers: {
            "__RequestVerificationToken": antiForgeryToken
        },
        url: "/TaskMaster/GetReminderType", // Controller/View
        success: function (data) {
            $.each(data.data,
                function (index, value) {
                    $('#ddlType').append('<option value="' + value.ReminderTypeId + '">' + value.ReminderTypeName + '</option>');
                }
            )
        }

    });
}
//*************** set Grid
var dataSearchGrid = { location: "local" };
var colSearchGrid = [
    { title: "", dataIndx: "TaskId", dataType: "integer", hidden: true, width: 0 },
    {
        title: "Nature", dataIndx: "NatureName", width: '20%',
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    },
    {
        title: "Group", dataIndx: "GroupName", width: '20%',
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    },
    {
        title: "Task", dataIndx: "TaskName", width: '40%',
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    },
    {
        title: "Reminder", dataIndx: "ReminderDate", width: '10%',
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    },
    {
        title: "Deadline", dataIndx: "DeadlineDate", width: '10%',
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    },
];

var setSearchGrid = {
    adjustGridWidth: true,
    width: 'auto',
    height: 450,
    sortable: false,
    numberCell: { show: true },
    hoverMode: 'cell',
    showTop: true,
    resizable: true,
    scrollModel: { autoFit: true },
    draggable: false,
    wrap: true,
    editable: false,
    filterModel: { on: true, mode: "AND", header: true },
    selectionModel: { type: 'row', subtype: 'incr', cbHeader: true, cbAll: true },
    pageModel: { type: "local", rPP: 100 },
    colModel: colSearchGrid,
    dataModel: dataSearchGrid,
    rowClick: function (evt, ui) {
        if (ui.rowData) {
            var data = ui.rowData;
        }
    }
}
var $SearchGrid = $("#SearchGrid").pqGrid(setSearchGrid);


//*************** Load Task according to Reminder Type

$("#ddlType").on('change', function () {
    let ReminderType = parseInt($('#ddlType').val());
    loadTask(ReminderType);
})
//***************function loadTask
function loadTask(ReminderType) {
    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
    $.ajax({
        type: "GET", //HTTP Get Method
        headers: {
            "__RequestVerificationToken": antiForgeryToken
        },
        data: { Type: ReminderType },
        dataType: "json",
        url: "/UpdateTaskReminder/GetTaskForReminderUpdate", // Controller/View
        success: function (response) {
            if (response.data.length != 0 && response.success == true) {
                db = response.data
                $("#SearchGrid").css("display", "block");
                $("#SearchGrid").pqGrid("option", "dataModel.data", db);
                $("#SearchGrid").pqGrid("refreshDataAndView");
                PqGridRefreshClick($("#SearchGrid"));
           
            }
            else {
                $("#SearchGrid").css("display", "block");
                $("#SearchGrid").pqGrid("option", "dataModel.data", []);
                $("#SearchGrid").pqGrid("refreshDataAndView");
            }
        }
    });
}

//*************** Update Reminder Dates according to their type
$("#btnUpdate").on("click", function () {
    let Type = $("#ddlType").val();
    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
    $.ajax({
        type: "POST", //HTTP Post Method
        headers: {
            "__RequestVerificationToken": antiForgeryToken
        },
        data: { TypeId: Type },
        dataType:"json",
        url: "/UpdateTaskReminder/UpdateTaskReminderDates", // Controller/View
        success: function (response) {
            if (response.success == true) {
                ShowAlert("success", response.message);
                $("#SearchGrid").pqGrid("refreshDataAndView");
                loadTask(Type); 
            }
            else {
                ShowAlert("error", response.message);
                $("#SearchGrid").pqGrid("option", "dataModel.data", []);
                $("#SearchGrid").pqGrid("refreshDataAndView");
            }
        }
    });
})