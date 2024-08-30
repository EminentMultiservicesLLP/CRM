using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRM.Areas.Admin.Models
{
    public class EminentCompliancesModel
    {
        public int ComplianceId { get; set; }
        [AllowHtml]
        public string Compliance { get; set; }
    }
}