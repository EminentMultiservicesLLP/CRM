using CRM.Areas.Admin.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.API.Admin.Interface
{
    interface ICompliancesRepository
    {
        bool SaveCompliance(EminentCompliancesModel model);
        IEnumerable<EminentCompliancesModel> GetCompliances();
    }
}
