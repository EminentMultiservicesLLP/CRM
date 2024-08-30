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
    public class ActionMasterController : Controller
    {
       
        // GET: /Target/ActionMaster/

        IActionMasterInterface _action;
        private static readonly ILogger Loggger = Logger.Register(typeof(ActionMasterController));

        public ActionMasterController()
        {
            _action = new ActionMasterRepository();

        }

        public ActionResult GetTaskByGroup(int GroupId)
        {
            List<TaskByGroupModel> list = new List<TaskByGroupModel>();
            bool _isSuccess = true;
            try
            {
                list = (List<TaskByGroupModel>)_action.GetTaskByGroup(GroupId);
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
        public ActionResult GetAllStatus()
        {
            List<StatusModel> list = new List<StatusModel>();

            bool _isSuccess = true;
            try
            {
                list = (List<StatusModel>)_action.GetAllStatus();
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
                Loggger.LogError("Error in Status Type :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }
        }

        public ActionResult GetTaskDescription(int TaskId)
        {
            List<ActionMasterModel> list = new List<ActionMasterModel>();
            bool _isSuccess = true;
            try
            {
                list = (List<ActionMasterModel>)_action.GetTaskDescription(TaskId);
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
                Loggger.LogError("Error in Task Description :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }
        }
        public ActionResult GetAllAction()
        {

            List<ActionMasterModel> list = new List<ActionMasterModel>();

            bool _isSuccess = true;
            try
            {
                list = (List<ActionMasterModel>)_action.GetAllAction();
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
                Loggger.LogError("Error in Action Master :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }

        }
        
        [HttpPost]
        public ActionResult SaveAction(ActionMasterModel model)
        {
            bool isSuccess = true;
            string InsertedDate = (DateTime.Now).ToString();
            try
            {
                var result = _action.SaveAction(model, InsertedDate);
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
                Loggger.LogError("Error in Save Action  :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }

            if (!isSuccess)
                return Json(new { success = false, message = "Failed to Save Action" });
            else
                return Json(new { success = true, message = "Successfully Saved Action Entry", feedbackId = model.ActionId });
        }

    }
}
