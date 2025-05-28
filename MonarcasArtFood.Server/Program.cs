using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using MonarcasArtFood.Server.Data;

var builder = WebApplication.CreateBuilder(args);

// ✅ POLÍTICA CORS (agrega la URL correcta del frontend)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy
                .WithOrigins("https://localhost:51970") // <-- Asegúrate de que este es el puerto correcto del frontend
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

// ✅ Configuración del DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// ✅ Controladores y configuración JSON para evitar ciclos
builder.Services.AddControllers().AddJsonOptions(x =>
{
    x.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
});

// ✅ Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Monarcas API", Version = "v1" });
});

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// ✅ Aquí aplicamos la política CORS
app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();
app.MapFallbackToFile("/index.html");

app.Run();
