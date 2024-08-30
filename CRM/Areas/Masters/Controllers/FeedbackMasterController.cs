using CommonLayer;
using CRM.API.Masters.Interface;
using CRM.API.Masters.Repository;
using CRM.Areas.Masters.Models;
using CRM.Caching;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace CRM.Areas.Masters.Controllers
{
    public class FeedbackMasterController : Controller
    {
        //
        // GET: /Masters/FeedbackMaster/

        IFeedbackMasterInterface _action;
        private static readonly ILogger Loggger = Logger.Register(typeof(FeedbackMaster));

        public FeedbackMasterController()
        {
            _action = new FeedbackMasterRepository();

        }

        public ActionResult Index()
        {
            return View();
        }
        public ActionResult GetAllTodayTask(FeedbackMaster model)
        {
            model.UserId = Convert.ToInt32(Session["AppUserId"].ToString());
            model.RoleId = Convert.ToInt32(Session["RoleId"].ToString());

            JsonResult jResult;
            try
            {

                var list = _action.GetAllTodayTask(model.UserId,model.RoleId,model.Date);
          
                jResult = Json(list, JsonRequestBehavior.AllowGet);
                return jResult;
            }
            catch (Exception ex)
            {
                Loggger.LogError("Error in TodayTask :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }

        }
        public ActionResult GetAllFollowUp(FeedbackMaster model)
        {
            model.UserId = Convert.ToInt32(Session["AppUserId"].ToString());
            model.RoleId = Convert.ToInt32(Session["RoleId"].ToString());

            JsonResult jResult;
            try
            {

                var list = _action.GetAllFollowUp(model.UserId, model.RoleId, model.Date);

                jResult = Json(list, JsonRequestBehavior.AllowGet);
                return jResult;
            }
            catch (Exception ex)
            {
                Loggger.LogError("Error in TodayTask :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }

        }
        [HttpPost]
        public ActionResult CreateFeedback(FeedbackMaster model)
        {

            bool isSuccess = true;
            model.InsertedBy = Convert.ToInt32(Session["AppUserId"].ToString());
            model.InsertedOn = DateTime.Now;
         
            try
            {
                if (model.FeedbackId == 0)
                {


                   var newId = _action.CreateFeedback(model);
                    model.ClientId = newId;
                    isSuccess = true;
                    model.Message = "Feedback Saved Successfully";
                   





                }
                
            }
            catch (Exception ex)
            {

                Loggger.LogError("Error in Feedback Client :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }

            if (!isSuccess)
                return Json(new { success = false, message = model.Message });
            else
                return Json(new { success = true, message = model.Message, feedbackId = model.FeedbackId });
        }
    }
}
