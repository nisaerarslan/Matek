using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Matek.Data.Abstract;
using Matek.Data.Concreate.EfCore;
using Matek.Entity;
using Matek.Model;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Matek.Controllers
{
    public class UserController : Controller
    {
        private readonly ITeacherRepository _teacherRepository;
        public UserController(ITeacherRepository teacherRepository)
        {
            _teacherRepository = teacherRepository;
        }

        public IActionResult Login()
        {
            if(User.Identity!.IsAuthenticated)
            {
                return RedirectToAction("Index", "Menu");
            }
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login(string email, string password)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
            {
                ModelState.AddModelError("", "Email ve parola alanları gereklidir.");
            }
            else
            {
                var isUser = _teacherRepository.Teachers.FirstOrDefault(t => t.Email == email && t.Password == password);

                if(isUser != null)
                {
                    var userClaims = new List<Claim>();

                    userClaims.Add(new Claim(ClaimTypes.NameIdentifier, isUser.TeacherId.ToString()));
                    userClaims.Add(new Claim(ClaimTypes.Name, isUser.TeacherName ?? ""));
                    userClaims.Add(new Claim(ClaimTypes.GivenName, isUser.Name ?? ""));
                    userClaims.Add(new Claim(ClaimTypes.UserData, isUser.Image ?? "")); 
                    // userClaims.Add(new Claim(ClaimTypes.PrimarySid, isUser.TeacherId.ToString() ?? ""));

                    if(isUser.Email == "info@nisa.com")
                    {
                        userClaims.Add(new Claim(ClaimTypes.Role, "admin"));
                    }

                    var claimsIdentity = new ClaimsIdentity(userClaims, CookieAuthenticationDefaults.AuthenticationScheme);

                    var authProperties = new AuthenticationProperties 
                    {
                        IsPersistent = true
                    };

                    await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
                    
                    await HttpContext.SignInAsync(
                        CookieAuthenticationDefaults.AuthenticationScheme,
                        new ClaimsPrincipal(claimsIdentity),
                        authProperties);

                    return RedirectToAction("Index", "Menu");  
                }
                else
                {
                    ModelState.AddModelError("", "Kullanıcı emaili veya şifre yanlış.");
                }
            }

            return View();
        }

        [Route("user/logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Index", "Home");  
        }

        [Route("user/register")]
        public IActionResult Register()
        {
            if(User.Identity!.IsAuthenticated)
            {
                return RedirectToAction("Index", "Menu");
            }
            return View();
        }

        [Route("user/register")]
        [HttpPost]
        public async Task<IActionResult> Register(string teacherName, string name, string email, string password)
        {
            if (string.IsNullOrEmpty(teacherName) || string.IsNullOrEmpty(name) || string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
            {
                ModelState.AddModelError("", "Tüm alanlar gereklidir.");
            }
            else
            {
                var user = await _teacherRepository.Teachers.FirstOrDefaultAsync(x => x.TeacherName == teacherName || x.Email == email);
                if(user == null)
                {
                    _teacherRepository.CreateTeacher(new Teacher {
                        TeacherName = teacherName,
                        Name = name,
                        Email = email,
                        Password = password,
                    });
                    return RedirectToAction("Login", "User");
                }
                else
                {
                    ModelState.AddModelError("", "Kullanıcı adı ya da email kullanılıyor.");
                }
            }
            return View();
        }
        
        [Authorize]
        public IActionResult Profile(int teacherid)
        {
            if (teacherid == 0)
            {
                return NotFound();
            }
            
            var teacher = _teacherRepository.Teachers.FirstOrDefault(x => x.TeacherId == teacherid);
            if (teacher == null)
            {
                return NotFound();
            }
            
            ViewBag.TeacherId = teacher.TeacherId;
            ViewBag.TeacherName = teacher.TeacherName;
            ViewBag.Name = teacher.Name;
            ViewBag.Email = teacher.Email;
            ViewBag.Password = teacher.Password;
            ViewBag.Image= teacher.Image;
            
            return View();
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Profile(int teacherid, string teacherName, string name, string email, string password,  IFormFile imageFile)
        {
            if (teacherid == 0)
            {
                return NotFound();
            }

            var entityToUpdate = _teacherRepository.Teachers.FirstOrDefault(x => x.TeacherId == teacherid);
            if (entityToUpdate == null)
            {
                return NotFound();
            }

            if (string.IsNullOrEmpty(teacherName) || string.IsNullOrEmpty(name) || string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
            {
                ModelState.AddModelError("", "All fields are required.");
                ViewBag.TeacherId = entityToUpdate.TeacherId;
                ViewBag.TeacherName = entityToUpdate.TeacherName;
                ViewBag.Name = entityToUpdate.Name;
                ViewBag.Email = entityToUpdate.Email;
                ViewBag.Password = entityToUpdate.Password;
                ViewBag.Image = entityToUpdate.Image;
                return View("Profile");
            }

            entityToUpdate.TeacherName = teacherName;
            entityToUpdate.Name = name;
            entityToUpdate.Email = email;
            entityToUpdate.Password = password;

            if (imageFile != null && imageFile.Length > 0)
            {
                var fileName = Path.GetFileName(imageFile.FileName);
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/img", fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(stream);
                }

                entityToUpdate.Image = fileName;
            }

            _teacherRepository.EditTeacher(entityToUpdate);

            return RedirectToAction("Index", "Menu");
        }
    }
}