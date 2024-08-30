using CommonLayer;
using CommonLayer.Extensions;
using CRM.API.Attendance.Interface;
using CRM.API.Attendance.Repository;
using CRM.Areas.Attendance.Models;
using CRM.Caching;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRM.Areas.Attendance.Controllers
{
    public class DocumentUploadController : Controller
    {
        IDocumentUploadRepository _action;
        private static readonly ILogger Loggger = Logger.Register(typeof(DocumentUploadController));
        public DocumentUploadController()
        {
            _action = new DocumentUploadRepository();

        }
        [HttpPost]
        public JsonResult SaveDocument(int FinancialYearId, string Description, double Amount)
        {
            bool _isSuccess = false;
            int UserId = Convert.ToInt32(Session["AppUserId"].ToString());
            if (HttpContext.Request.Files.AllKeys.Any())
            {
                for (int i = 0; i <= HttpContext.Request.Files.Count; i++)
                {
                    TryCatch.Run(() =>
                    {
                        var file = HttpContext.Request.Files["files" + i];
                        var fileSavePath = "";
                        if (file != null)
                        {

                            fileSavePath = Path.Combine(Server.MapPath("/Uploads/DocumentsUpload/FinancialYearId_" + FinancialYearId + "/UserId_" + UserId + "/"));
                            if (!Directory.Exists(fileSavePath))
                            {
                                Directory.CreateDirectory(fileSavePath);
                            }
                            fileSavePath = fileSavePath + "\\" + file.FileName;
                            file.SaveAs(fileSavePath);

                            if (_action.SaveDocument(UserId, FinancialYearId, Description, Amount, fileSavePath))
                            {
                                _isSuccess = true;
                            }
                        }
                        
                    }).IfNotNull(ex =>
                    {
                        Loggger.LogError("Error :- Issue while loading File, UserId :" + UserId + ", FileDescription:" + Description);
                    });
                }
            }
            if (!_isSuccess)
                return Json(new { success = false, message = "Failed to SaveDocument Of " + Description });
            else
                return Json(new { success = true, message = "Document Saved SuccessFully" });
        }
        public ActionResult GetDocument(int FinancialYearId)
        {
            JsonResult jResult;
            try
            {
                int UserId = Convert.ToInt32(Session["AppUserId"].ToString());
                var list = _action.GetDocument(UserId, FinancialYearId);
                jResult = Json(new { success = true, data = list }, JsonRequestBehavior.AllowGet);
                return jResult;
            }
            catch (Exception ex)
            {
                Loggger.LogError("Error in GetConfigBasicDetails :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }
        }
        [HttpPost]
        public ActionResult DeleteDocument(DeletedDocumnetList model)
        {
            bool isSuccess = false;
            try
            {
                isSuccess = _action.DeleteDocument(model);
                MemoryCaching.RemoveCacheValue(CachingKeys.GetUser.ToString());
            }
            catch (Exception ex)
            {

                Loggger.LogError("Error in Save Attendance :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }

            if (!isSuccess)
                return Json(new { success = false, message = "Failed to Update Documnet" });
            else
                return Json(new { success = true, message = "Documnet Updated SuccessFully" });
        }
        public FileResult DocView(string AttachmentPath)
        {

            return File(AttachmentPath, AttachmentPath.ToString().Substring(AttachmentPath.ToString().LastIndexOf("\\")));

        }
    }
}
