using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;


namespace CRM.Areas.Masters.Models
{
    public class FeedbackMaster
    {
        public int FeedbackId { get; set; }
        public int ClientId { get; set; }

        public int CustomerAnswerId { get; set; }
        public int TypeId { get; set; }
        [Display(Name="Next Follow Up Date")]
        public DateTime NextFollowUpDate { get; set; }
        public int InsertedBy{get;set;}
        public DateTime InsertedOn { get; set; }
        public string Remark { get; set; }
        [DisplayName("Is Completed Remark")]
        public string IsCompletedRemark { get; set; }
        [DisplayName("Is Completed Remark")]
        public bool IsCompleted { get; set; }
        public string Message { get;  set; }
        public string ClientName { get; set; }
        public string SectorName { get; set; }
        public int UserId { get; set; }
        public string FollowUpDate { get; set; }
        public int RoleId { get; set; }
        [Display(Name = "Date")]
        public DateTime Date { get; set; }
        public string CustomerAnswer { get; set; }
        public string TypeName { get; set; }
        public string LoginName { get; set; }







    }
}