using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MordOs.Migrations
{
    public partial class AddedSeedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Password" },
                values: new object[] { 1, "borgoth@mordos.com", "A3TXZ+xzX61bICKFP4faxCh9lg6MYS0sAcOLHy+4RlI=" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}
