using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CRM.Areas.Target.Models
{
    public class TaskReminderModel
    {
        public int TaskId { get; set; }
        public string TaskName { get; set; }
        public int GroupId { get; set; }
        public string GroupName { get; set; }
        public int NatureId { get; set; }
        public string NatureName { get; set; }
        public int TypeId { get; set; }
        public string Type { get; set; }
        public string ReminderDate { get; set; }
        public string DeadlineDate { get; set; }
    }
}