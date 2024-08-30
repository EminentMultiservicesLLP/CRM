using CommonLayer;
using CRM.API.Dashboard.Interface;
using CRM.API.Dashboard.Repository;
using CRM.Areas.Dashboard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRM.Areas.Dashboard.Controllers
{
    public class DashboardController : Controller
    {
        // GET: /Dashboard/Dashboard/
        ITargetDashboardInterface _action;
        private static readonly ILogger Loggger = Logger.Register(typeof(DashboardController));
        public DashboardController()
        {
            _action = new TargetDashboardRepository();

        }

        #region Dashboard_Menu
        public ActionResult TargetDashboard()
        {
            return PartialView();
        }
        #endregion Dashboard
        
        #region ExecutionReport_Menu
        public ActionResult ExecutionSummery()
        {
            return PartialView();
        }
        #endregion ExecutionReport

        #region GetTask
        public ActionResult GetallTaskTillDate(TargetDashboardModel model)
        {
            List<TargetDashboardModel> list = new List<TargetDashboardModel>();
            bool _isSuccess = true;
            try
            {
                list = (List<TargetDashboardModel>)_action.GetallTaskTillDate(model);
                if (list != null)
                {
                    _isSuccess = true;
                }
                else
                {
                    _isSuccess = false;
                }

                if (!_isSuccess) return Json(new { success = false, message = "" }, JsonRequestBehavior.AllowGet);
                else return Json(new { success = true, message = "", data = list }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Loggger.LogError("Error in GetTask till Date :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }

        }
        #endregion GetTask

        #region GetAction
        public ActionResult GetallActionsInSelectedTask(int TaskId)
        {
            List<TargetDashboardModel> list = new List<TargetDashboardModel>();
            bool _isSuccess = true;
            try
            {
                list = (List<TargetDashboardModel>)_action.GetallActionsInTask(TaskId);
                if (list != null)
                {
                    _isSuccess = true;
                }
                else
                {
                    _isSuccess = false;
                }

                if (!_isSuccess) return Json(new { success = false, message = "" }, JsonRequestBehavior.AllowGet);
                else return Json(new { success = true, message = "", data = list }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Loggger.LogError("Error in Get all Actions :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }

        }
        #endregion GetAction

        #region GetActionHistory
        public ActionResult GetActionHistory(int ActionId)
        {

            List<TargetDashboardModel> list = new List<TargetDashboardModel>();

            bool _isSuccess = true;
            try
            {
                list = (List<TargetDashboardModel>)_action.GetActionHistory(ActionId);
                if (list != null)
                {
                    _isSuccess = true;
                }
                else
                {
                    _isSuccess = false;
                }

                if (!_isSuccess) return Json(new { success = false, message = "" }, JsonRequestBehavior.AllowGet);
                else return Json(new { success = true, message = "", data = list }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Loggger.LogError("Error in Get Action History:" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }

        }
        #endregion GetActionHistory
    }
}
