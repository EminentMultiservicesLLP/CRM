using CRM.Areas.Masters.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.API.Masters.Interface
{
    public interface ICommonMaster
    {
        List<CommonMasterModel> GetAllSector();
        List<CommonMasterModel> GetAllClient(int UserId,int RoleId,int UserSelect);
        List<CommonMasterModel> GetAllAnswer();
        List<CommonMasterModel> GetAllType();
        List<ReportModel> GetAllUser(int UserID,int RoleId);
    }
}
