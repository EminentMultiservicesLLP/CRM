var months = ['apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec', 'jan', 'feb', 'mar']
var userConfigId = 0;
var attendanceId = 0;
var totalYearlyLeaves = 0;
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
                    totalYearlyLeaves = data.Apr + data.May + data.Jun + data.Jul + data.Aug + data.Sept + data.Oct + data.Nov + data.Dec + data.Jan + data.Feb + data.Mar;
                    $("#clientType").val(data.ClientType);
                    $("#totalYearlyLeaves").val(totalYearlyLeaves);
                    userConfigId = data.UserConfigId;
                    getAttendance(userConfigId);
                    setValues("LeavesAllowed", data);
                    disableFields("Present", data);
                    disableFields("LeavesAndHolidays", data);
                } else {
                    ShowAlert("error", "This financial year's attendance register is not ready yet!");
                    return false;
                }
            }
        }
    });
}
function setValues(id, data, attendanceCall) {
    for (let i = 0; i < months.length; i++) {
        let capitalized = months[i].charAt(0).toUpperCase() + months[i].slice(1)
        capitalized = attendanceCall ? capitalized + id : capitalized
        $("#" + months[i] + id).val(data[capitalized]);
    }
}
function disableFields(id, data) {
    for (let i = 0; i < months.length; i++) {
        let capitalized = months[i].charAt(0).toUpperCase() + months[i].slice(1)
        $("#" + months[i] + id).prop('disabled', data['Freeze' + capitalized]);
    }
}
function SaveAttendance() {
    if ($("#ddlFinancialYear").val() == "") {
        ShowAlert("error", "Please Select Financial Year!");
        return false;
    }
    var Details = {
        UserConfigId: userConfigId,
        AttendanceId: attendanceId,

        AprPresent: $("#aprPresent").val(),
        MayPresent: $("#mayPresent").val(),
        JunPresent: $("#junPresent").val(),
        JulPresent: $("#julPresent").val(),
        AugPresent: $("#augPresent").val(),
        SeptPresent: $("#septPresent").val(),
        OctPresent: $("#octPresent").val(),
        NovPresent: $("#novPresent").val(),
        DecPresent: $("#decPresent").val(),
        JanPresent: $("#janPresent").val(),
        FebPresent: $("#febPresent").val(),
        MarPresent: $("#marPresent").val(),

        AprLeavesAndHolidays: $("#aprLeavesAndHolidays").val(),
        MayLeavesAndHolidays: $("#mayLeavesAndHolidays").val(),
        JunLeavesAndHolidays: $("#junLeavesAndHolidays").val(),
        JulLeavesAndHolidays: $("#julLeavesAndHolidays").val(),
        AugLeavesAndHolidays: $("#augLeavesAndHolidays").val(),
        SeptLeavesAndHolidays: $("#septLeavesAndHolidays").val(),
        OctLeavesAndHolidays: $("#octLeavesAndHolidays").val(),
        NovLeavesAndHolidays: $("#novLeavesAndHolidays").val(),
        DecLeavesAndHolidays: $("#decLeavesAndHolidays").val(),
        JanLeavesAndHolidays: $("#janLeavesAndHolidays").val(),
        FebLeavesAndHolidays: $("#febLeavesAndHolidays").val(),
        MarLeavesAndHolidays: $("#marLeavesAndHolidays").val()
    }
    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
    $.ajax({
        headers: {
            "__RequestVerificationToken": antiForgeryToken
        },
        type: "POST",
        url: "/Attendance/Attendance/SaveAttendance", // Controller/View
        data: Details,
        success: function (msg) {
            if (msg.success === true) {
                if (attendanceId == 0) {
                    ShowAlert("success", "Attendance Saved SuccessFully");
                } else {
                    ShowAlert("success", "Attendance Updated SuccessFully");
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
function getAttendance(userConfigId) {
    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
    $.ajax({
        headers: {
            "__RequestVerificationToken": antiForgeryToken
        },
        type: 'GET',
        url: "/Attendance/Attendance/GetAttendance",
        data: { UserConfigId: userConfigId },
        dataType: "json",
        success: function (response) {
            if (response.success == true) {
                if (response.data[0] != undefined) {
                    let data = response.data[0];
                    var totalAbsentcount = data.AprLeavesAndHolidays + data.MayLeavesAndHolidays + data.JunLeavesAndHolidays + data.JulLeavesAndHolidays + data.AugLeavesAndHolidays + data.SeptLeavesAndHolidays + data.OctLeavesAndHolidays + data.NovLeavesAndHolidays + data.DecLeavesAndHolidays + data.JanLeavesAndHolidays + data.FebLeavesAndHolidays + data.MarLeavesAndHolidays;
                    $("#totalAbsents").val(totalAbsentcount);
                    $("#balanceLeaves").val(totalYearlyLeaves - totalAbsentcount);
                    setValues("Present", data, "attendanceCall");
                    setValues("LeavesAndHolidays", data, "attendanceCall");
                    attendanceId = data.AttendanceId;
                }
            }
        }
    });
}
function clearFormData() {
    userConfigId = 0;
    attendanceId = 0;
    totalYearlyLeaves = 0
    $("#ddlFinancialYear").val('');
    $("#clientType").val('');
    $("#totalYearlyLeaves").val('');
    $("#totalAbsents").val('');
    $("#balanceLeaves").val('');

    for (let i = 0; i < months.length; i++) {
        $("#" + months[i] + "LeavesAllowed").val('');
        $("#" + months[i] + "Present").val('');
        $("#" + months[i] + "LeavesAndHolidays").val('');
        $("#" + months[i] + "Present").prop('disabled', false);
        $("#" + months[i] + "LeavesAndHolidays").prop('disabled', false);
    }
}