using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Matek.Data.Concreate.EfCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Matek.Controllers
{
    public class HomeController : Controller    
    {
        private readonly MatekContext _context;
        public HomeController(MatekContext context)
        {
            _context = context;
        }
        
        public IActionResult Index()
        {
            return View();
        }

    }
}