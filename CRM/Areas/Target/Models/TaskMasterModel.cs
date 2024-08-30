using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CRM.Areas.Target.Models
{
    public class TaskMasterModel
    {
        public int TaskId { get; set; }
        [Display(Name="Sequence")]
        public int TaskSequence { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }        

        [Display(Name = "Group")]
        public int LinkWithGroup { get; set; }
        public string LinkName { get; set; }
        public string Deadline { get; set; }
        [Display(Name = "Reminder")]
        public string ReminderDate { get; set; }
        [Display(Name = "Type")]
        public string ReminderTypeName { get; set; }
        public int ReminderTypeId { get; set; }
        public int NatureId { get; set; }
        public string Nature { get; set; }
        public int NatureSequence { get; set; }
        public bool Deactive { get; set; }
    }
    public class GroupByNature
    {
        public int GroupId { get; set; }        
        public int GroupSequence { get; set; }
        public string GroupName { get; set; }
    }
}