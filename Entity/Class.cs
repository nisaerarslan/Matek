using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Matek.Entity
{
    public class Class
    {
        public int ClassId { get; set; }
        public string? ClassNumber { get; set; }

        public int TeacherId { get; set; }
        public Teacher Teacher { get; set; } = null!;
        public List<Student> Students { get; set; } = new List<Student>();
    }
}