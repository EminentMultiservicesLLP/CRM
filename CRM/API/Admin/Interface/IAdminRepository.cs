using CRM.Areas.Admin.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.API.Admin.Interface
{
    interface IAdminRepository
    {
        //User Profile
        IEnumerable<UserProfile> GetUser();
        IEnumerable<UserProfile> GetRole();
        bool SaveUser(UserProfile model);
        //RoleMaster
        IEnumerable<RoleAccess> GetParentMenu();
        IEnumerable<MenuDetails> GetChildMenu(int PMenuId);
        IEnumerable<RoleAccess> GetMenuRoleAccess(int RoleId);
        bool SaveMenuRole(RoleAccess model);
        //User Config
        IEnumerable<ClientTypeModel> GetClientType();
        IEnumerable<FinancialYearModel> GetFinancialYear();
        bool SaveUserConfiguration(UserConfigurationMaster model);
        IEnumerable<UserConfigurationMaster> GetUserConfiguration();
    }
}
