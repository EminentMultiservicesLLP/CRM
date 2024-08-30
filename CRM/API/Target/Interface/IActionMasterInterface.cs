using CRM.Areas.Target.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.API.Target.Interface
{
    public interface IActionMasterInterface
    {
        IEnumerable<TaskByGroupModel> GetTaskByGroup(int GroupId);
        IEnumerable<StatusModel> GetAllStatus();
        IEnumerable<ActionMasterModel> GetAllAction();
        int SaveAction(ActionMasterModel model, string InsertedDate);
        IEnumerable<ActionMasterModel> GetTaskDescription(int TaskId);
    }
}
