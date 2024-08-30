 

        //function loadSearchGrid() {
        //    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
        //    $.ajax({

        //        headers: {
        //            "__RequestVerificationToken": antiForgeryToken
        //        },
        //        type: 'GET',
        //        url: "/FeedbackMaster/GetAllTodayTask",
        //        dataType: "json",

        //        beforeSend: function () {

        //            $SearchGrid.pqGrid("showLoading");
        //        },
        //        complete: function () {
        //            debugger;
        //            $SearchGrid.pqGrid("hideLoading");
        //        },

        //        success: function (response) {
        //            debugger;
        //            $("#Searchgrid").pqGrid("hideLoading");
        //            $("#Searchgrid").pqGrid("option", "dataModel.data", response);
        //            $("#Searchgrid").pqGrid("refreshDataAndView");

        //        }

        //    });
        //}
  
       
    

loadClient();
loadAnswer();
loadType();
var currentDate = new Date();

$('#NextFollowUpDate').datetimepicker({ format: 'DD-MMM-YYYY', extraFormats: ['DD-MM-YYYY', 'DD-MM-YY'], defaultDate: currentDate.setDate(currentDate.getDate() + 1), minDate: today });
//$('#Date').datetimepicker({ format: 'DD-MMM-YYYY', extraFormats: ['DD-MM-YYYY', 'DD-MM-YY'], defaultDate: new Date() });

function loadClient() {
    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
    $.ajax({
        headers: {
            "__RequestVerificationToken": antiForgeryToken
        },
        type: 'GET',
        url: "/CommonMaster/GetAllClient",
        dataType: "json",
        success: function (response) {
        
            $('#ddlClient').val("");
            $('#ddlClient').html("");
            $('#ddlClient').append('<option value="' + 0 + '"disabled selected hidden>' + "Select Client Name" + '</option>');
            $.each(response, function (index, value) {
                $('#ddlClient').append('<option value="' + value.ClientId + '">' + value.ClientName + '</option>');
            });
        }
    });
}
function loadAnswer() {
    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
    $.ajax({
        headers: {
            "__RequestVerificationToken": antiForgeryToken
        },
        type: 'GET',
        url: "/CommonMaster/GetAllAnswer",
        dataType: "json",
        success: function (response) {
            
            $('#ddlAnswer').val("");
            $('#ddlAnswer').html("");
      //      $('#ddlAnswer').append('<option value="' + 0 + '">' + "--Select Answer--" + '</option>');
            $.each(response, function (index, value) {
                $('#ddlAnswer').append('<option value="' + value.CustomerAnswerId + '">' + value.CustomerAnswerName + '</option>');
            });
        }
    });
}
function loadType() {
    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
    $.ajax({
        headers: {
            "__RequestVerificationToken": antiForgeryToken
        },
        type: 'GET',
        url: "/CommonMaster/GetAllType",
        dataType: "json",
        success: function (response) {
      
            $('#ddlType').val("");
            $('#ddlType').html("");
       //     $('#ddlType').append('<option value="' + 0 + '">' + "--Select Type--" + '</option>');
            $.each(response, function (index, value) {
                $('#ddlType').append('<option value="' + value.TypeId + '">' + value.TypeName + '</option>');
            });
        }
    });
}
$("#btnSave").click(function () {
    var getDate = $("#NextFollowUpDate").data('date')
    if (!showAlertOnBlank($("#Remark"), "Please Fill Remark!! ")) return;
   
          
           var feedbackdata = {
               FeedbackId: $("#FeedbackId").val(),
               ClientId: $("#ddlClient").val(),
               CustomerAnswerId: $("#ddlAnswer").val(),
               TypeId: $("#ddlType").val(),
               NextFollowUpDate: getDate,
               Remark: $("#Remark").val(),
              
           };
       
           var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
           $.ajax({
               headers: {
                   "__RequestVerificationToken": antiForgeryToken
               },
               type: "POST", //HTTP POST Method,
             

               url: '/FeedbackMaster/CreateFeedback', // Controller/View
               data: feedbackdata,               
               success: function (msg) {
               
                   if (msg.success === true) {

                    
                       ClearForm();
                       loadClient();
                       ShowAlert("success", msg.message);
                      
                    
                       
              
                   }
                   else {
                       ShowAlert("error", msg.message);
                     
                   }
               }

           });
    
});
//$(function () {
//    $("#IsCompleted").click(function () {
//        if ($(this).is(":checked")) {
//            $("#Hidden").show();
//        } else {
//            $("#Hidden").hide();
//        }
//    });
//});

function ClearForm() {
    $("#ddlClient").val(""), //Reading text box values using Jquery
    $("#ddlAnswer").val(""),
    $("#ddlType").val(""),
    $("#ddlAnswer").val(""),
    $("#NextFollowUpDate").val(""),
      $("#Remark").val(""),
      $("#IsCompletedRemark").val(""),
      $("#IsCompleted").val("")

};
