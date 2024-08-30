using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CRM.Areas.Admin.Models
{
    public class UserConfigurationMaster
    {
        public int UserConfigId { get; set; }
        public int UserId { get; set; }
        public string LoginName { get; set; }
        public int ClientTypeId { get; set; }
        public string ClientType { get; set; }
        public int FinancialYearId { get; set; }
        public string FinancialYear { get; set; }
        public double Jan { get; set; }
        public double Feb { get; set; }
        public double Mar { get; set; }
        public double Apr { get; set; }
        public double May { get; set; }
        public double Jun { get; set; }
        public double Jul { get; set; }
        public double Aug { get; set; }
        public double Sept { get; set; }
        public double Oct { get; set; }
        public double Nov { get; set; }
        public double Dec { get; set; }
        public bool JanFreeze { get; set; }
        public bool FebFreeze { get; set; }
        public bool MarFreeze { get; set; }
        public bool AprFreeze { get; set; }
        public bool MayFreeze { get; set; }
        public bool JunFreeze { get; set; }
        public bool JulFreeze { get; set; }
        public bool AugFreeze { get; set; }
        public bool SeptFreeze { get; set; }
        public bool OctFreeze { get; set; }
        public bool NovFreeze { get; set; }
        public bool DecFreeze { get; set; }
    }
    public class ClientTypeModel
    {
        public int ClientTypeId { get; set; }
        public string ClientType { get; set; }
    }
    public class FinancialYearModel
    {
        public int FinancialYearId { get; set; }
        public string FinancialYear { get; set; }
    }
}