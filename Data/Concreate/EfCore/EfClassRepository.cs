using Matek.Data.Abstract;
using Matek.Data.Concreate.EfCore;
using Matek.Entity;

namespace Matek.Data.Concrete
{
    public class EfClassRepository : IClassRepository
    {
        private MatekContext _context;
        public EfClassRepository(MatekContext context)
        {
            _context = context;
        }
        public IQueryable<Class> Classes => _context.Classes;


        public void DeleteCLass(Class classes)
        {
            throw new NotImplementedException();
        }

        public void SaveChanges()
        {
            throw new NotImplementedException();
        }
    }
}