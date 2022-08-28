using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MordOs.Migrations
{
    public partial class AddedDirectoryToDocuments : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Directory",
                table: "Documents",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Directory",
                table: "Documents");
        }
    }
}
