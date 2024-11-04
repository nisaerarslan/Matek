using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Matek.Entity;

namespace Matek.Data.Abstract
{
    public interface IClassRepository
    {
        IQueryable<Class> Classes { get; }
        void DeleteCLass(Class classes);
        void SaveChanges();
    }
}