using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CRM.Areas.Dashboard.Models
{
    public class ExecutionSummeryModel
    {
        public int ActionId { get; set; }
        public string ActionName { get; set; }
        public int TaskId { get; set; }
        public string TaskName { get; set; }
        public int GroupId { get; set; }
        public string GroupName { get; set; }
        public int NatureId { get; set; }
        public string NatureName { get; set; }
        //public string Execution { get; set; }
        public int ActionSequence { get; set; }
        public int TaskSequence { get; set; }
        public int GroupSequence { get; set; }
        public int NatureSequence { get; set; }
        public string Deadline { get; set; }
        public string ExecutionDate { get; set; }
        public int StatusId { get; set; }
        public string Status { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string Comments { get; set; }
    }
}