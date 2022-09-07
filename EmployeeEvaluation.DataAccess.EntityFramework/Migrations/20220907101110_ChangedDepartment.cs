using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EmployeeEvaluation.DataAccess.EntityFramework.Migrations
{
    public partial class ChangedDepartment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "HeadOfDepartmentId",
                table: "Departments",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HeadOfDepartmentId",
                table: "Departments");
        }
    }
}
