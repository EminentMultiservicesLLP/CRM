using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CRM.QueryCollection.Target
{
    public class TargetQueries
    {
        //************** Nature **************///
        public const string GetAllNature = "dbsp_Mst_Target_GetAllNature";
        public const string SaveNatureMaster = "dbsp_Mst_Target_SaveNatureMaster";

        //************** Group **************///
        public const string GetAllGroup = "dbsp_Mst_Target_GetAllGroup";
        public const string SaveGroupMaster = "dbsp_Mst_Target_SaveGroupMaster";

        //************** Task **************///
        public const string GetReminderType = "dbsp_Mst_Target_GetReminderType"; 
        public const string GetGroupByNature = "dbsp_Mst_Target_GetGroupByNature"; 
        public const string GetAllTask = "dbsp_Mst_Target_GetAllTask";
        public const string SaveTaskMaster = "dbsp_Mst_Target_SaveTaskMaster";

        //************** Action **************///
        public const string GetAllStatus = "dbsp_Mst_Target_GetStatusType";
        public const string GetTaskByGroup = "dbsp_Mst_Target_GetTaskByGroup";
        public const string GetAllAction = "dbsp_Mst_Target_GetAllAction";
        public const string SaveActionMaster = "dbsp_Mst_Target_SaveActionMaster";
        public const string GetTaskDescription = "dbsp_Mst_Target_GetTaskDescription";

        //************** Execution **************///
        public const string GetExecutionData = "dbsp_Mst_Target_GetExecutionData";
        public const string SaveExecutionDetails = "dbsp_Mst_Target_SaveExecutionDetails";
        public const string GetExecutionHistory = "dbsp_Mst_Target_GetExecutionHistory";

        //**************TaskReminderUpdate****************//
        public const string GetTaskForReminderUpdate = "dbsp_Target_GetTaskForReminderUpdate"; 
        public const string UpdateTaskReminderDates = "dbsp_Target_UpdateTaskReminderDates"; 



    }
}