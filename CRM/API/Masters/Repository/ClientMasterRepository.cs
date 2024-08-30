using CommonDataLayer.DataAccess;
using CRM.API.Masters.Interface;
using CRM.Areas.Masters.Models;
using CRM.QueryCollection.Master;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace CRM.API.Masters.Repository
{
    public class ClientMasterRepository:IClientMasterInterface
    {


        public IEnumerable<ClientMasterModel> GetAllClient(int UserId,int RoleId)
        {
            List<ClientMasterModel> client = null;
            using (DBHelper dbHelper = new DBHelper())
            {
                DBParameterCollection paramCollection = new DBParameterCollection();
                paramCollection.Add(new DBParameter("InsertedBy", UserId, DbType.Int32));
                paramCollection.Add(new DBParameter("RoleId", RoleId, DbType.Int32));
                DataTable dtvendor = dbHelper.ExecuteDataTable(MasterQueries.GetAllClient, paramCollection, CommandType.StoredProcedure);
                client = dtvendor.AsEnumerable()
                            .Select(row => new ClientMasterModel
                            {
                                ClientId = row.Field<int>("ClientId"),                               
                                ClientName  = row.Field<string>("ClientName"),
                                Landmark = row.Field<string>("landmark"),
                                Address = row.Field<string>("Address"),                                
                                ContactPersonOne = row.Field<string>("ContactPersonOne"),
                                ContactDesignationOne = row.Field<string>("ContactDesignationOne"),                               
                                PhoneOne = row.Field<string>("PhoneOne"),
                                EmailOne = row.Field<string>("EmailOne"),
                                ContactPersonTwo = row.Field<string>("ContactPersonTwo"),
                                ContactDesignationTwo = row.Field<string>("ContactDesignationTwo"),
                                PhoneTwo = row.Field<string>("PhoneTwo"),
                                EmailTwo = row.Field<string>("EmailTwo"),
                                Deactive = row.Field<bool>("Deactive"),
                                SectorId =row.Field<int>("SectorId"),
                                ClientSector = row.Field<string>("ClientSector"),
                                NoOfStudents = row.Field<int>("NoOfStudents"),
                                Unit = row.Field<int>("Unit"),
                                Speciality = row.Field<string>("Speciality"),
                                IsCompletedRemark = row.Field<string>("IsCompletedRemark"),
                                IsCompleted = row.Field<bool>("IsCompleted"),
                                LoginName = row.Field<string>("LoginName"),
                            }).ToList();
            }
            return client;
        }
        public int CreateClient(ClientMasterModel model)
        {
            try
            {


                int iResult = 0;

                using (DBHelper dbHelper = new DBHelper())
                {
                    DBParameterCollection paramCollection = new DBParameterCollection();
                    paramCollection.Add(new DBParameter("ClientId", model.ClientId, DbType.Int32, ParameterDirection.Output));
                    paramCollection.Add(new DBParameter("ClientName", model.ClientName, DbType.String));
                    paramCollection.Add(new DBParameter("Address", model.Address, DbType.String));
                    paramCollection.Add(new DBParameter("Landmark", model.Landmark, DbType.String));
                    paramCollection.Add(new DBParameter("ContactPersonOne", model.ContactPersonOne, DbType.String));
                    paramCollection.Add(new DBParameter("ContactDesignationOne", model.ContactDesignationOne, DbType.String));
                    paramCollection.Add(new DBParameter("PhoneOne", model.PhoneOne, DbType.String));
                    paramCollection.Add(new DBParameter("EmailOne", model.EmailOne, DbType.String));
                    paramCollection.Add(new DBParameter("ContactPersonTwo", model.ContactPersonTwo, DbType.String));
                    paramCollection.Add(new DBParameter("ContactDesignationTwo", model.ContactDesignationTwo, DbType.String));
                    paramCollection.Add(new DBParameter("PhoneTwo", model.PhoneTwo, DbType.String));
                    paramCollection.Add(new DBParameter("EmailTwo", model.EmailTwo, DbType.String));
                    paramCollection.Add(new DBParameter("NoOfStudents", model.NoOfStudents, DbType.Int32));
                    paramCollection.Add(new DBParameter("Unit", model.Unit, DbType.Int32));
                    paramCollection.Add(new DBParameter("SectorId", model.SectorId, DbType.Int32));
                    paramCollection.Add(new DBParameter("Speciality", model.Speciality, DbType.String));
                //  paramCollection.Add(new DBParameter("UpdatedMacName", model.UpdatedMacName, DbType.String));
                //  paramCollection.Add(new DBParameter("UpdatedMacID", model.UpdatedMacID, DbType.String));
                 // paramCollection.Add(new DBParameter("UpdatedIPAddress", model.UpdatedIPAddress, DbType.String));
                //  paramCollection.Add(new DBParameter("UpdatedBy", model.UpdatedBy, DbType.Int32));
                //  paramCollection.Add(new DBParameter("UpdatedON", model.UpdatedOn, DbType.DateTime));
                    paramCollection.Add(new DBParameter("InsertedBy", model.InsertedBy, DbType.Int32));
                    paramCollection.Add(new DBParameter("InsertedMacName", model.InsertedMacName, DbType.String));
                    paramCollection.Add(new DBParameter("InsertedIPAddress", model.InsertedIPAddress, DbType.String));
                    paramCollection.Add(new DBParameter("InsertedON", model.InsertedON, DbType.DateTime));
                    paramCollection.Add(new DBParameter("InsertedMacID", model.InsertedMacID, DbType.String));
                    paramCollection.Add(new DBParameter("Deactive", model.Deactive, DbType.Boolean));
                  



                    iResult = dbHelper.ExecuteNonQueryForOutParameter<int>(MasterQueries.SaveClient, paramCollection, CommandType.StoredProcedure, "ClientId");

                    
                   
                    return iResult;
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public bool UpdateClient(ClientMasterModel model)
        {
            int iResult = 0;
            try
            {
                using (DBHelper dbHelper = new DBHelper())
                {
                    DBParameterCollection paramCollection = new DBParameterCollection();

                    paramCollection.Add(new DBParameter("ClientId", model.ClientId, DbType.Int32));
                    paramCollection.Add(new DBParameter("ClientName", model.ClientName, DbType.String));
                    paramCollection.Add(new DBParameter("Address", model.Address, DbType.String));
                    paramCollection.Add(new DBParameter("Landmark", model.Landmark, DbType.String));
                    paramCollection.Add(new DBParameter("ContactPersonOne", model.ContactPersonOne, DbType.String));
                    paramCollection.Add(new DBParameter("ContactDesignationOne", model.ContactDesignationOne, DbType.String));
                    paramCollection.Add(new DBParameter("PhoneOne", model.PhoneOne, DbType.String));
                    paramCollection.Add(new DBParameter("EmailOne", model.EmailOne, DbType.String));
                    paramCollection.Add(new DBParameter("ContactPersonTwo", model.ContactPersonTwo, DbType.String));
                    paramCollection.Add(new DBParameter("ContactDesignationTwo", model.ContactDesignationTwo, DbType.String));
                    paramCollection.Add(new DBParameter("PhoneTwo", model.PhoneTwo, DbType.String));
                    paramCollection.Add(new DBParameter("EmailTwo", model.EmailTwo, DbType.String));
                    paramCollection.Add(new DBParameter("NoOfStudents", model.NoOfStudents, DbType.Int32));
                    paramCollection.Add(new DBParameter("Unit", model.Unit, DbType.Int32));
                    paramCollection.Add(new DBParameter("SectorId", model.SectorId, DbType.Int32));
                    paramCollection.Add(new DBParameter("Speciality", model.Speciality, DbType.String));
                    paramCollection.Add(new DBParameter("UpdatedMacName", model.UpdatedMacName, DbType.String));
                    paramCollection.Add(new DBParameter("UpdatedMacID", model.UpdatedMacID, DbType.String));
                    paramCollection.Add(new DBParameter("UpdatedIPAddress", model.UpdatedIPAddress, DbType.String));
                    paramCollection.Add(new DBParameter("UpdatedBy", model.UpdatedBy, DbType.Int32));
                    paramCollection.Add(new DBParameter("UpdatedOn", model.UpdatedOn, DbType.DateTime));
                    paramCollection.Add(new DBParameter("Deactive", model.Deactive, DbType.Boolean));
                    paramCollection.Add(new DBParameter("IsCompletedRemark", model.IsCompletedRemark, DbType.String));
                    paramCollection.Add(new DBParameter("IsCompleted", model.IsCompleted, DbType.Boolean));
                    iResult = dbHelper.ExecuteNonQuery(MasterQueries.UpdateClient, paramCollection, CommandType.StoredProcedure);
                    
                }
                if(iResult>0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
                  
                
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }




    }
}