﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using WebEIP;
using WebEIP.Controllers;

namespace WebEIP.Tests.Controllers
{
    [TestClass]
    public class HomeControllerTest
    {
        [TestMethod]
        public void Default()
        {
            // 排列
            HomeController controller = new HomeController();

            // 操作
            ViewResult result = controller.Default() as ViewResult;

            // 断言
            ViewDataDictionary viewData = result.ViewData;
            Assert.AreEqual("欢迎使用 ASP.NET MVC!", viewData["Message"]);
        }

        [TestMethod]
        public void About()
        {
            // 排列
            HomeController controller = new HomeController();

            // 操作
            ViewResult result = controller.About() as ViewResult;

            // 断言
            Assert.IsNotNull(result);
        }
    }
}
