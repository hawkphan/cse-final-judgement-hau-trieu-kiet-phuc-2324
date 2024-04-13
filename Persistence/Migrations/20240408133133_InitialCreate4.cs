using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Solutions_Languages_LanguageId",
                table: "Solutions");

            migrationBuilder.DropIndex(
                name: "IX_Solutions_LanguageId",
                table: "Solutions");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Solutions_LanguageId",
                table: "Solutions",
                column: "LanguageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Solutions_Languages_LanguageId",
                table: "Solutions",
                column: "LanguageId",
                principalTable: "Languages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
