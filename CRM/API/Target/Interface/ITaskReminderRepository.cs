using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CRM.Areas.Target.Models;

namespace CRM.API.Target.Interface
{
    public interface ITaskReminderRepository 
    {
        IEnumerable<TaskReminderModel> GetTaskForReminderUpdate(int Type);

        bool UpdateTaskReminderDates(int TypeId);
    }
}
