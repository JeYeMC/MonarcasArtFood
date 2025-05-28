using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace MonarcasArtFood.Server.Models
{
    public class Producto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El nombre es obligatorio.")]
        [StringLength(100, ErrorMessage = "El nombre no puede exceder los 100 caracteres.")]
        public string Nombre { get; set; }

        [Required(ErrorMessage = "La descripción es obligatoria.")]
        [StringLength(500, ErrorMessage = "La descripción no puede exceder los 500 caracteres.")]
        public string Descripcion { get; set; }

        [Required(ErrorMessage = "El precio es obligatorio.")]
        [Precision(10, 2)]
        public decimal Precio { get; set; }

        public string ImagenUrl { get; set; }

        public bool Disponible { get; set; }

        [Required(ErrorMessage = "La categoría es obligatoria.")]
        public int CategoriaId { get; set; }

        public Categoria Categoria { get; set; }

        // Relaciones
        public ICollection<DetallePedido> DetallesPedido { get; set; } = new List<DetallePedido>();
        public ICollection<Promocion> Promociones { get; set; } = new List<Promocion>();
    }
}
