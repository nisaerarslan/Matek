using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Matek.Entity;

namespace Matek.Data.Abstract
{
    public interface ITeacherRepository
    {
        IQueryable<Teacher> Teachers { get; }
        void CreateTeacher(Teacher teacher);
        void EditTeacher(Teacher teacher);
        void EditTeacher(object entityToUpdata);
    }
}