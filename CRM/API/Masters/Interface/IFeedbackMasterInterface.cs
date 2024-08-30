using CRM.Areas.Masters.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.API.Masters.Interface
{
    public interface IFeedbackMasterInterface
    {
        int CreateFeedback(FeedbackMaster model);
      //  IEnumerable<ClientMasterModel> GetAllTodayTask(int UseId);
        List<FeedbackMaster> GetAllTodayTask(int UserId,int RoleId, DateTime Date);
        List<FeedbackMaster> GetAllFollowUp(int UserId, int RoleId, DateTime Date);

        List<ReportModel> GetAllClientReport(int UserId,string StrStartDate,string StrEndDate,int ClientId);
    }
}