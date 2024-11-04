using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Matek.Entity;
using Microsoft.EntityFrameworkCore;

namespace Matek.Data.Concreate.EfCore
{
    public class MatekContext:DbContext
    {
        public MatekContext(DbContextOptions<MatekContext> options): base(options)
        {

        }
        public DbSet<Teacher> Teachers => Set<Teacher>();
        public DbSet<Student> Students => Set<Student>();
        public DbSet<Class> Classes => Set<Class>();
    }
}