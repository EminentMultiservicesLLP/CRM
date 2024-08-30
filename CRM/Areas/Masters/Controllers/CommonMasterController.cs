using CommonLayer;
using CommonLayer.Extensions;
using CRM.API.Masters.Interface;
using CRM.API.Masters.Repository;
using CRM.Areas.Masters.Models;
using CRM.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRM.Areas.Masters.Controllers
{
    [CheckSession]
    [ValidateHeaderAntiForgeryTokenAttribute]
    public class CommonMasterController : Controller
    {
        //
        // GET: /Masters/CommonMaster/
 
        ICommonMaster _commonMaster;
        private static readonly ILogger Loggger = Logger.Register(typeof(CommonMasterController));

        public CommonMasterController()
        {
            _commonMaster = new CommonMasterRepository();
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetAllSector()
        {
            JsonResult jsonResult = null;
            List<CommonMasterModel> list = new List<CommonMasterModel>();
            TryCatch.Run(() =>
            {
                list = _commonMaster.GetAllSector();
                jsonResult = Json( list , JsonRequestBehavior.AllowGet);
            }).IfNotNull(ex =>
            {
                Loggger.LogError("Error in class:CommonMasterController method :GetAllSector :" + Environment.NewLine + ex.StackTrace);
            });

            return jsonResult;

        }
        public ActionResult GetAllClient(CommonMasterModel model)
        { 
            model.UserId= Convert.ToInt32(Session["AppUserId"].ToString());
            model.RoleId = Convert.ToInt32(Session["RoleId"].ToString());

            JsonResult jsonResult = null;
            List<CommonMasterModel> list = new List<CommonMasterModel>();
            TryCatch.Run(() =>
            {
                list = _commonMaster.GetAllClient(model.UserId,model.RoleId,model.UserSelect);
                jsonResult = Json(list, JsonRequestBehavior.AllowGet);
            }).IfNotNull(ex =>
            {
                Loggger.LogError("Error in class:CommonMasterController method :GetAllClientByUserId :" + Environment.NewLine + ex.StackTrace);
            });

            return jsonResult;

        }
        public ActionResult GetAllAnswer()
        {
            JsonResult jsonResult = null;
            List<CommonMasterModel> list = new List<CommonMasterModel>();
            TryCatch.Run(() =>
            {
                list = _commonMaster.GetAllAnswer();
                jsonResult = Json(list, JsonRequestBehavior.AllowGet);
            }).IfNotNull(ex =>
            {
                Loggger.LogError("Error in class:CommonMasterController method :GetAllAnswer :" + Environment.NewLine + ex.StackTrace);
            });

            return jsonResult;

        }
        public ActionResult GetAllType()
        {
            JsonResult jsonResult = null;
            List<CommonMasterModel> list = new List<CommonMasterModel>();
            TryCatch.Run(() =>
            {
                list = _commonMaster.GetAllType();
                jsonResult = Json(list, JsonRequestBehavior.AllowGet);
            }).IfNotNull(ex =>
            {
                Loggger.LogError("Error in class:CommonMasterController method :GetAllType :" + Environment.NewLine + ex.StackTrace);
            });

            return jsonResult;

        }
        public ActionResult GetAllUser(ReportModel model)
        {
            JsonResult jsonResult = null;
            model.UserId = Convert.ToInt32(Session["AppUserId"].ToString());
            model.RoleId = Convert.ToInt32(Session["RoleId"].ToString());

            List<ReportModel> list = new List<ReportModel>();
            TryCatch.Run(() =>
            {
                list = _commonMaster.GetAllUser(model.UserId, model.RoleId);
                jsonResult = Json(list, JsonRequestBehavior.AllowGet);
            }).IfNotNull(ex =>
            {
                Loggger.LogError("Error in class:CommonMasterController method :GetAllUser :" + Environment.NewLine + ex.StackTrace);
            });

            return jsonResult;

        }



    }
}
