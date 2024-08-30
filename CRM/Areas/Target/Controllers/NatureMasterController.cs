using CommonLayer;
using CRM.API.Target.Interface;
using CRM.API.Target.Repository;
using CRM.Areas.Target.Models;
using CRM.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace CRM.Areas.Target.Controllers
{
    [HandleError]
    [CheckSession]
    [Authorize]
    public class NatureMasterController : Controller
    {
        //
        // GET: /Target/NatureMaster/

        INatureMasterInterface _action;
        private static readonly ILogger Loggger = Logger.Register(typeof(NatureMasterController));

        public NatureMasterController()
        {
            _action = new NatureMasterRepository();

        }
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetAllNature()
        {
            
            List<NatureMasterModel> list = new List<NatureMasterModel>();
       
            bool _isSuccess = true;
            try
            {
                 list = (List<NatureMasterModel>)_action.GetAllNature();
                if(list != null)
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
                Loggger.LogError("Error in Nature Master :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }
            
        }
        [HttpPost]
        public ActionResult SaveNature(NatureMasterModel model)
        {
            bool isSuccess = true;           
            try
            {        
               
                    var result = _action.SaveNature(model);
                    if (result == 0 )
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
                Loggger.LogError("Error in Save Nature  :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }

            if (!isSuccess)
                return Json(new { success = false, message = "Failed to Save Nature" });
            else
                return Json(new { success = true, message = "Successfully Saved Nature Entry", feedbackId = model.NatureId });
        }

    }
}
