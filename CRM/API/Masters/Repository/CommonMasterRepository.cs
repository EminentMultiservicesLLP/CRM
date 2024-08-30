using CRM.API.Masters.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CRM.Areas.Masters.Models;
using CommonDataLayer.DataAccess;
using System.Data;
using CRM.QueryCollection.Master;

namespace CRM.API.Masters.Repository
{
    public class CommonMasterRepository : ICommonMaster
    {
        public List<CommonMasterModel> GetAllSector()
        {
            List<CommonMasterModel> list = null;
            
                using (DBHelper dbHelper = new DBHelper())
                {
                    DataTable dtPaper = dbHelper.ExecuteDataTable(MasterQueries.GetAllSector, CommandType.Text);
                    list = dtPaper.AsEnumerable()
                        .Select(row => new CommonMasterModel
                        {
                            SectorId = row.Field<int>("SectorId"),
                            SectorName = row.Field<string>("SectorName")                            
                        }).ToList();
                }            
            

            return list;
        }
        public List<CommonMasterModel> GetAllClient(int UserId,int RoleId, int UserSelect)
        {
            List<CommonMasterModel> list = null;

            using (DBHelper dbHelper = new DBHelper())
            {
                DBParameterCollection paramCollection = new DBParameterCollection();
                paramCollection.Add(new DBParameter("InsertedBy", UserId, DbType.Int32));
                paramCollection.Add(new DBParameter("RoleId", RoleId, DbType.Int32));
                paramCollection.Add(new DBParameter("UserSelect", UserSelect, DbType.Int32));
                DataTable dtPaper = dbHelper.ExecuteDataTable(MasterQueries.GetAllClientByUserId,paramCollection, CommandType.StoredProcedure);
                list = dtPaper.AsEnumerable()
                    .Select(row => new CommonMasterModel
                    {
                        ClientId = row.Field<int>("ClientId"),
                        ClientName = row.Field<string>("ClientName")
                    }).ToList();
            }


            return list;
        }
        public List<CommonMasterModel> GetAllAnswer()
        {
            List<CommonMasterModel> list = null;

            using (DBHelper dbHelper = new DBHelper())
            {
                DBParameterCollection paramCollection = new DBParameterCollection();
              
                DataTable dtPaper = dbHelper.ExecuteDataTable(MasterQueries.GetAllAnswer, CommandType.StoredProcedure);
                list = dtPaper.AsEnumerable()
                    .Select(row => new CommonMasterModel
                    {
                        CustomerAnswerId = row.Field<int>("CustomerAnswerId"),
                        CustomerAnswerName = row.Field<string>("CustomerAnswerName")
                    }).ToList();
            }


            return list;
        }
        public List<CommonMasterModel> GetAllType()
        {
            List<CommonMasterModel> list = null;

            using (DBHelper dbHelper = new DBHelper())
            {
                DBParameterCollection paramCollection = new DBParameterCollection();

                DataTable dtPaper = dbHelper.ExecuteDataTable(MasterQueries.GetAllType, CommandType.StoredProcedure);
                list = dtPaper.AsEnumerable()
                    .Select(row => new CommonMasterModel
                    {
                        TypeId = row.Field<int>("TypeId"),
                        TypeName = row.Field<string>("TypeName")
                    }).ToList();
            }


            return list;
        }

        public List<ReportModel> GetAllUser(int UserId,int RoleId)
        {
            List<ReportModel> list = null;

            using (DBHelper dbHelper = new DBHelper())
            {
                DBParameterCollection paramCollection = new DBParameterCollection();
                paramCollection.Add(new DBParameter("UserId", UserId, DbType.Int32));
                paramCollection.Add(new DBParameter("RoleId", UserId, DbType.Int32));
                DataTable dtPaper = dbHelper.ExecuteDataTable(MasterQueries.GetAllUser,paramCollection, CommandType.StoredProcedure);
                list = dtPaper.AsEnumerable()
                    .Select(row => new ReportModel
                    {
                        UserId = row.Field<int>("UserID"),
                        LoginName = row.Field<string>("LoginName"),
                    
            }).ToList();
            }


            return list;
        }



    }
}