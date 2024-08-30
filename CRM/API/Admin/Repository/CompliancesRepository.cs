using CRM.API.Admin.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CRM.Areas.Admin.Models;
using CommonDataLayer.DataAccess;
using System.Data;
using CRM.QueryCollection.Admin;

namespace CRM.API.Admin.Repository
{
    public class CompliancesRepository:ICompliancesRepository
    {
        private static readonly CommonLayer.ILogger Logger = CommonLayer.Logger.Register(typeof(CompliancesRepository));
        #region EminentCompliance
        #region Save Compliance
        public bool SaveCompliance(EminentCompliancesModel model)
        {
            int iResult = 0;
            try
            {
                using (DBHelper dbHelper = new DBHelper())
                {
                    DBParameterCollection paramCollection = new DBParameterCollection();

                    paramCollection.Add(new DBParameter("ComplianceId", model.ComplianceId, DbType.Int32));
                    paramCollection.Add(new DBParameter("Compliance", model.Compliance, DbType.String));
                    
                    iResult = dbHelper.ExecuteNonQuery(ComplianceQueries.SaveCompliance, paramCollection, CommandType.StoredProcedure);

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
#endregion Save
        
        #region Get Compliance

        public IEnumerable<EminentCompliancesModel> GetCompliances()
        {
            List<EminentCompliancesModel> compliance = null;
            using (DBHelper dbHelper = new DBHelper())
            {
                DBParameterCollection paramCollection = new DBParameterCollection();
                DataTable dt = dbHelper.ExecuteDataTable(ComplianceQueries.GetCompliances, paramCollection, CommandType.StoredProcedure);
                compliance = dt.AsEnumerable()
                            .Select(row => new EminentCompliancesModel
                            {
                                ComplianceId= row.Field<int>("ComplianceId"),
                                Compliance = row.Field<string>("Compliance")
                            }).ToList();
            }
            return compliance;
        }
        #endregion Get
        #endregion EminentCompliance
    }
}