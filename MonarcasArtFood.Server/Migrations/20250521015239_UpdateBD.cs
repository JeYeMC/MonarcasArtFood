using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MonarcasArtFood.Server.Migrations
{
    /// <inheritdoc />
    public partial class UpdateBD : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Productos",
                keyColumn: "Id",
                keyValue: 13,
                column: "ImagenUrl",
                value: "/Imagenes/jugos_hit.jpg");

            migrationBuilder.UpdateData(
                table: "Productos",
                keyColumn: "Id",
                keyValue: 15,
                column: "ImagenUrl",
                value: "/Imagenes/productos_cocacola.jpg");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Productos",
                keyColumn: "Id",
                keyValue: 13,
                column: "ImagenUrl",
                value: "/Imagenes/queso_gratinado.jpg");

            migrationBuilder.UpdateData(
                table: "Productos",
                keyColumn: "Id",
                keyValue: 15,
                column: "ImagenUrl",
                value: "/Imagenes/papas_qyt.jpg");
        }
    }
}
