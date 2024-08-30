using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CRM.Areas.Attendance.Models
{
    public class AttendanceForm
    {
        public int AttendanceId { get; set; }
        public int UserConfigId { get; set; }

        public double JanPresent { get; set; }
        public double FebPresent { get; set; }
        public double MarPresent { get; set; }
        public double AprPresent { get; set; }
        public double MayPresent { get; set; }
        public double JunPresent { get; set; }
        public double JulPresent { get; set; }
        public double AugPresent { get; set; }
        public double SeptPresent { get; set; }
        public double OctPresent { get; set; }
        public double NovPresent { get; set; }
        public double DecPresent { get; set; }

        public double JanLeavesAndHolidays { get; set; }
        public double FebLeavesAndHolidays { get; set; }
        public double MarLeavesAndHolidays { get; set; }
        public double AprLeavesAndHolidays { get; set; }
        public double MayLeavesAndHolidays { get; set; }
        public double JunLeavesAndHolidays { get; set; }
        public double JulLeavesAndHolidays { get; set; }
        public double AugLeavesAndHolidays { get; set; }
        public double SeptLeavesAndHolidays { get; set; }
        public double OctLeavesAndHolidays { get; set; }
        public double NovLeavesAndHolidays { get; set; }
        public double DecLeavesAndHolidays { get; set; }

    }
    public class ConfigBasicDetails
    {
        public int UserConfigId { get; set; }
        public int UserId { get; set; }
        public string LoginName { get; set; }
        public int ClientTypeId { get; set; }
        public string ClientType { get; set; }
        public int FinancialYearId { get; set; }
        public string FinancialYear { get; set; }
        public double Jan { get; set; }
        public double Feb { get; set; }
        public double Mar { get; set; }
        public double Apr { get; set; }
        public double May { get; set; }
        public double Jun { get; set; }
        public double Jul { get; set; }
        public double Aug { get; set; }
        public double Sept { get; set; }
        public double Oct { get; set; }
        public double Nov { get; set; }
        public double Dec { get; set; }
        public bool FreezeJan { get; set; }
        public bool FreezeFeb { get; set; }
        public bool FreezeMar { get; set; }
        public bool FreezeApr { get; set; }
        public bool FreezeMay { get; set; }
        public bool FreezeJun { get; set; }
        public bool FreezeJul { get; set; }
        public bool FreezeAug { get; set; }
        public bool FreezeSept { get; set; }
        public bool FreezeOct { get; set; }
        public bool FreezeNov { get; set; }
        public bool FreezeDec { get; set; }
    }
}