using CRM.Areas.Attendance.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.API.Attendance.Interface
{
    public interface IAttendanceRepository
    {
        //AttendanceForm
        IEnumerable<ConfigBasicDetails> GetConfigBasicDetails(int UserId, int FinancialYearId);
        bool SaveAttendance(AttendanceForm model);
        IEnumerable<AttendanceForm> GetAttendance(int UserConfigId);
        //AttendanceReport
        IEnumerable<AttendanceReport> GetAttendanceReport(int financialYearId);
    }
}
