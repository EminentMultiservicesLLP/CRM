$(document).ready(function () {
    var NatureID=0;
      

    var dataNatureSearchGrid = { location: "local" };
    var colNatureSearchGrid = [
        { title: "", dataIndx: "NatureId", dataType: "integer", hidden: true, width: 0 },
        {
            title: "Nature Name", dataIndx: "Name", width: '46%',
            filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
        },
        {
            title: "Sequence", dataIndx: "NatureSequence", width: '8%',
            filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
        },
        {
            title: "Description", dataIndx: "Description", width: '46%',
            filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
        }];

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
        colModel: colNatureSearchGrid,
        dataModel: dataNatureSearchGrid,
        pageModel: { type: "local", rPP: 100 },
        rowClick: function (evt, ui) {
            if (ui.rowData) {
                var data = ui.rowData;
                NatureID = data.NatureId;
                $("#Name").val(data.Name);
                $("#NatureSequence").val(data.NatureSequence);
                $("#Description").val(data.Description);
                disableFields(false);
            }
        }
    }

    var $SearchGrid = $("#Searchgrid").pqGrid(setSearchGrid);


    function loadNatureGrid() {
        var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
        $.ajax({

            headers: {
                "__RequestVerificationToken": antiForgeryToken
            },
            type: 'GET',
            url: "/NatureMaster/GetAllNature",
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
    loadNatureGrid();
  
    $("#btnSave").click(function () {
        //  if (!showAlertOnBlank($("#PhoneOne"), "Phone One  is missing!")) return;
      
        if ($("#Name").val() == "") {
            ShowAlert("error", "Nature Name is missing! Please enter the Name.");
            return;
        }
        if ($("#NatureSequence").val() == "" || $("#NatureSequence").val()==0) {
            ShowAlert("error", "Nature Sequence is missing! Please enter the sequence.");
            return;
        }
        var details = {
            NatureId: NatureID,
            Name: $("#Name").val(),
            Description: $("#Description").val(),
            NatureSequence: $("#NatureSequence").val(),
        }

        var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
        $.ajax({
            headers: {
                "__RequestVerificationToken": antiForgeryToken
            },
            type: "POST", //HTTP POST Method
            url: '/NatureMaster/SaveNature', // Controller/View
            data: details,
            success: function (msg) {
               
                if (msg.success === true) {
                    if (NatureID == 0) {
                        ShowAlert("success", "Successfully Saved Nature Master.");
                    }
                    else {
                        ShowAlert("success", "Successfully Update Nature Master.");
                    }
                    ClearForm();
                    loadNatureGrid();
                }
                else {
                    if (NatureID == 0) {
                        ShowAlert("error", "failed to Save Nature Master");
                    }
                    else {
                        ShowAlert("error", "failed to Update Nature Master");
                    }
                    loadNatureGrid();
                }
            }

        });

    });

 
    function ClearForm() {
        $("#Name").val("");
        $("#Description").val("");         
        $("#NatureSequence").val("");
        disableFields(false);
        NatureID = 0;
    }
    $("#btnReset").click(function () {
        ClearForm();
    });

    function disableFields(state) {
        $("#Name").prop('disabled', state);
        $("#NatureSequence").prop('disabled', state);
        $("#Description").prop('disabled', state);
        $("#btnSave").prop('disabled', state);
    }
  
});