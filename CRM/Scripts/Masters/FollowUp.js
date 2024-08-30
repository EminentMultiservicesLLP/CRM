$('#Date').datetimepicker({ format: 'DD-MMM-YYYY', extraFormats: ['DD-MM-YYYY', 'DD-MM-YY'], defaultDate: new Date() });

var dataClientSearchGrid = { location: "local" };
var colClientSearchGrid = [
{ title: "", dataIndx: "FeedbackId", dataType: "integer", hidden: true },
{
    title: "Client Name", dataIndx: "ClientName", width: 400,
    filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
},
  {
      title: "Sector Name", dataIndx: "SectorName", width: 400,
      filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
  },
   {
       title: " Customer Answer", dataIndx: "CustomerAnswer", width: 400,
       filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
   },
    {
        title: " Contact Type", dataIndx: "TypeName", width: 400,
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    },
    {
        title: "User", dataIndx: "LoginName", width: 400,
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    },
    {
        title: " Remark", dataIndx: "Remark", width: 400,
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    },
{
    title: "Follow Up Date", dataIndx: "FollowUpDate", width: 400, dataType: "date",

    filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
}];


var setSearchGrid = {
    width: '100%',
    height: 400,
    title: 'Today Task',
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
    colModel: colClientSearchGrid,
    dataModel: dataClientSearchGrid,
    pageModel: { type: "local", rPP: 20 },
    rowClick: function (evt, ui) {
        if (ui.rowData) {

        }
    }
}

var $SearchGrid = $("#Searchgrid").pqGrid(setSearchGrid);


function loadSearchGrid() {
    var getDate = $("#Date").data('date');
    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
    $.ajax({

        headers: {
            "__RequestVerificationToken": antiForgeryToken
        },
        type: 'GET',
        url: "/FeedbackMaster/GetAllTodayTask",
        dataType: "json",
        data: { Date: getDate },
        beforeSend: function () {

            $SearchGrid.pqGrid("showLoading");
        },
        complete: function () {
        
            $SearchGrid.pqGrid("hideLoading");
        },

        success: function (response) {
       
            $("#Searchgrid").pqGrid("hideLoading");
            $("#Searchgrid").pqGrid("option", "dataModel.data", response);
            $("#Searchgrid").pqGrid("refreshDataAndView");

        }

    });
}

loadSearchGrid();

$("#btnShow").click(function () {
    debugger;
    var getDate = $("#Date").data('date');
    loadSearchGrid();



});