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
var DeleteDocIdList = [];
var div_increaseid = 1;
var check = 1;
$(".btn-new").on('click', function () {

    if (check <= 6) {
        AddDiv(div_increaseid);
        check++;
        div_increaseid++;

    }
    else {
        ShowAlert("error", "You cant Add more than 5!");
    }
});
function AddDiv(div_increaseid) {
    $("#uploader").append('  <div class="uploadDoc col-sm-12 col-md-12 fieldsetCustom" id="Div_' + div_increaseid + '"> <div class="row"><div class="col-sm-3 col-md-3"><label class="required" for="FileInput' + div_increaseid + '">Upload File</label><input class="uploadup form-control btn-primary" type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.bmp" name="fileInput0" index=' + div_increaseid + ' id="FileInput' + div_increaseid + '"onchange="" /></div><div class="col-sm-9 col-md-9" imgDiv" id="nameappend' + div_increaseid + '"></div></div><div class="row"><div class="col-md-2 col-sm-2 required"><label class="required" for="Description' + div_increaseid + '">Description.</label><input type="text" class="form-control SaleBreakup required" id="Description' + div_increaseid + '" name=""></div><div class="col-sm-2 col-md-2"><label class="required" for="Amount' + div_increaseid + '">Amount</label><input type="text" class="form-control" id="Amount' + div_increaseid + '" name=""></div><div class="col-sm-1 col-md-1" style="padding-top:25px"><span><a class="btn-check"><i class="fa fa-times"></i></span></div></div></div></div>');
};

$(document).on("click", "a.btn-check", function () {

    if ($(".uploadDoc").length > 0) {

        $(this).closest(".uploadDoc").remove();
        check--;
    } else {
        ShowAlert("error", "You have to upload at least one document.");
    }
});
var NoOfDiv;
var docSavedcount = 0;
$(".btn-next").on('click', function () {
    NoOfDiv = document.getElementsByClassName("uploadDoc");
    var totalfilesize = 0;

    if ($("#ddlFinancialYear").val() == "") {
        ShowAlert("error", "Please Select Financial Year!");
        return false;
    }

    if (DeleteDocIdList.length > 0) {
        deleteDocument();
    }
    if (NoOfDiv.length > 0) {
        for (let y = 0; y <= NoOfDiv.length - 1; y++) {
            let test = NoOfDiv[y].id.split("_");
            var DivNO = test[test.length - 1];

            if ($('#FileInput' + DivNO + '').val() == '') {
                ShowAlert("warning", "Attachment is missing ! Please Select Attachment !");
                return;
            }
            if ($('#Description' + DivNO + '').val() == 0) {
                ShowAlert("warning", "Please Enter Description!");
                return;

            }
            if ($('#Amount' + DivNO + '').val() == "") {
                ShowAlert("warning", "Please Enter Amount!");
                return;

            }
            var files = $("#FileInput" + DivNO).get(0).files;
            for (f = 0; f < files.length; f++) {
                totalfilesize = totalfilesize + files.item(f).size;
            }

        }
    }


    for (let i = 0; i <= NoOfDiv.length - 1; i++) {
        let test = NoOfDiv[i].id.split("_");
        var DivNO = test[test.length - 1];
        SaveDocument(DivNO);
    }
});
function deleteDocument() {
    var deletedIds = [];
    for (d = 0; d < DeleteDocIdList.length; d++) {
        deletedIds.push({ DocumentId: DeleteDocIdList[d] });
    }
    if (deletedIds.length > 0) {
        let details = {
            MyProperty: 1,
            Deletedocument: deletedIds
        }
        $.ajax({
            type: 'POST',
            url: '/DocumentUpload/DeleteDocument',
            data: JSON.stringify(details),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (NoOfDiv.length <= 0) {
                    ShowAlert("success", data.message);
                    ClearFormData();
                }
            },
            error: function () {
                ShowAlert("error", data.message);
            },
        });
    }
}
function SaveDocument(id) {
    var FinancialYearId = $("#ddlFinancialYear").val();
    var filecontrol = $("#FileInput" + id);
    var Description = $("#Description" + id).val();
    var Amount = $("#Amount" + id).val();
    var fdata = new FormData();
    var files = filecontrol.get(0).files;
    for (i = 0; i < files.length; i++) {
        fdata.append("files" + i, files[i]);
    }
    fdata.append("FinancialYearId", FinancialYearId);
    fdata.append("Description", Description);
    fdata.append("Amount", Amount);
    if (files.length > 0) {
        $.ajax({
            type: 'POST',
            url: '/DocumentUpload/SaveDocument',
            data: fdata,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data.success == true) {
                    docSavedcount++;
                    if (NoOfDiv.length == docSavedcount) {
                        ShowAlert("success", "Documents Saved SuccessFully");
                        ClearFormData();
                    }
                }
            },
            error: function (ex) {
                ShowAlert("error", ex.message);
            },
        });
    }
}

// pushing doc Id id into DeleteDocIdList
function DeleteDoc(id) {
    let attID = id;
    let doc = document.getElementsByClassName('docClass');

    for (i = 0; i < doc.length; i++) {
        let docId = doc[i].id;
        if (docId == attID) {
            doc[i].remove();
        }
    }
    DeleteDocIdList.push(attID);
}

$("#ddlFinancialYear").change(function () {
    $('#mainDiv').empty();
    getDocument();
});
function getDocument() {
    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
    $.ajax({
        type: "Get", //HTTP Get Method
        url: "/DocumentUpload/GetDocument", // Controller/View
        data: { FinancialYearId: $("#ddlFinancialYear").val() },
        success: function (response) {
            if (response.success === true && response.data.length > 0) {
                var uniqeDescription = response.data.filter((v, i, a) => a.findIndex(v2 => (v2.Description === v.Description)) === i)
                var div;
                for (let j = 0; j < uniqeDescription.length; j++) {
                    if (j == 0) {
                        div = document.createElement('div');
                        div.id = "div1";
                        div.className = "col-md-12"
                        $("#mainDiv").append(div);
                    }
                    if (j == 6) {
                        div = document.createElement('div');
                        div.id = "div2";
                        div.className = "col-md-12"
                        $("#mainDiv").append(div);
                    }
                    let Ul = document.createElement('ul');
                    Ul.id = uniqeDescription[j].DocumentId;
                    Ul.innerText = uniqeDescription[j].Description;
                    Ul.className = "col-md-2"
                    $("#" + div.id).append(Ul);
                    for (var i = 0; i < response.data.length; i++) {
                        if (response.data[i].Description == uniqeDescription[j].Description) {
                            DisplayDBDocuments(Ul.id, response.data[i].Path, i, response.data[i].DocumentId);
                        }
                    }
                }
            }
        }
    });
}
function DisplayDBDocuments(objectName, filePath, liID, DocumentId) {
    var FileDetail = filePath.split('\\');
    FileDetail.push(filePath);
    var id = liID != undefined || liID != null ? liID : parseInt(FileDetail[FileDetail.length - 3]);
    var src;
    var y = FileDetail[FileDetail.length - 2]
    var extension = y.split('.').pop().toLowerCase()
    isSuccess = fileTypes.indexOf(extension) > -1;
    if (extension == 'pdf') {
        src = "Content/Images/docView.png";
    }
    else {
        src = "Content/Images/imageView.png";
    }
    var newDocLI = '<li style="margin-left:5px;" class="docClass" id=' + DocumentId + '>';
    newDocLI = newDocLI +
        '<a style="font-style:normal;font-size:15px" id="' +
        parseInt(parseInt(FileDetail[FileDetail.length - 3])) +
        '" href="' +
        '/DocumentUpload/DocView?AttachmentPath=' + filePath + '" target="_blank"><img width="35px"  src="' + src + '" />' +
        FileDetail[FileDetail.length - 2] + '<span><a><i class="fa fa-times " style="margin-left:10px" id="' + DocumentId + '" onClick=DeleteDoc(this.id)></i></a></span></a>';

    $("#" + objectName).append(newDocLI);
}

$(document).on("change", '.uploadup', function (e) {

    // 
    let y = this.getAttribute("index");
    var n = document.getElementById("nameappend" + y);
    if (n.childNodes.length != 0) {
        while (n.childNodes.length > 0) {
            n.removeChild(n.childNodes[n.childNodes.length - 1]);
            n.childNodes.length--;
        }
    }
    else {
        //n.removeChild(n.childNodes[0]);
    }
    var inp = $("#FileInput" + y).get(0).files;

    for (var i = 0; i < inp.length; ++i) {

        var name = inp.item(i).name;
        var size = inp.item(i).size;
        var x = size / 1048576;
        var totalsize = x.toFixed(2);
        var extension = name.split('.').pop().toLowerCase();  //file extension from input file
        isSuccess = fileTypes.indexOf(extension) > -1;  //is extension in acceptable types

        if (extension == 'pdf') {
            $("#nameappend" + y).append('<div class="col-sm-2 col-md-2 docClick" id="d' + i + '" name="' + name + '"  style="font-size:12px" ><a><img width="25px" src="Content/Images/docView.png">' + name + '(' + totalsize + 'mb)</img ></a ></div > ');
        }
        else if (extension == 'png') {
            $("#nameappend" + y).append('<div class="col-sm-2 col-md-2 docClick" name="' + name + '" style="font-size:12px"><img width="25px" src="Content/images/imageView.png">' + name + '(' + totalsize + 'mb)</img></div>');
        }
        else if (extension == 'jpg' || extension == 'jpeg') {
            $("#nameappend" + y).append('<div class="col-sm-2 col-md-2 docClick" name="' + name + '" style="font-size:12px"><img  width="25px" src="Content/images/imageView.png">' + name + '(' + totalsize + 'mb)</img></div>');
        }
        else {
            //console.log('here=>'+$(input).closest('.uploadDoc').length);
            $(input).closest('.uploadDoc').find(".docErr").slideUp('slow');
        }

        //alert("file name: " + name);
    }
});

var fileTypes = ['pdf', 'docx', 'rtf', 'jpg', 'jpeg', 'png', 'txt'];  //acceptable file types
$(document).on("click", '.docClick', function (e) {

    // jQuery.noConflict();
    document.getElementById('viewer').contentDocument.location.reload(true);
    // $("#AttchmentsPoPupModal").modal("toggle");
    //  $("#AttchmentsPoPupModal").modal("show");
    let name = e.currentTarget.getAttribute("name")
    let NoOfDiv = document.getElementsByClassName("uploadDoc");
    for (let i = 0; i <= NoOfDiv.length - 1; i++) {
        let test = NoOfDiv[i].id.split("_");
        var DivNO = test[test.length - 1];
        var files = $("#FileInput" + DivNO).get(0).files;
        for (f = 0; f < files.length; f++) {
            if (files.item(f).name == name) {
                pdffile = $("#FileInput" + DivNO).get(0).files[f];
                pdffile_url = URL.createObjectURL(pdffile);
                window.open(pdffile_url, '_blank');
                // $('#viewer').attr('src', pdffile_url);
            }
        }
    }


});

function ClearFormData() {
    $('#uploader').empty();
    $('#viewer').empty();
    $("#ddlFinancialYear").val('');
    docSavedcount = 0;
    div_increaseid = 1;
    check = 1;
    $('#mainDiv').empty();
}
