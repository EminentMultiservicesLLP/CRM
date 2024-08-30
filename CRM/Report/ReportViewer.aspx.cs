using CommonLayer;
using CRM.Areas.Masters.Models;
using Microsoft.Reporting.WebForms;
using System;
using CRM.API.Masters.Repository;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CRM.Report
{
    public partial class ReportViewer : System.Web.UI.Page
    {
        ReportParameter[] _rparams;
        private ReportDataSource _rds;

        static CommonLayer.ILogger _logger = Logger.Register(typeof(ReportViewer));
        protected void Page_Load(object sender, EventArgs e)
        {
            if(!IsPostBack)
            {
                int ClientId = 0;
                int UserId = 0;
                int ReportID = 0;
                string StrStartDate = null;
                string StrEndDate = null;
                if (Request.QueryString["reportid"] !=null)
                {
                    ReportID = Convert.ToInt32(Request.QueryString["reportid"]);
                }
                if (ReportID == 1)
                {
                    if (Request.QueryString["ClientId"] != null)
                    {
                        if (Request.QueryString["ClientId"].ToString() != "")
                            ClientId = Convert.ToInt32(Request.QueryString["ClientId"].ToString());
                        else
                            ClientId = 0;
                    }
                    if (Request.QueryString["Start"] != null)
                    {
                        if (Request.QueryString["Start"].ToString() != "")
                            StrStartDate = Convert.ToString(Request.QueryString["Start"].ToString());
                        else
                            StrStartDate = null;
                    }
                    if (Request.QueryString["End"] != null)
                    {
                        if (Request.QueryString["End"].ToString() != "")
                            StrEndDate = Convert.ToString(Request.QueryString["End"].ToString());
                        else
                            StrEndDate = null;
                    }
                    if (Request.QueryString["UserId"] != null)
                    {
                        if (Request.QueryString["UserId"].ToString() != "")
                            UserId = Convert.ToInt32(Request.QueryString["UserId"].ToString());
                        else
                            UserId = 0;
                    }
                    GetClientWise(ClientId, StrStartDate, StrEndDate,UserId);
                }

            }


        }
        List<ReportModel> ClientWiseResultData = new List<ReportModel>();
        private void GetClientWise(int ClientId,string StrStartDate,string StrEndDate,int UserId)
        {
            //reportmodel model = new reportmodel();
            //model.strstartdate = strstartdate;
            ClientWiseResultData = GetClientWiseResultData(ClientId,StrStartDate,StrEndDate, UserId);
            ReportViewer1.LocalReport.DataSources.Clear();
            string reportPath = Server.MapPath("../Report/RptTodayTask.rdlc");
            //ReportViewer1.LocalReport.EnableExternalImages = true;
            ReportViewer1.LocalReport.ReportPath = reportPath;
            _rds = new ReportDataSource("Report", ClientWiseResultData);
            ReportViewer1.LocalReport.DataSources.Add(_rds);
            ReportViewer1.LocalReport.Refresh();
        }

        List<ReportModel> GetClientWiseResultData(int ClientId, string StrStartDate, string StrEndDate,int UserId)
        {    
            _logger.LogInfo("GetClientWiseResultData Started for " + Convert.ToInt32(Session["AppUserId"]) + " at :" + DateTime.Now.ToLongTimeString());
            List<ReportModel> list = new List<ReportModel>();
            try
            {
               
                var _data = new FeedbackMasterRepository();
            
               
                    list = _data.GetAllClientReport(ClientId, StrStartDate, StrEndDate,UserId);
                
                
            }
            catch (Exception ex)
            {
                _logger.LogError("Error in GetAgentWiseResultById :" + ex);
            }
            return list;
        }
    }
}