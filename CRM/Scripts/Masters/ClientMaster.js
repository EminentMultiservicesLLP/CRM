$(document).ready(function () {
    disableFields();
    function disableFields() {
        $("#ClientName").prop('disabled', true);
        $("#Address").prop('disabled', true);
        $("#Landmark").prop('disabled', true);
        $("#Address").prop('disabled', true);
        $("#ddlSector").prop('disabled', true);
        $("#NoOfStudents").prop('disabled', true);
        $("#Unit").prop('disabled', true);
        $("#Speciality").prop('disabled', true);
        $("#ContactPersonOne").prop('disabled', true);
        $("#ContactDesignationOne").prop('disabled', true);
        $("#PhoneOne").prop('disabled', true);
        $("#EmailOne").prop('disabled', true);
        $("#ContactPersonTwo").prop('disabled', true);
        $("#ContactDesignationTwo").prop('disabled', true);
        $("#PhoneTwo").prop('disabled', true);
        $("#EmailTwo").prop('disabled', true);
        $("#IsCompleted").prop('disabled', true);
        $("#IsCompletedRemark").prop('disabled', true);
        $("#Deactive").prop('disabled', true);
    }
    function EnableFields() {
        $("#ClientName").prop('disabled', false);
        $("#Address").prop('disabled', false);
        $("#Landmark").prop('disabled', false);
        $("#Address").prop('disabled', false);
        $("#ddlSector").prop('disabled', false);
        $("#NoOfStudents").prop('disabled', false);
        $("#Unit").prop('disabled', false);
        $("#Speciality").prop('disabled', false);
        $("#ContactPersonOne").prop('disabled', false);
        $("#ContactDesignationOne").prop('disabled', false);
        $("#PhoneOne").prop('disabled', false);
        $("#EmailOne").prop('disabled', false);
        $("#ContactPersonTwo").prop('disabled', false);
        $("#ContactDesignationTwo").prop('disabled', false);
        $("#PhoneTwo").prop('disabled', false);
        $("#EmailTwo").prop('disabled', false);
        $("#IsCompleted").prop('disabled', false);
        $("#IsCompletedRemark").prop('disabled', false);
        $("#Deactive").prop('disabled', false);
    }
    loadSector();

    disEnableBtns(true);

    var dataClientSearchGrid = { location: "local" };
    var colClientSearchGrid = [
    { title: "", dataIndx: "ClientId", dataType: "integer", hidden: true,width:0 },    
    {
        title: "Client Name", dataIndx: "ClientName", width: '100%',
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    }];

    var setSearchGrid = {
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
        colModel: colClientSearchGrid,
        dataModel: dataClientSearchGrid,
        //pageModel: { type: "local", rPP: 100 },
        rowClick: function (evt, ui) {
            if (ui.rowData) {
                var data = ui.rowData;
          
                $("#ClientId").val(data.ClientId);
                $("#ClientName").val(data.ClientName);
                $("#Address").val(data.Address);
                $("#Landmark").val(data.Landmark);
                $("#ddlSector").val(data.SectorId);
                $("#NoOfStudents").val(data.NoOfStudents);
                $("#Unit").val(data.Unit);
                $("#Speciality").val(data.Speciality);
                $("#ContactPersonOne").val(data.ContactPersonOne);
                $("#ContactDesignationOne").val(data.ContactDesignationOne);
                $("#PhoneOne").val(data.PhoneOne);
                $("#EmailOne").val(data.EmailOne);
                $("#ContactPersonTwo").val(data.ContactPersonTwo);
                $("#ContactDesignationTwo").val(data.ContactDesignationTwo);
                $("#PhoneTwo").val(data.PhoneTwo);
                $("#EmailTwo").val(data.EmailTwo);
                if ($("#IsCompleted").data.IsCompleted=true){
                    $("#Hidden").show();
                }
                $("#IsCompletedRemark").val(data.IsCompletedRemark);
                $("#Deactive").prop('checked', data.Deactive);
                $("#IsCompleted").prop('checked', data.IsCompleted);
                disEnableBtns(false);
                EnableFields();
            }
        }
    }
    
    var $SearchGrid = $("#Searchgrid").pqGrid(setSearchGrid);

    
    function loadSearchGrid() {
        var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
        $.ajax({

            headers: {
                "__RequestVerificationToken": antiForgeryToken
            },
            type: 'GET',
            url: "/ClientMaster/GetAllClient",
            dataType: "json",
            
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

    function loadSector() {
        var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
        $.ajax({
            headers: {
                "__RequestVerificationToken": antiForgeryToken
            },
            type: 'GET',
            url: "/CommonMaster/GetAllSector",
            dataType: "json",            
            success: function (response) {
              
                $('#ddlSector').val("");
                $('#ddlSector').html("");
                $('#ddlSector').append('<option value="' + 0 + '">' + "--Select Sector--" + '</option>');
                $.each(response, function (index, value) {
                    $('#ddlSector').append('<option value="' + value.SectorId + '">' + value.SectorName + '</option>');
                });
            }
        });
    }

    $("#btnNewEntry").click(function () {
        EnableFields();
        ClearForm();
        disEnableBtns(false);
    });

    $("#btnAdd").click(function () {
        disableFields();
        ClearForm();
        disEnableBtns(true);
    });

    $("#btnSave").click(function () {
      //  if (!showAlertOnBlank($("#PhoneOne"), "Phone One  is missing!")) return;
       
        if ($("#ClientName").val() == "") {
            ShowAlert("error", "Client Name is missing! Please enter the Client Name");
            return;
        }

        var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
        $.ajax({
            headers: {
                "__RequestVerificationToken": antiForgeryToken
            },
            type: "POST", //HTTP POST Method
            url: '/ClientMaster/SaveClient', // Controller/View
            data: { //Passing data
                ClientId: $("#ClientId").val(), //Reading text box values using Jquery
                ClientName: $("#ClientName").val(),
                Address: $("#Address").val(),
                Landmark: $("#Landmark").val(),
                SectorId: $("#ddlSector").val(),               
                ContactPersonOne: $("#ContactPersonOne").val(),
                ContactDesignationOne: $("#ContactDesignationOne").val(),                
                PhoneOne: $("#PhoneOne").val(),            
                EmailOne: $("#EmailOne").val(),
                ContactPersonTwo: $("#ContactPersonTwo").val(),
                ContactDesignationTwo: $("#ContactDesignationTwo").val(),
                PhoneTwo: $("#PhoneTwo").val(),
                EmailTwo: $("#EmailTwo").val(),
                Deactive: $("#Deactive").prop('checked'),
                IsCompletedRemark: $("#IsCompletedRemark").val(),
                IsCompleted: $("#IsCompleted").prop('checked'),
                NoOfStudents: $("#NoOfStudents").val(),
                Unit: $("#Unit").val(),
                Speciality: $("#Speciality").val()
             
            },
            success: function (msg) {
                if (msg.success === true) {                    
                    ClearForm();
                    ShowAlert("success", msg.message);
                    disEnableBtns(true);
                    disableFields();
                    loadSearchGrid();
                }
                else {
                    ShowAlert("error", msg.message);
                    loadSearchGrid();
                }
            }

        });

    });
    
    $(function () {
        $("#IsCompleted").change(function () {
                if ($(this).is(":checked")) {
                    $("#Hidden").show();
                } else {
                    $("#Hidden").hide();
                }
            });
        });
    function ClearForm() {
        $("#ClientId").val(""), //Reading text box values using Jquery
        $("#ClientName").val(""),
         $("#Hidden").hide(),
        $("#Address").val(""),
        $("#Landmark").val(""),
        $("#ddlSector").val(""),               
        $("#ContactPersonOne").val(""),
        $("#ContactDesignationOne").val(""),                
        $("#PhoneOne").val(""),            
        $("#EmailOne").val(""),
        $("#ContactPersonTwo").val(""),
        $("#ContactDesignationTwo").val(""),
        $("#PhoneTwo").val(""),
        $("#EmailTwo").val(""),
        $("#Deactive").attr("checked", false),
         $("#IsCompleted").attr("checked", false),
         $("#IsCompletedRemark").val(""),
        $("#NoOfStudents").val(""),
        $("#Unit").val(""),
        $("#Speciality").val("")
    }

    function disEnableBtns(isDisabled) {
        $("#btnSave").attr("disabled", isDisabled)
    }
    loadSearchGrid();
});