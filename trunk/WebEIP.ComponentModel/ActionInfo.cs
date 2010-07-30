using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reflection;
namespace WebEIP.ComponentModel
{
    public sealed class ActionInfo
    {
        public ActionInfo(string name, MethodInfo methodInfo)
        {
            this.Name = name;
            this.MethodInfo = methodInfo;
        }
        public string Name
        {
            get;
            private set;
        }

        public MethodInfo MethodInfo
        {
            get;
            private set;
        }
    }
}
