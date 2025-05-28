using Microsoft.EntityFrameworkCore;
using MonarcasArtFood.Server.Models;

namespace MonarcasArtFood.Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<Producto> Productos { get; set; }
        public DbSet<Pedido> Pedidos { get; set; }
        public DbSet<DetallePedido> DetallesPedido { get; set; }
        public DbSet<Promocion> Promociones { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configurar relación muchos a muchos explícitamente
            modelBuilder.Entity<Producto>()
                .HasMany(p => p.Promociones)
                .WithMany(p => p.Productos)
                .UsingEntity<Dictionary<string, object>>(
                    "ProductoPromocion",
                    j => j.HasData(
                        new { ProductosId = 5, PromocionesId = 1 },
                        new { ProductosId = 6, PromocionesId = 2 }
                        ) // semilla de ejemplo
                );

            // Categorías
            modelBuilder.Entity<Categoria>().HasData(
                new Categoria { Id = 1, Nombre = "Hamburguesas" },
                new Categoria { Id = 2, Nombre = "Perros" },
                new Categoria { Id = 3, Nombre = "Salchipapas" },
                new Categoria { Id = 4, Nombre = "Adicionales" },
                new Categoria { Id = 5, Nombre = "Bebidas" }
            );

            // Productos
            modelBuilder.Entity<Producto>().HasData(
                new Producto
                {
                    Id = 1,
                    Nombre = "Hamburguesa Sencilla",
                    Descripcion = "Pan Brioche, Carne Mixta(Res y Cerdo), Queso Amarillo, Lechuga, Tomate, Cebolla caramelizada, Tocineta, Salsas de la casa, Acompañantes: Papas a la francesa",
                    Precio = 16000,
                    ImagenUrl = "/Imagenes/hamburguesa_sencilla.jpg",
                    Disponible = true,
                    CategoriaId = 1
                },
                new Producto
                {
                    Id = 2,
                    Nombre = "Hamburguesa Desmechada",
                    Descripcion = "Pan Brioche, Carne de Costilla Desmechada en salsa BBQ, Queso Amarillo, Lechuga, Tomate, Cebolla caramelizada, Maicitos, Tocineta, Salsas de la casa, Acompañantes: Papas a la francesa",
                    Precio = 18000,
                    ImagenUrl = "/Imagenes/hamburguesa_desmechada.jpg",
                    Disponible = true,
                    CategoriaId = 1
                },
                new Producto
                {
                    Id = 3,
                    Nombre = "Hamburguesa Mixta",
                    Descripcion = "Pan Brioche, Carne Mixta(Res y Cerdo), Carne de Costilla Desmechada en salsa BBQ, Queso Amarillo, Lechuga, Tomate, Cebolla caramelizada, Maicitos, Tocineta, Salsas de la casa, Acompañantes: Papas a la francesa",
                    Precio = 20000,
                    ImagenUrl = "/Imagenes/hamburguesa_mixta.jpg",
                    Disponible = true,
                    CategoriaId = 1
                },
                new Producto
                {
                    Id = 4,
                    Nombre = "Hamburguesa Doble Carne",
                    Descripcion = "Pan Brioche, Carne Mixta(Res y Cerdo) X2, Queso Amarillo X2, Lechuga, Tomate, Cebolla caramelizada, Tocineta, Salsas de la casa, Acompañantes: Papas a la francesa",
                    Precio = 22000,
                    ImagenUrl = "/Imagenes/hamburguesa_doble.jpg",
                    Disponible = true,
                    CategoriaId = 1
                },
                new Producto
                {
                    Id = 5,
                    Nombre = "Perro Americano",
                    Descripcion = "Pan Brioche, Salchicha Americana, Tocineta, Queso Mozzarella, Trocitos de Piña caramelizada, Cebolla Crsipy, Salsas de la casa",
                    Precio = 11500,
                    ImagenUrl = "/Imagenes/perro_americano.jpg",
                    Disponible = true,
                    CategoriaId = 2
                },
                new Producto
                {
                    Id = 6,
                    Nombre = "Perro Desmechado",
                    Descripcion = "Pan Brioche, Salchicha Americana, Carne de Costilla Desmechada en salsa BBQ, Tocineta, Queso Mozzarella, Maicitos, Cebolla Crsipy, Salsas de la casa",
                    Precio = 14500,
                    ImagenUrl = "/Imagenes/perro_desmechado.jpg",
                    Disponible = true,
                    CategoriaId = 2
                },
                new Producto
                {
                    Id = 7,
                    Nombre = "Salchipapa Pequeña",
                    Descripcion = "250 GR De papas a la francesa, Salchicha caramelizada, Costilla desmechada en salsa BBQ, Maicitos, Cebolla Crispy, Salsas de la casa",
                    Precio = 16000,
                    ImagenUrl = "/Imagenes/salchi_pequeña.jpg",
                    Disponible = true,
                    CategoriaId = 3
                },
                new Producto
                {
                    Id = 8,
                    Nombre = "Salchipapa Grande",
                    Descripcion = "400 GR De papas a la francesa, Salchicha caramelizada, Costilla desmechada en salsa BBQ, Maicitos, Cebolla Crispy, Salsas de la casa",
                    Precio = 22000,
                    ImagenUrl = "/Imagenes/salchi_grande.jpg",
                    Disponible = true,
                    CategoriaId = 3
                },
                new Producto
                {
                    Id = 9,
                    Nombre = "SalchiBurguer",
                    Descripcion = "Carne de hamburguesa fileteada, 450 GR De papas a la francesa, Salchicha caramelizada, Costilla desmechada en salsa BBQ, Maicitos, Cebolla Crispy, Tocineta, Salsas de la casa",
                    Precio = 27000,
                    ImagenUrl = "/Imagenes/salchi_burguer.jpg",
                    Disponible = true,
                    CategoriaId = 3
                },
                new Producto
                {
                    Id = 10,
                    Nombre = "Queso Gratinado",
                    Descripcion = "Queso mozzarella gratinado , puedes pedirlo en todos nuestro productos (La adicion es equivalente a 1 loncha)",
                    Precio = 1000,
                    ImagenUrl = "/Imagenes/queso_gratinado.jpg",
                    Disponible = true,
                    CategoriaId = 4
                },
                new Producto
                {
                    Id = 11,
                    Nombre = "Porcion de Papas a la Francesa",
                    Descripcion = "200 GR Acompañadas de las salsas de la casa",
                    Precio = 4000,
                    ImagenUrl = "/Imagenes/porcion_papas.jpg",
                    Disponible = true,
                    CategoriaId = 4
                },
                new Producto
                {
                    Id = 12,
                    Nombre = "Porcion de Papas con Queso y Tocineta",
                    Descripcion = "200 GR de papas a la francesa acompañadas de salsa de queso de la casa , queso cheddar, queso mozzarella y tocineta",
                    Precio = 9000,
                    ImagenUrl = "/Imagenes/papas_qyt.jpg",
                    Disponible = true,
                    CategoriaId = 4
                },
                new Producto
                {
                    Id = 13,
                    Nombre = "Jugos Hit",
                    Descripcion = "Tropical, Lulo, Mango, Mora, Piña-Naranja",
                    Precio = 4000,
                    ImagenUrl = "/Imagenes/jugos_hit.jpg",
                    Disponible = true,
                    CategoriaId = 5
                },
                new Producto
                {
                    Id = 14,
                    Nombre = "Productos Postobon",
                    Descripcion = "Pepsi, Manzana, Uva, Naranja",
                    Precio = 4000,
                    ImagenUrl = "/Imagenes/productos_postobon.jpg",
                    Disponible = true,
                    CategoriaId = 5
                },
                new Producto
                {
                    Id = 15,
                    Nombre = "Productos Coca-Cola",
                    Descripcion = "Coca-Cola, Sprite, Quatro",
                    Precio = 4000,
                    ImagenUrl = "/Imagenes/productos_cocacola.jpg",
                    Disponible = true,
                    CategoriaId = 5
                }
            );

            // Promociones
            modelBuilder.Entity<Promocion>().HasData(
                new Promocion
                {
                    Id = 1,
                    Titulo = "Miercoles de Perros",
                    Descripcion = "15% en los Perros todos los lunes.",
                    PrecioPromocional = 10000,
                    Fecha = DateTime.Today
                },
                new Promocion
                {
                    Id = 2,
                    Titulo = "Miercoles de Perros",
                    Descripcion = "15% en los Perros todos los miercoles.",
                    PrecioPromocional = 13000,
                    Fecha = DateTime.Today
                }
            );
        }
    }
}
