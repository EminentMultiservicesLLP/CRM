using CRM.Areas.Target.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.API.Target.Interface
{
    public interface IGroupMasterInterface
    {
        IEnumerable<GroupMasterModel>GetAllGroup();
        int SaveGroup(GroupMasterModel model);
    }
}
