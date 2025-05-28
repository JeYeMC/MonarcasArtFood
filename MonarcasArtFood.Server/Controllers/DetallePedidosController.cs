using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MonarcasArtFood.Server.Data;
using MonarcasArtFood.Server.Models;

namespace MonarcasArtFood.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DetallePedidosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DetallePedidosController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DetallePedido>>> GetDetalles()
        {
            return await _context.DetallesPedido
                .Include(d => d.Producto)
                .Include(d => d.Pedido)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DetallePedido>> GetDetalle(int id)
        {
            var detalle = await _context.DetallesPedido.FindAsync(id);
            if (detalle == null) return NotFound();
            return detalle;
        }

        [HttpPost]
        public async Task<ActionResult<DetallePedido>> PostDetalle(DetallePedido detalle)
        {
            _context.DetallesPedido.Add(detalle);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetDetalle), new { id = detalle.Id }, detalle);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutDetalle(int id, DetallePedido detalle)
        {
            if (id != detalle.Id) return BadRequest();
            _context.Entry(detalle).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDetalle(int id)
        {
            var detalle = await _context.DetallesPedido.FindAsync(id);
            if (detalle == null) return NotFound();
            _context.DetallesPedido.Remove(detalle);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
