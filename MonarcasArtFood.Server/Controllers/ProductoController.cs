using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MonarcasArtFood.Server.Data;
using MonarcasArtFood.Server.Models;
using MonarcasArtFood.Server.Models.DTOs;

namespace MonarcasArtFood.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductosController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Productos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductoDTO>>> GetProductos()
        {
            var productos = await _context.Productos
                .Include(p => p.Categoria)
                .Include(p => p.Promociones)
                .ToListAsync();

            var productosDTO = productos.Select(p => new ProductoDTO
            {
                Id = p.Id,
                Nombre = p.Nombre,
                Descripcion = p.Descripcion,
                Precio = p.Precio,
                ImagenUrl = p.ImagenUrl,
                Disponible = p.Disponible,
                CategoriaId = p.CategoriaId,
                CategoriaNombre = p.Categoria?.Nombre ?? "",
                Promociones = p.Promociones.Select(pr => new PromocionDTO
                {
                    Id = pr.Id,
                    Titulo = pr.Titulo,
                    Descripcion = pr.Descripcion,
                    PrecioPromocional = pr.PrecioPromocional,
                    Fecha = pr.Fecha
                }).ToList()
            });

            return Ok(productosDTO);
        }

        // GET: api/Productos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductoDTO>> GetProducto(int id)
        {
            var producto = await _context.Productos
                .Include(p => p.Categoria)
                .Include(p => p.Promociones)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (producto == null)
                return NotFound();

            var productoDTO = new ProductoDTO
            {
                Id = producto.Id,
                Nombre = producto.Nombre,
                Descripcion = producto.Descripcion,
                Precio = producto.Precio,
                ImagenUrl = producto.ImagenUrl,
                Disponible = producto.Disponible,
                CategoriaId = producto.CategoriaId,
                CategoriaNombre = producto.Categoria?.Nombre ?? "",
                Promociones = producto.Promociones.Select(pr => new PromocionDTO
                {
                    Id = pr.Id,
                    Titulo = pr.Titulo,
                    Descripcion = pr.Descripcion,
                    PrecioPromocional = pr.PrecioPromocional,
                    Fecha = pr.Fecha
                }).ToList()
            };

            return Ok(productoDTO);
        }

        // POST: api/Productos
        [HttpPost]
        public async Task<ActionResult<Producto>> CrearProducto(Producto producto)
        {
            _context.Productos.Add(producto);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProducto), new { id = producto.Id }, producto);
        }

        // PUT: api/Productos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> EditarProducto(int id, Producto producto)
        {
            if (id != producto.Id)
                return BadRequest();

            _context.Entry(producto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductoExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/Productos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> EliminarProducto(int id)
        {
            var producto = await _context.Productos.FindAsync(id);
            if (producto == null)
                return NotFound();

            _context.Productos.Remove(producto);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductoExists(int id)
        {
            return _context.Productos.Any(p => p.Id == id);
        }
    }
}
