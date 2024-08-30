var userId = 0;
$(document).ready(function () {
    getAllUser();
    loadRoles();
    $(".toggle-password").click(function () {
        $(this).toggleClass("fa-eye fa-eye-slash");
        var input = $($(this).attr("toggle"));
        if (input.attr("type") == "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });
});
function loadRoles() {
    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
    $.ajax({
        headers: {
            "__RequestVerificationToken": antiForgeryToken
        },
        type: 'GET',
        url: "/Admin/Admin/GetRole",
        dataType: "json",
        success: function (response) {
            if (response.success == true) {
                $('#ddlRole').val("");
                $.each(response.data, function (index, value) {
                    $('#ddlRole').append('<option value="' + value.RoleId + '">' + value.RoleName + '</option>');
                });
            }

        }
    });
}
$("#btnSave").click(function () {
    if ($("#UserName").val() == "") {
        ShowAlert("error", "Please enter User name!");
        return;
    }
    if ($("#Password").val() == "") {
        ShowAlert("error", "Please enter password!");
        return;
    }
    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
    $.ajax({
        headers: {
            "__RequestVerificationToken": antiForgeryToken
        },
        type: "POST", //HTTP POST Method
        url: "/Admin/Admin/SaveUser", // Controller/View
        data: { //Passing data
            UserID: userId,
            LoginName: $("#LoginName").val(),
            Password: $("#Password").val(),
            RoleId: $("#ddlRole").val(),
            Deactive: $("#Deactive").prop('checked'),
        },
        success: function (msg) {
            if (msg.success === true) {
                if (userId == 0) {
                    ShowAlert("success", "User Saved Successfully");
                }
                else {
                    ShowAlert("success", "User Updated Successfully");
                }
                ClearForm();
                getAllUser();
            }
            else {
                ShowAlert("error", msg.message);
            }
        }

    });

});

var UserGridDATA = { location: "local" };
var UserGridCOL = [
    {
        title: "User Name", dataIndx: "LoginName", dataType: "string", width: '100%', editable: false,
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    }
];

var setUserGrid = {
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
    colModel: UserGridCOL,
    dataModel: UserGridDATA,
    rowClick: function (evt, ui) {
        if (ui.rowData) {
            var data = ui.rowData;
            userId = data.UserID;
            $("#LoginName").val(data.LoginName);
            $("#Password").val(data.Password);
            $("#ddlRole").val(data.RoleId);
            $("#Deactive").prop('checked', data.Deactive);
        }
    }
}

var $UserGrid = $("#UserDetailsGrid").pqGrid(setUserGrid);

function getAllUser() {
    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
    $.ajax({
        headers: {
            "__RequestVerificationToken": antiForgeryToken
        },
        type: 'GET',
        url: "/Admin/Admin/GetUser",
        dataType: "json",

        //beforeSend: function () {

        //    $UserGrid.pqGrid("showLoading");
        //},
        //complete: function () {

        //    $UserGrid.pqGrid("hideLoading");
        //},

        success: function (response) {
            if (response.success == true) {
                $("#UserDetailsGrid").pqGrid("hideLoading");
                $("#UserDetailsGrid").pqGrid("option", "dataModel.data", response.data);
                $("#UserDetailsGrid").pqGrid("refreshDataAndView");
            }
        }

    });
}


function ClearForm() {
    userId = 0;
    $("#LoginName").val("");
    $("#Password").val("");
    $("#ddlRole").val("");
    $("#btnSave").prop('disabled', false);
    $("#Deactive").prop('checked', false);
}

$("#btnReset").click(function () {
    ClearForm();
});
