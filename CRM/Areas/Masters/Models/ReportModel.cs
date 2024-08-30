using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace CRM.Areas.Masters.Models
{
    public class ReportModel
    {   public int UserId { get; set; }
        public string SectorName { get; set; }
        public string FollowUpDate{get;set;}
        public string EntryDate { get; set; }
        public string NextFollowUpDate { get; set; }
        public string LoginName { get; set; }
        public string ClientName { get; set; }
        public int ClientId { get; set; }
        public string CustomerAnswerName { get; set; }
        public string TypeName { get; set; }
        public string Remark { get; set; }
        public string IsCompleted { get; set; }
        [DisplayName("Is Completed Remark")]
        public string IsCompletedRemark { get; set;}
        public DateTime InsertedOn { get; set; }
        [DisplayName("From Date")]
        public DateTime StrStartdate { get; set; }
        [DisplayName("To Date")]
        public DateTime StrEndDate { get; set; }
        public int RoleId { get; set; }
        public int UserSelect { get; set; }


    }
}