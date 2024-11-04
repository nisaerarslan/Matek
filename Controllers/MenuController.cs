using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Matek.Data.Abstract;
using Matek.Data.Concreate.EfCore;
using Matek.Entity;
using Matek.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Matek.Controllers
{
    public class MenuController : Controller    
    {
        private IStudentRepository _studentRepository;
        private readonly ITeacherRepository _teacherRepository;
        private IClassRepository _classRepository;


        private readonly MatekContext _context; // MatekContext için bir alan ekleyin

        public MenuController(IStudentRepository studentRepository, ITeacherRepository teacherRepository, MatekContext context, IClassRepository classManager)
        {
            _studentRepository = studentRepository;
            _teacherRepository = teacherRepository;
            _classRepository = classManager;
            _context = context;
        }

        [Authorize]
        public IActionResult Index(int teacherid)
        {   
            var claims = User.Claims;
            var teacherIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (teacherIdClaim == null)
            {
                return RedirectToAction("Login", "User");
            }

            if (int.TryParse(teacherIdClaim.Value, out var teacherId))
            {
                var teacher = _teacherRepository.Teachers.FirstOrDefault(t => t.TeacherId == teacherId);
                if (teacher != null)
                {
                    ViewBag.ProfileImage = teacher.Image;
                }
                else
                {
                    return NotFound();
                }
            }
            else
            {
                return BadRequest();
            }
            return View();
        }

        public IActionResult BilimInsani()
        {
            return View();
        }

        public IActionResult Deneme()
        {
            return View();
        }

        public IActionResult HavaDurumu()
        {
            return View();
        }
        public IActionResult HesapMakinesi()
        {
            return View();
        }
        public IActionResult Liste()
        {
            return View();
        }

        public IActionResult OgrenciListesi()
        {
            var teacherId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (int.TryParse(teacherId, out int parsedTeacherId))
            {
                var classes = _context.Classes
                    .Where(c => c.TeacherId == parsedTeacherId)
                    .ToList();
                
                ViewBag.Classes = classes;
            }
            return View();
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> OgrenciListesi(string classNumber)
        {
            var teacherId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (int.TryParse(teacherId, out int parsedTeacherId))
            {
                var newClass = new Class
                {
                    ClassNumber = classNumber,
                    TeacherId = parsedTeacherId
                };

                _context.Classes.Add(newClass);
                await _context.SaveChangesAsync();

                var classes = _context.Classes
                    .Where(c => c.TeacherId == parsedTeacherId)
                    .ToList();
                
                ViewBag.Classes = classes;
            }
        
        return View();
        }
        
        [Route("menu/delete")]
        public async Task<IActionResult> Delete(int? id)
        {
            if(id == null)
            {
                return NotFound();
            }

            var classname = await _context.Classes.FindAsync(id);

            if(classname == null)
            {
                return NotFound();
            }

            return View(classname);
        }

        [Route("menu/delete")]
        [HttpPost]
        public async Task<IActionResult> Delete([FromForm]int id)
        {
            var classname = await _context.Classes.FindAsync(id);
            if(classname == null)
            {
                return NotFound();
            }

            _context.Classes.Remove(classname);
            await _context.SaveChangesAsync();
            return RedirectToAction("OgrenciListesi");
        }
        
        [Authorize]
        public IActionResult StudentList(int classId)
        {
            if (classId == 0)
            {
                return NotFound();
            }

            var teacherId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (int.TryParse(teacherId, out int parsedTeacherId))
            {
                var students = _context.Students
                    .Where(s => s.ClassId == classId)
                    .ToList();
                
                ViewBag.Students = students;
            }


            return View();
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> StudentList(string studentName, int studentNumber, int classId)
        {
            var teacherId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (int.TryParse(teacherId, out int parsedTeacherId))
            {
                var newStudent = new Student
                {
                    StudentName = studentName,
                    StudentNumber = studentNumber,
                    ClassId = classId,
                    TeacherId = parsedTeacherId
                };

                _context.Students.Add(newStudent);
                await _context.SaveChangesAsync();

                var students = _context.Students
                    .Where(s => s.ClassId == classId)
                    .ToList();
                
                ViewBag.Students = students;
            }

            return View();
        }

        [Route("menu/deleteStudent")]
        public async Task<IActionResult> DeleteStudent(int? id)
        {
            if(id == null)
            {
                return NotFound();
            }

            var studentname = await _context.Students.FindAsync(id);

            if(studentname == null)
            {
                return NotFound();
            }

            return View(studentname);
        }

        [Route("menu/deleteStudent")]
        [HttpPost]
        public async Task<IActionResult> DeleteStudent([FromForm]int id)
        {
            var studentname = await _context.Students.FindAsync(id);
            if(studentname == null)
            {
                return NotFound();
            }

            _context.Students.Remove(studentname);
            await _context.SaveChangesAsync();
            return RedirectToAction("StudentList", new { classId = studentname.ClassId});
        }

        public IActionResult Menu(int teacherid)
        {
            var claims = User.Claims;
            var teacherIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (int.TryParse(teacherIdClaim.Value, out var teacherId))
            {
                var teacher = _teacherRepository.Teachers.FirstOrDefault(t => t.TeacherId == teacherId);
                if (teacher != null)
                {
                    ViewBag.ProfileImage = teacher.Image;
                }
                else
                {
                    return NotFound();
                }
            }
            else
            {
                return BadRequest();
            }
            return View();
        }
        public IActionResult NotEkle()
        {
            return View();
        }

        public IActionResult GeometrikCisim()
        {
            return View();
        }

        public IActionResult AdamAsmaca()
        {
            return View();
        }

        public IActionResult Duygular()
        {
            return View();
        }

        public IActionResult Oyunlar()
        {
            return View();
        }
        public IActionResult YaziTahtasi()
        {
            return View();
        }
    }

}