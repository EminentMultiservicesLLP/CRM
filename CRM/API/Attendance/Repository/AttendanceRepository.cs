using CommonDataLayer.DataAccess;
using CRM.API.Attendance.Interface;
using CRM.Areas.Attendance.Models;
using CRM.QueryCollection.Attendance;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace CRM.API.Attendance.Repository
{
    public class AttendanceRepository: IAttendanceRepository
    {
        private static readonly CommonLayer.ILogger Logger = CommonLayer.Logger.Register(typeof(AttendanceRepository));

        #region AttendanceForm
        public IEnumerable<ConfigBasicDetails> GetConfigBasicDetails(int UserId, int FinancialYearId)
        {
            List<ConfigBasicDetails> basicConfig = null;
            using (DBHelper dbHelper = new DBHelper())
            {
                DBParameterCollection paramCollection = new DBParameterCollection();
                paramCollection.Add(new DBParameter("UserId", UserId, DbType.Int32));
                paramCollection.Add(new DBParameter("FinancialYearId", FinancialYearId, DbType.Int32));
                DataTable dtvendor = dbHelper.ExecuteDataTable(AttendanceQueries.GetConfigBasicDetails, paramCollection, CommandType.StoredProcedure);
                basicConfig = dtvendor.AsEnumerable()
                            .Select(row => new ConfigBasicDetails
                            {
                                UserConfigId = row.Field<int>("UserConfigId"),
                                UserId = row.Field<int>("UserId"),
                                LoginName = row.Field<string>("LoginName"),
                                ClientTypeId = row.Field<int>("ClientTypeId"),
                                ClientType = row.Field<string>("ClientType"),
                                FinancialYearId = row.Field<int>("FinancialYearId"),
                                FinancialYear = row.Field<string>("FinancialYear"),
                                Apr = row.Field<double>("Apr"),
                                May = row.Field<double>("May"),
                                Jun = row.Field<double>("Jun"),
                                Jul = row.Field<double>("Jul"),
                                Aug = row.Field<double>("Aug"),
                                Sept = row.Field<double>("Sept"),
                                Oct = row.Field<double>("Oct"),
                                Nov = row.Field<double>("Nov"),
                                Dec = row.Field<double>("Dec"),
                                Jan = row.Field<double>("Jan"),
                                Feb = row.Field<double>("Feb"),
                                Mar = row.Field<double>("Mar"),
                                FreezeApr = row.Field<Boolean>("AprFreeze"),
                                FreezeMay = row.Field<Boolean>("MayFreeze"),
                                FreezeJun = row.Field<Boolean>("JunFreeze"),
                                FreezeJul = row.Field<Boolean>("JulFreeze"),
                                FreezeAug = row.Field<Boolean>("AugFreeze"),
                                FreezeSept = row.Field<Boolean>("SeptFreeze"),
                                FreezeOct = row.Field<Boolean>("OctFreeze"),
                                FreezeNov = row.Field<Boolean>("NovFreeze"),
                                FreezeDec = row.Field<Boolean>("DecFreeze"),
                                FreezeJan = row.Field<Boolean>("JanFreeze"),
                                FreezeFeb = row.Field<Boolean>("FebFreeze"),
                                FreezeMar = row.Field<Boolean>("MarFreeze"),
                            }).ToList();
            }
            return basicConfig;
        }
        public bool SaveAttendance(AttendanceForm model)
        {
            int iResult = 0;
            try
            {
                using (DBHelper dbHelper = new DBHelper())
                {
                    DBParameterCollection paramCollection = new DBParameterCollection();
                    paramCollection.Add(new DBParameter("UserConfigId", model.UserConfigId, DbType.Int32));
                    paramCollection.Add(new DBParameter("AttendanceId", model.AttendanceId, DbType.Int32));

                    paramCollection.Add(new DBParameter("AprPresent", model.AprPresent, DbType.Double));
                    paramCollection.Add(new DBParameter("MayPresent", model.MayPresent, DbType.Double));
                    paramCollection.Add(new DBParameter("JunPresent", model.JunPresent, DbType.Double));
                    paramCollection.Add(new DBParameter("JulPresent", model.JulPresent, DbType.Double));
                    paramCollection.Add(new DBParameter("AugPresent", model.AugPresent, DbType.Double));
                    paramCollection.Add(new DBParameter("SeptPresent", model.SeptPresent, DbType.Double));
                    paramCollection.Add(new DBParameter("OctPresent", model.OctPresent, DbType.Double));
                    paramCollection.Add(new DBParameter("NovPresent", model.NovPresent, DbType.Double));
                    paramCollection.Add(new DBParameter("DecPresent", model.DecPresent, DbType.Double));
                    paramCollection.Add(new DBParameter("JanPresent", model.JanPresent, DbType.Double));
                    paramCollection.Add(new DBParameter("FebPresent", model.FebPresent, DbType.Double));
                    paramCollection.Add(new DBParameter("MarPresent", model.MarPresent, DbType.Double));

                    paramCollection.Add(new DBParameter("AprLeavesAndHolidays ", model.AprLeavesAndHolidays, DbType.Double));
                    paramCollection.Add(new DBParameter("MayLeavesAndHolidays ", model.MayLeavesAndHolidays, DbType.Double));
                    paramCollection.Add(new DBParameter("JunLeavesAndHolidays ", model.JunLeavesAndHolidays, DbType.Double));
                    paramCollection.Add(new DBParameter("JulLeavesAndHolidays ", model.JulLeavesAndHolidays, DbType.Double));
                    paramCollection.Add(new DBParameter("AugLeavesAndHolidays ", model.AugLeavesAndHolidays, DbType.Double));
                    paramCollection.Add(new DBParameter("SeptLeavesAndHolidays ", model.SeptLeavesAndHolidays, DbType.Double));
                    paramCollection.Add(new DBParameter("OctLeavesAndHolidays ", model.OctLeavesAndHolidays, DbType.Double));
                    paramCollection.Add(new DBParameter("NovLeavesAndHolidays ", model.NovLeavesAndHolidays, DbType.Double));
                    paramCollection.Add(new DBParameter("DecLeavesAndHolidays ", model.DecLeavesAndHolidays, DbType.Double));
                    paramCollection.Add(new DBParameter("JanLeavesAndHolidays ", model.JanLeavesAndHolidays, DbType.Double));
                    paramCollection.Add(new DBParameter("FebLeavesAndHolidays ", model.FebLeavesAndHolidays, DbType.Double));
                    paramCollection.Add(new DBParameter("MarLeavesAndHolidays ", model.MarLeavesAndHolidays, DbType.Double));
                    iResult = dbHelper.ExecuteNonQuery(AttendanceQueries.SaveAttendance, paramCollection, CommandType.StoredProcedure);

                }
                if (iResult > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public IEnumerable<AttendanceForm> GetAttendance(int UserConfigId)
        {
            List<AttendanceForm> attendance = null;
            using (DBHelper dbHelper = new DBHelper())
            {
                DBParameterCollection paramCollection = new DBParameterCollection();
                paramCollection.Add(new DBParameter("UserConfigId", UserConfigId, DbType.Int32));
                DataTable dtvendor = dbHelper.ExecuteDataTable(AttendanceQueries.GetAttendance, paramCollection, CommandType.StoredProcedure);
                attendance = dtvendor.AsEnumerable()
                            .Select(row => new AttendanceForm
                            {
                                AttendanceId = row.Field<int>("AttendanceId"),
                                AprPresent = row.Field<double>("AprPresent"),
                                MayPresent = row.Field<double>("MayPresent"),
                                JunPresent = row.Field<double>("JunPresent"),
                                JulPresent = row.Field<double>("JulPresent"),
                                AugPresent = row.Field<double>("AugPresent"),
                                SeptPresent = row.Field<double>("SeptPresent"),
                                OctPresent = row.Field<double>("OctPresent"),
                                NovPresent = row.Field<double>("NovPresent"),
                                DecPresent = row.Field<double>("DecPresent"),
                                JanPresent = row.Field<double>("JanPresent"),
                                FebPresent = row.Field<double>("FebPresent"),
                                MarPresent = row.Field<double>("MarPresent"),
                                AprLeavesAndHolidays = row.Field<double>("AprLeavesAndHolidays"),
                                MayLeavesAndHolidays = row.Field<double>("MayLeavesAndHolidays"),
                                JunLeavesAndHolidays = row.Field<double>("JunLeavesAndHolidays"),
                                JulLeavesAndHolidays = row.Field<double>("JulLeavesAndHolidays"),
                                AugLeavesAndHolidays = row.Field<double>("AugLeavesAndHolidays"),
                                SeptLeavesAndHolidays = row.Field<double>("SeptLeavesAndHolidays"),
                                OctLeavesAndHolidays = row.Field<double>("OctLeavesAndHolidays"),
                                NovLeavesAndHolidays = row.Field<double>("NovLeavesAndHolidays"),
                                DecLeavesAndHolidays = row.Field<double>("DecLeavesAndHolidays"),
                                JanLeavesAndHolidays = row.Field<double>("JanLeavesAndHolidays"),
                                FebLeavesAndHolidays = row.Field<double>("FebLeavesAndHolidays"),
                                MarLeavesAndHolidays = row.Field<double>("MarLeavesAndHolidays"),
                            }).ToList();
            }
            return attendance;
        }
        #endregion AttendanceForm

        #region Attendance Report
        public IEnumerable<AttendanceReport> GetAttendanceReport(int financialYearId)
        {
            List<AttendanceReport> attendance = null;
            using (DBHelper dbHelper = new DBHelper())
            {
                DBParameterCollection paramCollection = new DBParameterCollection();
                paramCollection.Add(new DBParameter("FinancialYearId", financialYearId, DbType.Int32));
                DataTable dtvendor = dbHelper.ExecuteDataTable(AttendanceQueries.GetAttendanceReport, paramCollection, CommandType.StoredProcedure);
                attendance = dtvendor.AsEnumerable()
                            .Select(row => new AttendanceReport
                            {
                                UserId = row.Field<int>("UserId"),
                                LoginName = row.Field<string>("LoginName"),
                                ClientTypeId = row.Field<int>("ClientTypeId"),
                                ClientType = row.Field<string>("ClientType"),
                                FinancialYearId = row.Field<int>("FinancialYearId"),
                                FinancialYear = row.Field<string>("FinancialYear"),
                                AprPresent = row.Field<double>("AprPresent"),
                                AprLeavesAndHolidays = row.Field<double>("AprLeavesAndHolidays"),
                                AprLeavesAllowed = row.Field<double>("AprLeavesAllowed"),
                                MayPresent = row.Field<double>("MayPresent"),
                                MayLeavesAndHolidays = row.Field<double>("MayLeavesAndHolidays"),
                                MayLeavesAllowed = row.Field<double>("MayLeavesAllowed"),
                                JunPresent = row.Field<double>("JunPresent"),
                                JunLeavesAndHolidays = row.Field<double>("JunLeavesAndHolidays"),
                                JunLeavesAllowed = row.Field<double>("JunLeavesAllowed"),
                                JulPresent = row.Field<double>("JulPresent"),
                                JulLeavesAndHolidays = row.Field<double>("JulLeavesAndHolidays"),
                                JulLeavesAllowed = row.Field<double>("JulLeavesAllowed"),
                                AugPresent = row.Field<double>("AugPresent"),
                                AugLeavesAndHolidays = row.Field<double>("AugLeavesAndHolidays"),
                                AugLeavesAllowed = row.Field<double>("AugLeavesAllowed"),
                                SeptPresent = row.Field<double>("SeptPresent"),
                                SeptLeavesAndHolidays = row.Field<double>("SeptLeavesAndHolidays"),
                                SeptLeavesAllowed = row.Field<double>("SeptLeavesAllowed"),
                                OctPresent = row.Field<double>("OctPresent"),
                                OctLeavesAndHolidays = row.Field<double>("OctLeavesAndHolidays"),
                                OctLeavesAllowed = row.Field<double>("OctLeavesAllowed"),
                                NovPresent = row.Field<double>("NovPresent"),
                                NovLeavesAndHolidays = row.Field<double>("NovLeavesAndHolidays"),
                                NovLeavesAllowed = row.Field<double>("NovLeavesAllowed"),
                                DecPresent = row.Field<double>("DecPresent"),
                                DecLeavesAndHolidays = row.Field<double>("DecLeavesAndHolidays"),
                                DecLeavesAllowed = row.Field<double>("DecLeavesAllowed"),
                                JanPresent = row.Field<double>("JanPresent"),
                                JanLeavesAndHolidays = row.Field<double>("JanLeavesAndHolidays"),
                                JanLeavesAllowed = row.Field<double>("JanLeavesAllowed"),
                                FebPresent = row.Field<double>("FebPresent"),
                                FebLeavesAndHolidays = row.Field<double>("FebLeavesAndHolidays"),
                                FebLeavesAllowed = row.Field<double>("FebLeavesAllowed"),
                                MarPresent = row.Field<double>("MarPresent"),
                                MarLeavesAndHolidays = row.Field<double>("MarLeavesAndHolidays"),
                                MarLeavesAllowed = row.Field<double>("MarLeavesAllowed"),
                            }).ToList();
            }
            return attendance;
        }
        #endregion Attendance Report
    }
}