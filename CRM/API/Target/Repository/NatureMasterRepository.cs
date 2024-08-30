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
    public class NatureMasterRepository : INatureMasterInterface
    {
        
        public IEnumerable<NatureMasterModel> GetAllNature()
        {
            List<NatureMasterModel> result = null;
            using (DBHelper dbHelper = new DBHelper())
            {
                DBParameterCollection paramCollection = new DBParameterCollection();
                //paramCollection.Add(new DBParameter("InsertedBy", UserId, DbType.Int32));
                //paramCollection.Add(new DBParameter("RoleId", RoleId, DbType.Int32));
                DataTable dt = dbHelper.ExecuteDataTable(TargetQueries.GetAllNature, paramCollection, CommandType.StoredProcedure);
                result = dt.AsEnumerable()
                            .Select(row => new NatureMasterModel
                            {
                                NatureId = row.Field<int>("NatureId"),
                                Name = row.Field<string>("Name"),
                                NatureSequence = row.Field<int>("NatureSequence"),
                                Description = row.Field<string>("Description"),                               
                                Deactive = row.Field<bool>("Deactive"),                               
                            }).OrderBy(o=> o.NatureSequence).ToList();
            }
            return result;
        }
        public int SaveNature(NatureMasterModel model)
        {
            try
            {

                int iResult = 0;

                using (DBHelper dbHelper = new DBHelper())
                {
                    DBParameterCollection paramCollection = new DBParameterCollection();
                    paramCollection.Add(new DBParameter("NatureId", model.NatureId, DbType.Int32));
                    paramCollection.Add(new DBParameter("Name", model.Name, DbType.String));
                    paramCollection.Add(new DBParameter("NatureSequence", model.NatureSequence, DbType.Int32));
                    paramCollection.Add(new DBParameter("Description", model.Description, DbType.String));        
                    //paramCollection.Add(new DBParameter("InsertedBy", model.InsertedBy, DbType.Int32));
                    //paramCollection.Add(new DBParameter("InsertedMacName", model.InsertedMacName, DbType.String));
                    //paramCollection.Add(new DBParameter("InsertedIPAddress", model.InsertedIPAddress, DbType.String));
                    //paramCollection.Add(new DBParameter("InsertedON", model.InsertedON, DbType.DateTime));
                    //paramCollection.Add(new DBParameter("InsertedMacID", model.InsertedMacID, DbType.String));
                    //paramCollection.Add(new DBParameter("Deactive", model.Deactive, DbType.Boolean));

                   var id = dbHelper.ExecuteScalar(TargetQueries.SaveNatureMaster, paramCollection, CommandType.StoredProcedure);

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