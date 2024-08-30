using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CRM.Areas.Dashboard.Models
{
    public class DashboardModel
    {
    }
    public class TargetDashboardModel
    {
        public string SelectedDate { get; set; }
        public int NatureId { get; set;}
        public string NatureName { get; set; }
        public int GroupId { get; set; }
        public string GroupName { get; set; }
        public int TaskId { get; set; } 
        public string TaskName { get; set; }
        public string DeadlineDate { get; set; }
        public string ReminderDate { get; set; }
        public int TypeId { get; set; } 
        public string TypeName { get; set; }    
        public int StatusId { get; set; }
        public string StatusName { get; set; }
        public int TaskSequence { get; set; }
        public string TaskDescription { get; set; }
        public int ActionId { get; set; }
        public string ActionName { get; set; }
        public int ActionSequence { get; set; }
        public string ExecReminderDate { get; set; }
        public string Comments { get; set; }
        public string UpdatedDate { get; set; }
    }
}