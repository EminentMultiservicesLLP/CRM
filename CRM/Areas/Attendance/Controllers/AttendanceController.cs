using CommonLayer;
using CRM.API.Attendance.Interface;
using CRM.API.Attendance.Repository;
using CRM.Areas.Attendance.Models;
using CRM.Caching;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace CRM.Areas.Attendance.Controllers
{
    public class AttendanceController : Controller
    {
        IAttendanceRepository _action;
        private static readonly ILogger Loggger = Logger.Register(typeof(AttendanceController));
        public AttendanceController()
        {
            _action = new AttendanceRepository();

        }

        #region Views Sections
        public PartialViewResult AttendanceForm()
        {
            return PartialView();
        }
        public PartialViewResult AttendanceReport()
        {
            return PartialView();
        }
        public PartialViewResult DocumentUpload()
        {
            return PartialView();
        }
        public PartialViewResult DocumentDownload()
        {
            return PartialView();
        }
        public PartialViewResult Compliances()
        {
            return PartialView();
        }
        public PartialViewResult DeveloperWork()
        {
            return PartialView();
        }
        public PartialViewResult DeveloperBriefing()
        {
            return PartialView();
        }
        #endregion

        #region AttendanceForm
        public ActionResult GetConfigBasicDetails(int FinancialYearId)
        {
            JsonResult jResult;
            try
            {
                int UserId = Convert.ToInt32(Session["AppUserId"].ToString());
                var list = _action.GetConfigBasicDetails(UserId, FinancialYearId);
                jResult = Json(new { success = true, data = list }, JsonRequestBehavior.AllowGet);
                return jResult;
            }
            catch (Exception ex)
            {
                Loggger.LogError("Error in GetConfigBasicDetails :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }
        }
        public async Task<JsonResult> SaveAttendance(AttendanceForm model)
        {
            bool isSuccess = false;
            try
            {
                isSuccess = _action.SaveAttendance(model);
                MemoryCaching.RemoveCacheValue(CachingKeys.GetUser.ToString());
            }
            catch (Exception ex)
            {

                Loggger.LogError("Error in Save Attendance :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }

            if (!isSuccess)
                return Json(new { success = false, message = "Failed to Save Attendance" });
            else
                return Json(new { success = true, message = "Attendance Saved SuccessFully" });
        }
        public ActionResult GetAttendance(int UserConfigId)
        {
            JsonResult jResult;
            try
            {
                var list = _action.GetAttendance(UserConfigId);
                jResult = Json(new { success = true, data = list }, JsonRequestBehavior.AllowGet);
                return jResult;
            }
            catch (Exception ex)
            {
                Loggger.LogError("Error in GetAttendance :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }
        }
        #endregion AttendanceForm

        #region AttendanceReport
        public ActionResult GetAttendanceReport(int financialYearId)
        {
            JsonResult jResult;
            try
            {
                var list = _action.GetAttendanceReport(financialYearId);
                jResult = Json(new { success = true, data = list }, JsonRequestBehavior.AllowGet);
                return jResult;
            }
            catch (Exception ex)
            {
                Loggger.LogError("Error in GetAttendanceReport :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }
        }
        #endregion AttendanceReport
    }
}
