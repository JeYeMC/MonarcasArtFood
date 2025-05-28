using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MonarcasArtFood.Server.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categorias",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categorias", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Promociones",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Titulo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Descripcion = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    PrecioPromocional = table.Column<decimal>(type: "decimal(10,2)", precision: 10, scale: 2, nullable: false),
                    Fecha = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Promociones", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Telefono = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Direccion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EsRecogerEnLocal = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Productos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Descripcion = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    Precio = table.Column<decimal>(type: "decimal(10,2)", precision: 10, scale: 2, nullable: false),
                    ImagenUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Disponible = table.Column<bool>(type: "bit", nullable: false),
                    CategoriaId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Productos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Productos_Categorias_CategoriaId",
                        column: x => x.CategoriaId,
                        principalTable: "Categorias",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Pedidos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UsuarioId = table.Column<int>(type: "int", nullable: false),
                    Fecha = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Estado = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pedidos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Pedidos_Usuarios_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "Usuarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductoPromocion",
                columns: table => new
                {
                    ProductosId = table.Column<int>(type: "int", nullable: false),
                    PromocionesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductoPromocion", x => new { x.ProductosId, x.PromocionesId });
                    table.ForeignKey(
                        name: "FK_ProductoPromocion_Productos_ProductosId",
                        column: x => x.ProductosId,
                        principalTable: "Productos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductoPromocion_Promociones_PromocionesId",
                        column: x => x.PromocionesId,
                        principalTable: "Promociones",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DetallesPedido",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PedidoId = table.Column<int>(type: "int", nullable: false),
                    ProductoId = table.Column<int>(type: "int", nullable: false),
                    Cantidad = table.Column<int>(type: "int", nullable: false),
                    PrecioUnitario = table.Column<decimal>(type: "decimal(10,2)", precision: 10, scale: 2, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetallesPedido", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DetallesPedido_Pedidos_PedidoId",
                        column: x => x.PedidoId,
                        principalTable: "Pedidos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DetallesPedido_Productos_ProductoId",
                        column: x => x.ProductoId,
                        principalTable: "Productos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Categorias",
                columns: new[] { "Id", "Nombre" },
                values: new object[,]
                {
                    { 1, "Hamburguesas" },
                    { 2, "Perros" },
                    { 3, "Salchipapas" },
                    { 4, "Adicionales" },
                    { 5, "Bebidas" }
                });

            migrationBuilder.InsertData(
                table: "Promociones",
                columns: new[] { "Id", "Descripcion", "Fecha", "PrecioPromocional", "Titulo" },
                values: new object[,]
                {
                    { 1, "15% en los Perros todos los lunes.", new DateTime(2025, 5, 20, 0, 0, 0, 0, DateTimeKind.Local), 10000m, "Miercoles de Perros" },
                    { 2, "15% en los Perros todos los miercoles.", new DateTime(2025, 5, 20, 0, 0, 0, 0, DateTimeKind.Local), 13000m, "Miercoles de Perros" }
                });

            migrationBuilder.InsertData(
                table: "Productos",
                columns: new[] { "Id", "CategoriaId", "Descripcion", "Disponible", "ImagenUrl", "Nombre", "Precio" },
                values: new object[,]
                {
                    { 1, 1, "Pan Brioche, Carne Mixta(Res y Cerdo), Queso Amarillo, Lechuga, Tomate, Cebolla caramelizada, Tocineta, Salsas de la casa, Acompañantes: Papas a la francesa", true, "/Imagenes/hamburguesa_sencilla.jpg", "Hamburguesa Sencilla", 16000m },
                    { 2, 1, "Pan Brioche, Carne de Costilla Desmechada en salsa BBQ, Queso Amarillo, Lechuga, Tomate, Cebolla caramelizada, Maicitos, Tocineta, Salsas de la casa, Acompañantes: Papas a la francesa", true, "/Imagenes/hamburguesa_desmechada.jpg", "Hamburguesa Desmechada", 18000m },
                    { 3, 1, "Pan Brioche, Carne Mixta(Res y Cerdo), Carne de Costilla Desmechada en salsa BBQ, Queso Amarillo, Lechuga, Tomate, Cebolla caramelizada, Maicitos, Tocineta, Salsas de la casa, Acompañantes: Papas a la francesa", true, "/Imagenes/hamburguesa_mixta.jpg", "Hamburguesa Mixta", 20000m },
                    { 4, 1, "Pan Brioche, Carne Mixta(Res y Cerdo) X2, Queso Amarillo X2, Lechuga, Tomate, Cebolla caramelizada, Tocineta, Salsas de la casa, Acompañantes: Papas a la francesa", true, "/Imagenes/hamburguesa_doble.jpg", "Hamburguesa Doble Carne", 22000m },
                    { 5, 2, "Pan Brioche, Salchicha Americana, Tocineta, Queso Mozzarella, Trocitos de Piña caramelizada, Cebolla Crsipy, Salsas de la casa", true, "/Imagenes/perro_americano.jpg", "Perro Americano", 11500m },
                    { 6, 2, "Pan Brioche, Salchicha Americana, Carne de Costilla Desmechada en salsa BBQ, Tocineta, Queso Mozzarella, Maicitos, Cebolla Crsipy, Salsas de la casa", true, "/Imagenes/perro_desmechado.jpg", "Perro Desmechado", 14500m },
                    { 7, 3, "250 GR De papas a la francesa, Salchicha caramelizada, Costilla desmechada en salsa BBQ, Maicitos, Cebolla Crispy, Salsas de la casa", true, "/Imagenes/salchi_pequeña.jpg", "Salchipapa Pequeña", 16000m },
                    { 8, 3, "400 GR De papas a la francesa, Salchicha caramelizada, Costilla desmechada en salsa BBQ, Maicitos, Cebolla Crispy, Salsas de la casa", true, "/Imagenes/salchi_grande.jpg", "Salchipapa Grande", 22000m },
                    { 9, 3, "Carne de hamburguesa fileteada, 450 GR De papas a la francesa, Salchicha caramelizada, Costilla desmechada en salsa BBQ, Maicitos, Cebolla Crispy, Tocineta, Salsas de la casa", true, "/Imagenes/salchi_burguer.jpg", "SalchiBurguer", 27000m },
                    { 10, 4, "Queso mozzarella gratinado , puedes pedirlo en todos nuestro productos (La adicion es equivalente a 1 loncha)", true, "/Imagenes/queso_gratinado.jpg", "Queso Gratinado", 27000m },
                    { 11, 4, "200 GR Acompañadas de las salsas de la casa", true, "/Imagenes/porcion_papas.jpg", "Porcion de Papas a la Francesa", 27000m },
                    { 12, 4, "200 GR de papas a la francesa acompañadas de salsa de queso de la casa , queso cheddar, queso mozzarella y tocineta", true, "/Imagenes/papas_qyt.jpg", "Porcion de Papas con Queso y Tocineta", 27000m },
                    { 13, 5, "Tropical, Lulo, Mango, Mora, Piña-Naranja", true, "/Imagenes/queso_gratinado.jpg", "Jugos Hit", 27000m },
                    { 14, 5, "Pepsi, Manzana, Uva, Naranja", true, "/Imagenes/productos_postobon.jpg", "Productos Postobon", 27000m },
                    { 15, 5, "Coca-Cola, Sprite, Quatro", true, "/Imagenes/papas_qyt.jpg", "Productos Coca-Cola", 27000m }
                });

            migrationBuilder.InsertData(
                table: "ProductoPromocion",
                columns: new[] { "ProductosId", "PromocionesId" },
                values: new object[,]
                {
                    { 5, 1 },
                    { 6, 2 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_DetallesPedido_PedidoId",
                table: "DetallesPedido",
                column: "PedidoId");

            migrationBuilder.CreateIndex(
                name: "IX_DetallesPedido_ProductoId",
                table: "DetallesPedido",
                column: "ProductoId");

            migrationBuilder.CreateIndex(
                name: "IX_Pedidos_UsuarioId",
                table: "Pedidos",
                column: "UsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductoPromocion_PromocionesId",
                table: "ProductoPromocion",
                column: "PromocionesId");

            migrationBuilder.CreateIndex(
                name: "IX_Productos_CategoriaId",
                table: "Productos",
                column: "CategoriaId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DetallesPedido");

            migrationBuilder.DropTable(
                name: "ProductoPromocion");

            migrationBuilder.DropTable(
                name: "Pedidos");

            migrationBuilder.DropTable(
                name: "Productos");

            migrationBuilder.DropTable(
                name: "Promociones");

            migrationBuilder.DropTable(
                name: "Usuarios");

            migrationBuilder.DropTable(
                name: "Categorias");
        }
    }
}
