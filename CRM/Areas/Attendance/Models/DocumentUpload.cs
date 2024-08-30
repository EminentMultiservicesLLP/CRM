using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CRM.Areas.Attendance.Models
{
    public class DocumentUpload
    {
        public string UserName { get; set; }
        public int DocumentId { get; set; }
        public string Description { get; set; }
        public double Amount { get; set; }
        public string Path { get; set; }
    }
    public class DeletedDocumnetList
    {
        public List<Deletedocument> Deletedocument { get; set; }

    }
    public class Deletedocument
    {
        public int DocumentId { get; set; }

    }
}