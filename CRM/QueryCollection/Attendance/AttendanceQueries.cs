using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CRM.QueryCollection.Attendance
{
    public class AttendanceQueries
    {
        public const string GetConfigBasicDetails = "dbsp_GetConfigBasicDetails";
        public const string SaveAttendance = "dbsp_SaveAttendance";
        public const string GetAttendance = "dbsp_GetAttendance";
        //AttendanceReport
        public const string GetAttendanceReport = "dbsp_GetAttendanceReport";
        //UploadDocument
        public const string SaveDocument = "dbsp_SaveDocument"; 
        public const string GetDocument = "dbsp_GetDocument"; 
        public const string DeleteDocument = "dbsp_DeleteDocument"; 

        //Developer Work /Task
        public const string getDeveloperTask = "dbsp_getDeveloperTask"; 
        public const string SaveDeveloperTask = "dbsp_SaveDeveloperTask"; 
        public const string SaveDeveloperObservation = "dbsp_SaveDeveloperObservation"; 

    }
}