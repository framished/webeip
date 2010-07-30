using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reflection;
namespace WebEIP.ComponentModel
{
    public class ComponentInfo
    {
        List<ActionInfo> _actions = new List<ActionInfo>();
        public ComponentInfo(string name, Type type)
        {
            this.Name = name;
            this.Type = type;
            foreach (MethodInfo method in Type.GetMethods())
            {
                foreach (CustomAttributeData cad in method.GetCustomAttributesData())
                {
                    foreach (CustomAttributeTypedArgument cana in cad.ConstructorArguments)
                    {
                        if (cana.ArgumentType.Name == "name")
                        {
                            ActionInfo info = new ActionInfo(cana.Value.ToString(), method);
                            _actions.Add(info);

                        }
                    }
                }

               
            }
        }
        public string Name
        {
            get;
            private set;
        }

        public Type Type
        {
            get;
            private set;
        }

        public ActionInfo[] Actions
        {
            get {
                return _actions.ToArray();
            }
        }


        public override string ToString()
        {
            return this.Name + " " + this.Type.FullName;
        }
    }
}
