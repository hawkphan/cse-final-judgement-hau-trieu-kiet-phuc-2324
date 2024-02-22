using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UpdateLanguage3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Languages_AspNetUsers_UserId",
                table: "Languages");

            migrationBuilder.DropIndex(
                name: "IX_Languages_UserId",
                table: "Languages");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Languages");

            migrationBuilder.AddColumn<Guid>(
                name: "AppUserId",
                table: "Languages",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Languages_AppUserId",
                table: "Languages",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Languages_AspNetUsers_AppUserId",
                table: "Languages",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Languages_AspNetUsers_AppUserId",
                table: "Languages");

            migrationBuilder.DropIndex(
                name: "IX_Languages_AppUserId",
                table: "Languages");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Languages");

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "Languages",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Languages_UserId",
                table: "Languages",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Languages_AspNetUsers_UserId",
                table: "Languages",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
