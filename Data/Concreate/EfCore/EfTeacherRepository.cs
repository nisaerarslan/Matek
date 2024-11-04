using Matek.Data.Abstract;
using Matek.Data.Concreate.EfCore;
using Matek.Entity;

namespace Matek.Data.Concrete
{
    public class EfTeacherRepository : ITeacherRepository
    {
        private MatekContext _context;
        public EfTeacherRepository(MatekContext context)
        {
            _context = context;
        }
        public IQueryable<Teacher> Teachers => _context.Teachers;

        public void CreateTeacher(Teacher teacher)
        {
            _context.Teachers.Add(teacher);
            _context.SaveChanges();
        }
        public void EditTeacher(Teacher teacher)
        {
            var entity = _context.Teachers.FirstOrDefault(i =>i.TeacherId == teacher.TeacherId);

            if(entity != null)
            {
                entity.TeacherName = teacher.TeacherName;
                entity.Name = teacher.Name;
                entity.Email = teacher.Email;
                entity.Password = teacher.Password;
                entity.Image = teacher.Image;

                _context.SaveChanges();

            }
        }

        public void EditTeacher(object entityToUpdata)
        {
            throw new NotImplementedException();
        }
    }
}