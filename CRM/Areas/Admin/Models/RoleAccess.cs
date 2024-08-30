using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CRM.Areas.Admin.Models
{
    public class RoleAccess
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public int MenuId { get; set; }
        public string MenuName { get; set; }
        public List<MenuDetails> MenuList { get; set; }

    }
    public class MenuDetails
    {
        public int ParentMenuId { get; set; }
        public int ChildMenuId { get; set; }
        public string ChildMenuName { get; set; }

    }
}