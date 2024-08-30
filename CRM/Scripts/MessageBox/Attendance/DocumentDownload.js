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
loadUser();
function loadUser() {
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

function downloadDocument() {
    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
    $.ajax({
        type: "Get", //HTTP Get Method
        url: "/DocumentDownload/GetDocument", // Controller/View
        data: { FinancialYearId: $("#ddlFinancialYear").val(), UserId: $("#ddlUser").val() },
        success: function (response) {
            if (response.success === true && response.data.length > 0) {
                let mediaFiles = response.data;
                let blob;
                var zip = new JSZip();
                var promise = [];
                if (mediaFiles.length > 0) {
                    for (let i = 0; i < mediaFiles.length; i++) {
                        let href = '/DocumentUpload/DocView?AttachmentPath=' + mediaFiles[i].Path;
                        blob = fetch(href).then(r => r.blob());
                        promise.push(blobDoc(mediaFiles[i].Path.split("\\").pop(), href, zip));
                    }
                    Promise.all(promise).then(data => {
                        zip.generateAsync({ type: "blob" })
                            .then(function (content) {
                                //see FileSaver.js
                                saveAs(content, mediaFiles[0].UserName);
                                ShowAlert("success", " Successfully Downloaded all " + mediaFiles.length + " files !!")
                            });
                    })
                }
                else {

                    ShowAlert("warning", "File does not Exist !")
                }
            } else {

                ShowAlert("warning", "Document not Found!")
            }
        }
    });
}

function blobDoc(file, href, zip) {
    return new Promise(function (resolve, reject) {
        fetch(href)
            .then(responsebloab => responsebloab.blob())
            .then(blob => {
                zip.file(file, blob);
                resolve();
            });
    });
}