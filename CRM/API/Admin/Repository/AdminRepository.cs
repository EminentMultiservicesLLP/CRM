using CommonDataLayer.DataAccess;
using CommonLayer;
using CommonLayer.Extensions;
using CRM.API.Admin.Interface;
using CRM.Areas.Admin.Models;
using CRM.QueryCollection.Admin;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace CRM.API.Admin.Repository
{
    public class AdminRepository : IAdminRepository
    {
        private static readonly CommonLayer.ILogger Logger = CommonLayer.Logger.Register(typeof(AdminRepository));

        #region User Profile
        public IEnumerable<UserProfile> GetUser()
        {
            List<UserProfile> users = null;
            using (DBHelper dbHelper = new DBHelper())
            {
                DBParameterCollection paramCollection = new DBParameterCollection();
                DataTable dtvendor = dbHelper.ExecuteDataTable(AdminQueries.GetUser, paramCollection, CommandType.StoredProcedure);
                users = dtvendor.AsEnumerable()
                            .Select(row => new UserProfile
                            {
                                UserID = row.Field<int>("UserID"),
                                LoginName = row.Field<string>("LoginName"),
                                Password = row.Field<string>("Password"),
                                RoleId = row.Field<int>("RoleId"),
                                RoleName = row.Field<string>("RoleName"),
                                Deactive = row.Field<bool>("Deactive")
                            }).ToList();
            }
            return users;
        }
        public IEnumerable<UserProfile> GetRole()
        {
            List<UserProfile> users = null;
            using (DBHelper dbHelper = new DBHelper())
            {
                DBParameterCollection paramCollection = new DBParameterCollection();
                DataTable dtvendor = dbHelper.ExecuteDataTable(AdminQueries.GetRole, paramCollection, CommandType.StoredProcedure);
                users = dtvendor.AsEnumerable()
                            .Select(row => new UserProfile
                            {
                                RoleId = row.Field<int>("RoleId"),
                                RoleName = row.Field<string>("RoleName"),
                            }).ToList();
            }
            return users;
        }
        public bool SaveUser(UserProfile model)
        {
            int iResult = 0;
            try
            {
                using (DBHelper dbHelper = new DBHelper())
                {
                    DBParameterCollection paramCollection = new DBParameterCollection();

                    paramCollection.Add(new DBParameter("UserID", model.UserID, DbType.Int32));
                    paramCollection.Add(new DBParameter("LoginName", model.LoginName, DbType.String));
                    paramCollection.Add(new DBParameter("Password", model.Password, DbType.String));
                    paramCollection.Add(new DBParameter("RoleId", model.RoleId, DbType.String));
                    paramCollection.Add(new DBParameter("Deactive", model.Deactive, DbType.Boolean));
                    iResult = dbHelper.ExecuteNonQuery(AdminQueries.SaveUser, paramCollection, CommandType.StoredProcedure);

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
        #endregion User Profile

        #region Role Master
        public IEnumerable<RoleAccess> GetParentMenu()
        {
            List<RoleAccess> _result = null;
            TryCatch.Run(() =>
            {
                using (DBHelper Dbhelper = new DBHelper())
                {
                    DataTable dtData = Dbhelper.ExecuteDataTable(AdminQueries.GetParentMenu, CommandType.StoredProcedure);
                    _result = dtData.AsEnumerable().Select(row => new RoleAccess
                    {
                        MenuId = row.Field<int>("MenuId"),
                        MenuName = row.Field<string>("MenuName"),

                    }).ToList();

                }
            }).IfNotNull((ex) =>
            {
                Logger.LogError("Error in UserProfile Get parent menu:" + ex.Message + Environment.NewLine + ex.StackTrace);
            });

            return _result;
        }
        public IEnumerable<MenuDetails> GetChildMenu(int PMenuId)
        {
            List<MenuDetails> _result = null;
            TryCatch.Run(() =>
            {
                using (DBHelper Dbhelper = new DBHelper())
                {
                    DBParameterCollection paramCollection = new DBParameterCollection();

                    paramCollection.Add(new DBParameter("PMenuId", PMenuId, DbType.Int32));
                    DataTable dtData = Dbhelper.ExecuteDataTable(AdminQueries.GetChildMenu, paramCollection, CommandType.StoredProcedure);
                    _result = dtData.AsEnumerable().Select(row => new MenuDetails
                    {
                        ParentMenuId = PMenuId,
                        ChildMenuId = row.Field<int>("MenuId"),
                        ChildMenuName = row.Field<string>("MenuName"),

                    }).ToList();

                }
            }).IfNotNull((ex) =>
            {
                Logger.LogError("Error in UserProfile GetChildMenu:" + ex.Message + Environment.NewLine + ex.StackTrace);
            });

            return _result;
        }
        public IEnumerable<RoleAccess> GetMenuRoleAccess(int RoleId)
        {
            List<RoleAccess> _result = null;
            TryCatch.Run(() =>
            {
                using (DBHelper Dbhelper = new DBHelper())
                {
                    DBParameterCollection paramCollection = new DBParameterCollection();

                    paramCollection.Add(new DBParameter("RoleID", RoleId, DbType.Int32));
                    DataTable dtData = Dbhelper.ExecuteDataTable(AdminQueries.GetMenuRoleAccess, paramCollection, CommandType.StoredProcedure);
                    var _output = dtData.AsEnumerable().Select(row => new RoleAccess
                    {
                        RoleId = row.Field<int>("RoleId"),
                        MenuId = row.Field<int>("ParentMenuId"),
                        MenuName = row.Field<string>("MenuName"),
                        MenuList = new List<MenuDetails> {
                            new MenuDetails
                            {
                                ChildMenuId = row.Field<int>("MenuId"),
                                ChildMenuName = row.Field<string>("MenuName")
                            }
                        }
                    }).ToList();

                    _result = new List<RoleAccess>();
                    var group = _output.GroupBy(g => new { g.RoleId, g.MenuId });
                    foreach (var menu in group)
                    {
                        var roleAccess = new RoleAccess
                        {
                            RoleId = menu.Key.RoleId,
                            MenuId = menu.Key.MenuId,
                        };

                        roleAccess.MenuList = new List<MenuDetails>();
                        foreach (var child in menu)
                        {
                            roleAccess.MenuList.Add(new MenuDetails
                            {
                                ChildMenuId = child.MenuList[0].ChildMenuId,
                                ChildMenuName = child.MenuList[0].ChildMenuName
                            });
                        }

                        _result.Add(roleAccess);
                    }
                }
            }).IfNotNull((ex) =>
            {
                Logger.LogError("Error in UserProfile GetSaveOutletAccess:" + ex.Message + Environment.NewLine + ex.StackTrace);
            });

            return _result;
        }
        public bool SaveMenuRole(RoleAccess model)
        {
            int iResult = 0;
            int iDelete = 0;

            using (DBHelper dbHelper = new DBHelper())
            {
                IDbTransaction transaction = dbHelper.BeginTransaction();
                TryCatch.Run(() =>
                {
                    DBParameterCollection paramCollectionDelete = new DBParameterCollection();
                    paramCollectionDelete.Add(new DBParameter("RoleID", model.RoleId, DbType.Int32));
                    iDelete = dbHelper.ExecuteNonQuery(AdminQueries.DeleteMenuRoleAccess, paramCollectionDelete, transaction, CommandType.StoredProcedure);

                    foreach (var detail in model.MenuList)
                    {
                        DBParameterCollection paramCollection = new DBParameterCollection();
                        paramCollection.Add(new DBParameter("RoleID", model.RoleId, DbType.String));
                        paramCollection.Add(new DBParameter("RoleName", model.RoleName, DbType.String));
                        paramCollection.Add(new DBParameter("MenuID", detail.ChildMenuId, DbType.Int32));
                        var roleId = dbHelper.ExecuteScalar(AdminQueries.SaveRoleMenuAccess, paramCollection, transaction, CommandType.StoredProcedure);
                        iResult = Int32.Parse(roleId.ToString());
                        model.RoleId = iResult;
                    }

                    dbHelper.CommitTransaction(transaction);
                }).IfNotNull(ex =>
                {
                    dbHelper.RollbackTransaction(transaction);
                });
            }

            if (iResult > 0) return true;
            else return false;
        }
        #endregion Role Master

        #region User Configuration
        public IEnumerable<ClientTypeModel> GetClientType()
        {
            List<ClientTypeModel> clientType = null;
            using (DBHelper dbHelper = new DBHelper())
            {
                DBParameterCollection paramCollection = new DBParameterCollection();
                DataTable dtvendor = dbHelper.ExecuteDataTable(AdminQueries.GetClientType, paramCollection, CommandType.StoredProcedure);
                clientType = dtvendor.AsEnumerable()
                            .Select(row => new ClientTypeModel
                            {
                                ClientTypeId = row.Field<int>("ClientTypeId"),
                                ClientType = row.Field<string>("ClientType")
                            }).ToList();
            }
            return clientType;
        }
        public IEnumerable<FinancialYearModel> GetFinancialYear()
        {
            List<FinancialYearModel> FY = null;
            using (DBHelper dbHelper = new DBHelper())
            {
                DBParameterCollection paramCollection = new DBParameterCollection();
                DataTable dtvendor = dbHelper.ExecuteDataTable(AdminQueries.GetFinancialYear, paramCollection, CommandType.StoredProcedure);
                FY = dtvendor.AsEnumerable()
                            .Select(row => new FinancialYearModel
                            {
                                FinancialYearId = row.Field<int>("FinancialYearId"),
                                FinancialYear = row.Field<string>("FinancialYear")
                            }).ToList();
            }
            return FY;
        }
        public bool SaveUserConfiguration(UserConfigurationMaster model)
        {
            int iResult = 0;
            try
            {
                using (DBHelper dbHelper = new DBHelper())
                {
                    DBParameterCollection paramCollection = new DBParameterCollection();

                    paramCollection.Add(new DBParameter("UserConfigId", model.UserConfigId, DbType.Int32));
                    paramCollection.Add(new DBParameter("UserId", model.UserId, DbType.Int32));
                    paramCollection.Add(new DBParameter("ClientTypeId", model.ClientTypeId, DbType.Int32));
                    paramCollection.Add(new DBParameter("FinancialYearId", model.FinancialYearId, DbType.Int32));
                    paramCollection.Add(new DBParameter("Apr", model.Apr, DbType.Double));
                    paramCollection.Add(new DBParameter("May", model.May, DbType.Double));
                    paramCollection.Add(new DBParameter("Jun", model.Jun, DbType.Double));
                    paramCollection.Add(new DBParameter("Jul", model.Jul, DbType.Double));
                    paramCollection.Add(new DBParameter("Aug", model.Aug, DbType.Double));
                    paramCollection.Add(new DBParameter("Sept", model.Sept, DbType.Double));
                    paramCollection.Add(new DBParameter("Oct", model.Oct, DbType.Double));
                    paramCollection.Add(new DBParameter("Nov", model.Nov, DbType.Double));
                    paramCollection.Add(new DBParameter("Dec", model.Dec, DbType.Double));
                    paramCollection.Add(new DBParameter("Jan", model.Jan, DbType.Double));
                    paramCollection.Add(new DBParameter("Feb", model.Feb, DbType.Double));
                    paramCollection.Add(new DBParameter("Mar", model.Mar, DbType.Double));
                    paramCollection.Add(new DBParameter("AprFreeze", model.AprFreeze, DbType.Boolean));
                    paramCollection.Add(new DBParameter("MayFreeze", model.MayFreeze, DbType.Boolean));
                    paramCollection.Add(new DBParameter("JunFreeze", model.JunFreeze, DbType.Boolean));
                    paramCollection.Add(new DBParameter("JulFreeze", model.JulFreeze, DbType.Boolean));
                    paramCollection.Add(new DBParameter("AugFreeze", model.AugFreeze, DbType.Boolean));
                    paramCollection.Add(new DBParameter("SeptFreeze", model.SeptFreeze, DbType.Boolean));
                    paramCollection.Add(new DBParameter("OctFreeze", model.OctFreeze, DbType.Boolean));
                    paramCollection.Add(new DBParameter("NovFreeze", model.NovFreeze, DbType.Boolean));
                    paramCollection.Add(new DBParameter("DecFreeze", model.DecFreeze, DbType.Boolean));
                    paramCollection.Add(new DBParameter("JanFreeze", model.JanFreeze, DbType.Boolean));
                    paramCollection.Add(new DBParameter("FebFreeze", model.FebFreeze, DbType.Boolean));
                    paramCollection.Add(new DBParameter("MarFreeze", model.MarFreeze, DbType.Boolean));
                    iResult = dbHelper.ExecuteNonQuery(AdminQueries.SaveUserConfiguration, paramCollection, CommandType.StoredProcedure);

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
        public IEnumerable<UserConfigurationMaster> GetUserConfiguration()
        {
            List<UserConfigurationMaster> Congif = null;
            using (DBHelper dbHelper = new DBHelper())
            {
                DBParameterCollection paramCollection = new DBParameterCollection();
                DataTable dtvendor = dbHelper.ExecuteDataTable(AdminQueries.GetUserConfiguration, paramCollection, CommandType.StoredProcedure);
                Congif = dtvendor.AsEnumerable()
                            .Select(row => new UserConfigurationMaster
                            {
                                UserConfigId = row.Field<int>("UserConfigId"),
                                UserId = row.Field<int>("UserId"),
                                LoginName = row.Field<string>("LoginName"),
                                ClientTypeId = row.Field<int>("ClientTypeId"),
                                ClientType = row.Field<string>("ClientType"),
                                FinancialYearId = row.Field<int>("FinancialYearId"),
                                FinancialYear = row.Field<string>("FinancialYear"),
                                Apr = row.Field<double>("Apr"),
                                May = row.Field<double>("May"),
                                Jun = row.Field<double>("Jun"),
                                Jul = row.Field<double>("Jul"),
                                Aug = row.Field<double>("Aug"),
                                Sept = row.Field<double>("Sept"),
                                Oct = row.Field<double>("Oct"),
                                Nov = row.Field<double>("Nov"),
                                Dec = row.Field<double>("Dec"),
                                Jan = row.Field<double>("Jan"),
                                Feb = row.Field<double>("Feb"),
                                Mar = row.Field<double>("Mar"),
                                AprFreeze = row.Field<Boolean>("AprFreeze"),
                                MayFreeze = row.Field<Boolean>("MayFreeze"),
                                JunFreeze = row.Field<Boolean>("JunFreeze"),
                                JulFreeze = row.Field<Boolean>("JulFreeze"),
                                AugFreeze = row.Field<Boolean>("AugFreeze"),
                                SeptFreeze = row.Field<Boolean>("SeptFreeze"),
                                OctFreeze = row.Field<Boolean>("OctFreeze"),
                                NovFreeze = row.Field<Boolean>("NovFreeze"),
                                DecFreeze = row.Field<Boolean>("DecFreeze"),
                                JanFreeze = row.Field<Boolean>("JanFreeze"),
                                FebFreeze = row.Field<Boolean>("FebFreeze"),
                                MarFreeze = row.Field<Boolean>("MarFreeze"),
                            }).ToList();
            }
            return Congif;
        }
        #endregion User Configuration
    }
}