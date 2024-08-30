using System;
using System.Collections.Generic;
using CRM.Areas.Target.Models;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.API.Target.Interface
{
    public interface ITaskMasterInterface
    {
        IEnumerable<TaskMasterModel> GetAllReminderType();
        IEnumerable<TaskMasterModel> GetAllTask();
        IEnumerable<GroupByNature> GetGroupByNature(int NatureId);
        int SaveTask(TaskMasterModel model);
    }
}
