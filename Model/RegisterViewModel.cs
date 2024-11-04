using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Matek.Model
{
    public class RegisterViewModel
    {
        public int TeacherId { get; set;}

        [Required]
        [Display(Name = "Kullanıcı adı")]
        public string? TeacherName { get; set;}

        [Required]
        [Display(Name = "Ad Soyad")]
        public string? Name { get; set;}

        [Required]
        [EmailAddress]
        [Display(Name = "Eposta")]
        public string? Email { get; set;}

        [Required]
        [StringLength(10, ErrorMessage ="{0} alanı en az {5} karakter uzunluğunda olmalıdır.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Parola")]
        public string? Password { get; set;}

    }
}