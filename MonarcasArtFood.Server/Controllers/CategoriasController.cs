using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MonarcasArtFood.Server.Data;
using MonarcasArtFood.Server.Models;
using MonarcasArtFood.Server.Models.DTOs;

namespace MonarcasArtFood.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriasController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CategoriasController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Categorias

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoriaDTO>>> GetCategorias()
        {
            var categorias = await _context.Categorias
                .Include(c => c.Productos)
                    .ThenInclude(p => p.Promociones) // Si tienes relación muchos a muchos
                .ToListAsync();

            var categoriasDTO = categorias.Select(c => new CategoriaDTO
            {
                Id = c.Id,
                Nombre = c.Nombre,
                Productos = c.Productos.Select(p => new ProductoDTO
                {
                    Id = p.Id,
                    Nombre = p.Nombre,
                    Descripcion = p.Descripcion,
                    Precio = p.Precio,
                    ImagenUrl = p.ImagenUrl,
                    Disponible = p.Disponible,
                    CategoriaId = p.CategoriaId,
                    CategoriaNombre = c.Nombre,
                    Promociones = p.Promociones.Select(prom => new PromocionDTO
                    {
                        Id = prom.Id,
                        Titulo = prom.Titulo,
                        Descripcion = prom.Descripcion,
                        PrecioPromocional = prom.PrecioPromocional,
                        Fecha = prom.Fecha,
                        Productos = prom.Productos.Select(pp => pp.Nombre).ToList()
                    }).ToList()
                }).ToList()
            }).ToList();

            return Ok(categoriasDTO);
        }

        // GET: api/Categorias/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoriaDTO>> GetCategoria(int id)
        {
            var categoria = await _context.Categorias
                .Include(c => c.Productos)
                    .ThenInclude(p => p.Promociones)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (categoria == null)
                return NotFound();

            var categoriaDTO = new CategoriaDTO
            {
                Id = categoria.Id,
                Nombre = categoria.Nombre,
                Productos = categoria.Productos.Select(p => new ProductoDTO
                {
                    Id = p.Id,
                    Nombre = p.Nombre,
                    Descripcion = p.Descripcion,
                    Precio = p.Precio,
                    ImagenUrl = p.ImagenUrl,
                    Disponible = p.Disponible,
                    CategoriaId = p.CategoriaId,
                    CategoriaNombre = categoria.Nombre,
                    Promociones = p.Promociones.Select(prom => new PromocionDTO
                    {
                        Id = prom.Id,
                        Titulo = prom.Titulo,
                        Descripcion = prom.Descripcion,
                        PrecioPromocional = prom.PrecioPromocional,
                        Fecha = prom.Fecha,
                        Productos = prom.Productos.Select(pp => pp.Nombre).ToList()
                    }).ToList()
                }).ToList()
            };

            return Ok(categoriaDTO);
        }

        // POST: api/Categorias
        [HttpPost]
        public async Task<ActionResult<Categoria>> PostCategoria(Categoria categoria)
        {
            _context.Categorias.Add(categoria);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCategoria), new { id = categoria.Id }, categoria);
        }

        // PUT: api/Categorias/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategoria(int id, Categoria categoria)
        {
            if (id != categoria.Id)
                return BadRequest();

            _context.Entry(categoria).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/Categorias/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategoria(int id)
        {
            var categoria = await _context.Categorias.FindAsync(id);
            if (categoria == null)
                return NotFound();

            _context.Categorias.Remove(categoria);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
