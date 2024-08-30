using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using CommonLayer;
using CRM.API.Admin.Interface;
using CRM.API.Admin.Repository;
using CRM.Areas.Admin.Models;

namespace CRM.Areas.Admin.Controllers
{
    public class CompliancesController : Controller
    {
        //
        // GET: /Admin/Compliances/
        ICompliancesRepository _action;
        private static readonly ILogger Loggger = Logger.Register(typeof(CompliancesController));

        public CompliancesController()
        {
            _action = new CompliancesRepository();

        }
     

        #region Eminent Compliances

        public ActionResult GetCompliances()
        {
            JsonResult jResult;
            try
            {
                var list = _action.GetCompliances();
                jResult = Json(new { success = true, data = list }, JsonRequestBehavior.AllowGet);
                return jResult;
            }
            catch (Exception ex)
            {
                Loggger.LogError("Error in Get Compliances :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }
        }
        public JsonResult SaveCompliance(EminentCompliancesModel model)
        {
            bool isSuccess = false;
            try
            {
                isSuccess = _action.SaveCompliance(model);

            }
            catch (Exception ex)
            {

                Loggger.LogError("Error in Save Compliances :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }

            if (!isSuccess)
                return Json(new { success = false, message = "Failed to Save Compliances" });
            else
                return Json(new { success = true, message = "Compliances Saved SuccessFully" });
        }
        #endregion Eminent Compliances
    }
}
