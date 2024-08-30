using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CRM.Areas.Target.Models
{
    public class GroupMasterModel
    {
        public int GroupId { get; set; }
        [Display(Name = "Sequence")]
        public int GroupSequence { get; set; }        
        public string Name { get; set; }
        public string Description { get; set; }
        [Display(Name = "Nature")]
        public int LinkWithNature { get; set; }
        public string LinkName { get; set; }
        public int NatureSequence { get; set; }
        public bool Deactive { get; set; }

    }
}