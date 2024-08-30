using CommonDataLayer.DataAccess;
using CRM.API.Attendance.Interface;
using CRM.Areas.Attendance.Models;
using CRM.QueryCollection.Attendance;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace CRM.API.Attendance.Repository
{
    public class DocumentUploadRepository : IDocumentUploadRepository
    {
        public bool SaveDocument(int UserId, int FinancialYearId, string Description, double Amount, string Path)
        {
            int iResult = 0;
            try
            {
                using (DBHelper dbHelper = new DBHelper())
                {
                    DBParameterCollection paramCollection = new DBParameterCollection();
                    paramCollection.Add(new DBParameter("DocumentId", 0, DbType.Int32));
                    paramCollection.Add(new DBParameter("FinancialYearId", FinancialYearId, DbType.Int32));
                    paramCollection.Add(new DBParameter("UserId", UserId, DbType.Int32));
                    paramCollection.Add(new DBParameter("Description", Description, DbType.String));
                    paramCollection.Add(new DBParameter("Amount", Amount, DbType.Double));
                    paramCollection.Add(new DBParameter("Path", Path, DbType.String));
                    iResult = dbHelper.ExecuteNonQuery(AttendanceQueries.SaveDocument, paramCollection, CommandType.StoredProcedure);

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

        public IEnumerable<DocumentUpload> GetDocument(int UserId, int FinancialYearId)
        {
            List<DocumentUpload> docDetails = null;
            using (DBHelper dbHelper = new DBHelper())
            {
                DBParameterCollection paramCollection = new DBParameterCollection();
                paramCollection.Add(new DBParameter("FinancialYearId", FinancialYearId, DbType.Int32));
                paramCollection.Add(new DBParameter("UserId", UserId, DbType.Int32));
                DataTable dtvendor = dbHelper.ExecuteDataTable(AttendanceQueries.GetDocument, paramCollection, CommandType.StoredProcedure);
                docDetails = dtvendor.AsEnumerable()
                            .Select(row => new DocumentUpload
                            {
                                UserName = row.Field<string>("UserName"),
                                DocumentId = row.Field<int>("DocumentId"),
                                Description = row.Field<string>("Description"),
                                Amount = row.Field<double>("Amount"),
                                Path = row.Field<string>("Path"),
                            }).ToList();
            }
            return docDetails;
        }
        public bool DeleteDocument(DeletedDocumnetList model)
        {
            int iResult = 0;
            var Deletedocument = CommonCRM.ToXML(model.Deletedocument);
            try
            {
                using (DBHelper dbHelper = new DBHelper())
                {
                    DBParameterCollection paramCollection = new DBParameterCollection();
                    paramCollection.Add(new DBParameter("Deletedocument", Deletedocument, DbType.Xml));
                    iResult = dbHelper.ExecuteNonQuery(AttendanceQueries.DeleteDocument, paramCollection, CommandType.StoredProcedure);

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