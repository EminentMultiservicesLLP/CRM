using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRM.Areas.Target.Controllers
{
    public class TargetController : Controller
    {
        //
        // GET: /Target/Target/

        public ActionResult Index()
        {
            return View();
        }
        public PartialViewResult NatureMaster()
        {

            return PartialView();
        }

        public PartialViewResult GroupMaster()
        {
            return PartialView();
        }
        public PartialViewResult TaskMaster()
        {
            return PartialView();
        }
        public PartialViewResult Action()
        {
            return PartialView();
        }
        public PartialViewResult Execution()
        {
            return PartialView();
        }
        public PartialViewResult UpdateTaskReminder()
        {
            return PartialView();
        }
    }
}
