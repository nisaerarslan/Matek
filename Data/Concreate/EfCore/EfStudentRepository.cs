using Matek.Data.Abstract;
using Matek.Data.Concreate.EfCore;
using Matek.Entity;

namespace Matek.Data.Concrete
{
    public class EfStudentRepository : IStudentRepository
    {
        private MatekContext _context;
        public EfStudentRepository(MatekContext context)
        {
            _context = context;
        }
        public IQueryable<Student> Students => _context.Students;

        public void CreateStudent(Student student)
        {
            _context.Students.Add(student);
            _context.SaveChanges();
        }

        public void SaveChanges()
        {
            throw new NotImplementedException();
        }
    }
}