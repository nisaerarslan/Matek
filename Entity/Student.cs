using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Matek.Entity
{
    public class Student
    {
        public int StudentId { get; set; }
        public string? StudentName { get; set; }
        public int? StudentNumber { get; set; }

        public int TeacherId { get; set; }
        public Teacher Teacher { get; set; } = null!;
        public int ClassId { get; set; }
        public Class Class { get; set; } = null!;

    }
}