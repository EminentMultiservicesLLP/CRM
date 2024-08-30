﻿using CRM.Areas.Target.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.API.Target.Interface
{
    public interface IExectionInterface
    {
        IEnumerable<ExecutionModel> GetAllExecutionData(ExecutionModel model);
        IEnumerable<ExecutionModel> GetExecutionHistory(int ActionId);
        bool SaveExecution(ExecutionDetailsList model, string UpdatedDate);
    }
}
