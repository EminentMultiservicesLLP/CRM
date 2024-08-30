using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRM.Areas.Masters.Controllers
{
    public class MastersController : Controller
    {
        //
        // GET: /Masters/Masters/

        public ActionResult Index()
        {
            return View();
        }

        public PartialViewResult ClientMaster()
        {
            return PartialView();
        }
        public PartialViewResult CustomerFeedback()
        {
            return PartialView();
        }
        public PartialViewResult AgentReport()
        {
            return PartialView();
        }
        public PartialViewResult DailyActivity()
        {
            return PartialView();
        }
        public PartialViewResult FollowUp()
        {
            return PartialView();
        }
    }
}
