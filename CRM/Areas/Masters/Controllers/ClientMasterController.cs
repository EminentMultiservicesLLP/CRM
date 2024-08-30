using CommonLayer;
using CRM.API.Masters.Interface;
using CRM.API.Masters.Repository;
using CRM.Areas.Masters.Models;
using CRM.Caching;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRM.Areas.Masters.Controllers
{
    public class ClientMasterController : Controller
    {
        //
        // GET: /Masters/ClientMaster/
        IClientMasterInterface _action;
        private static readonly ILogger Loggger = Logger.Register(typeof(ClientMasterController));

        public ClientMasterController()
        {
            _action = new ClientMasterRepository();
           
        }

        public ActionResult Index()
        {
            return View();
        }




        public ActionResult GetAllClient(ClientMasterModel model)
        {
            model.RoleId = Convert.ToInt32(Session["RoleId"].ToString());

            model.InsertedBy = Convert.ToInt32(Session["AppUserId"].ToString());
            JsonResult jResult;
            try
            {
            
                var list = _action.GetAllClient(model.InsertedBy,model.RoleId);
                jResult = Json(list, JsonRequestBehavior.AllowGet);
                return jResult;
            }
            catch (Exception ex)
            {
                Loggger.LogError("Error in AllClient :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }
            
        }
        public async Task<JsonResult> SaveClient(ClientMasterModel model)
        {

            bool isSuccess = true;
            model.InsertedBy = Convert.ToInt32(Session["AppUserId"].ToString());
            model.InsertedON = DateTime.Now;
            model.InsertedIPAddress = Common.Constants.IpAddress;
            model.InsertedMacID = Common.Constants.MacId;
            model.InsertedMacName = Common.Constants.MacName;
            model.RoleId= Convert.ToInt32(Session["RoleId"].ToString());

            try
            {
                if (model.ClientId == 0)
                {

                    //isSuccess = _action.CheckUpdate(model.ClientName,model.SectorId);
                    
                    
                    var newId = _action.CreateClient(model);
                    model.ClientId = newId;
                    if (newId == 0)
                    {
                        isSuccess = false;
                        model.Message = "Client And Sector combination already exist!";
                    }
                    else
                    {
                        isSuccess = true;
                        model.Message = "Record Saved Successfully";
                        MemoryCaching.RemoveCacheValue(CachingKeys.GetAllClient.ToString());
                    }
                     

                    

                }
                else
                {

                    model.UpdatedBy = Convert.ToInt32(Session["AppUserId"].ToString());
                    model.UpdatedOn = DateTime.Now;
                    model.UpdatedIPAddress = Common.Constants.IpAddress;
                    model.UpdatedMacID = Common.Constants.MacId;
                    model.UpdatedMacName = Common.Constants.MacName;



                    isSuccess = _action.UpdateClient(model);
                        isSuccess = true;
                        model.Message = "Record updated Successfully";
                        MemoryCaching.RemoveCacheValue(CachingKeys.GetAllClient.ToString());
          
                   
                }
            }
            catch (Exception ex)
            {

                Loggger.LogError("Error in Save Client :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }

            if (!isSuccess)
                return Json(new { success = false, message = model.Message });
            else
                return Json(new { success = true, message = model.Message, feedbackId = model.ClientId });
        }

      



    }
}
