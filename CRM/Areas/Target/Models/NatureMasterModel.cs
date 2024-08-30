using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CRM.Areas.Target.Models
{
    public class NatureMasterModel
    {
        public int NatureId { get; set; }
        [Display(Name = "Sequence")]
        public int NatureSequence { get; set; }      
        public string Name { get; set; }
        public string Description { get; set; }
        public bool Deactive { get; set; }
    }
}