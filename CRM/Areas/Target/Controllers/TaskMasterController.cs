using CommonLayer;
using CRM.API.Target.Interface;
using CRM.API.Target.Repository;
using CRM.Areas.Target.Models;
using CRM.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRM.Areas.Target.Controllers
{
    [HandleError]
    [CheckSession]
    [Authorize]
    public class TaskMasterController : Controller
    {
        //
        // GET: /Target/TaskMaster/

        ITaskMasterInterface _action;
        private static readonly ILogger Loggger = Logger.Register(typeof(TaskMasterController));

        public TaskMasterController()
        {
            _action = new TaskMasterRepository();

        }
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetReminderType()
        {
            List<TaskMasterModel> list = new List<TaskMasterModel>();

            bool _isSuccess = true;
            try
            {
                list = (List<TaskMasterModel>)_action.GetAllReminderType();
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
                Loggger.LogError("Error in Reminder Type :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }
        }

        public ActionResult GetAllTask()
        {
            List<TaskMasterModel> list = new List<TaskMasterModel>();
            bool _isSuccess = true;
            try
            {
                list = (List<TaskMasterModel>)_action.GetAllTask();
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
                Loggger.LogError("Error in Task Master :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }

        }

        public ActionResult GetGroupByNature(int NatureId)
        {

            List<GroupByNature> list = new List<GroupByNature>();

            bool _isSuccess = true;
            try
            {
                list = (List<GroupByNature>)_action.GetGroupByNature(NatureId);
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
                Loggger.LogError("Error in Get Groups :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }

        }
        [HttpPost]
        public ActionResult SaveTask(TaskMasterModel model)
        {
            bool isSuccess = true;
            try
            {

                var result = _action.SaveTask(model);
                if (result == 0)
                {
                    isSuccess = false;
                }
                else
                {
                    isSuccess = true;
                }

            }
            catch (Exception ex)
            {
                Loggger.LogError("Error in Save Task  :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }

            if (!isSuccess)
                return Json(new { success = false, message = "Failed to Save Task" });
            else
                return Json(new { success = true, message = "Successfully Saved Task Entry", feedbackId = model.TaskId });
        }

    }
}
