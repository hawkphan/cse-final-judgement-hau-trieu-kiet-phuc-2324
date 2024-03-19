using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class InitializeContestTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Contest",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Title = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    StartTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    EndTime = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contest", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ContestMember",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Role = table.Column<double>(type: "REAL", nullable: false),
                    UserId = table.Column<Guid>(type: "TEXT", nullable: false),
                    ContestId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContestMember", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ContestMember_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ContestMember_Contest_ContestId",
                        column: x => x.ContestId,
                        principalTable: "Contest",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ContestProblem",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    ContestId = table.Column<Guid>(type: "TEXT", nullable: false),
                    ProblemId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContestProblem", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ContestProblem_Contest_ContestId",
                        column: x => x.ContestId,
                        principalTable: "Contest",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ContestProblem_Problems_ProblemId",
                        column: x => x.ProblemId,
                        principalTable: "Problems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ContestMember_ContestId",
                table: "ContestMember",
                column: "ContestId");

            migrationBuilder.CreateIndex(
                name: "IX_ContestMember_UserId",
                table: "ContestMember",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ContestProblem_ContestId",
                table: "ContestProblem",
                column: "ContestId");

            migrationBuilder.CreateIndex(
                name: "IX_ContestProblem_ProblemId",
                table: "ContestProblem",
                column: "ProblemId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ContestMember");

            migrationBuilder.DropTable(
                name: "ContestProblem");

            migrationBuilder.DropTable(
                name: "Contest");
        }
    }
}
