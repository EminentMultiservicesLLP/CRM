using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CRM.Areas.Masters.Models
{
    public class ClientMasterModel
    {


        public int ClientId { get; set; } 
        [Display(Name ="Client Name")]
        public string ClientName { get; set; }
        public string Address { get; set; }
        public string Landmark { get; set; }
        [Display(Name = "Contact Person-1")]
        public string ContactPersonOne { get; set; }
        [Display(Name = "Contact Designation-1")]
        public string ContactDesignationOne { get; set; }
        [Display(Name = "Phone-1")]
        public string PhoneOne { get; set; }
        [Display(Name = "Email-1")]
        public string EmailOne { get; set; }
        [Display(Name = "Contact Person-2")]
        public string ContactPersonTwo { get; set; }
        [Display(Name = "Contact Designation-2")]
        public string ContactDesignationTwo { get; set; }
        [Display(Name = "Phone-2")]
        public string PhoneTwo { get; set; }
        [Display(Name = "Email-2")]
        public string EmailTwo { get; set; }
        [Display(Name = "No.Of Student")]
        public int NoOfStudents { get; set; }
        public int Unit { get; set; }
        public int SectorId { get; set; }
        public string Speciality { get; set; }
        public bool Deactive { get; set; }     
        public string ClientSector { get; set; }

    
        public string UpdatedMacName { get; set; }
        public string UpdatedMacID { get; set; }
        public string UpdatedIPAddress { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int InsertedBy { get; set; }
        public DateTime InsertedON { get; set; }
        public string InsertedMacName { get; set; }
        public string InsertedMacID { get; set; }
        public string InsertedIPAddress { get; set; }
        public string Message { get; set; }
        public int RoleId { get; set; }
        [DisplayName("Is Completed")]
        public bool IsCompleted { get; set; }
        [DisplayName("Is Completed Remark")]
        public string IsCompletedRemark { get; set; }
        public string LoginName { get; set; }
    }
}