GetCompliances();
var ComplianceID = $("#ComplianceId").val() ? $("#ComplianceId").val() : 0;

function GetCompliances() {
    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
    $.ajax({
        headers: {
            "__RequestVerificationToken": antiForgeryToken
        },
        type: 'GET',
        url: "/Compliances/GetCompliances",
        dataType: "json",
        beforeSend: function () {
            showPageLoadingSpinner();
        },
        complete: function () {
            hidePageLoadingSpinner();
        },
        success: function (response) {       
            if (response.data.length > 0) {                          
                $("#compliance").html(response.data[0].Compliance);
                ComplianceID = response.data[0].ComplianceId;
            }
            else {
                ShowAlert('Error', 'No data to display.');
            }
        }
    });
}

$("#btnSave").click(function () {
    var compliance = get_Description_Content();
    if (compliance == "") {
        ShowAlert("error", "Compliance is missing! Please enter the Text.");
        return;
    }

    var details = {
        Compliance: compliance,
        ComplianceId: ComplianceID,
    }

    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
    $.ajax({
        headers: {
            "__RequestVerificationToken": antiForgeryToken
        },
        type: "POST", //HTTP POST Method
        url: '/Compliances/SaveCompliance', // Controller/View
        data: details,
        success: function (msg) {
            if (msg.success === true) {
                if (ComplianceID == 0) {
                    ShowAlert("success", "Successfully Saved Compliance.");
                }
                else {
                    ShowAlert("success", "Successfully Update Compliance.");
                }              
            GetCompliances();
            }
            else {
                if (ComplianceID == 0) {
                    ShowAlert("error", "failed to Save Compliance.");
                }
                else {
                    ShowAlert("error", "failed to Update Compliance.");
                }
            }
        }
    });
});




