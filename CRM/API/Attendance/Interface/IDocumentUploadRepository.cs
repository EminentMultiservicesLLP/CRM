using CRM.Areas.Attendance.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.API.Attendance.Interface
{
    interface IDocumentUploadRepository
    {
        bool SaveDocument(int UserId, int FinancialYearId, string Description, double Amount, string Path);
        IEnumerable<DocumentUpload> GetDocument(int UserId, int FinancialYearId);
        bool DeleteDocument(DeletedDocumnetList model);
    }
}
