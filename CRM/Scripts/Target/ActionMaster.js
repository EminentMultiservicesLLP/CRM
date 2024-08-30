$(document).ready(function () {
    var ActionID = 0;
    var NatureID = 0;
    var GroupID = 0;
    //Sets Reminder date
    $('#Reminder').datepicker(
        {
            'changeMonth': true,
            'changeYear': true,
            'yearRange': '2021:2050',
            dateFormat: 'dd-M-yy',
            todayBtn: "linked",
            pickerPosition: "bottom-left",
            "todayHighlight": true,
            autoclose: true,
        }
    )
   
    setCurrentDate();
    function setCurrentDate() {
        let ReminderDate = new Date();
        //let ExeReminderDate = new Date();

        $('#Reminder').datepicker('setDate', 'ReminderDate');
        //$('#ExecutionReminder').datepicker('setDate', 'ExeReminderDate');
    }
// Load pg Grid
    var dataActionSearchGrid = { location: "local" };
    var colActionSearchGrid = [
        { title: "", dataIndx: "ActionId", dataType: "integer", hidden: true, width: 0 },

        {
            title: "Nature", dataIndx: "NatureName", width: '15%',
            filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
        },
        {
            title: "Group", dataIndx: "GroupName", width: '15%',
            filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
        },
        {
            title: "Task", dataIndx: "TaskName", width: '15%',
            filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
        },
        {
            title: "Action Name", dataIndx: "Name", width: '20%',
            filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
        },       
        {
            title: "Sequence", dataIndx: "ActionSequence", width: '10%',
            filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
        },
        {
            title: "Deadline", dataIndx: "Reminder", width: '12%',            
            filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
        },
        {
            title: "Status", dataIndx: "StatusName", width: '13%',
            filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
        }
    ];

    var setSearchGrid = {
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
        wrap: false,
        editable: false,
        filterModel: { on: true, mode: "AND", header: true },
        selectionModel: { type: 'row', subtype: 'incr', cbHeader: true, cbAll: true },
        colModel: colActionSearchGrid,
        dataModel: dataActionSearchGrid,
        pageModel: { type: "local", rPP: 100 },
        rowClick: function (evt, ui) {
            if (ui.rowData) {
                var data = ui.rowData;            
                ActionID = data.ActionId;
                $("#Name").val(data.Name);
                $("#ActionSequence").val(data.ActionSequence);                     
                $("#Reminder").val(data.Reminder);                
                $("#ExecutionReminder").val(data.ExecutionReminder);
                $("#ddlStatus").val(data.Status);
                $("#ddlNature").val(data.NatureId)                
                $("#ddlGroup").empty();
                $("#ddlGroup").append('<option value="' + data.GroupId + '">' + data.GroupName + '</option>');               
                $("#ddlTask").empty();
                $("#ddlTask").append('<option value="' + data.TaskId + '">' + data.TaskName + '</option>');
                loadTaskDescription();
                disableFields(false);
            }
        }
    }

    var $SearchGrid = $("#Searchgrid").pqGrid(setSearchGrid);

    ///// Load Nature
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
    $("#ddlNature").on('change', function () {        
        loadGroup();
    });
    //**************** Load Groups ************//
    function loadGroup() {
        $('#ddlGroup').empty();
       
        NatureID = $("#ddlNature").val();
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
                            $('#ddlGroup').append('<option value="0">Select</option>');
                    $.each(data.data,
                        function (index, value) {
                            $('#ddlGroup').append('<option value="' + value.GroupId + '">' + value.GroupName + '</option>');
                        });
                } else {
                    $('#ddlGroup').append('<option value="0"> No Data found </option>');
                    $("#ddlTask").empty();
                }
            }

        });
    }

//************* load Task *****************///
    $('#ddlGroup').on('change', function () {        
        loadTask();
    });
    function loadTask() {
        $("#ddlTask").empty();       
        GroupID = $('#ddlGroup').val();
        var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
        $.ajax({
            type: "GET", //HTTP Get Method
            headers: {
                "__RequestVerificationToken": antiForgeryToken
            },
            data: { GroupId: GroupID},
            url: "/ActionMaster/GetTaskByGroup", // Controller/View
            success: function (data) {
                if (data.success == true && data.data.length != 0) {
                    $('#ddlTask').append('<option value="0">Select</option>');
                    $.each(data.data,
                        function (index, value) {
                            $('#ddlTask').append('<option value="' + value.TaskId + '">' + value.TaskName + '</option>');
                        }

                    )
                }
                else {
                    $('#ddlTask').append('<option value="0"> No Data found </option>');
                }
            }

        });
    }

//************* load Task Description *****************///
    $('#ddlTask').on('change', function (){
        loadTaskDescription();
    });
    function loadTaskDescription() {
        $("#Description").empty();
        let TaskID = $('#ddlTask').val();
        var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
        $.ajax({
            type: "GET", //HTTP Get Method
            headers: {
                "__RequestVerificationToken": antiForgeryToken
            },
            data: { TaskId: TaskID },
            url: "/ActionMaster/GetTaskDescription", // Controller/View
            success: function (data) {
                if (data.success == true && data.data.length != 0) {
                    $('#Description').val(data.data[0].Description);
                }
            }
        });
    }


 //************ load Status****************//
    loadStatusType();
    function loadStatusType() {
        var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
        $.ajax({
            type: "GET", //HTTP Get Method
            headers: {
                "__RequestVerificationToken": antiForgeryToken
            },
            url: "/ActionMaster/GetAllStatus", // Controller/View
            success: function (data) {             
                $.each(data.data,
                    function (index, value) {
                        $('#ddlStatus').append('<option value="' + value.StatusId + '">' + value.Status + '</option>');
                    }
                )
            }

        });
    }

  //************ load Grid **************//
    function loadActionGrid() {
        var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
        $.ajax({
            headers: {
                "__RequestVerificationToken": antiForgeryToken
            },
            type: 'GET',
            url: "/ActionMaster/GetAllAction",
            dataType: "json",

            beforeSend: function () {

                $SearchGrid.pqGrid("showLoading");
            },
            complete: function () {

                $SearchGrid.pqGrid("hideLoading");
            },

            success: function (response) {            
                $("#Searchgrid").pqGrid("hideLoading");
                $("#Searchgrid").pqGrid("option", "dataModel.data", response.data);
                $("#Searchgrid").pqGrid("refreshDataAndView");

            }

        });
    }
    loadActionGrid();

    $("#btnSave").click(function () {
       
        if ($("#Name").val() == "") {
            ShowAlert("error", "Action Name is missing! Please enter the Name");
            return;
        }
        if ($("#ActionSequence").val() == "" || $("#ActionSequence").val() == 0) {
            ShowAlert("error", "Action Sequence is missing! Please enter the Sequence");
            return;
        }
        if ($("#ddlNature").val() == "" || $("#ddlNature").val() == 0) {
            ShowAlert("error", "Please Select required Nature");
            return;
        }
        if ($("#ddlGroup").val() == 0) {
            ShowAlert("error", "Please Select required Group");
            return;
        }
        if ($("#ddlTask").val() == 0) {
            ShowAlert("error", "Please Select required Task");
            return;
        }
        if ($("#ddlStatus").val() == "") {
            ShowAlert("error", "Please Select Action Status");
            return;
        }
        var details = {
            ActionId: ActionID,
            Name: $("#Name").val(),
            Description: $("#Description").val(),
            ActionSequence: $("#ActionSequence").val(),
            NatureId: $("#ddlNature").val(),
            GroupId: $("#ddlGroup").val(),
            TaskId: $("#ddlTask").val(),
            Reminder: $("#Reminder").val(),           
            Status: $("#ddlStatus").val()           
        }

        var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
        $.ajax({
            headers: {
                "__RequestVerificationToken": antiForgeryToken
            },
            type: "POST", //HTTP POST Method
            url: '/ActionMaster/SaveAction', // Controller/View
            data: details,
            success: function (msg) {
                
                if (msg.success === true) {
                    if (ActionID == 0) {
                        ShowAlert("success", "Successfully Saved Action Master.");
                    }
                    else {
                        ShowAlert("success", "Successfully Update Action Master.");
                    }
                    ClearForm();
                    loadActionGrid();
                }
                else {
                    if (ActionID == 0) {
                        ShowAlert("error", "failed to Save Action Master");
                    }
                    else {
                        ShowAlert("error", "failed to Update Action Master");
                    }
                    loadActionGrid();
                }
            }

        });

    });

    function ClearForm() {
        $("#Name").val("");
        $("#ActionSequence").val("");
        $("#Description").val("");
        $("#ddlNature").val("");
        $("#ddlGroup").empty();
        $('#ddlGroup').append('<option value="0">Select</option>');
        $("#ddlTask").empty();
        $('#ddlTask').append('<option value="0">Select</option>');
        $("#Reminder").val("");
        $("#ExecutionReminder").val("");
        $("#ddlStatus").val("");
	    disableFields(false);
        setCurrentDate();
        ActionID = 0;          
    }

    $("#btnReset").click(function () {
        ClearForm();
    });

    function disableFields(state) {
        $("#Name").prop('disabled', state);
        $("#ActionSequence").prop('disabled', state);
        $("#Description").prop('disabled', state);
        $("#ddlNature").prop('disabled', state);
        $("#ddlGroup").prop('disabled', state);
        $("#ddlTask").prop('disabled', state);
        $("#Reminder").prop('disabled', state);
        $("#ddlStatus").prop('disabled', state);
        $("#ExecutionReminder").prop('disabled', state);
        $("#btnSave").prop('disabled', state);        
    }

});