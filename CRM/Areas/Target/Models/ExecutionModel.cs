using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CRM.Areas.Target.Models
{
    public class ExecutionModel
    {
        public int ExecutionId { get; set; }
        public string Reminder { get; set; }
        public int NatureId { get; set; }
        public string Nature { get; set; }
        public int NatureSequence { get; set; }
        public int GroupId { get; set; }
        public string Group { get; set; }
        public int GroupSequence { get; set; }
        public int TaskId { get; set; }
        public string Task { get; set; }
        public int TaskSequence { get; set; }
        public int ActionId { get; set; }
        public string Action { get; set; }
        public int ActionSequence { get; set; }
        public int StatusId { get; set; }
        public string Status { get; set; }
        public string Comments { get; set; }
        public string SelectedDate { get; set; }
        public string UpdatedDate { get; set; }
        public bool CheckMark { get; set; }

    }
    public class ExecutionDetailsList
    {
        public int ExecutionId {get; set;}
        public List<ExecutionList> ExecutionModelList { get; set; }

    }
    public class ExecutionList
    {
        public int ActionId { get; set; }
        public string Action { get; set; }    
        public int StatusId { get; set; }      
        public string Comments { get; set; }
        public string ReminderDate { get; set; }
    }
}