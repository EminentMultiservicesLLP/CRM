using CRM.Filters;
using System.Web.Mvc;

namespace CRM
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
            filters.Add(new AuthorizeAttribute());
            filters.Add(new NoDirectAccessAttribute());
        }
    }
}