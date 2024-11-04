using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Matek.Entity;

namespace Matek.Model
{
    public class StudentViewModel
    {
        public List<Student> Students { get; set; } = new();
        public List<Class> Classes { get; set; } = new();

        [Required]
        [Display(Name = "Öğrenci Ad Soyad")]
        public string? StudentName { get; set;}
        public string? ClassNumber { get;}
    }
}