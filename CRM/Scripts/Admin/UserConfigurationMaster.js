var userConfigId = 0;
loadUsers();
function loadUsers() {
    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
    $.ajax({
        headers: {
            "__RequestVerificationToken": antiForgeryToken
        },
        type: 'GET',
        url: "/Admin/Admin/GetUser",
        dataType: "json",
        success: function (response) {
            if (response.success == true) {
                $.each(response.data, function (index, value) {
                    $('#ddlUser').append('<option value="' + value.UserID + '">' + value.LoginName + '</option>');
                });
            }
        }
    });
}

loadClient();
function loadClient() {
    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
    $.ajax({
        headers: {
            "__RequestVerificationToken": antiForgeryToken
        },
        type: 'GET',
        url: "/Admin/Admin/GetClientType",
        dataType: "json",
        success: function (response) {
            if (response.success == true) {
                $.each(response.data, function (index, value) {
                    $('#ddlClientType').append('<option value="' + value.ClientTypeId + '">' + value.ClientType + '</option>');
                });
            }
        }
    });
}

loadFinancialYear();
function loadFinancialYear() {
    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
    $.ajax({
        headers: {
            "__RequestVerificationToken": antiForgeryToken
        },
        type: 'GET',
        url: "/Admin/Admin/GetFinancialYear",
        dataType: "json",
        success: function (response) {
            if (response.success == true) {
                $.each(response.data, function (index, value) {
                    $('#ddlFinancialYear').append('<option value="' + value.FinancialYearId + '">' + value.FinancialYear + '</option>');
                });
            }
        }
    });
}

var dataConfigGrid = { location: "local" };
var colConfigGrid = [
    {
        title: "User Name", dataIndx: "LoginName", width: '41%',
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    },
    {
        title: "Client Type", dataIndx: "ClientType", width: '41%',
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    },
    {
        title: "Financial Year", dataIndx: "FinancialYear", width: '18%',
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    },];
var setConfigGrid = {
    height: 300,
    width: 'auto',
    maxWidth: '100%',
    minWidth: 800,
    sortable: true,
    autofill: true,
    numberCell: { show: true },
    hoverMode: 'row',
    showTop: true,
    showTitle: true,
    showBottom: true,
    resizable: true,
    scrollModel: { autoFit: true },
    filterModel: { on: true, mode: "AND", header: true },
    draggable: false,
    hwrap: false,
    wrap: false,
    editable: false,
    columnBorders: true,
    menuIcon: true,
    selectionModel: { type: 'row', mode: 'single', cbHeader: false },
    colModel: colConfigGrid,
    dataModel: dataConfigGrid,
    pageModel: { type: "local" },
    rowClick: function (evt, ui) {
        if (ui.rowData) {
            setFormData(ui.rowData)
        }
    }
}

var $ConfigGrid = $("#ConfigDetailsGrid").pqGrid(setConfigGrid);

loadConfigDetails();
function loadConfigDetails() {
    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
    $.ajax({

        headers: {
            "__RequestVerificationToken": antiForgeryToken
        },
        type: 'GET',
        url: "/Admin/Admin/GetUserConfiguration",
        dataType: "json",

        beforeSend: function () {

            $ConfigGrid.pqGrid("showLoading");
        },

        complete: function () {

            $ConfigGrid.pqGrid("hideLoading");
        },

        success: function (response) {
            $("#ConfigDetailsGrid").pqGrid("hideLoading");
            $("#ConfigDetailsGrid").pqGrid("option", "dataModel.data", response.data);
            $("#ConfigDetailsGrid").pqGrid("refreshDataAndView");
            //PqGridRefreshClick($ConfigGrid);
            $ConfigGrid.pqGrid('refresh');
        }
    });
}

function saveConfig() {
    if ($("#ddlUser").val() == "") {
        ShowAlert("error", "Please Select User!");
        return;
    }
    if ($("#ddlClientType").val() == "") {
        ShowAlert("error", "Please Select Client!");
        return;
    }
    if ($("#ddlFinancialYear").val() == "") {
        ShowAlert("error", "Please Select FinancialYear!");
        return;
    }
    var Details = {
        UserConfigId: userConfigId,
        UserId: $("#ddlUser").val(),
        ClientTypeId: $("#ddlClientType").val(),
        FinancialYearId: $("#ddlFinancialYear").val(),
        Apr: $("#apr").val(),
        May: $("#may").val(),
        Jun: $("#jun").val(),
        Jul: $("#jul").val(),
        Aug: $("#aug").val(),
        Sept: $("#sept").val(),
        Oct: $("#oct").val(),
        Nov: $("#nov").val(),
        Dec: $("#dec").val(),
        Jan: $("#jan").val(),
        Feb: $("#feb").val(),
        Mar: $("#mar").val(),
        AprFreeze: $("#aprFreeze").prop('checked'),
        MayFreeze: $("#mayFreeze").prop('checked'),
        JunFreeze: $("#junFreeze").prop('checked'),
        JulFreeze: $("#julFreeze").prop('checked'),
        AugFreeze: $("#augFreeze").prop('checked'),
        SeptFreeze: $("#septFreeze").prop('checked'),
        OctFreeze: $("#octFreeze").prop('checked'),
        NovFreeze: $("#novFreeze").prop('checked'),
        DecFreeze: $("#decFreeze").prop('checked'),
        JanFreeze: $("#janFreeze").prop('checked'),
        FebFreeze: $("#febFreeze").prop('checked'),
        MarFreeze: $("#marFreeze").prop('checked'),
    }
    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
    $.ajax({
        headers: {
            "__RequestVerificationToken": antiForgeryToken
        },
        type: "POST",
        url: "/Admin/Admin/SaveUserConfiguration", // Controller/View
        data: Details,
        success: function (msg) {
            if (msg.success === true) {
                if (userConfigId == 0) {
                    ShowAlert("success", "Configuration Saved SuccessFully");
                } else {
                    ShowAlert("success", "Configuration Updated SuccessFully");
                }
                clearFormData();
                loadConfigDetails();
            }
            else {
                ShowAlert("error", msg.message);
            }
        }
    });
}

function setFormData(data) {
    userConfigId = data.UserConfigId;
    $("#ddlUser").val(data.UserId);
    $("#ddlClientType").val(data.ClientTypeId);
    $("#ddlFinancialYear").val(data.FinancialYearId);
    $("#apr").val(data.Apr);
    $("#may").val(data.May);
    $("#jun").val(data.Jun);
    $("#jul").val(data.Jul);
    $("#aug").val(data.Aug);
    $("#sept").val(data.Sept);
    $("#oct").val(data.Oct);
    $("#nov").val(data.Nov);
    $("#dec").val(data.Dec);
    $("#jan").val(data.Jan);
    $("#feb").val(data.Feb);
    $("#mar").val(data.Mar);
    $("#aprFreeze").prop('checked', data.AprFreeze);
    $("#mayFreeze").prop('checked', data.MayFreeze);
    $("#junFreeze").prop('checked', data.JunFreeze);
    $("#julFreeze").prop('checked', data.JulFreeze);
    $("#augFreeze").prop('checked', data.AugFreeze);
    $("#septFreeze").prop('checked', data.SeptFreeze);
    $("#octFreeze").prop('checked', data.OctFreeze);
    $("#novFreeze").prop('checked', data.NovFreeze);
    $("#decFreeze").prop('checked', data.DecFreeze);
    $("#janFreeze").prop('checked', data.JanFreeze);
    $("#febFreeze").prop('checked', data.FebFreeze);
    $("#marFreeze").prop('checked', data.MarFreeze);
}

function clearFormData() {
    $("#ddlUser").val('');
    $("#ddlClientType").val('');
    $("#ddlFinancialYear").val('');
    $("#apr").val('');
    $("#may").val('');
    $("#jun").val('');
    $("#jul").val('');
    $("#aug").val('');
    $("#sept").val('');
    $("#oct").val('');
    $("#nov").val('');
    $("#dec").val('');
    $("#jan").val('');
    $("#feb").val('');
    $("#mar").val('');
    $("#aprFreeze").prop('checked', false);
    $("#mayFreeze").prop('checked', false);
    $("#junFreeze").prop('checked', false);
    $("#julFreeze").prop('checked', false);
    $("#augFreeze").prop('checked', false);
    $("#septFreeze").prop('checked', false);
    $("#octFreeze").prop('checked', false);
    $("#novFreeze").prop('checked', false);
    $("#decFreeze").prop('checked', false);
    $("#janFreeze").prop('checked', false);
    $("#febFreeze").prop('checked', false);
    $("#marFreeze").prop('checked', false);
    userConfigId = 0;
}