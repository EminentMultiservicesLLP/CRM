using CommonLayer;
using CRM.API.Dashboard.Interface;
using CRM.API.Dashboard.Repository;
using CRM.Areas.Dashboard.Models;
using CRM.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRM.Areas.Dashboard.Controllers
{
    [HandleError]
    [CheckSession]
    [Authorize]
    public class ExecutionSummeryController : Controller
    {
        //
        // GET: /Dashboard/ExecutionSummery/

        IExecutionSummeryRepository _action;
        private static readonly ILogger Loggger = Logger.Register(typeof(ExecutionSummeryRepository));

        public ExecutionSummeryController()
        {
            _action = new ExecutionSummeryRepository();

        }
        public ActionResult GetExecutionDetails(ExecutionSummeryModel model)
        {

            List<ExecutionSummeryModel> list = new List<ExecutionSummeryModel>();

            bool _isSuccess = true;
            try
            {
                list = (List<ExecutionSummeryModel>)_action.GetExecutionDetails(model);
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
                Loggger.LogError("Error in Get Execution Details :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }

        }

    }
}
