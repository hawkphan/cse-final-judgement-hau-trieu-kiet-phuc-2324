using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UpdateAttribute : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Passed",
                table: "Results");

            migrationBuilder.AddColumn<double>(
                name: "Status",
                table: "Results",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Results");

            migrationBuilder.AddColumn<bool>(
                name: "Passed",
                table: "Results",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }
    }
}
