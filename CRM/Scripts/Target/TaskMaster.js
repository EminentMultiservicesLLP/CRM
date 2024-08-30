$(document).ready(function () {
    var TaskID = 0;
    var NatureID = 0;


    $('#Deadline').datepicker(
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
    $('#ReminderDate').datepicker(
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
        let DeadlineDate = new Date();
        let ReminderDate = new Date();
              
        $('#Deadline').datepicker('setDate', 'DeadlineDate');
        $('#ReminderDate').datepicker('setDate', 'ReminderDate');
       
    }       

    var dataTaskSearchGrid = { location: "local" };
    var colTaskSearchGrid = [
        { title: "", dataIndx: "TaskId", dataType: "integer", hidden: true, width: 0 },     
        
        {
            title: "Nature", dataIndx: "Nature", width: '13%',
            filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
        },
        {
            title: "Group", dataIndx: "LinkName", width: '13%',
            filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
        },
        {
            title: "Task Name", dataIndx: "Name", width: '20%',
            filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
        },
        {
            title: "Sequence", dataIndx: "TaskSequence", width: '10%',
            filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
        },
        {
            title: "Description", dataIndx: "Description", width: '34%',
            filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
        },
        {
            title: "Reminder", dataIndx: "ReminderDate", width: '10%',            
            filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
        },
        //{
        //    title: "Deadline", dataIndx: "Deadline", width: '8%',            
        //    filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
        //},
        //{
        //    title: "Type", dataIndx: "ReminderTypeName", width: '8%',
        //    filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
        //}
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
        colModel: colTaskSearchGrid,
        dataModel: dataTaskSearchGrid,
        pageModel: { type: "local", rPP: 100 },
        rowClick: function (evt, ui) {
            if (ui.rowData) {
                var data = ui.rowData;
                TaskID = data.TaskId;
                /*        $("#TaskId").val(data.TaskId);*/
                $("#Name").val(data.Name);
                $("#TaskSequence").val(data.TaskSequence);
                $("#Description").val(data.Description);
                $('#ddlGroup').empty();
                $("#ddlGroup").append('<option value="'+ data.LinkWithGroup +'">'+data.LinkName +'</option>');
                $("#Deadline").val(data.Deadline);
                $("#ReminderDate").val(data.ReminderDate);
      /*          $("#ddlType").val(data.ReminderTypeId);*/
                $("#ddlNature").val(data.NatureId)
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
    // Load Group
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
                    $('#ddlGroup').append('<option value=0>Select</option>');

                    $.each(data.data,
                        function (index, value) {

                            $('#ddlGroup').append('<option value="' + value.GroupId + '">' + value.GroupName + '</option>');
                        }
                    )
                } else {
                    $('#ddlGroup').append('<option value="0">No Data found</option>');
                }
            }

        });
    }
    ///////////////   loadTaskGrid
    loadTaskGrid();
    function loadTaskGrid() {
        var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
        $.ajax({

            headers: {
                "__RequestVerificationToken": antiForgeryToken
            },
            type: 'GET',
            url: "/TaskMaster/GetAllTask",
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
    

    $("#btnSave").click(function () {
        //  if (!showAlertOnBlank($("#PhoneOne"), "Phone One  is missing!")) return;
   
        if ($("#Name").val() == "") {
            ShowAlert("error", "Task Name is missing! Please enter the Name");
            return;
        }
        if ($("#TaskSequence").val() == "" || $("#TaskSequence").val() == 0) {
            ShowAlert("error", "Task Sequence is missing! Please enter the Sequence");
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
        if ($("#ddlType").val() == "") {
            ShowAlert("error", "Please Select Task Type");
            return;
        }        

        var details = {
            TaskId: TaskID,
            Name: $("#Name").val(),
            Description: $("#Description").val(),
            TaskSequence: $("#TaskSequence").val(),
            LinkWithGroup: $("#ddlGroup").val(),
            Deadline: $("#Deadline").val(),
            ReminderDate: $("#ReminderDate").val(),
            ReminderTypeId: $("#ddlType").val(),
            NatureId: $("#ddlNature").val(),
        }

        var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
        $.ajax({
            headers: {
                "__RequestVerificationToken": antiForgeryToken
            },
            type: "POST", //HTTP POST Method
            url: '/TaskMaster/SaveTask', // Controller/View
            data: details,
            success: function (msg) {          
                if (msg.success === true) {
                    if (TaskID == 0) {
                        ShowAlert("success", "Successfully Saved Task Master.");
                    }
                    else {
                        ShowAlert("success", "Successfully Update Task Master.");
                    }
                    ClearForm();
                    loadTaskGrid();
                }
                else {
                    if (TaskID == 0) {
                        ShowAlert("error", "failed to Save Task Master");
                    }
                    else {
                        ShowAlert("error", "failed to Update Task Master");
                    }
                    loadTaskGrid();
                }
            }

        });

    });

    function ClearForm() {           
        $("#Name").val("");
        $("#TaskSequence").val('0');
        $("#Description").val("");
        $("#Deadline").val("");
        $("#ReminderDate").val("");
        $("#ddlType").val("");
        $("#ddlNature").val("");
        $('#ddlGroup').empty();
        $('#ddlGroup').append('<option value="0">Select</option>');
        disableFields(false);
        setCurrentDate();
        TaskID = 0;
    }

    $("#btnReset").click(function () {
        ClearForm();
    });
    function disableFields(state) {
        $("#Name").prop('disabled', state);
        $("#TaskSequence").prop('disabled', state);
        $("#Description").prop('disabled', state);
        $("#ddlGroup").prop('disabled', state);
        $("#Deadline").prop('disabled', state);
        $("#ReminderDate").prop('disabled', state);
        $("#ddlType").prop('disabled', state);
        $("#ddlNature").prop('disabled', state);
        $("#btnSave").prop('disabled', state);
    }

      //loadReminderType();
    //function loadReminderType(){        
    //        var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
    //        $.ajax({
    //            type: "GET", //HTTP Get Method
    //            headers: {
    //                "__RequestVerificationToken": antiForgeryToken
    //            },
    //            url: "/TaskMaster/GetReminderType", // Controller/View
    //            success: function (data) {
    //                $.each(data.data,
    //                    function (index, value) {
    //                        $('#ddlType').append('<option value="' + value.ReminderTypeId + '">' + value.ReminderTypeName + '</option>');
    //                    }
    //                )
    //            }

    //        });
    //}
});