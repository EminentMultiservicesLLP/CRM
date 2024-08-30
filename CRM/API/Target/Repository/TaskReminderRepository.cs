using CRM.API.Target.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CRM.Areas.Target.Models;
using CommonDataLayer;
using CommonDataLayer.DataAccess;
using System.Data;
using CRM.QueryCollection.Target;

namespace CRM.API.Target.Repository
{
    public class TaskReminderRepository : ITaskReminderRepository
    {
     public IEnumerable<TaskReminderModel> GetTaskForReminderUpdate(int Type)
        {
            List<TaskReminderModel> result = null;
            using (DBHelper dBHelper = new DBHelper())
            {
                DBParameterCollection paramCollection = new DBParameterCollection();
                paramCollection.Add(new DBParameter("Type", Type, DbType.Int32));
                DataTable dt = dBHelper.ExecuteDataTable(TargetQueries.GetTaskForReminderUpdate, paramCollection, CommandType.StoredProcedure);
                result = dt.AsEnumerable()
                       .Select(row => new TaskReminderModel
                       {
                           TaskId = row.Field<int>("TaskId"),
                           TaskName = row.Field<string>("TaskName"),
                           GroupId = row.Field<int>("GroupId"),
                           GroupName = row.Field<string>("GroupName"),
                           NatureId = row.Field<int>("NatureId"),
                           NatureName = row.Field<string>("NatureName"),
                           DeadlineDate = row.Field<string>("Deadline"),
                           ReminderDate = row.Field<string>("ReminderDate"),
                           Type = row.Field<string>("TypeName"),
                           TypeId = row.Field<int>("TypeId"),
                       }).OrderBy(o => o.NatureId).ToList();
            }
            return result;
        }

        public bool UpdateTaskReminderDates(int TypeId)
        {
            try
            {
                int iResult = 0;                
                using (DBHelper dbHelper = new DBHelper())
                {
                    DBParameterCollection paramCollection = new DBParameterCollection();
                    paramCollection.Add(new DBParameter("Type", TypeId, DbType.Int32));
                    //paramCollection.Add(new DBParameter("UpdatedDate", UpdatedDate, DbType.String));

                    iResult = dbHelper.ExecuteNonQuery(TargetQueries.UpdateTaskReminderDates, paramCollection, CommandType.StoredProcedure);
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
    }
}