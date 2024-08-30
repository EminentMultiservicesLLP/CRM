using CRM.Areas.Masters.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.API.Masters.Interface
{
    public interface IClientMasterInterface
    {
        IEnumerable<ClientMasterModel> GetAllClient(int UserId,int RoleId);
        int CreateClient(ClientMasterModel model);
        bool UpdateClient(ClientMasterModel model);

    }
}
