using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Matek.Entity;

namespace Matek.Data.Abstract
{
    public interface IStudentRepository
    {
        IQueryable<Student> Students { get; }
        void CreateStudent(Student student);
        void SaveChanges();
    }
}