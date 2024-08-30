$(document).ready(function () {
    $("#ExecutionGrid").css("display", "none");
    $("#btnSave").prop('disabled', true);
});
   var currentDate;
// Date picker for Date using to load grid
$('#actionsOnDate').datetimepicker({ format: 'DD-MMM-YYYY', extraFormats: ['DD-MM-YYYY', 'DD-MM-YY'], defaultDate: new Date() });


setCurrentDate();
function setCurrentDate() {
    let ActionsOnDate = new Date();
   $('#actionsOnDate').datepicker('setDate', ActionsOnDate);
}
currentDate = new Date($('#actionsOnDate').data('date'));

// DateEditor to embed calender in grid cell
function dateEditor(ui) {
    debugger;
    var $inp = ui.$cell.find("input"),
        grid = this,
        format = ui.column.format || "dd-M-yy",
        val = $inp.val(),
        val = val ? $.datepicker.formatDate(format, new Date(val)) : "";

    //initialize the editor
    $inp
        .attr('readonly', 'readonly')
        .val(val)
        .datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: format,
            onSelect: function () {
                debugger;
                /*this.firstOpen = true;*/
            },
            onClose: function () {
                this.focus();
            }
        });
}
///*******************Set Execution grid *************************///
var dataExecutionGrid = { location: "local" };
var colExecutionGrid = [
    {
        dataIndx: "state", maxWidth: 30, minWidth: 30, align: "center", resizable: false,
        title: "", menuIcon: false, type: 'checkBoxSelection', cls: 'ui-state-default', sortable: false, editor: false,
        dataType: 'bool', cb: {
            all: true, //checkbox selection in the header affect current page only.
            header: true //show checkbox in header.}
        }
    },
    {
        title: "Task", dataIndx: "Task", width: '17%', editable: false, dataType: "text"
    },    
    {
        title: "Actions", dataIndx: "Action", width: '19%', editable: false, dataType: "text"
    },
    {
        title: "Execution Reminder", dataIndx: "Reminder", width: '10%', cls: 'pq-calendar',
        editor: { type: 'textbox', init: dateEditor },
        render: function (ui) {
            debugger;
            if (ui) {
                
                return ui
            }
        }
    },
    {
        title: "Status", dataIndx: "StatusId", width: '8%', cls: 'pq-drop-icon pq-side-icon',
        editor: {
            type: 'select',
            options: [{ 1: "Open" }, { 2: "In progress" }, { 3: "On Hold" }, { 4: "Done" }, { 5: "Closed" }]
        },
        render: function (ui) {
            if (ui.cellData == '1') {
                return 'Open'
            }
            else if (ui.cellData == '2') {
                return 'In progress'
            }
            else if (ui.cellData == '3') {
                return 'On Hold'
            }
            else if (ui.cellData == '4') {
                return 'Done'
            }
            else if (ui.cellData == '5') {
                return 'Closed'
            }
        }
    },
    {
        title: "Comment", dataIndx: "Comments", width: '37%',
        editor: { type: 'textbox' },
        render: function (ui) {
            debugger
            if (ui.rowData.CheckMark == true) {
                var rowI = ui.rowIndx;
                var colI = ui.colIndx;
                var cell = { rowIndx: rowI, colIndx: colI };
                ui.cell.editable = true;


            }
        }
    },
    {
        title: "History", dataIndx: "History", width: '7%',
        render: function (ui) {
            var renderButton = '<button type="button" class="btn btn-primary" onclick="showHistory(' + ui.rowData.ActionId + ')">View</button>';
            return renderButton;
        }

    }
];

var setExecutionGrid = {
    adjustGridWidth: true,
    autofill: false,
    height: 600,
    sortable: false,
    numberCell: { show: false },
    hoverMode: 'row',
    /*rowHt: 50,*/
    showTop: true,
    resizable: true,
    sortModel: { on: false },
    scrollModel: { autoFit: true },
    draggable: false,
    wrap: true,
    editable: true,
    hwrap: true,
    autoRow: true,
    selectionModel: { type: 'cell' },
    colModel: colExecutionGrid,
    dataModel: dataExecutionGrid,
    pageModel: { type: "local", rPP: 100 },
    rowInit: function (ui) {
        if (ui.rowData.colId == 0) {
            return {
                style: "background:#337ab7;color:#FFF;font-style:bold;font-size:13px;"
            }
        }
        else if (ui.rowData.ActionId > 0) {
            return {
                style: "background:#FFF;color:black;font-style:bold;font-size:12px;"
            }
        }
    },

}
var $SearchExecutionGrid = $("#ExecutionGrid").pqGrid(setExecutionGrid);

//****************************** Go Button to Get Data ***********************///
$("#btnGo").click(function () {
    $('#ddlNature').empty();
    $('#ddlGroup').empty();
    $('#ddlTask').empty();
    $('#ddlStatus').empty();   
    $("#btnSave").prop('disabled', true);

    var Details = {
        SelectedDate: $('#actionsOnDate').data('date')
    }
    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
    $.ajax({

        headers: {
            "__RequestVerificationToken": antiForgeryToken
        },
        type: 'GET',
        data: Details,
        url: "/Execution/GetExecutionData",
        dataType: "json",
        success: function (response) {
            if (response.data != "") {
                db = response.data;
                loadNature();
            }
            else {

                $("#ExecutionGrid").css("display", "none");
                $('#ddlNature').append('<option value="0"> No Data found </option>');
                $('#ddlGroup').append('<option value="0"> No Data found </option>');
                $('#ddlTask').append('<option value="0"> No Data found </option>');
                $('#ddlStatus').append('<option value="0"> No Data found </option>');
            }
        }
    });
});

//*************** Load Nature for Dropdown ***********************///
function loadNature() {
    var natureDist = db.filter((v, i, a) => a.findIndex(v2 => (v2.NatureId === v.NatureId)) === i);
    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
    $.ajax({
        type: "GET", //HTTP Get Method
        headers: {
            "__RequestVerificationToken": antiForgeryToken
        },
        url: "/NatureMaster/GetAllNature", // Controller/View
        success: function (data) {
       
            if (data.success == true && data.data.length != 0) {
                let result = data.data.filter(o => natureDist.some(({ NatureId }) => o.NatureId === NatureId));
                if (result != 0) {
                    $('#ddlNature').append('<option value="0">Select</option>');
                    $.each(result,
                        function (index, value) {
                            $('#ddlNature').append('<option value="' + value.NatureId + '">' + value.Name + '</option>');
                        }
                    )
                }
            }
        }

    });
    $("#ExecutionGrid").pqGrid("option", "dataModel.data", []);
    $("#ExecutionGrid").pqGrid("refreshDataAndView");
}

/********************Load Group for Dropdown********************///
$("#ddlNature").on('change', function () {
    loadGroup();
});
function loadGroup() {
    $('#ddlGroup').empty();
    NatureID = $("#ddlNature").val();
    var groupFilter = db.filter(item => item.NatureId == NatureID);
    var groupDist = groupFilter.filter((v, i, a) => a.findIndex(v2 => (v2.GroupId == v.GroupId)) == i);
    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
    $.ajax({
        type: "GET", //HTTP Get Method
        headers: {
            "__RequestVerificationToken": antiForgeryToken
        },
        data: { NatureId: NatureID },
        url: "/TaskMaster/GetGroupByNature", // Controller/View
        success: function (data) {
            if (data.success == true && data.data.length != 0) {
                let result = data.data.filter(o => groupDist.some(({ GroupId }) => o.GroupId === GroupId));
                if (result.length != 0) {
                    $('#ddlGroup').append('<option value="0">Select</option>');
                    $.each(result,
                        function (index, value) {

                            $('#ddlGroup').append('<option value="' + value.GroupId + '">' + value.GroupName + '</option>');
                        });
                }
            } else {
                $('#ddlGroup').append('<option value="0"> No Data found </option>');
                $("#ddlTask").empty();
                $('#ddlTask').append('<option value="0"> No Data found </option>');               
            }
        }
    });

    $("#ExecutionGrid").pqGrid("option", "dataModel.data", []);
    $("#ExecutionGrid").pqGrid("refreshDataAndView");
}

////**********************Load Task for Dropdown***********************///

$('#ddlGroup').on('change', function () {
    var data = [];
    let distinctAction = [];
    let filterAction = [];
    var filterdatewise;
    GroupID = parseInt($("#ddlGroup").val());
    var selectedDate = new Date($('#actionsOnDate').data('date'));
    filterTask = db.filter(item => item.GroupId == GroupID && item.NatureId == NatureID);
    distinctAction = filterTask.filter((v, i, a) => a.findIndex(v2 => (v2.ActionId === v.ActionId)) === i);
            //if (currentDate <= selectedDate) {
            //    filterdatewise = filterTask.filter(item => currentDate <= new Date(item.Reminder) && new Date(item.Reminder) <= selectedDate);
            //}
            //else if (selectedDate <= currentDate) {
            //    filterdatewise = filterTask.filter(item => currentDate >= new Date(item.Reminder) && new Date(item.Reminder) >= selectedDate);
            //}
            //  distinctAction = filterdatewise.filter((v, i, a) => a.findIndex(v2 => (v2.ActionId === v.ActionId)) === i)
            /*    filterAction = distinctAction.filter(item => item.StatusId === StatusID);*/

    if (distinctAction.length != 0) {
        ShowExecutionGrid();

        $("#ExecutionGrid").pqGrid("option", "dataModel.data", distinctAction);
        $("#ExecutionGrid").pqGrid("refreshDataAndView");
        PqGridRefreshClick($("#ExecutionGrid"));
        $("#btnSave").prop('disabled', false);
    }
    else {
        ShowAlert("error", "No Data Found");
        $("#ExecutionGrid").css("display", "none");
        $("#btnSave").prop('disabled', true);
    }
});



//**************************** Save Execution Details********************///
$("#btnSave").click(function () {

    let ExecutionGridData = $("#ExecutionGrid").pqGrid("option", "dataModel.data");
    let executionData = [];

    for (var i = 0; i < ExecutionGridData.length; i++) {
        let com;
        if (ExecutionGridData[i].Comments == '') {           /// using to avoid error of null
            com = '';
        }
        else {
            com = ExecutionGridData[i].Comments;
        }
        if (ExecutionGridData[i].state) {                        // eliminating undefined error
            if (ExecutionGridData[i].state == true) {
                executionData.push({
                    ActionId: ExecutionGridData[i].ActionId,
                    Action: ExecutionGridData[i].Action,
                    Comments: com,
                    StatusId: ExecutionGridData[i].StatusId,
                    ReminderDate: ExecutionGridData[i].Reminder,
                });
            }
        }
    }

    let Details = { ExecutionModelList: executionData };
    if (executionData == '') {
        ShowAlert("warning", "Select atleast One Execution before Save.")
        $("#btnSave").prop('disabled', false);
        return;
    }
    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
    $.ajax({
        headers: {
            "__RequestVerificationToken": antiForgeryToken
        },
        type: "POST",
        url: "/Execution/SaveExecution", //Controller/View
        contentType: "application/json",
        data: JSON.stringify(Details),
        success: function (response) {
            if (response.success === true) {
                ShowAlert("success", response.message);
                $("#ExecutionGrid").pqGrid("option", "dataModel.data", []);
                $("#ExecutionGrid").pqGrid("refreshDataAndView");
                PqGridRefreshClick($("#ExecutionGrid"));
                setCurrentDate();
            }
            else {
                ShowAlert("error", response.message);
                setCurrentDate();
                $("#ExecutionGrid").css("display", "none");
            }
        }
    });
});


function ShowExecutionGrid() {
    $("#ExecutionGrid").css("display", "block");
}

/////////////////// ACtion History Pop Up Modal /////////////////////////////
var dataHistoryExecutionGrid = { location: "local" };
var colHistoryExecutionGrid = [
    { title: "", dataIndx: "ActionId", dataType: "integer", hidden: true, width: 0 },
    {
        title: "Action Name", dataIndx: "Action", width: '30%',
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    },
    {
        title: "Status", dataIndx: "Status", width: '10%',
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    },
    {
        title: "Comments", dataIndx: "Comments", width: '40%', height: 'auto',
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    },
    {
        title: "UpdatedDate", dataIndx: "UpdatedDate", width: '20%',
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    }
];

var setExeHistoryGrid = {
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
    colModel: colHistoryExecutionGrid,
    dataModel: dataHistoryExecutionGrid,
    rowClick: function (evt, ui) {
        if (ui.rowData) {
            var data = ui.rowData;
        }
    }
}

var $SearchGrid = $("#ExecutionHistoryGrid").pqGrid(setExeHistoryGrid);

function showHistory(Id) {
    $('#HistoryPopUpModal').modal("show");
    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
    $.ajax({
        headers: {
            "__RequestVerificationToken": antiForgeryToken
        },
        type: 'GET',
        data: { ActionId: Id },
        url: "/Execution/GetExecutionHistory",
        dataType: "json",
        beforeSend: function () {

            $SearchGrid.pqGrid("showLoading");
        },
        complete: function () {

            $SearchGrid.pqGrid("hideLoading");
        },
        success: function (response) {
            $("#ExecutionHistoryGrid").pqGrid("hideLoading");
            $("#ExecutionHistoryGrid").pqGrid("option", "dataModel.data", response.data);
            $("#ExecutionHistoryGrid").pqGrid("refreshDataAndView");
        }
    });
}

//*******************************************************************************************************************************************//
//function loadTask() {
//    $("#ddlTask").empty();
//    GroupID = $('#ddlGroup').val();
//    var taskFilter = db.filter(item => item.GroupId == GroupID);
//    var taskDist = taskFilter.filter((v, i, a) => a.findIndex(v2 => (v2.TaskId == v.TaskId)) == i);
//    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
//    $.ajax({
//        type: "GET", //HTTP Get Method
//        headers: {
//            "__RequestVerificationToken": antiForgeryToken
//        },
//        data: { GroupId: GroupID },
//        url: "/ActionMaster/GetTaskByGroup", // Controller/View
//        success: function (data) {
//            if (data.success == true && data.data.length != 0) {
//                let result = data.data.filter(a => taskDist.some(({ TaskId }) => a.TaskId === TaskId));
//                if (result.length != 0) {
//                    $('#ddlTask').append('<option value="0">Select</option>');
//                    $.each(result,
//                        function (index, value) {
//                            $('#ddlTask').append('<option value="' + value.TaskId + '">' + value.TaskName + '</option>');
//                        }
//                    )              
//                }               
//            }
//            else {
//                $('#ddlTask').append('<option value="0"> No Data found </option>');
//                $('#ddlStatus').append('<option value="0"> No Data found </option>');
//                $("#ExecutionGrid").pqGrid("option", "dataModel.data", []);
//                $("#ExecutionGrid").pqGrid("refreshDataAndView");
//            }
//        } 
//    });
//    //$("#ExecutionGrid").pqGrid("option", "dataModel.data", []);
//    //$("#ExecutionGrid").pqGrid("refreshDataAndView");    
//}
//$('#ddlTask').on('change', function () {
//    loadStatusType();
//});

////************ load Status****************//

//function loadStatusType() {
//    $("#ddlStatus").empty();
//    TaskID = parseInt($("#ddlTask").val());
//    var statusFilter = db.filter(item => item.TaskId == TaskID);
//    var statusDist = statusFilter.filter((v, i, a) => a.findIndex(v2 => (v2.StatusId == v.StatusId)) == i);
//    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
//    $.ajax({
//        type: "GET", //HTTP Get Method
//        headers: {
//            "__RequestVerificationToken": antiForgeryToken
//        },
//        url: "/ActionMaster/GetAllStatus", // Controller/View
//        success: function (data) {
//            if (data.success == true && data.data.length != 0) {
//                let result = data.data.filter(a => statusDist.some(({ StatusId }) => a.StatusId === StatusId));
//                if (result.length != 0) {
//                    $('#ddlStatus').append('<option value="0">Select</option>');
//                    $.each(result,
//                        function (index, value) {
//                            $('#ddlStatus').append('<option value="' + value.StatusId + '">' + value.Status + '</option>');
//                        }
//                    )
//                }
//            }
//            else {
//                $('#ddlStatus').append('<option value="0"> No Data found </option>');
//                $("#ExecutionGrid").pqGrid("option", "dataModel.data", []);
//                $("#ExecutionGrid").pqGrid("refreshDataAndView");
//            }
//        }

//    });
//}
/////*****************On change of task ************************//

//$("#ddlStatus").on('change', function () {
//    var data = [];
//    let distinctAction = [];
//    let filterAction = [];
//    var filterdatewise;
//    StatusID = parseInt($("#ddlStatus").val());
//    var selectedDate = new Date($('#actionsOnDate').data('date'));
//    filterTask = db.filter(item => item.TaskId == TaskID && item.GroupId == GroupID && item.NatureId == NatureID);
//    if (currentDate <= selectedDate) {

//        filterdatewise = filterTask.filter(item => currentDate <= new Date(item.Reminder) && new Date(item.Reminder) <= selectedDate);
//    }
//    else if (selectedDate <= currentDate) {
//        filterdatewise = filterTask.filter(item => currentDate >= new Date(item.Reminder) && new Date(item.Reminder) >= selectedDate);
//    }
//    distinctAction = filterdatewise.filter((v, i, a) => a.findIndex(v2 => (v2.ActionId === v.ActionId)) === i)
//    filterAction = distinctAction.filter(item => item.StatusId === StatusID);

//    if (filterAction.length != 0) {
//        ShowExecutionGrid();

//        $("#ExecutionGrid").pqGrid("option", "dataModel.data", filterAction);
//        $("#ExecutionGrid").pqGrid("refreshDataAndView");
//        PqGridRefreshClick($("#ExecutionGrid"));
//        $("#btnSave").prop('disabled', false);
//    }
//    else {
//        ShowAlert("error", "No Data Found");
//        $("#ExecutionGrid").css("display", "none");
//        $("#btnSave").prop('disabled', true);
//    }
//})
