using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CommonLayer;
using CRM.API.Target.Interface;
using CRM.API.Target.Repository;
using CRM.Areas.Target.Models;
using CRM.Filters;

namespace CRM.Areas.Target.Controllers
{
    [HandleError]
    [CheckSession]
    [Authorize]
    public class UpdateTaskReminderController : Controller
    {
        //
        // GET: /Target/UpdateTaskReminder/
        ITaskReminderRepository _action;
        private static readonly ILogger Loggger = Logger.Register(typeof(TaskReminderRepository));

        public UpdateTaskReminderController()
        {
            _action = new TaskReminderRepository();

        }
      
        public ActionResult GetTaskForReminderUpdate(int Type)
         {
            List<TaskReminderModel> list = new List<TaskReminderModel>();
            bool _isSuccess = true;
            try
            {
                list = (List<TaskReminderModel>)_action.GetTaskForReminderUpdate(Type);
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
                Loggger.LogError("Error in Get TaskForReminderUpdate  :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }

        }

        [HttpPost]
        public ActionResult UpdateTaskReminderDates(int TypeId)
        {
            bool isSuccess = true;
            try
            {
                var result = _action.UpdateTaskReminderDates(TypeId);
                if (result == false)
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
                Loggger.LogError("Error in Update Task ReminderDates :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }

            if (!isSuccess)
                return Json(new { success = false, message = "Failed to Update Task Reminders" });
            else
                return Json(new { success = true, message = "Successfully Update Task Reminders"});
        }

    }
}

