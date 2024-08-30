using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CRM.Areas.Attendance.Models
{
    public class DeveloperWorkModel
    {
        public int DeveloperWorkId { get; set; }
        public int UserConfigId { get; set; }
        public int UserId { get; set; }
        public int ClientTypeId { get; set; }
        public int FinancialYearId { get; set;}
        public string  JanTask { get; set; } 
        public string  FebTask { get; set; } 
        public string  MarTask { get; set; } 
        public string  AprTask { get; set; } 
        public string  MayTask { get; set; } 
        public string  JunTask { get; set; } 
        public string  JulTask { get; set; } 
        public string  AugTask { get; set; } 
        public string  SepTask { get; set; } 
        public string  OctTask { get; set; } 
        public string  NovTask { get; set; } 
        public string  DecTask { get; set; } 
        public string  JanResult { get; set; }
        public string FebResult { get; set; }
        public string MarResult { get; set; }
        public string AprResult { get; set; }
        public string MayResult { get; set; }
        public string JunResult { get; set; }
        public string JulResult { get; set; }
        public string AugResult { get; set; }
        public string SepResult { get; set; }
        public string OctResult { get; set; }
        public string NovResult { get; set; }
        public string DecResult { get; set; }
        public string  JanObservation { get; set; }
        public string FebObservation { get; set; }
        public string MarObservation { get; set; }
        public string AprObservation { get; set; }
        public string MayObservation { get; set; }
        public string JunObservation { get; set; }
        public string JulObservation { get; set; }
        public string AugObservation { get; set; }
        public string SepObservation { get; set; }
        public string OctObservation { get; set; }
        public string NovObservation { get; set; }
        public string DecObservation { get; set; }
                
    }
}