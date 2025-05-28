using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace MonarcasArtFood.Server.Models
{
    public class Promocion
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El título es obligatorio.")]
        [StringLength(100, ErrorMessage = "El título no puede exceder los 100 caracteres.")]
        public string Titulo { get; set; }

        [Required(ErrorMessage = "La descripción es obligatoria.")]
        [StringLength(500, ErrorMessage = "La descripción no puede exceder los 500 caracteres.")]
        public string Descripcion { get; set; }

        [Required(ErrorMessage = "El precio promocional es obligatorio.")]
        [Precision(10, 2)]
        public decimal PrecioPromocional { get; set; }

        [Required(ErrorMessage = "La fecha es obligatoria.")]
        public DateTime Fecha { get; set; }

        // Relación muchos a muchos con productos
        public ICollection<Producto> Productos { get; set; } = new List<Producto>();
    }
}
