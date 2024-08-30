$(document).ready(function () {
});
//******************SET DATES ******************************

$('#startDate').datetimepicker({ format: 'DD-MMM-YYYY', extraFormats: ['DD-MM-YYYY', 'DD-MM-YY'], defaultDate: new Date() });
$('#endDate').datetimepicker({ format: 'DD-MMM-YYYY', extraFormats: ['DD-MM-YYYY', 'DD-MM-YY'], defaultDate: new Date() });


setCurrentDate()
function setCurrentDate() {
    let SelectedDate = new Date();
    $('#endDate').datepicker('setDate', 'SelectedDate');
    $('#startDate').datepicker('setDate', 'SelectedDate');
}
//********************DATES ***********************************

//********************Set Grid******************************
var dataSearchGrid = { location: "local" };

var colSearchGrid = [
    { title: "", dataIndx: "ActionId", dataType: "integer", hidden: true, width: 0 },
    {
        title: "Nature", dataIndx: "NatureName", width: '10%',
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    },
    {
        title: "Group", dataIndx: "GroupName", width: '10%',
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    },
    {
        title: "Task", dataIndx: "TaskName", width: '10%',
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    },
    {
        title: "Action", dataIndx: "ActionName", width: '25%',
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    },
    {
        title: "Comments", dataIndx: "Comments", width: '25%',
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    },
    {
        title: "Exec Reminder", dataIndx: "ExecutionDate", width: '10%',
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    },
    {
        title: "Status", dataIndx: "Status", width: '10%',
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    },
];

var setSearchGrid = {
    adjustGridWidth: true,
    width: 'auto',
    height: 650,
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
    toolbar: {
        items: [{
            type: 'button',
            label: "Export Excel",
            icon: 'ui-icon-arrowthickstop-1-s',
            listener: function () {
                var format = 'xlsx'
                    blob = this.exportData({
                        format: format,
                        nopqdata: true, //applicable for JSON export.                        
                        render: true
                    });
                if (typeof blob === "string") {
                    blob = new Blob([blob]);
                }
                saveAs(blob, "Execution Summery." + format);
            }
        }]
    },
    rowClick: function (evt, ui) {
        if (ui.rowData) {
            var data = ui.rowData;
        }
    }

}
var $SearchGrid = $("#SearchGrid").pqGrid(setSearchGrid);
//*********************Search Grid************************


//****************** Show Data ***********************************
$("#btnShow").on('click', function () {
    let fromDate = $("#startDate").data('date');
    let toDate = $("#endDate").data('date');
    let Details = {
        FromDate: fromDate,
        ToDate: toDate
    }
    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
    $.ajax({
        type: "GET", //HTTP Get Method
        headers: {
            "__RequestVerificationToken": antiForgeryToken
        },
        data: Details,
        dataType: "json",
        url: "/ExecutionSummery/GetExecutionDetails", // Controller/View
        success: function (response) {
            if (response.data.length != 0 && response.success == true) {
                db = response.data
                $("#SearchGrid").pqGrid("option", "dataModel.data", db);
                $("#SearchGrid").pqGrid("refreshDataAndView");
                PqGridRefreshClick($("#SearchGrid"));

            }
            else {
                $("#SearchGrid").pqGrid("option", "dataModel.data", []);
                $("#SearchGrid").pqGrid("refreshDataAndView");
            }
        }
    });
});

//*********************DATA ***********************************