using System.ComponentModel.DataAnnotations;

namespace MonarcasArtFood.Server.Models
{
    public class Categoria
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El nombre es obligatorio.")]
        [StringLength(100, ErrorMessage = "El nombre no puede exceder los 100 caracteres.")]
        public string Nombre { get; set; }

        // Relación con productos
        public ICollection<Producto> Productos { get; set; } = new List<Producto>();
    }
}
