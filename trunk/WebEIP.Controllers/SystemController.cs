using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using WebEIP.ComponentModel;
using WebEIP.Models;
namespace WebEIP.Controllers
{
    public class SystemController:ComponentController
    {
                        
        public JsonResult GetComponents()
        {
            using (WebEIP.Models.WebModelsContainer ct = new WebModelsContainer())
            {                
                var list = (from t in ct.T_Component
                            select new
                            {
                                ID = t.ID,
                                Name = t.Name
                            }).ToArray();
                return Json(list);
            }
        }
    }
}
