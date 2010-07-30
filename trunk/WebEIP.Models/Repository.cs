using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.Objects;

namespace WebEIP.Models
{
    public class Repository<T> : IRepository<T> where T : class
    {
        public ObjectContext Context
        {
            get;
            set;
        }
        public Repository(ObjectContext context)
        {
            this.Context = context;
        }
        public IEnumerable<T> Find(Func<T, bool> exp)
        {
            return Context.CreateObjectSet<T>().Where(exp);
        }
        public IEnumerable<T> Find(Func<T, bool> exp, int page, int count)
        {
            return Context.CreateObjectSet<T>().Where(exp).Skip((page-1)*count).Take(count);
        }
        public void Add(T entity)
        {
            Context.CreateObjectSet<T>().AddObject(entity);
        }
        public void Delete(T entity)
        {
            Context.CreateObjectSet<T>().DeleteObject(entity);
        }
        public void Save()
        {
            Context.SaveChanges();
        }
    }
}
