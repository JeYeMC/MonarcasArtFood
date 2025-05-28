namespace MonarcasArtFood.Server.Models.DTOs
{
    public class ProductoDTO
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = null!;
        public string Descripcion { get; set; } = null!;
        public decimal Precio { get; set; }
        public string ImagenUrl { get; set; } = null!;
        public bool Disponible { get; set; }

        public int CategoriaId { get; set; }
        public string CategoriaNombre { get; set; } = null!;

        public List<PromocionDTO> Promociones { get; set; } = new();
    }

    public class PromocionDTO
    {
        public int Id { get; set; }
        public string Titulo { get; set; } = null!;
        public string Descripcion { get; set; } = null!;
        public decimal PrecioPromocional { get; set; }
        public DateTime Fecha { get; set; }
        public List<string> Productos { get; set; } = new();
    }

    public class CategoriaDTO
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public List<ProductoDTO> Productos { get; set; } = new();
    }
}
