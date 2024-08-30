using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CRM.Areas.Target.Models
{
    public class ActionMasterModel
    {
        public int ActionId { get; set; }
        [Display(Name = "Sequence")]
        public int ActionSequence { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int NatureId { get; set; }
        public string NatureName { get; set; }
        public int GroupId { get; set; }
        public string GroupName { get; set; }     
        public int TaskId { get; set; }
        public string TaskName { get; set; }

        [Display(Name = "Execution Reminder")]
        public string ExecutionReminder { get; set; }
        public string Reminder { get; set; }
        public int Status { get; set; }
        public string StatusName { get; set; }
        public bool Deactive { get; set; }
    }
    public class StatusModel
    {        
        public int StatusId { get; set; }
        public string Status { get; set; }
    }

    public class TaskByGroupModel
    {
        public int TaskId { get; set; }       
        public string TaskName { get; set; }
        public int TaskSequence { get; set; }
    }
}