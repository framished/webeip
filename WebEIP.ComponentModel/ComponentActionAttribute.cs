using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WebEIP.ComponentModel
{
    [AttributeUsage(AttributeTargets.Method)]
    public class ComponentActionAttribute:Attribute
    {
        public ComponentActionAttribute(string name)
        {
            this.Name = name;
        }

        public string Name
        {
            get;
            set;
        }
    }
}
