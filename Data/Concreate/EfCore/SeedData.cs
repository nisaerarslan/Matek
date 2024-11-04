using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Matek.Entity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.EntityFrameworkCore;

namespace Matek.Data.Concreate.EfCore
{
    public static class SeedData
    {
        public static void TestVerileriniDoldur(IApplicationBuilder app)
        {
            var context = app.ApplicationServices.CreateScope().ServiceProvider.GetService<MatekContext>();

            if(context != null)
            {
                if(context.Database.GetPendingMigrations().Any())
                {
                    context.Database.Migrate();
                }

                if(!context.Teachers.Any())
                {


                    context.Teachers.AddRange(
                        new Teacher
                        {
                            TeacherName = "elifsenasağırlı",
                            Name = "Elif Sena Sağırlı",
                            Password = "123456",
                            Email = "info@sena.com",
                            Image = "p1.png",
                        },
                        new Teacher { 
                            TeacherName = "büşrasinemözkaya",
                            Name = "Büşra Sinem Özkaya",
                            Password = "123456",
                            Email = "info@büşra.com",
                            Image = "p1.png",
                            },                        
                        new Teacher { 
                            TeacherName = "betülrüveydamert",
                            Name = "Betül Rüveyda Mert",
                            Password = "123456",
                            Email = "info@betül.com",
                            Image = "p1.png",
                            }
                    );
                    context.SaveChanges();
                }

                if(!context.Classes.Any())
                {
                    context.Classes.AddRange(
                        new Class { 
                            ClassNumber = "3A",
                            TeacherId = 1
                            },
                        new Class { 
                            ClassNumber = "2A",
                            TeacherId = 1
                        }
                    );
                    context.SaveChanges();
                }


            }
                
        }
       
    }
}
