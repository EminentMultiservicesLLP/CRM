using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CRM.Areas.Attendance.Models
{
    public class AttendanceReport
    {
        public int UserConfigId { get; set; }
        public int UserId { get; set; }
        public string LoginName { get; set; }
        public int ClientTypeId { get; set; }
        public string ClientType { get; set; }
        public int FinancialYearId { get; set; }
        public string FinancialYear { get; set; }
        public double TotalYearlyLeaves { get; set; }
        public double TotalAbsents { get; set; }
        public double BalanceLeaves { get; set; }

        public double JanPresent { get; set; }
        public double JanLeavesAndHolidays { get; set; }
        public double JanLeavesAllowed { get; set; }
        public double FebPresent { get; set; }
        public double FebLeavesAndHolidays { get; set; }
        public double FebLeavesAllowed { get; set; }
        public double MarPresent { get; set; }
        public double MarLeavesAndHolidays { get; set; }
        public double MarLeavesAllowed { get; set; }
        public double AprPresent { get; set; }
        public double AprLeavesAndHolidays { get; set; }
        public double AprLeavesAllowed { get; set; }
        public double MayPresent { get; set; }
        public double MayLeavesAndHolidays { get; set; }
        public double MayLeavesAllowed { get; set; }
        public double JunPresent { get; set; }
        public double JunLeavesAndHolidays { get; set; }
        public double JunLeavesAllowed { get; set; }
        public double JulPresent { get; set; }
        public double JulLeavesAndHolidays { get; set; }
        public double JulLeavesAllowed { get; set; }
        public double AugPresent { get; set; }
        public double AugLeavesAndHolidays { get; set; }
        public double AugLeavesAllowed { get; set; }
        public double SeptPresent { get; set; }
        public double SeptLeavesAndHolidays { get; set; }
        public double SeptLeavesAllowed { get; set; }
        public double OctPresent { get; set; }
        public double OctLeavesAndHolidays { get; set; }
        public double OctLeavesAllowed { get; set; }
        public double NovPresent { get; set; }
        public double NovLeavesAndHolidays { get; set; }
        public double NovLeavesAllowed { get; set; }
        public double DecPresent { get; set; }
        public double DecLeavesAndHolidays { get; set; }
        public double DecLeavesAllowed { get; set; }
    }
}