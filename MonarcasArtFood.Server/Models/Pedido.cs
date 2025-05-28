using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MonarcasArtFood.Server.Models
{
    public class Pedido
    {
        public int Id { get; set; }

        [Required]
        public int UsuarioId { get; set; }

        public Usuario Usuario { get; set; }

        [Required]
        public DateTime Fecha { get; set; } = DateTime.Now;

        [Required]
        [StringLength(50)]
        public string Estado { get; set; }

        // Relación con detalles del pedido
        public ICollection<DetallePedido> Detalles { get; set; } = new List<DetallePedido>();
    }
}
