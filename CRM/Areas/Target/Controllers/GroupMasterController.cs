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
    public class GroupMasterController : Controller
    {
        //
        // GET: /Target/GroupMaster/

        IGroupMasterInterface _action;
        private static readonly ILogger Loggger = Logger.Register(typeof(GroupMasterController));

        public GroupMasterController()
        {
            _action = new GroupMasterRepository();

        }
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetAllGroup()
        {

            List<GroupMasterModel> list = new List<GroupMasterModel>();

            bool _isSuccess = true;
            try
            {
                list = (List<GroupMasterModel>)_action.GetAllGroup();
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
                Loggger.LogError("Error in Group Master :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }

        }
        [HttpPost]
        public ActionResult SaveGroup(GroupMasterModel model)
        {
            bool isSuccess = true;
            try
            {

                var result = _action.SaveGroup(model);
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
                Loggger.LogError("Error in Save Group  :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }

            if (!isSuccess)
                return Json(new { success = false, message = "Failed to Save Group" });
            else
                return Json(new { success = true, message = "Successfully Saved Group Entry", feedbackId = model.GroupId });
        }

    }
}
