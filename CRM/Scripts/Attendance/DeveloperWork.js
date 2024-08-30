var months = ['apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec', 'jan', 'feb', 'mar'];

var developerWorkID = 0;
var clientTypeID = 0;
var userConfigID = 0;
var financialYearID =0;

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
$("#ddlFinancialYear").change(function () {
    loadConfigBasicDetails($("#ddlFinancialYear").val());
});
function loadConfigBasicDetails(financialYearId) {
    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
    $.ajax({
        headers: {
            "__RequestVerificationToken": antiForgeryToken
        },
        type: 'GET',
        url: "/Attendance/Attendance/GetConfigBasicDetails",
        data: { FinancialYearId: financialYearId },
        dataType: "json",
        success: function (response) {
            if (response.success == true) {
                if (response.data[0] != undefined) {
                    let data = response.data[0];
                    userConfigID = data.UserConfigId;
                    clientTypeID = data.ClientTypeId;                    
                    $("#clientType").val(data.ClientType);
                    getDeveloperTask(userConfigID);
                    disableFields("Task", data);
                    disableFields("Result", data);
                } else {
                    ShowAlert("error", "This financial year's work register is not ready yet!");
                    return false;
                }
            }
        }
    });
}


function getDeveloperTask(userConfigID) {
    financialYearID=parseInt($("#ddlFinancialYear").val());
    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
    $.ajax({
        headers: {
            "__RequestVerificationToken": antiForgeryToken
        },
        type: 'GET',
        url: "Attendance/DeveloperWork/getDeveloperTask",
        data: { UserConfigId: userConfigID, FinancialYearId: financialYearID },
        dataType: "json",
        success: function (response) {
            if (response.success == true) {
                if (response.data[0] != undefined) {
                    let data = response.data[0];
                    setValues("Task", data, "Work");
                    setValues("Result", data, "Work");
                    developerWorkID = data.DeveloperWorkId;
                }
            }
        }
    });
}

function setValues(id, data, work) {
    for (let i = 0; i < months.length; i++) {
        let capitalized = months[i].charAt(0).toUpperCase() + months[i].slice(1)
        capitalized = work ? capitalized + id : capitalized
        $("#" + months[i] + id).val(data[capitalized]);
    }
}

function disableFields(id, data) {
    for (let i = 0; i < months.length; i++) {
        let capitalized = months[i].charAt(0).toUpperCase() + months[i].slice(1);
        if (capitalized == 'Sep') {
            capitalized = "Sept";
        }
        $("#" + months[i] + id).prop('disabled', data['Freeze' + capitalized]);
    }
}

function SaveDeveloperWork() {
    if ($("#ddlFinancialYear").val() == "") {
        ShowAlert("error", "Please Select Financial Year!");
        return false;
    }
    financialYearID = parseInt($("#ddlFinancialYear").val());
    var Details = {
        UserConfigId: userConfigID,
        DeveloperWorkId: developerWorkID,
        ClientTypeId: clientTypeID,
        FinancialYearId: financialYearID,

        JanTask: $("#janTask").val(),
        FebTask: $("#febTask").val(),
        MarTask: $("#marTask").val(),
        AprTask: $("#aprTask").val(),
        MayTask: $("#mayTask").val(),
        JunTask: $("#junTask").val(),
        JulTask: $("#julTask").val(),
        AugTask: $("#augTask").val(),
        SepTask: $("#sepTask").val(),
        OctTask: $("#octTask").val(),
        NovTask: $("#novTask").val(),
        DecTask: $("#decTask").val(),

        JanResult: $("#janResult").val(),
        FebResult: $("#febResult").val(),
        MarResult: $("#marResult").val(),
        AprResult: $("#aprResult").val(),
        MayResult: $("#mayResult").val(),
        JunResult: $("#junResult").val(),
        JulResult: $("#julResult").val(),
        AugResult: $("#augResult").val(),
        SepResult: $("#sepResult").val(),
        OctResult: $("#octResult").val(),
        NovResult: $("#novResult").val(),
        DecResult: $("#decResult").val()
    }
    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
    $.ajax({
        headers: {
            "__RequestVerificationToken": antiForgeryToken
        },
        type: "POST",
        url: "Attendance/DeveloperWork/SaveDeveloperWork", // Controller/View
        data: Details,
        success: function (msg) {
            if (msg.success === true) {
                if (developerWorkID == 0) {
                    ShowAlert("success", "Task Saved SuccessFully");
                } else {
                    ShowAlert("success", "Task Updated SuccessFully");
                }
                $("#ddlFinancialYear").val('');
                clearFormData();
            }
            else {
                ShowAlert("error", msg.message);
            }
        }
    });
}

function clearFormData() {
  
    $("#ddlFinancialYear").val('');
    $("#clientType").val('');
   

    for (let i = 0; i < months.length; i++) {
        $("#" + months[i] + "Task").val('');
        $("#" + months[i] + "Result").val('');
        $("#" + months[i] + "Task").prop('disabled', false);
        $("#" + months[i] + "Result").prop('disabled', false);
    }
}