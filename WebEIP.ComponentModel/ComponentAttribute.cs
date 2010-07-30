using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WebEIP.ComponentModel
{
    [AttributeUsage(AttributeTargets.Class)]
    public class ComponentAttribute:Attribute
    {
        public string Id
        {
            get;
            set;
        }

        public string Name
        {
            get;
            set;
        }
    }
}
