using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MonarcasArtFood.Server.Models
{
    public class Usuario
    {
        public int Id { get; set; }

        [Required]
        public string Nombre { get; set; }

        [Required]
        [Phone]
        public string Telefono { get; set; }

        public string Direccion { get; set; }

        public bool EsRecogerEnLocal { get; set; }

        // Relación con Pedido
        public ICollection<Pedido> Pedidos { get; set; } = new List<Pedido>();
    }
}
