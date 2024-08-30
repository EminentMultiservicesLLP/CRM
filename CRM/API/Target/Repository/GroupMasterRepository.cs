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
    public class GroupMasterRepository: IGroupMasterInterface
    {
        public IEnumerable<GroupMasterModel> GetAllGroup()
        {
            List<GroupMasterModel> result = null;
            using (DBHelper dbHelper = new DBHelper())
            {
                DBParameterCollection paramCollection = new DBParameterCollection();
                //paramCollection.Add(new DBParameter("InsertedBy", UserId, DbType.Int32));
                //paramCollection.Add(new DBParameter("NatureId", NatureId, DbType.Int32));
                DataTable dt = dbHelper.ExecuteDataTable(TargetQueries.GetAllGroup, paramCollection, CommandType.StoredProcedure);
                result = dt.AsEnumerable()
                    .Select(row => new GroupMasterModel
                    {
                        GroupId = row.Field<int>("GroupId"),
                        Name = row.Field<string>("Name"),
                        GroupSequence = row.Field<int>("GroupSequence"),
                        Description = row.Field<string>("Description"),
                        LinkWithNature=row.Field<int>("LinkNatureId"),
                        LinkName=row.Field<string>("Nature"),
                        NatureSequence =row.Field<int>("NatureSequence"),
                        Deactive = row.Field<bool>("Deactive"),
                    }).OrderBy(o => o.NatureSequence).ToList();
            }
            return result;
        }
        public int SaveGroup(GroupMasterModel model)
        {
            try
            {
                int iResult = 0;

                using (DBHelper dbHelper = new DBHelper())
                {
                    DBParameterCollection paramCollection = new DBParameterCollection();
                    paramCollection.Add(new DBParameter("GroupId", model.GroupId, DbType.Int32));
                    paramCollection.Add(new DBParameter("Name", model.Name, DbType.String));
                    paramCollection.Add(new DBParameter("GroupSequence", model.GroupSequence, DbType.Int32));
                    paramCollection.Add(new DBParameter("Description", model.Description, DbType.String));
                    paramCollection.Add(new DBParameter("LinkNatureId", model.LinkWithNature, DbType.Int32));
                    
                    var id = dbHelper.ExecuteScalar(TargetQueries.SaveGroupMaster, paramCollection, CommandType.StoredProcedure);

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