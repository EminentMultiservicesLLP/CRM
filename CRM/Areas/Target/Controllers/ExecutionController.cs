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
    public class ExecutionController : Controller
    {
        //
        // GET: /Target/Execution/
        IExectionInterface _action;
        private static readonly ILogger Loggger = Logger.Register(typeof(ExecutionController));
        public ExecutionController()
        {
            _action = new ExectionRepository();

        }

        public ActionResult GetExecutionData(ExecutionModel model)
        {

            List<ExecutionModel> list = new List<ExecutionModel>();

            bool _isSuccess = true;
            try
            {
                list = (List<ExecutionModel>)_action.GetAllExecutionData(model);
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
                Loggger.LogError("Error in Get Execution :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }

        }
        public ActionResult GetExecutionHistory(int ActionId)
        {

            List<ExecutionModel> list = new List<ExecutionModel>();

            bool _isSuccess = true;
            try
            {
                list = (List<ExecutionModel>)_action.GetExecutionHistory(ActionId);
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
                Loggger.LogError("Error in Get Execution History:" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }

        }

        [HttpPost]
        public ActionResult SaveExecution(ExecutionDetailsList model)
        {
            bool isSuccess = true;
            string UpdatedDate = (DateTime.Now).ToString();
            try
            {
                var result = _action.SaveExecution(model, UpdatedDate);
                if (result == true)
                {
                    isSuccess = true;
                }
                else
                {
                    isSuccess = false;
                }
                if (!isSuccess)
                    return Json(new { success = false, message = "Failed to Save Execution" });
                else
                    return Json(new { success = true, message = "Successfully Saved Data" });
            }
            catch (Exception ex)
            {
                Loggger.LogError("Error in Save Execution  :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }
        }

    }

}
