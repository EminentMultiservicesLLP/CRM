using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CRM.Areas.Admin.Models
{
    public class RoleMaster
    {
        public int RoleId { get; set; }
        public int RoleName { get; set; }
        public List<RoleAccess> RoleAccess { get; set; }
    }
    //public class RoleAccess
    //{
    //    public int AccessId { get; set; }
    //    public int ParentMenuId { get; set; }
    //    public string ParentMenuName { get; set; }
    //    public int MenuId { get; set; }
    //    public string MenuName { get; set; }
    //    public bool State { get; set; }
    //}
    
}