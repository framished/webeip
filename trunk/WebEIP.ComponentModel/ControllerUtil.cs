using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel;
using System.Reflection;

namespace WebEIP.ComponentModel
{
    public class ControllerUtil<T> where T: ComponentController
    {
        public static string GetControllerName()
        {
            object[] attrs = typeof(T).GetCustomAttributes(true);
            foreach (object o in attrs)
            {
                if (o is DisplayNameAttribute)
                {
                    return (o as DisplayNameAttribute).DisplayName;
                }
            }
            return string.Empty;
        }

        public static KeyValuePair<string, string>[] GetDisplayActions()
        {
            List<KeyValuePair<string, string>> actionList = new List<KeyValuePair<string, string>>();
            MethodInfo[] methods = typeof(T).GetMethods();
            foreach (MethodInfo method in methods)
            {
                foreach (object o in method.GetCustomAttributes(true))
                {
                    if (o is DisplayNameAttribute)
                    {
                        KeyValuePair<string, string> pair = new KeyValuePair<string, string>(method.Name, o.ToString());
                        actionList.Add(pair);
                        break;
                    }
                }
            }
            return actionList.ToArray();
        }
    }
}
