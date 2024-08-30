
var currentDate = new Date();
$('#StrStartdate').datetimepicker({ format: 'DD-MMM-YYYY', extraFormats: ['DD-MM-YYYY', 'DD-MM-YY']  });
$('#StrEndDate').datetimepicker({ format: 'DD-MMM-YYYY', extraFormats: ['DD-MM-YYYY', 'DD-MM-YY'] });
LoadClient();
loadUser();

function loadUser() {
    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
    $.ajax({
        headers: {
            "__RequestVerificationToken": antiForgeryToken
        },
        type: 'GET',
        url: "/CommonMaster/GetAllUser",
        dataType: "json",
        success: function (response) {
       
            $('#ddlLoginName').val("");
            $('#ddlLoginName').html("");
            //$('#ddlLoginName').append('<option value="' + 0 + '">' + "--Select User--" + '</option>');
            $.each(response, function (index, value) {
                $('#ddlLoginName').append('<option value="' + value.UserId + '">' + value.LoginName + '</option>');
            });
        }
    });
}

$("#btnSave").click(function () {
    var StartDate = $("#StrStartdate1").val();
    var EndDate = $("#StrEndDate1").val();
    //if (StartDate = null)
    //{
    //    StartDate = 0;
    //}
    //if (EndDate = null) {
    //    EndDate = 0;
    //}

    var ClientId = $('#ddlClient').val();
    var UserId = $('#ddlLoginName').val();
    GetClientWiseReport(UserId);
    function GetClientWiseReport(UserId) {
    
        $("#iframeResultReportViewer").contents().find("body").html(""); //Clearing content on fresh load
        ClientWiseReport(UserId);
    }
    function ClientWiseReport(UserId) {
     
        try {
            $("#ClientWiseReportModal").dialog({
                cache: false,
                position: {
                    my: "center",
                    at: "center",
                    of: window
                },
                height: 500,
                width: 675,
                open: function (evt, ui) {

                },
                close: function () {
                    $("#ClientWiseReportModal").dialog("destroy");
                }

            });
        
            var url = "";
            url = "../../Report/ReportViewer.aspx?reportid=" + 1 + "&ClientId=" + ClientId + "&Start=" + StartDate + "&End=" +EndDate+"&UserId="+UserId;


            console.log(url);
            var myframe = document.getElementById("iframeResultReportViewer");
            if (myframe != null) {
                $("#iframeResultReportViewer").empty(); //Clearing content on fresh load
                if (myframe.src) {
                    myframe.src = url;
                } else if (myframe.contentWindow != null && myframe.contentWindow.location != null) {
                    myframe.contentWindow.location = url;
                } else {
                    myframe.setAttribute('src', url);
                }
                return false;

            }
        }
        catch (r) {

        }
    }
});
function LoadClient() {

    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
    $.ajax({
        headers: {
            "__requestverificationtoken": antiForgeryToken
        },
        type: 'get',
        url: "/CommonMaster/GetAllClient",
        datatype: "json",
        success: function (response) {
         
            $('#ddlClient').val("");
            $('#ddlClient').html("");
             $('#ddlClient').append('<option value="' + 0 + '">' + "--select client name--" + '</option>');
            $.each(response, function (index, value) {
                $('#ddlClient').append('<option value="' + value.ClientId + '">' + value.ClientName + '</option>');
            });
        }
    });
}


$('#ddlLoginName').change(function () {
   
   
    var UserId = $('#ddlLoginName').val();
    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
                     $('#ddlClient').html("");
                     $.ajax({
                         headers: {
                             "__RequestVerificationToken": antiForgeryToken
                         },
                         type: "GET",
                         async: false,
                         url: "/CommonMaster/GetAllClient",
                         datatype: "Json",
                         data: { UserSelect: UserId },
                         success: function (data) {
                    
                             $('#ddlClient').val("");
                             $('#ddlClient').html("");
                             $('#ddlClient').append('<option value="' + 0 + '">' + "--Select Client Name--" + '</option>');
                             $.each(data, function (index, value) {
                                 $('#ddlClient').append('<option value="' + value.ClientId + '">' + value.ClientName + '</option>');
                             });
                         }
                     });
                 });