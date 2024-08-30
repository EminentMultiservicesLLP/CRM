using CommonDataLayer.DataAccess;
using CRM.API.Masters.Interface;
using CRM.Areas.Masters.Models;
using CRM.QueryCollection.Master;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace CRM.API.Masters.Repository
{
    public class FeedbackMasterRepository : IFeedbackMasterInterface
    {

        public List<FeedbackMaster> GetAllTodayTask(int UserId,int RoleId,DateTime Date)
        {
            List<FeedbackMaster> list = null;

            using (DBHelper dbHelper = new DBHelper())
            {
                DBParameterCollection paramCollection = new DBParameterCollection();
                paramCollection.Add(new DBParameter("InsertedBy", UserId, DbType.Int32));
                paramCollection.Add(new DBParameter("InsertedOn", Date, DbType.DateTime));
                paramCollection.Add(new DBParameter("RoleId",RoleId, DbType.Int32));
                DataTable dtPaper = dbHelper.ExecuteDataTable(MasterQueries.GetAllTodayTask, paramCollection, CommandType.StoredProcedure);
                list = dtPaper.AsEnumerable()
                    .Select(row => new FeedbackMaster
                    {
                       
                        ClientName = row.Field<string>("ClientName"),
                        SectorName = row.Field<string>("SectorName"),
                        FollowUpDate = row.Field<string>("FollowUpDate"),
                        Remark = row.Field<string>("Remark"),
                        CustomerAnswer=row.Field<string>("CustomerAnswerName"),
                        TypeName=row.Field<string>("TypeName"),
                        LoginName=row.Field<string>("LoginName")
                    }).ToList();
            }


            return list;
        }
        public List<FeedbackMaster> GetAllFollowUp(int UserId, int RoleId, DateTime Date)
        {
            List<FeedbackMaster> list = null;

            using (DBHelper dbHelper = new DBHelper())
            {
                DBParameterCollection paramCollection = new DBParameterCollection();
                paramCollection.Add(new DBParameter("InsertedBy", UserId, DbType.Int32));
                paramCollection.Add(new DBParameter("InsertedOn", Date, DbType.DateTime));
                paramCollection.Add(new DBParameter("RoleId", RoleId, DbType.Int32));
                DataTable dtPaper = dbHelper.ExecuteDataTable(MasterQueries.GetAllFollowUp, paramCollection, CommandType.StoredProcedure);
                list = dtPaper.AsEnumerable()
                    .Select(row => new FeedbackMaster
                    {

                        ClientName = row.Field<string>("ClientName"),
                        SectorName = row.Field<string>("SectorName"),
                        FollowUpDate = row.Field<string>("FollowUpDate"),
                        Remark = row.Field<string>("Remark")
                    }).ToList();
            }


            return list;
        }


        public int CreateFeedback(FeedbackMaster model)
        {
            try
            {


                int iResult = 0;

                using (DBHelper dbHelper = new DBHelper())
                {
                    DBParameterCollection paramCollection = new DBParameterCollection();
                    paramCollection.Add(new DBParameter("FeedbackId", model.FeedbackId, DbType.Int32, ParameterDirection.Output));
                    paramCollection.Add(new DBParameter("ClientId", model.ClientId, DbType.Int32));
                    paramCollection.Add(new DBParameter("CustomerAnswerId", model.CustomerAnswerId, DbType.Int32));
                    paramCollection.Add(new DBParameter("TypeId", model.TypeId, DbType.Int32));
                    paramCollection.Add(new DBParameter("NextFollowUpDate", model.NextFollowUpDate, DbType.DateTime));
                    paramCollection.Add(new DBParameter("Remark", model.Remark, DbType.String));
                  //  paramCollection.Add(new DBParameter("IsCompletedRemark", model.Remark, DbType.String));
                    paramCollection.Add(new DBParameter("InsertedBy", model.InsertedBy, DbType.Int32));
                    paramCollection.Add(new DBParameter("InsertedOn", model.InsertedOn, DbType.DateTime));
                    //paramCollection.Add(new DBParameter("IsCompletedRemark", model.IsCompletedRemark, DbType.String));
                    //paramCollection.Add(new DBParameter("IsCompleted", model.IsCompleted, DbType.Boolean));


                    iResult = dbHelper.ExecuteNonQueryForOutParameter<int>(MasterQueries.CreateFeedback, paramCollection, CommandType.StoredProcedure, "FeedbackId");



                    return iResult;
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public List<ReportModel> GetAllClientReport(int UserId,string StrStartDate, string StrEndDate,int ClientId)
        {
            List<ReportModel> list = null;
   

            try
            {
                using (DBHelper dbHelper = new DBHelper())
                {
                 DateTime? Start;
                    DateTime? End;
                    if (StrStartDate != null)
                    {
                          Start = DateTime.Parse(StrStartDate);
                    }
                    else
                    {
                       
                        Start = null;
                    }
                    if(StrEndDate != null)
                    {
                        End = DateTime.Parse(StrEndDate);
                    }
                    else
                    {

                        End = null;
                    }

                   
                    DBParameterCollection paramCollection = new DBParameterCollection();
                    paramCollection.Add(new DBParameter("InsertedBy", ClientId, DbType.Int32));
                    paramCollection.Add(new DBParameter("ClientId", UserId, DbType.Int32));
                    paramCollection.Add(new DBParameter("StrStartdate", Start, DbType.DateTime));
                    paramCollection.Add(new DBParameter("StrEndDate", End, DbType.DateTime));
                    DataTable dtPaper = dbHelper.ExecuteDataTable(MasterQueries.GetAllReport, paramCollection, CommandType.StoredProcedure);
                    list = dtPaper.AsEnumerable()
                        .Select(row => new ReportModel
                        {
                            LoginName = row.Field<string>("LoginName"),
                            ClientName = row.Field<string>("ClientName"),
                            TypeName = row.Field<string>("TypeName"),
                            CustomerAnswerName = row.Field<string>("CustomerAnswerName"),
                        //IsCompletedRemark = row.Field<string>("IsCompletedRemark"),
                        //IsCompleted = row.Field<string>("Completed"),
                        FollowUpDate = row.Field<string>("FollowUpDate"),
                            Remark = row.Field<string>("Remark"),
                            EntryDate = row.Field<string>("EntryDate"),
                            SectorName = row.Field<string>("SectorName")
                        }).ToList();
                }


               
            }
            catch(Exception ex)
            {

            }
            return list;
        }


    }
}
