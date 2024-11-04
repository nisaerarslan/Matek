using Matek.Data.Abstract;
using Matek.Data.Concreate.EfCore;
using Matek.Data.Concrete;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<MatekContext>(options => {
    var config = builder.Configuration;
    var connectionString = config.GetConnectionString("sql_connection");
    options.UseSqlite(connectionString);
});

builder.Services.AddScoped<IStudentRepository, EfStudentRepository>();
builder.Services.AddScoped<ITeacherRepository, EfTeacherRepository>();
builder.Services.AddScoped<IClassRepository, EfClassRepository>();
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie();

var app = builder.Build();

SeedData.TestVerileriniDoldur(app);

app.MapControllerRoute(
    name: "user_profile",
    pattern: "profile/{name}",
    defaults: new {controller = "User", acition = "Profile"}
);

app.MapControllerRoute(
    name: "default",
    pattern: "{controller = Home}/{action = Index}/{id?}"
);

app.MapDefaultControllerRoute();

app.UseStaticFiles();

app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

app.Run();
