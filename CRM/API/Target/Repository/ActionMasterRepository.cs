using CommonDataLayer.DataAccess;
using CRM.API.Target.Interface;
using CRM.Areas.Target.Models;
using CRM.QueryCollection.Target;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace CRM.API.Target.Repository
{
    public class ActionMasterRepository: IActionMasterInterface
    {
        public IEnumerable<TaskByGroupModel> GetTaskByGroup(int GroupId)
        {
            List<TaskByGroupModel> result = null;
            using (DBHelper dbHelper = new DBHelper())
            {
                DBParameterCollection paramCollection = new DBParameterCollection();
                paramCollection.Add(new DBParameter("GroupId", GroupId, DbType.Int32));
                //paramCollection.Add(new DBParameter("RoleId", RoleId, DbType.Int32));
                DataTable dt = dbHelper.ExecuteDataTable(TargetQueries.GetTaskByGroup, paramCollection, CommandType.StoredProcedure);
                result = dt.AsEnumerable()
                    .Select(row => new TaskByGroupModel
                    {
                        TaskId = row.Field<int>("TaskId"),
                        TaskName = row.Field<string>("Name"),
                        TaskSequence = row.Field<int>("TaskSequence")                      
                    }).OrderBy(o => o.TaskSequence).ToList();
            }
            return result;
        }
        public IEnumerable<StatusModel> GetAllStatus()
        {
            List<StatusModel> result = null;
            using (DBHelper dbHelper = new DBHelper())
            {
                DBParameterCollection paramCollection = new DBParameterCollection();
                DataTable dt = dbHelper.ExecuteDataTable(TargetQueries.GetAllStatus, paramCollection, CommandType.StoredProcedure);
                result = dt.AsEnumerable()
                    .Select(row => new StatusModel
                    {
                        StatusId = row.Field<int>("StatusId"),
                        Status = row.Field<string>("StatusType")
                    }).OrderBy(o => o.StatusId).ToList();
            }
            return result;
        }
        public IEnumerable<ActionMasterModel> GetAllAction()
        {
            List<ActionMasterModel> result = null;
            using (DBHelper dbHelper = new DBHelper())
            {
                DBParameterCollection paramCollection = new DBParameterCollection();
                //paramCollection.Add(new DBParameter("InsertedBy", UserId, DbType.Int32));
                //paramCollection.Add(new DBParameter("RoleId", RoleId, DbType.Int32));
                DataTable dt = dbHelper.ExecuteDataTable(TargetQueries.GetAllAction, paramCollection, CommandType.StoredProcedure);
                result = dt.AsEnumerable()
                    .Select(row => new ActionMasterModel
                    {
                        ActionId = row.Field<int>("ActionId"),
                        Name = row.Field<string>("Name"),
                        ActionSequence = row.Field<int>("ActionSequence"),
                        TaskId = row.Field<int>("LinkTaskId"),
                        TaskName = row.Field<string>("TaskName"),
                        Reminder = row.Field<string>("Reminder"),                                       
                        StatusName = row.Field<string>("StatusName"),
                        Status = row.Field<int>("StatusId"),
                        NatureId = row.Field<int>("LinkNatureId"),
                        NatureName = row.Field<string>("NatureName"),
                        GroupId = row.Field<int>("LinkGroupId"),
                        GroupName = row.Field<string>("GroupName"),
                        ExecutionReminder = row.Field<string>("ExecutionReminder"),
                        Deactive = row.Field<bool>("Deactive"),
                    }).ToList();
            }
            return result;
        }
        public int SaveAction(ActionMasterModel model, string InsertedDate)
        {
            try
            {
                int iResult = 0;

                using (DBHelper dbHelper = new DBHelper())
                {
                    DBParameterCollection paramCollection = new DBParameterCollection();
                    paramCollection.Add(new DBParameter("ActionId", model.ActionId, DbType.Int32));
                    paramCollection.Add(new DBParameter("Name", model.Name, DbType.String));
                    paramCollection.Add(new DBParameter("ActionSequence", model.ActionSequence, DbType.Int32));
                    paramCollection.Add(new DBParameter("LinkTaskId", model.TaskId, DbType.Int32));
                    paramCollection.Add(new DBParameter("Reminder", model.Reminder, DbType.String));                    
                    paramCollection.Add(new DBParameter("Status", model.Status, DbType.Int32));
                    paramCollection.Add(new DBParameter("InsertedDate", InsertedDate, DbType.String));
                    paramCollection.Add(new DBParameter("LinkNatureId", model.NatureId, DbType.Int32));
                    paramCollection.Add(new DBParameter("LinkGroupId", model.GroupId, DbType.Int32));


                    var id = dbHelper.ExecuteScalar(TargetQueries.SaveActionMaster, paramCollection, CommandType.StoredProcedure);

                    iResult = Int32.Parse(id.ToString());

                    return iResult;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<ActionMasterModel> GetTaskDescription(int TaskId)
        {
            List<ActionMasterModel> result = null;
            using (DBHelper dbHelper = new DBHelper())
            {
                DBParameterCollection paramCollection = new DBParameterCollection();
                paramCollection.Add(new DBParameter("TaskId", TaskId, DbType.Int32));
                //paramCollection.Add(new DBParameter("RoleId", RoleId, DbType.Int32));
                DataTable dt = dbHelper.ExecuteDataTable(TargetQueries.GetTaskDescription, paramCollection, CommandType.StoredProcedure);
                result = dt.AsEnumerable()
                    .Select(row => new ActionMasterModel
                    {
                        TaskId = row.Field<int>("TaskId"),                     
                        Description =row.Field<string>("TaskDescription")
                    }).OrderBy(o => o.TaskId).ToList();
            }
            return result;
        }
    }
}