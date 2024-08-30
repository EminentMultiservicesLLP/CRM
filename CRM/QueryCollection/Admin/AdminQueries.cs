using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CRM.QueryCollection.Admin
{
    public class AdminQueries
    {
        public const string GetUser = "dbsp_GetUser";
        public const string GetRole = "dbsp_GetRole";
        public const string SaveUser = "dbsp_SaveUser";
        //Role Master
        public const string GetParentMenu = "dbsp_GetParentMenu";
        public const string GetChildMenu = "dbsp_GetChildMenu";
        public const string GetRoleAccess = "dbsp_GetRoleAccess";
        public const string GetMenuRoleAccess = "dbsp_GetRoleMenuAccess";
        public const string DeleteMenuRoleAccess = "dbsp_DeleteRoleMenuAccess";
        public const string SaveRoleMenuAccess = "dbsp_SaveRoleMenuAccess";
        //User Config
        public const string GetClientType = "dbsp_GetClientType";
        public const string GetFinancialYear = "dbsp_GetFinancialYear";
        public const string SaveUserConfiguration = "dbsp_SaveUserConfiguration";
        public const string GetUserConfiguration = "dbsp_GetUserConfiguration";
    }
}
