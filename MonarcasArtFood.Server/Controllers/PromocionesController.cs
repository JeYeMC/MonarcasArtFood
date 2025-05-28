using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MonarcasArtFood.Server.Data;
using MonarcasArtFood.Server.Models;
using MonarcasArtFood.Server.Models.DTOs;

namespace MonarcasArtFood.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PromocionesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PromocionesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Promociones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PromocionDTO>>> GetPromociones()
        {
            var promociones = await _context.Promociones
                .Include(p => p.Productos)
                .ToListAsync();

            var promocionesDTO = promociones.Select(p => new PromocionDTO
            {
                Id = p.Id,
                Titulo = p.Titulo,
                Descripcion = p.Descripcion,
                PrecioPromocional = p.PrecioPromocional,
                Fecha = p.Fecha,
                Productos = p.Productos.Select(prod => prod.Nombre).ToList()
            }).ToList();

            return Ok(promocionesDTO);
        }

        // GET: api/Promociones/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PromocionDTO>> GetPromocion(int id)
        {
            var promocion = await _context.Promociones
                .Include(p => p.Productos)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (promocion == null)
                return NotFound();

            var promocionDTO = new PromocionDTO
            {
                Id = promocion.Id,
                Titulo = promocion.Titulo,
                Descripcion = promocion.Descripcion,
                PrecioPromocional = promocion.PrecioPromocional,
                Fecha = promocion.Fecha,
                Productos = promocion.Productos.Select(prod => prod.Nombre).ToList()
            };

            return Ok(promocionDTO);
        }

        // POST: api/Promociones
        [HttpPost]
        public async Task<ActionResult<Promocion>> PostPromocion(Promocion promocion)
        {
            _context.Promociones.Add(promocion);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPromocion), new { id = promocion.Id }, promocion);
        }

        // PUT: api/Promociones/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPromocion(int id, Promocion promocion)
        {
            if (id != promocion.Id)
                return BadRequest();

            _context.Entry(promocion).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/Promociones/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePromocion(int id)
        {
            var promocion = await _context.Promociones.FindAsync(id);
            if (promocion == null)
                return NotFound();

            _context.Promociones.Remove(promocion);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
