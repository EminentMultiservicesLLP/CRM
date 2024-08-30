using CommonLayer;
using CRM.API.Attendance.Interface;
using CRM.API.Attendance.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRM.Areas.Attendance.Controllers
{
    public class DocumentDownloadController : Controller
    {
        IDocumentUploadRepository _action;
        private static readonly ILogger Loggger = Logger.Register(typeof(DocumentDownloadController));
        public DocumentDownloadController()
        {
            _action = new DocumentUploadRepository();

        }
        public ActionResult GetDocument(int UserId, int FinancialYearId)
        {
            JsonResult jResult;
            try
            {
                var list = _action.GetDocument(UserId, FinancialYearId);
                jResult = Json(new { success = true, data = list }, JsonRequestBehavior.AllowGet);
                return jResult;
            }
            catch (Exception ex)
            {
                Loggger.LogError("Error in GetDocument :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }
        }
    }
}
