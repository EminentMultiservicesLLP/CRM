using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CRM.Areas.Masters.Models
{
    public class CommonMasterModel
    {
        public int SectorId { get; set; }
        public string SectorName { get; set; }
        public int ClientId { get; set; }
        public string ClientName { get; set; }
        public int UserId { get; set; }
        public int CustomerAnswerId { get; set; }
        public string CustomerAnswerName { get; set; }
        public int TypeId { get; set; }
        public string TypeName { get; set; }
        public bool IsCompleted { get; set; }
        public int RoleId { get; set; }
        public int UserSelect { get; set; }



    }
}