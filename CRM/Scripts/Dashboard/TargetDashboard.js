$(document).ready(function () {
    //$("#SearchActiongrid").css("display", "none");
});

// Date picker for Date using to load grid
$('#selectedDate').datetimepicker({ format: 'DD-MMM-YYYY', extraFormats: ['DD-MM-YYYY', 'DD-MM-YY'], defaultDate: new Date() });
currentDate = new Date($('#selectedDate').data('date'));



setCurrentDate();
function setCurrentDate() {
  
    $('#selectedDate').datepicker('setDate', 'SelectedDate');
}

//*************** Load Nature for Dropdown ***********************///
loadNature()
function loadNature() {
    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
    $.ajax({
        type: "GET", //HTTP Get Method
        headers: {
            "__RequestVerificationToken": antiForgeryToken
        },
        url: "/NatureMaster/GetAllNature", // Controller/View
        success: function (data) {
            $.each(data.data,
                function (index, value) {
                    $('#ddlNature').append('<option value="' + value.NatureId + '">' + value.Name + '</option>');
                }
            )
        }

    });
}

///***************************** set Task SearchGrid ****************************************///

var dataSearchGrid = { location: "local" };
var colSearchGrid = [
    { title: "", dataIndx: "TaskId", dataType: "integer", hidden: true, width: 0 },
    {
        title: "Group", dataIndx: "GroupName", width: '42%',
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    },
    {
        title: "Task", dataIndx: "TaskName", width: '42%',
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    },
    //{
    //    title: "Deadline", dataIndx: "DeadlineDate", width: '10%',
    //    filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    //},
    //{
    //    title: "Type", dataIndx: "TypeName", width: '15%',
    //    filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    //}
    //,
    {
        title: "Task Reminder", dataIndx: "ReminderDate", width: '16%',
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    }
];

var setSearchGrid = {
    adjustGridWidth: true,
    width: 'auto',
    height: 280,
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
    colModel: colSearchGrid,
    dataModel: dataSearchGrid,
    pageModel: { type: "local", rPP: 20 },
    rowClick: function (evt, ui) {
        if (ui.rowData) {
            var data = ui.rowData;
            loadActionData(data.TaskId);
        }
    }
}
var $SearchTaskGrid = $("#Searchgrid").pqGrid(setSearchGrid);

////Load all Task Data According to Nature and Group till the Selected Date which is equivalent to Reminder Date of Task_master
$('#btnShow').on('click', function () {
 
    if ($('#ddlNature').val() == 0) {
        ShowAlert('error', 'Please select respective Nature');
    }
    var Details = {
        SelectedDate: $('#selectedDate').data('date'),
        NatureId: $('#ddlNature').val()      
    }
    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
    $.ajax({
        headers: {
            "__RequestVerificationToken": antiForgeryToken
        },
        type: 'GET',
        data: Details,
        url: "/Dashboard/Dashboard/GetallTaskTillDate",
        dataType: "json",
        beforeSend: function () {

            $SearchTaskGrid.pqGrid("showLoading");
        },
        complete: function () {

            $SearchTaskGrid.pqGrid("hideLoading");
        },
        success: function (response) {
            if (response.data.length > 0) {               
                $("#Searchgrid").pqGrid("hideLoading");
                $("#Searchgrid").pqGrid("option", "dataModel.data", response.data);
                $("#Searchgrid").pqGrid("refreshDataAndView");
            }
            else {
                $("#Searchgrid").pqGrid("option", "dataModel.data", []);
                $("#Searchgrid").pqGrid("refreshDataAndView");             
                $("#SearchActiongrid").pqGrid("option", "dataModel.data", []);
                $("#SearchActiongrid").pqGrid("refreshDataAndView");
            }
        }
    });
});

///***************************** set Action SearchGrid ****************************************///

var dataActionSearchGrid = { location: "local" };
var colActionSearchGrid = [
    { title: "", dataIndx: "ActionId", dataType: "integer", hidden: true, width: 0 },
    {
        title: "Action", dataIndx: "ActionName", width: '50%',
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    },
    {
        title: "Deadline", dataIndx: "ReminderDate", width: '25%',
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    },
    {
        title: "Status", dataIndx: "StatusName", width: '15%',
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    }
    ,
    {
        title: "History", dataIndx: "", width: '10%',
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] },
        render: function (ui) {
            if (ui.rowData) {                
                var renderButton = '<button type="button" class="btn btn-primary" onclick="showHistory(' + ui.rowData.ActionId + ')">View</button>';
                    return renderButton;                
            }

        }
    }
];

var setSearchActionGrid = {
    adjustGridWidth: true,
    width: 'auto',
    height: 250,
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
    colModel: colActionSearchGrid,
    dataModel: dataActionSearchGrid,
    pageModel: { type: "local", rPP: 20 },
    rowClick: function (evt, ui) {
        if (ui.rowData) {               
        }
    }
}
var $SearchActionGrid = $("#SearchActiongrid").pqGrid(setSearchActionGrid);

//******************************Load Actions As per Selected Task ********************************//
function loadActionData(TaskID) {
    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
    $.ajax({
        headers: {
            "__RequestVerificationToken": antiForgeryToken
        },
        type: 'GET',
        data: { TaskId: TaskID },
        url: "/Dashboard/Dashboard/GetallActionsInSelectedTask",
        dataType: "json",
        beforeSend: function () {
            $SearchActionGrid.pqGrid("showLoading");
        },
        complete: function () {
            $SearchActionGrid.pqGrid("hideLoading");
        },
        success: function (response) {
            if (response.data.length > 0) {
                var filterData = response.data.filter((v, i, a) => a.findIndex(v2 => (v2.ActionId === v.ActionId)) === i);
                $("#SearchActiongrid").pqGrid("hideLoading");
                $("#SearchActiongrid").pqGrid("option", "dataModel.data", filterData);
                $("#SearchActiongrid").pqGrid("refreshDataAndView");
            }
            else {
                $("#SearchActiongrid").pqGrid("option", "dataModel.data", []);
                $("#SearchActiongrid").pqGrid("refreshDataAndView");
            }
        }
    });
}

//********************** History Pop Up Modal **************************************//
var dataHistoryExecutionGrid = { location: "local" };
var colHistoryExecutionGrid = [
    { title: "", dataIndx: "ActionId", dataType: "integer", hidden: true, width: 0 },  
    {
        title: "Actions", dataIndx: "ActionName", width: '20%',
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    },
    {
        title: "Status", dataIndx: "StatusName", width: '9%',
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    },
    {
        title: "Comments", dataIndx: "Comments", width: '38%', height: 'auto',
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    },
    {
        title: "Execution Reminder", dataIndx: "ReminderDate", width: '16%',
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    },
    {
        title: "Updated on", dataIndx: "UpdatedDate", width: '17%',
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    }
];

var setExeHistoryGrid = {
    adjustGridWidth: true,
    width: 'auto',
    height: 500,
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
    colModel: colHistoryExecutionGrid,
    dataModel: dataHistoryExecutionGrid,
    pageModel: { type: "local", rPP: 20 },
    rowClick: function (evt, ui) {
        if (ui.rowData) {            
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
        url: "/Dashboard/Dashboard/GetActionHistory",
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





