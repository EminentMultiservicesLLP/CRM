using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CRM.Areas.Attendance.Models;

namespace CRM.API.Attendance.Interface
{
    public interface IDeveloperWorkRepository 
    {
        IEnumerable<DeveloperWorkModel> getDeveloperTask(int UserConfigId, int FinancialYearId);
        bool SaveDeveloperWork(DeveloperWorkModel model);
        IEnumerable<DeveloperWorkModel> getDeveloperObservation(int UserConfigId, int FinancialYearId, int Observation);
        bool SaveDeveloperObservation(DeveloperWorkModel model);

    }
}
