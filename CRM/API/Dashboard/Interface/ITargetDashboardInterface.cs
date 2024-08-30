using CRM.Areas.Dashboard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.API.Dashboard.Interface
{
    public interface ITargetDashboardInterface
    {
        IEnumerable<TargetDashboardModel> GetallTaskTillDate(TargetDashboardModel model);
        IEnumerable<TargetDashboardModel> GetallActionsInTask(int TaskId);
        IEnumerable<TargetDashboardModel> GetActionHistory(int ActionId);
    }
}
