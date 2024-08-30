using CommonDataLayer.DataAccess;
using CRM.API.Target.Interface;
using CRM.Areas.Target.Models;
using CRM.QueryCollection.Target;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Xml;
using System.Xml.Serialization;

namespace CRM.API.Target.Repository
{
    public class ExectionRepository: IExectionInterface
    {
        public IEnumerable<ExecutionModel> GetAllExecutionData(ExecutionModel model)
        {
            List<ExecutionModel> result = null;
            using (DBHelper dbHelper = new DBHelper())
            {
                DBParameterCollection paramCollection = new DBParameterCollection();
                paramCollection.Add(new DBParameter("SelectedDate", model.SelectedDate, DbType.String));
                DataTable dt = dbHelper.ExecuteDataTable(TargetQueries.GetExecutionData, paramCollection, CommandType.StoredProcedure);
                result = dt.AsEnumerable()
                    .Select(row => new ExecutionModel
                    {
                        ExecutionId =row.Field<int>("ExecutionId"),
                        NatureId = row.Field<int>("NatureId"),
                        Nature = row.Field<string>("NatureName"),
                        NatureSequence = row.Field<int>("NatureSequence"),
                        GroupId = row.Field<int>("GroupId"),
                        Group = row.Field<string>("GroupName"),
                        GroupSequence = row.Field<int>("GroupSequence"),
                        TaskId = row.Field<int>("TaskId"),
                        Task = row.Field<string>("TaskName"),
                        TaskSequence = row.Field<int>("TaskSequence"),
                        ActionId = row.Field<int>("ActionId"),
                        Action = row.Field<string>("ActionName"),
                        ActionSequence = row.Field<int>("ActionSequence"),
                        Reminder = row.Field<string>("ExecReminder"),
                        Status = row.Field<string>("StatusName"),
                        StatusId = row.Field<int>("StatusId")                  

                    }).OrderBy(o => o.ActionSequence).ToList();
            }
            return result;
        }


        public IEnumerable<ExecutionModel> GetExecutionHistory(int ActionId)
        {
            List<ExecutionModel> result = null;
            using (DBHelper dbHelper = new DBHelper())
            {
                DBParameterCollection paramCollection = new DBParameterCollection();
                //paramCollection.Add(new DBParameter("InsertedBy", UserId, DbType.Int32));
                paramCollection.Add(new DBParameter("ActionId", ActionId, DbType.Int32));
                DataTable dt = dbHelper.ExecuteDataTable(TargetQueries.GetExecutionHistory, paramCollection, CommandType.StoredProcedure);
                result = dt.AsEnumerable()
                    .Select(row => new ExecutionModel
                    {
                        ExecutionId = row.Field<int>("ExecutionId"),
                        ActionId = row.Field<int>("ActionId"),
                        Action = row.Field<string>("ActionName"),
                        Reminder = row.Field<string>("Reminder"),
                        Status = row.Field<string>("StatusName"),
                        StatusId = row.Field<int>("StatusId"),
                        Comments = row.Field<string>("Comments"),
                        UpdatedDate = row.Field<string>("UpdatedDate")

                    }).OrderBy(o => o.ExecutionId).ToList();
            }
            return result;
        }

        public bool SaveExecution(ExecutionDetailsList model, string UpdatedDate)
        {
            try
            {
                int iResult = 0; 

                var ExecutionList = CommonCRM.ToXML(model.ExecutionModelList);
                using (DBHelper dbHelper = new DBHelper())
                {
                    DBParameterCollection paramCollection = new DBParameterCollection();                  
                    paramCollection.Add(new DBParameter("ExecutionDetails", ExecutionList, DbType.Xml));
                    paramCollection.Add(new DBParameter("UpdatedDate", UpdatedDate, DbType.String));

                    iResult = dbHelper.ExecuteNonQuery(TargetQueries.SaveExecutionDetails, paramCollection, CommandType.StoredProcedure);   
                }
                if (iResult > 0)
                {
                    return true;
                }
                else {
                    return false; 
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}