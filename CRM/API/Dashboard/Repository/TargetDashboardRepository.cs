using CommonDataLayer.DataAccess;
using CRM.API.Dashboard.Interface;
using CRM.Areas.Dashboard.Models;
using CRM.QueryCollection.Dashboard;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace CRM.API.Dashboard.Repository
{
    public class TargetDashboardRepository:ITargetDashboardInterface
    {
        #region GetTask
        public IEnumerable<TargetDashboardModel> GetallTaskTillDate(TargetDashboardModel model)
        {
            List<TargetDashboardModel> result = null;
            using (DBHelper dbHelper = new DBHelper())
            {
                DBParameterCollection paramCollection = new DBParameterCollection();
                paramCollection.Add(new DBParameter("SelectedDate", model.SelectedDate, DbType.String));
                paramCollection.Add(new DBParameter("NatureId", model.NatureId, DbType.Int32));
                //paramCollection.Add(new DBParameter("GroupId", model.GroupId, DbType.Int32));
                DataTable dt = dbHelper.ExecuteDataTable(DashboardQueries.GetallTaskTillDate, paramCollection, CommandType.StoredProcedure);
                result = dt.AsEnumerable()
                    .Select(row => new TargetDashboardModel
                    {
                        TaskId = row.Field<int>("TaskId"),
                        TaskName = row.Field<string>("TaskName"),
                        TaskSequence = row.Field<int>("TaskSequence"),
                        TaskDescription = row.Field<string>("TaskDescription"),
                        GroupId = row.Field<int>("GroupId"),
                        GroupName = row.Field<string>("GroupName"),
                        DeadlineDate = row.Field<string>("DeadlineDate"),
                        ReminderDate = row.Field<string>("ReminderDate"),
                        TypeName = row.Field<string>("TypeName"),
                        TypeId = row.Field<int>("TypeId"),
                        NatureName = row.Field<string>("NatureName"),
                        NatureId = row.Field<int>("NatureId")                        
                    }).ToList();
            }
            return result;
        }
        #endregion GetTask

        #region Get Actions
        public IEnumerable<TargetDashboardModel> GetallActionsInTask(int TaskId)
        {
            List<TargetDashboardModel> result = null;
            using (DBHelper dbHelper = new DBHelper())
            {
                DBParameterCollection paramCollection = new DBParameterCollection();
                paramCollection.Add(new DBParameter("TaskId", TaskId, DbType.Int32));
               
                DataTable dt = dbHelper.ExecuteDataTable(DashboardQueries.GetallActionsInTask, paramCollection, CommandType.StoredProcedure);
                result = dt.AsEnumerable()
                    .Select(row => new TargetDashboardModel
                    {
                        ActionId = row.Field<int>("ActionId"),
                        ActionName = row.Field<string>("ActionName"),
                        ActionSequence = row.Field<int>("ActionSequence"),
                        ReminderDate = row.Field<string>("Deadline"),
                        ExecReminderDate = row.Field<string>("ExecReminder"),
                        StatusName = row.Field<string>("Status"),
                        StatusId = row.Field<int>("StatusId") 
                    }).OrderBy(o => o.ActionSequence).ToList();
            }
            return result;
        }
        #endregion Get Actions

        #region Get ActionHistory
        public IEnumerable<TargetDashboardModel> GetActionHistory(int ActionId)
        {
            List<TargetDashboardModel> result = null;
            using (DBHelper dbHelper = new DBHelper())
            {
                DBParameterCollection paramCollection = new DBParameterCollection();
                paramCollection.Add(new DBParameter("ActionId", ActionId, DbType.Int32));
                DataTable dt = dbHelper.ExecuteDataTable(DashboardQueries.GetActionHistory, paramCollection, CommandType.StoredProcedure);
                result = dt.AsEnumerable()
                    .Select(row => new TargetDashboardModel
                    {
               
                        ActionId = row.Field<int>("ActionId"),
                        ActionName = row.Field<string>("ActionName"),
                        ReminderDate = row.Field<string>("Reminder"),
                        StatusName = row.Field<string>("StatusName"),
                        StatusId = row.Field<int>("StatusId"),
                        Comments = row.Field<string>("Comments"),
                        UpdatedDate = row.Field<string>("UpdatedDate")

                    }).ToList();
            }
            return result;
        }
        #endregion Get ActionHistory
    }
}