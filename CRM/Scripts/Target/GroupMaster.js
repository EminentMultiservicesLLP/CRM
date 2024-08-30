$(document).ready(function () {
    var GroupID=0;
   
    var dataGroupSearchGrid = { location: "local" };
    var colGroupSearchGrid = [
        { title: "", dataIndx: "GroupId", dataType: "integer", hidden: true, width: 0 },
        {
            title: "Nature", dataIndx: "LinkName", width: '25%',
            filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
        },
        {
            title: "Group Name", dataIndx: "Name", width: '25%',
            filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
        },       
        {
            title: "Sequence", dataIndx: "GroupSequence", width: '10%',
            filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
        },
        {
            title: "Description", dataIndx: "Description", width: '40%',
            filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
        }   ];

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
        colModel: colGroupSearchGrid,
        dataModel: dataGroupSearchGrid,
        pageModel: { type: "local", rPP: 100 },
        rowClick: function (evt, ui) {
            if (ui.rowData) {
                var data = ui.rowData;
                GroupID = data.GroupId;
                /*        $("#GroupId").val(data.GroupId);*/
                $("#Name").val(data.Name);
                $("#GroupSequence").val(data.GroupSequence);
                $("#Description").val(data.Description);
                $("#ddlLinking").val(data.LinkWithNature);
                disableFields(false);
            }
        }
    }

    var $SearchGrid = $("#Searchgrid").pqGrid(setSearchGrid);

 
    loadNatureLink()
    function loadNatureLink() {
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
                        $('#ddlLinking').append('<option value="' + value.NatureId + '">' + value.Name + '</option>');
                    }

                )
            }

        });
    }

    function loadGroupGrid() {
        var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
        $.ajax({

            headers: {
                "__RequestVerificationToken": antiForgeryToken
            },
            type: 'GET',
            url: "/GroupMaster/GetAllGroup",
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
    loadGroupGrid();

    $("#btnSave").click(function () {
     
        if ($("#Name").val() == "") {
            ShowAlert("error", "Group Name is missing! Please enter the Name");
            return;
        }
        if ($("#GroupSequence").val() == "" || $("#GroupSequence").val() == 0) {
            ShowAlert("error", "Group Sequence is missing! Please enter the Sequence");
            return;
        }
        if ($("#ddlLinking").val() == "" || $("#ddlLinking").val() == 0) {
            ShowAlert("error", "Please Select Nature");
            return;
        }
       
        var details = {
            GroupId: GroupID,
            Name: $("#Name").val(),
            Description: $("#Description").val(),
            GroupSequence: $("#GroupSequence").val(),
            LinkWithNature: $("#ddlLinking").val(),
        }

        var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
        $.ajax({
            headers: {
                "__RequestVerificationToken": antiForgeryToken
            },
            type: "POST", //HTTP POST Method
            url: '/GroupMaster/SaveGroup', // Controller/View
            data: details,
            success: function (msg) {
                
                if (msg.success === true) {                    
                    if (GroupID == 0) {
                        ShowAlert("success", "Successfully Saved Group Master.");
                    }
                    else {
                        ShowAlert("success", "Successfully Update Group Master.");
                    }
                    ClearForm();
                    loadGroupGrid();
                }
                else {
                    if (GroupID == 0) {
                        ShowAlert("error", "failed to Save Group Master");
                    }
                    else {
                        ShowAlert("error", "failed to Update Group Master");
                    }
                    loadGroupGrid();
                }
            }

        });

    });


    function ClearForm() {
        $("#Name").val("");
        $("#GroupSequence").val("");
        $("#Description").val("");
        $("#ddlLinking").val("");
        disableFields(false);
        GroupID = 0;
    }
    $("#btnReset").click(function () {
        ClearForm();
    });

    function disableFields(state) {
        $("#Name").prop('disabled', state);
        $("#GroupSequence").prop('disabled', state);
        $("#Description").prop('disabled', state);
        $("#ddlLinking").prop('disabled', state);
        $("#btnSave").prop('disabled', state);
    }

});