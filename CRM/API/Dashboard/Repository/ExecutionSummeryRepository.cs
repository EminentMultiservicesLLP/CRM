using CRM.API.Dashboard.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CRM.Areas.Dashboard.Models;
using CommonDataLayer.DataAccess;
using System.Data;
using CRM.QueryCollection.Dashboard;

namespace CRM.API.Dashboard.Repository
{
    public class ExecutionSummeryRepository :IExecutionSummeryRepository
    {
        public IEnumerable<ExecutionSummeryModel> GetExecutionDetails(ExecutionSummeryModel model)
        {
            List<ExecutionSummeryModel> result = null;
            using (DBHelper dbHelper = new DBHelper())
            {
                DBParameterCollection paramCollection = new DBParameterCollection();
                paramCollection.Add(new DBParameter("StartDate", model.FromDate, DbType.String));
                paramCollection.Add(new DBParameter("EndDate", model.ToDate, DbType.String));
                DataTable dt = dbHelper.ExecuteDataTable(DashboardQueries.GetExecutionDetails, paramCollection, CommandType.StoredProcedure);
                result = dt.AsEnumerable()
                    .Select(row => new ExecutionSummeryModel
                    {
                        ActionId = row.Field<int>("ActionId"),
                        ActionName = row.Field<string>("ActionName"),
                        TaskId = row.Field<int>("TaskId"),
                        TaskName = row.Field<string>("TaskName"),
                        GroupId = row.Field<int>("GroupId"),
                        GroupName = row.Field<string>("GroupName"),
                        NatureId = row.Field<int>("NatureId"),
                        NatureName = row.Field<string>("NatureName"),
                        ActionSequence = row.Field<int>("ActionSequence"),
                        TaskSequence = row.Field<int>("TaskSequence"),
                        GroupSequence = row.Field<int>("GroupSequence"),
                        NatureSequence = row.Field<int>("NatureSequence"),
                        Deadline = row.Field<string>("Deadline"),
                        ExecutionDate = row.Field<string>("ExecReminder"),
                        Status = row.Field<string>("StatusName"),
                        StatusId = row.Field<int>("StatusId"),
                        Comments =row.Field<string>("Comments")

                    }).OrderBy(o => o.NatureSequence).ToList();
            }
            return result;
        }

    }
}