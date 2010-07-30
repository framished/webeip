using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebEIP.Controllers
{
    [HandleError]
    public class HomeController : Controller
    {
        public ActionResult Default()
        {
            ViewData["Message"] = "欢迎使用 ASP.NET MVC!";

            return View();
        }

        public ActionResult About()
        {
            return View();
        }
    }
}
