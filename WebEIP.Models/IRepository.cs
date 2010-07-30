using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WebEIP.Models
{
    public interface IRepository<T> where T : class
    {
        IEnumerable<T> Find(Func<T, bool> exp);
        IEnumerable<T> Find(Func<T, bool> exp,int page, int count);
        void Add(T entity);
        void Delete(T entity);
        void Save();
    }
}
