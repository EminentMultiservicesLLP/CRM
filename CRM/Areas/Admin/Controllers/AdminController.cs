using CommonLayer;
using CRM.API.Admin.Interface;
using CRM.API.Admin.Repository;
using CRM.Areas.Admin.Models;
using CRM.Caching;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace CRM.Areas.Admin.Controllers
{
    public class AdminController : Controller
    {
        IAdminRepository _action;
        private static readonly ILogger Loggger = Logger.Register(typeof(AdminController));

        public AdminController()
        {
            _action = new AdminRepository();

        }

        #region Views Section
        public PartialViewResult UserProfile()
        {
            return PartialView();
        }
        public PartialViewResult RoleMaster()
        {
            return PartialView();
        }
        public PartialViewResult UserConfigurationMaster()
        {
            return PartialView();
        }
        public PartialViewResult EminentCompliances()
        {
            return PartialView();
        }
        #endregion

        #region User Profile
        public ActionResult GetUser()
        {
            JsonResult jResult;
            try
            {
                var list = _action.GetUser();
                jResult = Json(new { success = true, data = list }, JsonRequestBehavior.AllowGet);
                return jResult;
            }
            catch (Exception ex)
            {
                Loggger.LogError("Error in GetUser :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }
        }
        public ActionResult GetRole()
        {
            JsonResult jResult;
            try
            {
                var list = _action.GetRole();
                jResult = Json(new { success = true, data = list }, JsonRequestBehavior.AllowGet);
                return jResult;
            }
            catch (Exception ex)
            {
                Loggger.LogError("Error in GetRole :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }
        }
        public async Task<JsonResult> SaveUser(UserProfile model)
        {
            bool isSuccess = false;
            try
            {
                isSuccess = _action.SaveUser(model);
                MemoryCaching.RemoveCacheValue(CachingKeys.GetUser.ToString());
            }
            catch (Exception ex)
            {

                Loggger.LogError("Error in Save User :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }

            if (!isSuccess)
                return Json(new { success = false, message = "Failed to Save User" });
            else
                return Json(new { success = true, message = "User Saved SuccessFully" });
        }
        #endregion User Profile

        #region Role Master

        #region Get ParentMenu ;
        [HttpGet]
        public ActionResult GetParentMenu()
        {
            JsonResult jResult;
            try
            {
                var list = _action.GetParentMenu();
                jResult = Json(list, JsonRequestBehavior.AllowGet);
                return jResult;
            }
            catch (Exception ex)
            {
                Loggger.LogError("Error in GetParentMenu :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }
        }
        #endregion

        #region GetChildMenu ;
        [HttpGet]
        public ActionResult GetChildMenu(string PMenuId)
        {
            JsonResult jResult;
            try
            {
                var list = _action.GetChildMenu(Int32.Parse(PMenuId));
                jResult = Json(list, JsonRequestBehavior.AllowGet);
                return jResult;
            }
            catch (Exception ex)
            {
                Loggger.LogError("Error in GetChildMenu :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }
        }
        #endregion

        #region GetUserAccess ;

        [HttpGet]
        public ActionResult GetMenuRoleAccess(int RoleId)
        {
            JsonResult jResult;
            try
            {
                var list = _action.GetMenuRoleAccess(RoleId);
                jResult = Json(list, JsonRequestBehavior.AllowGet);
                return jResult;
            }
            catch (Exception ex)
            {
                Loggger.LogError("Error in GetRoleAccess :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }
        }
        public ActionResult SaveMenuRole(int roleId, string roleName, string menuList)
        {
            bool _isSuccess = false;
            RoleAccess menu = new RoleAccess();
            menu.RoleId = roleId;
            menu.RoleName = roleName;

            menu.MenuList = new List<MenuDetails>();
            foreach (string str in menuList.Split(','))
            {
                int temp = 0;
                if (int.TryParse(str, out temp)) menu.MenuList.Add(new MenuDetails { ChildMenuId = temp });
            }
            _isSuccess = _action.SaveMenuRole(menu);
            if (!_isSuccess) return Json(new { success = false, message = "Failed to save Menu access for Role" });
            else return Json(new { success = true, message = "Successfully saved Menu access for Role" });
        }
        #endregion

        #endregion  Role Master

        #region User Config
        public ActionResult GetClientType()
        {
            JsonResult jResult;
            try
            {
                var list = _action.GetClientType();
                jResult = Json(new { success = true, data = list }, JsonRequestBehavior.AllowGet);
                return jResult;
            }
            catch (Exception ex)
            {
                Loggger.LogError("Error in GetClientType :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }
        }
        public ActionResult GetFinancialYear()
        {
            JsonResult jResult;
            try
            {
                var list = _action.GetFinancialYear();
                jResult = Json(new { success = true, data = list }, JsonRequestBehavior.AllowGet);
                return jResult;
            }
            catch (Exception ex)
            {
                Loggger.LogError("Error in GetFinancialYear :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }
        }
        public async Task<JsonResult> SaveUserConfiguration(UserConfigurationMaster model)
        {
            bool isSuccess = false;
            try
            {
                isSuccess = _action.SaveUserConfiguration(model);
                MemoryCaching.RemoveCacheValue(CachingKeys.GetUser.ToString());
            }
            catch (Exception ex)
            {

                Loggger.LogError("Error in Save User Configuration :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }

            if (!isSuccess)
                return Json(new { success = false, message = "Failed to Save User Configuration" });
            else
                return Json(new { success = true, message = "User Configuration Saved SuccessFully" });
        }
        public ActionResult GetUserConfiguration()
        {
            JsonResult jResult;
            try
            {
                var list = _action.GetUserConfiguration();
                jResult = Json(new { success = true, data = list }, JsonRequestBehavior.AllowGet);
                return jResult;
            }
            catch (Exception ex)
            {
                Loggger.LogError("Error in GetUserConfiguration :" + ex.Message + Environment.NewLine + ex.StackTrace);
                return Json("Error");
            }
        }
        #endregion User Config

       
    }
}
