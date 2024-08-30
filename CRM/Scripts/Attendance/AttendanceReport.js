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
    loadAttendanceReport($("#ddlFinancialYear").val());
});
var dataAttendance = { location: "local" };
var AttendanceGridObj = {
    height: 422,
    showTitle: false,
    freezeCols: 6,
    resizable: true,
    toolbar: {
        items: [{
            type: 'button',
            label: "Export Excel",
            icon: 'ui-icon-arrowthickstop-1-s',
            listener: function () {
                var format = 'xlsx',
                    blob = this.exportData({
                        format: format,
                        nopqdata: true, //applicable for JSON export.                        
                        render: true
                    });
                if (typeof blob === "string") {
                    blob = new Blob([blob]);
                }
                saveAs(blob, "AttendanceReport." + format);
            }
        }]
    }
};
AttendanceGridObj.columnTemplate = { width: 100, align: 'center' };
AttendanceGridObj.colModel = [
    {
        title: "User Name", dataIndx: "LoginName", width: 140,
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    },
    {
        title: "Client Type", dataIndx: "ClientType", width: 140,
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    },
    {
        title: "Financial Year", dataIndx: "FinancialYear", width: 140,
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    },
    {
        title: "Total Yearly Leaves", dataIndx: "TotalYearlyLeaves", width: 100, dataType: "float",
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    },
    {
        title: "Total Absents", dataIndx: "TotalAbsents", width: 100, dataType: "float",
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    },
    {
        title: "Balance Leaves", dataIndx: "BalanceLeaves", width: 100, dataType: "float",
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    },
    { title: "Apr", width: 211, halign: 'center', colModel: [{ title: "Present", width: 70, dataIndx: "AprPresent", dataType: "float" }, { title: "Absent", width: 70, dataIndx: "AprLeavesAndHolidays", dataType: "float" }, { title: "Allowed", width: 70, dataIndx: "AprLeavesAllowed", dataType: "float" }] },
    { title: "May", width: 211, halign: 'center', colModel: [{ title: "Present", width: 70, dataIndx: "MayPresent", dataType: "float" }, { title: "Absent", width: 70, dataIndx: "MayLeavesAndHolidays", dataType: "float" }, { title: "Allowed", width: 70, dataIndx: "MayLeavesAllowed", dataType: "float" }] },
    { title: "Jun", width: 211, align: 'center', colModel: [{ title: "Present", width: 70, dataIndx: "JunPresent", dataType: "float" }, { title: "Absent", width: 70, dataIndx: "JunLeavesAndHolidays", dataType: "float" }, { title: "Allowed", width: 70, dataIndx: "JunLeavesAllowed", dataType: "float" }] },
    { title: "Jul", width: 211, align: 'center', colModel: [{ title: "Present", width: 70, dataIndx: "JulPresent", dataType: "float" }, { title: "Absent", width: 70, dataIndx: "JulLeavesAndHolidays", dataType: "float" }, { title: "Allowed", width: 70, dataIndx: "JulLeavesAllowed", dataType: "float" }] },
    { title: "Aug", width: 211, align: 'center', colModel: [{ title: "Present", width: 70, dataIndx: "AugPresent", dataType: "float" }, { title: "Absent", width: 70, dataIndx: "AugLeavesAndHolidays", dataType: "float" }, { title: "Allowed", width: 70, dataIndx: "AugLeavesAllowed", dataType: "float" }] },
    { title: "Sept", width: 211, align: 'center', colModel: [{ title: "Present", width: 70, dataIndx: "SeptPresent", dataType: "float" }, { title: "Absent", width: 70, dataIndx: "SeptLeavesAndHolidays", dataType: "float" }, { title: "Allowed", width: 70, dataIndx: "SeptLeavesAllowed", dataType: "float" }] },
    { title: "Oct", width: 211, align: 'center', colModel: [{ title: "Present", width: 70, dataIndx: "OctPresent", dataType: "float" }, { title: "Absent", width: 70, dataIndx: "OctLeavesAndHolidays", dataType: "float" }, { title: "Allowed", width: 70, dataIndx: "OctLeavesAllowed", dataType: "float" }] },
    { title: "Nov", width: 211, align: 'center', colModel: [{ title: "Present", width: 70, dataIndx: "NovPresent", dataType: "float" }, { title: "Absent", width: 70, dataIndx: "NovLeavesAndHolidays", dataType: "float" }, { title: "Allowed", width: 70, dataIndx: "NovLeavesAllowed", dataType: "float" }] },
    { title: "Dec", width: 211, align: 'center', colModel: [{ title: "Present", width: 70, dataIndx: "DecPresent", dataType: "float" }, { title: "Absent", width: 70, dataIndx: "DecLeavesAndHolidays", dataType: "float" }, { title: "Allowed", width: 70, dataIndx: "DecLeavesAllowed", dataType: "float" }] },
    { title: "Jan", width: 211, align: 'center', colModel: [{ title: "Present", width: 70, dataIndx: "JanPresent", dataType: "float" }, { title: "Absent", width: 70, dataIndx: "JanLeavesAndHolidays", dataType: "float" }, { title: "Allowed", width: 70, dataIndx: "JanLeavesAllowed", dataType: "float" }] },
    { title: "Feb", width: 211, align: 'center', colModel: [{ title: "Present", width: 70, dataIndx: "FebPresent", dataType: "float" }, { title: "Absent", width: 70, dataIndx: "FebLeavesAndHolidays", dataType: "float" }, { title: "Allowed", width: 70, dataIndx: "FebLeavesAllowed", dataType: "float" }] },
    { title: "Mar", width: 211, align: 'center', colModel: [{ title: "Present", width: 70, dataIndx: "MarPresent", dataType: "float" }, { title: "Absent", width: 70, dataIndx: "MarLeavesAndHolidays", dataType: "float" }, { title: "Allowed", width: 70, dataIndx: "MarLeavesAllowed", dataType: "float" }] }
];

AttendanceGridObj.dataModel = dataAttendance;

var $attendanceGrid = $("#AttendanceReportGrid").pqGrid(AttendanceGridObj);

function loadAttendanceReport(financialYearId) {
    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
    $.ajax({

        headers: {
            "__RequestVerificationToken": antiForgeryToken
        },
        type: 'GET',
        url: "/Attendance/Attendance/GetAttendanceReport",
        data: { FinancialYearId: financialYearId },
        dataType: "json",

        beforeSend: function () {

            $attendanceGrid.pqGrid("showLoading");
        },

        complete: function () {

            $attendanceGrid.pqGrid("hideLoading");
        },

        success: function (response) {
            if (response.success == true) {
                if (response.data.length > 0) {
                    //Calculate totals of (YearlyLeaves,Absents,BalanceLeaves) AND set in RESPONSE DATA
                    for (var j = 0; j < response.data.length; j++) {
                        let totalYearlyLeaves = response.data[j].AprLeavesAllowed + response.data[j].MayLeavesAllowed + response.data[j].JunLeavesAllowed + response.data[j].JulLeavesAllowed + response.data[j].AugLeavesAllowed + response.data[j].SeptLeavesAllowed + response.data[j].OctLeavesAllowed + response.data[j].NovLeavesAllowed + response.data[j].DecLeavesAllowed + response.data[j].JanLeavesAllowed + response.data[j].FebLeavesAllowed + response.data[j].MarLeavesAllowed;
                        let totalAbsents = response.data[j].AprLeavesAndHolidays + response.data[j].MayLeavesAndHolidays + response.data[j].JunLeavesAndHolidays + response.data[j].JulLeavesAndHolidays + response.data[j].AugLeavesAndHolidays + response.data[j].SeptLeavesAndHolidays + response.data[j].OctLeavesAndHolidays + response.data[j].NovLeavesAndHolidays + response.data[j].DecLeavesAndHolidays + response.data[j].JanLeavesAndHolidays + response.data[j].FebLeavesAndHolidays + response.data[j].MarLeavesAndHolidays;
                        let balanceLeaves = totalYearlyLeaves - totalAbsents;
                        response.data[j].TotalYearlyLeaves = totalYearlyLeaves;
                        response.data[j].TotalAbsents = totalAbsents;
                        response.data[j].BalanceLeaves = balanceLeaves;
                    }
                    $("#AttendanceReportGrid").pqGrid("hideLoading");
                    $("#AttendanceReportGrid").pqGrid("option", "dataModel.data", response.data);
                    $("#AttendanceReportGrid").pqGrid("refreshDataAndView");
                    PqGridRefreshClick($attendanceGrid);
                } else {
                    ShowAlert("error", "There is no entry for this Financial Year!");
                    return false;
                }
            }
        }
    });
}