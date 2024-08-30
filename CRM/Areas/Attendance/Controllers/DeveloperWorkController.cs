using CommonLayer;
using CRM.API.Attendance.Interface;
using CRM.API.Attendance.Repository;
using System.Threading.Tasks;
using System.Web.Mvc;
using CRM.Areas.Attendance.Models;
using CRM.Caching;
using System;

namespace CRM.Areas.Attendance.Controllers
{
    public class DeveloperWorkController : Controller
    {
        IDeveloperWorkRepository _action;
        private static readonly ILogger Loggger = Logger.Register(typeof(DeveloperWorkController));
        public DeveloperWorkController()
        {
            _action = new DeveloperWorkRepository();

        }
        //
        // GET: /Attendance/DevloperWork/

        #region DevloperWork
      
        public async Task<JsonResult> SaveDeveloperWork(DeveloperWorkModel model)
        {
            bool isSuccess = false;
            try
            {
                isSuccess = _action.SaveDeveloperWork(model);
                MemoryCaching.RemoveCacheValue(CachingKeys.GetUser.ToString());
            }
            catch (Exception ex)
            {

                Loggger.LogError("Error in Save Developer Task :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }

            if (!isSuccess)
                return Json(new { success = false, message = "Failed to save Developer Task" });
            else
                return Json(new { success = true, message = "Developer Task Saved SuccessFully" });
        }
        public ActionResult getDeveloperTask(int UserConfigId, int FinancialYearId)
        {
            JsonResult jResult;
            try
            {
                var list = _action.getDeveloperTask(UserConfigId, FinancialYearId);
                jResult = Json(new { success = true, data = list }, JsonRequestBehavior.AllowGet);
                return jResult;
            }
            catch (Exception ex)
            {
                Loggger.LogError("Error in Get Developer Task :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }
        }
        
        #endregion DevloperWork

        #region Developer Observation
        
             public ActionResult GetDeveloperObservation(int UserConfigId, int FinancialYearId, int Observation)
        {
            JsonResult jResult;
            try
            {
                var list = _action.getDeveloperObservation(UserConfigId, FinancialYearId,Observation);
                jResult = Json(new { success = true, data = list }, JsonRequestBehavior.AllowGet);
                return jResult;
            }
            catch (Exception ex)
            {
                Loggger.LogError("Error in Get Developer Task :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }
        }


        public async Task<JsonResult> SaveDeveloperObservation(DeveloperWorkModel model)
        {
            bool isSuccess = false;
            try
            {
                isSuccess = _action.SaveDeveloperObservation(model);
                MemoryCaching.RemoveCacheValue(CachingKeys.GetUser.ToString());
            }
            catch (Exception ex)
            {

                Loggger.LogError("Error in Save Developer Task :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }

            if (!isSuccess)
                return Json(new { success = false, message = "Failed to save Developer Task" });
            else
                return Json(new { success = true, message = "Developer Task Saved SuccessFully" });
        }
        #endregion Developer Observation

    }
}
