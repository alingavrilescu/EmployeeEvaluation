using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EmployeeEvaluation.Migrations
{
    public partial class FormTemplateMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FormTemplates",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    DepartmentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormTemplates", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FormTemplateSections",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FormTemplateId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormTemplateSections", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FormTemplateSections_FormTemplates_FormTemplateId",
                        column: x => x.FormTemplateId,
                        principalTable: "FormTemplates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FormTemplateCriteria",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FormTemplateSectionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormTemplateCriteria", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FormTemplateCriteria_FormTemplateSections_FormTemplateSectionId",
                        column: x => x.FormTemplateSectionId,
                        principalTable: "FormTemplateSections",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FormTemplateCriteria_FormTemplateSectionId",
                table: "FormTemplateCriteria",
                column: "FormTemplateSectionId");

            migrationBuilder.CreateIndex(
                name: "IX_FormTemplateSections_FormTemplateId",
                table: "FormTemplateSections",
                column: "FormTemplateId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FormTemplateCriteria");

            migrationBuilder.DropTable(
                name: "FormTemplateSections");

            migrationBuilder.DropTable(
                name: "FormTemplates");
        }
    }
}
