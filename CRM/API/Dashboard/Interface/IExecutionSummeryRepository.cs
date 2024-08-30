using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CRM.Areas.Dashboard.Models;

namespace CRM.API.Dashboard.Interface
{
    public interface IExecutionSummeryRepository
    {
        IEnumerable<ExecutionSummeryModel> GetExecutionDetails(ExecutionSummeryModel model);
    }
}
