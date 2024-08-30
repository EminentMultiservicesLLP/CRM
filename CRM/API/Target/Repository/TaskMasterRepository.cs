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
    public class TaskMasterRepository: ITaskMasterInterface
    {
        public IEnumerable<TaskMasterModel> GetAllReminderType()
        {
            List<TaskMasterModel> result = null;
            using (DBHelper dbHelper = new DBHelper())
            {
                DBParameterCollection paramCollection = new DBParameterCollection();        
                DataTable dt = dbHelper.ExecuteDataTable(TargetQueries.GetReminderType, paramCollection, CommandType.StoredProcedure);
                result = dt.AsEnumerable()
                    .Select(row => new TaskMasterModel
                    {
                        ReminderTypeId = row.Field<int>("TypeId"),
                        ReminderTypeName = row.Field<string>("ReminderType")                    
                    }).OrderBy(o => o.ReminderTypeId).ToList();
            }
            return result;
        }
        
        public IEnumerable<TaskMasterModel> GetAllTask()
        {
            List<TaskMasterModel> result = null;
            using (DBHelper dbHelper = new DBHelper())
            {
                DBParameterCollection paramCollection = new DBParameterCollection();
                //paramCollection.Add(new DBParameter("InsertedBy", UserId, DbType.Int32));
                //paramCollection.Add(new DBParameter("RoleId", RoleId, DbType.Int32));
                DataTable dt = dbHelper.ExecuteDataTable(TargetQueries.GetAllTask, paramCollection, CommandType.StoredProcedure);
                result = dt.AsEnumerable()
                    .Select(row => new TaskMasterModel
                    {
                        TaskId = row.Field<int>("TaskId"),
                        Name = row.Field<string>("Name"),
                        TaskSequence = row.Field<int>("TaskSequence"),
                        Description = row.Field<string>("Description"),
                        LinkWithGroup = row.Field<int>("LinkGroupId"),
                        LinkName = row.Field<string>("GroupName"),
                        Deadline= row.Field<string>("Deadline"),
                        ReminderDate=row.Field<string>("ReminderDate"),
                        ReminderTypeName=row.Field<string>("TypeName"),
                        ReminderTypeId=row.Field<int>("TypeId"),
                        Nature = row.Field<string>("NatureName"),
                        NatureId = row.Field<int>("NatureId"),
                        NatureSequence= row.Field<int>("NatureSequence"),
                        Deactive = row.Field<bool>("Deactive"),
                    }).ToList();
            }
            return result;
        }

        public IEnumerable<GroupByNature> GetGroupByNature(int NatureId)
        {
            List<GroupByNature> result = null;
            using (DBHelper dbHelper = new DBHelper())
            {
                DBParameterCollection paramCollection = new DBParameterCollection();
                //paramCollection.Add(new DBParameter("InsertedBy", UserId, DbType.Int32));
                paramCollection.Add(new DBParameter("NatureId", NatureId, DbType.Int32));
                DataTable dt = dbHelper.ExecuteDataTable(TargetQueries.GetGroupByNature, paramCollection, CommandType.StoredProcedure);
                result = dt.AsEnumerable()
                    .Select(row => new GroupByNature
                    {
                        GroupId = row.Field<int>("GroupId"),
                        GroupName = row.Field<string>("Name"),
                        GroupSequence = row.Field<int>("GroupSequence")                       
                    }).OrderBy(o => o.GroupSequence).ToList();
            }
            return result;
        }
        public int SaveTask(TaskMasterModel model)
        {
            try
            {
                int iResult = 0;

                using (DBHelper dbHelper = new DBHelper())
                {
                    DBParameterCollection paramCollection = new DBParameterCollection();
                    paramCollection.Add(new DBParameter("TaskId", model.TaskId, DbType.Int32));
                    paramCollection.Add(new DBParameter("Name", model.Name, DbType.String));
                    paramCollection.Add(new DBParameter("TaskSequence", model.TaskSequence, DbType.Int32));
                    paramCollection.Add(new DBParameter("Description", model.Description, DbType.String));
                    paramCollection.Add(new DBParameter("LinkGroupId", model.LinkWithGroup, DbType.Int32));
                    paramCollection.Add(new DBParameter("Deadline", model.Deadline, DbType.String));
                    paramCollection.Add(new DBParameter("ReminderDate", model.ReminderDate, DbType.String));
                    paramCollection.Add(new DBParameter("Type", model.ReminderTypeId, DbType.Int32));
                    paramCollection.Add(new DBParameter("LinkNatureId", model.NatureId, DbType.Int32));


                    var id = dbHelper.ExecuteScalar(TargetQueries.SaveTaskMaster, paramCollection, CommandType.StoredProcedure);

                    iResult = Int32.Parse(id.ToString());

                        return iResult;
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}