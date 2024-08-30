using CRM.API.Attendance.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CRM.Areas.Attendance.Models;
using CommonDataLayer.DataAccess;
using System.Data;
using CRM.QueryCollection.Attendance;

namespace CRM.API.Attendance.Repository
{
    public class DeveloperWorkRepository: IDeveloperWorkRepository
    { 

        private static readonly CommonLayer.ILogger Logger = CommonLayer.Logger.Register(typeof(DeveloperWorkRepository));


        #region Developer Work
        public IEnumerable<DeveloperWorkModel> getDeveloperTask(int UserConfigId, int FinancialYearId)
        {
            List<DeveloperWorkModel> attendance = null;
            using (DBHelper dbHelper = new DBHelper())
            {
                DBParameterCollection paramCollection = new DBParameterCollection();
                paramCollection.Add(new DBParameter("UserConfigId", UserConfigId, DbType.Int32));
                paramCollection.Add(new DBParameter("FinancialYearId", FinancialYearId, DbType.Int32));
                paramCollection.Add(new DBParameter("Observations", 0 , DbType.Int32));
                DataTable dtvendor = dbHelper.ExecuteDataTable(AttendanceQueries.getDeveloperTask, paramCollection, CommandType.StoredProcedure);
                attendance = dtvendor.AsEnumerable()
                            .Select(row => new DeveloperWorkModel
                            {
                                DeveloperWorkId = row.Field<int>("DeveloperWorkId"),
                                JanTask = row.Field<String>("JanTask"),
                                FebTask = row.Field<String>("FebTask"),
                                MarTask = row.Field<String>("MarTask"),
                                AprTask = row.Field<String>("AprTask"),
                                MayTask = row.Field<String>("MayTask"),
                                JunTask = row.Field<String>("JunTask"),
                                JulTask = row.Field<String>("JulTask"),
                                AugTask = row.Field<String>("AugTask"),
                                SepTask = row.Field<String>("SepTask"),
                                OctTask = row.Field<String>("OctTask"),
                                NovTask = row.Field<String>("NovTask"),
                                DecTask = row.Field<String>("DecTask"),
                                JanResult = row.Field<String>("JanResult"),
                                FebResult = row.Field<String>("FebResult"),
                                MarResult = row.Field<String>("MarResult"),
                                AprResult = row.Field<String>("AprResult"),
                                MayResult = row.Field<String>("MayResult"),
                                JunResult = row.Field<String>("JunResult"),
                                JulResult = row.Field<String>("JulResult"),
                                AugResult = row.Field<String>("AugResult"),
                                SepResult = row.Field<String>("SepResult"),
                                OctResult = row.Field<String>("OctResult"),
                                NovResult = row.Field<String>("NovResult"),
                                DecResult = row.Field<String>("DecResult"),
                            }).ToList();
            }
            return attendance;
        }
        public bool SaveDeveloperWork(DeveloperWorkModel model)
        {
            int iResult = 0;
            try
            {
                using (DBHelper dbHelper = new DBHelper())
                {
                    DBParameterCollection paramCollection = new DBParameterCollection();
                    paramCollection.Add(new DBParameter("DeveloperWorkId", model.DeveloperWorkId, DbType.Int32));
                    paramCollection.Add(new DBParameter("UserConfigId", model.UserConfigId, DbType.Int32));
                    paramCollection.Add(new DBParameter("ClientTypeId", model.ClientTypeId, DbType.Int32));
                    paramCollection.Add(new DBParameter("FinancialYearId", model.FinancialYearId, DbType.Int32));
                    paramCollection.Add(new DBParameter("JanTask", model.JanTask, DbType.String));
                    paramCollection.Add(new DBParameter("FebTask", model.FebTask, DbType.String));
                    paramCollection.Add(new DBParameter("MarTask", model.MarTask, DbType.String));
                    paramCollection.Add(new DBParameter("AprTask", model.AprTask, DbType.String));
                    paramCollection.Add(new DBParameter("MayTask", model.MayTask, DbType.String));
                    paramCollection.Add(new DBParameter("JunTask", model.JunTask, DbType.String));
                    paramCollection.Add(new DBParameter("JulTask", model.JulTask, DbType.String));
                    paramCollection.Add(new DBParameter("AugTask", model.AugTask, DbType.String));
                    paramCollection.Add(new DBParameter("SepTask", model.SepTask, DbType.String));
                    paramCollection.Add(new DBParameter("OctTask", model.OctTask, DbType.String));
                    paramCollection.Add(new DBParameter("NovTask", model.NovTask, DbType.String));
                    paramCollection.Add(new DBParameter("DecTask", model.DecTask, DbType.String));
                    paramCollection.Add(new DBParameter("JanResult ", model.JanResult, DbType.String));
                    paramCollection.Add(new DBParameter("FebResult ", model.FebResult, DbType.String));
                    paramCollection.Add(new DBParameter("MarResult ", model.MarResult, DbType.String));
                    paramCollection.Add(new DBParameter("AprResult ", model.AprResult, DbType.String));
                    paramCollection.Add(new DBParameter("MayResult ", model.MayResult, DbType.String));
                    paramCollection.Add(new DBParameter("JunResult ", model.JunResult, DbType.String));
                    paramCollection.Add(new DBParameter("JulResult ", model.JulResult, DbType.String));
                    paramCollection.Add(new DBParameter("AugResult ", model.AugResult, DbType.String));
                    paramCollection.Add(new DBParameter("SepResult ", model.SepResult, DbType.String));
                    paramCollection.Add(new DBParameter("OctResult ", model.OctResult, DbType.String));
                    paramCollection.Add(new DBParameter("NovResult ", model.NovResult, DbType.String));
                    paramCollection.Add(new DBParameter("DecResult ", model.DecResult, DbType.String));
                    iResult = dbHelper.ExecuteNonQuery(AttendanceQueries.SaveDeveloperTask, paramCollection, CommandType.StoredProcedure);

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


        #endregion Developer Work

        #region Developer Observation
        public IEnumerable<DeveloperWorkModel> getDeveloperObservation(int UserConfigId, int FinancialYearId, int Observation)
        {
            List<DeveloperWorkModel> attendance = null;
            using (DBHelper dbHelper = new DBHelper())
            {
                DBParameterCollection paramCollection = new DBParameterCollection();
                paramCollection.Add(new DBParameter("UserConfigId", UserConfigId, DbType.Int32));
                paramCollection.Add(new DBParameter("FinancialYearId", FinancialYearId, DbType.Int32));
                paramCollection.Add(new DBParameter("Observations", Observation, DbType.Int32));
                DataTable dtvendor = dbHelper.ExecuteDataTable(AttendanceQueries.getDeveloperTask, paramCollection, CommandType.StoredProcedure);
                attendance = dtvendor.AsEnumerable()
                            .Select(row => new DeveloperWorkModel
                            {
                                DeveloperWorkId = row.Field<int>("DeveloperWorkId"),
                                JanTask = row.Field<String>("JanTask"),
                                FebTask = row.Field<String>("FebTask"),
                                MarTask = row.Field<String>("MarTask"),
                                AprTask = row.Field<String>("AprTask"),
                                MayTask = row.Field<String>("MayTask"),
                                JunTask = row.Field<String>("JunTask"),
                                JulTask = row.Field<String>("JulTask"),
                                AugTask = row.Field<String>("AugTask"),
                                SepTask = row.Field<String>("SepTask"),
                                OctTask = row.Field<String>("OctTask"),
                                NovTask = row.Field<String>("NovTask"),
                                DecTask = row.Field<String>("DecTask"),
                                JanResult = row.Field<String>("JanResult"),
                                FebResult = row.Field<String>("FebResult"),
                                MarResult = row.Field<String>("MarResult"),
                                AprResult = row.Field<String>("AprResult"),
                                MayResult = row.Field<String>("MayResult"),
                                JunResult = row.Field<String>("JunResult"),
                                JulResult = row.Field<String>("JulResult"),
                                AugResult = row.Field<String>("AugResult"),
                                SepResult = row.Field<String>("SepResult"),
                                OctResult = row.Field<String>("OctResult"),
                                NovResult = row.Field<String>("NovResult"),
                                DecResult = row.Field<String>("DecResult"),
                                JanObservation = row.Field<String>("JanObservation"),
                                FebObservation = row.Field<String>("FebObservation"),
                                MarObservation = row.Field<String>("MarObservation"),
                                AprObservation = row.Field<String>("AprObservation"),
                                MayObservation = row.Field<String>("MayObservation"),
                                JunObservation = row.Field<String>("JunObservation"),
                                JulObservation = row.Field<String>("JulObservation"),
                                AugObservation = row.Field<String>("AugObservation"),
                                SepObservation = row.Field<String>("SepObservation"),
                                OctObservation = row.Field<String>("OctObservation"),
                                NovObservation = row.Field<String>("NovObservation"),
                                DecObservation = row.Field<String>("DecObservation"),
                            }).ToList();
            }
            return attendance;
        }

        public bool SaveDeveloperObservation(DeveloperWorkModel model)
        {
            int iResult = 0;
            try
            {
                using (DBHelper dbHelper = new DBHelper())
                {
                    DBParameterCollection paramCollection = new DBParameterCollection();
                    paramCollection.Add(new DBParameter("DeveloperWorkId", model.DeveloperWorkId, DbType.Int32));
                    paramCollection.Add(new DBParameter("UserConfigId", model.UserConfigId, DbType.Int32));
                    paramCollection.Add(new DBParameter("ClientTypeId", model.ClientTypeId, DbType.Int32));
                    paramCollection.Add(new DBParameter("FinancialYearId", model.FinancialYearId, DbType.Int32));
                    //paramCollection.Add(new DBParameter("JanTask", model.JanTask, DbType.String));
                    //paramCollection.Add(new DBParameter("FebTask", model.FebTask, DbType.String));
                    //paramCollection.Add(new DBParameter("MarTask", model.MarTask, DbType.String));
                    //paramCollection.Add(new DBParameter("AprTask", model.AprTask, DbType.String));
                    //paramCollection.Add(new DBParameter("MayTask", model.MayTask, DbType.String));
                    //paramCollection.Add(new DBParameter("JunTask", model.JunTask, DbType.String));
                    //paramCollection.Add(new DBParameter("JulTask", model.JulTask, DbType.String));
                    //paramCollection.Add(new DBParameter("AugTask", model.AugTask, DbType.String));
                    //paramCollection.Add(new DBParameter("SepTask", model.SepTask, DbType.String));
                    //paramCollection.Add(new DBParameter("OctTask", model.OctTask, DbType.String));
                    //paramCollection.Add(new DBParameter("NovTask", model.NovTask, DbType.String));
                    //paramCollection.Add(new DBParameter("DecTask", model.DecTask, DbType.String));
                    //paramCollection.Add(new DBParameter("JanResult ", model.JanResult, DbType.String));
                    //paramCollection.Add(new DBParameter("FebResult ", model.FebResult, DbType.String));
                    //paramCollection.Add(new DBParameter("MarResult ", model.MarResult, DbType.String));
                    //paramCollection.Add(new DBParameter("AprResult ", model.AprResult, DbType.String));
                    //paramCollection.Add(new DBParameter("MayResult ", model.MayResult, DbType.String));
                    //paramCollection.Add(new DBParameter("JunResult ", model.JunResult, DbType.String));
                    //paramCollection.Add(new DBParameter("JulResult ", model.JulResult, DbType.String));
                    //paramCollection.Add(new DBParameter("AugResult ", model.AugResult, DbType.String));
                    //paramCollection.Add(new DBParameter("SepResult ", model.SepResult, DbType.String));
                    //paramCollection.Add(new DBParameter("OctResult ", model.OctResult, DbType.String));
                    //paramCollection.Add(new DBParameter("NovResult ", model.NovResult, DbType.String));
                    //paramCollection.Add(new DBParameter("DecResult ", model.DecResult, DbType.String));   
                    paramCollection.Add(new DBParameter("JanObservation ", model.JanObservation, DbType.String));
                    paramCollection.Add(new DBParameter("FebObservation ", model.FebObservation, DbType.String));
                    paramCollection.Add(new DBParameter("MarObservation ", model.MarObservation, DbType.String));
                    paramCollection.Add(new DBParameter("AprObservation ", model.AprObservation, DbType.String));
                    paramCollection.Add(new DBParameter("MayObservation ", model.MayObservation, DbType.String));
                    paramCollection.Add(new DBParameter("JunObservation ", model.JunObservation, DbType.String));
                    paramCollection.Add(new DBParameter("JulObservation ", model.JulObservation, DbType.String));
                    paramCollection.Add(new DBParameter("AugObservation ", model.AugObservation, DbType.String));
                    paramCollection.Add(new DBParameter("SepObservation ", model.SepObservation, DbType.String));
                    paramCollection.Add(new DBParameter("OctObservation ", model.OctObservation, DbType.String));
                    paramCollection.Add(new DBParameter("NovObservation ", model.NovObservation, DbType.String));
                    paramCollection.Add(new DBParameter("DecObservation ", model.DecObservation, DbType.String));
                    iResult = dbHelper.ExecuteNonQuery(AttendanceQueries.SaveDeveloperObservation, paramCollection, CommandType.StoredProcedure);

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

        #endregion Developer Observation
    }
}