using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Matek.Entity
{
    public class Teacher
    {
        public int TeacherId { get; set; }
        public string? TeacherName { get; set;}
        public string? Name { get; set;}
        public string? Password { get; set;}
        public string? Email { get; set;}
        public string? Gender { get; set;}
        public string? Image { get; set;}


        public List<Student> Students { get; set; } = new List<Student>();
        public List<Class> Classes { get; set; } = new List<Class>();
        

    }
}