﻿// <auto-generated />
using System;
using EmployeeEvaluation.DataAccess.EntityFramework;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace EmployeeEvaluation.DataAccess.EntityFramework.Migrations
{
    [DbContext(typeof(EmployeeEvaluationDbContext))]
    partial class EmployeeEvaluationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("EmployeeEvaluation.DataAccess.Model.CriteriaComments", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Attachment")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Comment")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("FormCriteriaId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("FormCriteriaId");

                    b.ToTable("CriteriaComments");
                });

            modelBuilder.Entity("EmployeeEvaluation.DataAccess.Model.Department", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("HeadOfDepartmentId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Departments");
                });

            modelBuilder.Entity("EmployeeEvaluation.DataAccess.Model.EvaluationForm", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("EvaluationForm");
                });

            modelBuilder.Entity("EmployeeEvaluation.DataAccess.Model.FormCriteria", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("FormSectionId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("isChecked")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("FormSectionId");

                    b.ToTable("FormCriteria");
                });

            modelBuilder.Entity("EmployeeEvaluation.DataAccess.Model.FormSection", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("EvaluationFormId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("EvaluationFormId");

                    b.ToTable("FormSections");
                });

            modelBuilder.Entity("EmployeeEvaluation.DataAccess.Model.FormTemplate", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("DepartmentId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("DepartmentId");

                    b.ToTable("FormTemplates");
                });

            modelBuilder.Entity("EmployeeEvaluation.DataAccess.Model.FormTemplateCriteria", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("FormTemplateSectionId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("FormTemplateSectionId");

                    b.ToTable("FormTemplateCriteria");
                });

            modelBuilder.Entity("EmployeeEvaluation.DataAccess.Model.FormTemplateSection", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("FormTemplateId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("FormTemplateId");

                    b.ToTable("FormTemplateSections");
                });

            modelBuilder.Entity("EmployeeEvaluation.DataAccess.Model.Project", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Projects");
                });

            modelBuilder.Entity("EmployeeEvaluation.DataAccess.Model.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("DepartmentId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("ProjectId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("DepartmentId");

                    b.HasIndex("ProjectId");

                    b.ToTable("User");
                });

            modelBuilder.Entity("EmployeeEvaluation.DataAccess.Model.CriteriaComments", b =>
                {
                    b.HasOne("EmployeeEvaluation.DataAccess.Model.FormCriteria", null)
                        .WithMany("CriteriaComments")
                        .HasForeignKey("FormCriteriaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("EmployeeEvaluation.DataAccess.Model.EvaluationForm", b =>
                {
                    b.HasOne("EmployeeEvaluation.DataAccess.Model.User", null)
                        .WithMany("EvaluationForms")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("EmployeeEvaluation.DataAccess.Model.FormCriteria", b =>
                {
                    b.HasOne("EmployeeEvaluation.DataAccess.Model.FormSection", null)
                        .WithMany("FormCriteria")
                        .HasForeignKey("FormSectionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("EmployeeEvaluation.DataAccess.Model.FormSection", b =>
                {
                    b.HasOne("EmployeeEvaluation.DataAccess.Model.EvaluationForm", null)
                        .WithMany("FormSections")
                        .HasForeignKey("EvaluationFormId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("EmployeeEvaluation.DataAccess.Model.FormTemplate", b =>
                {
                    b.HasOne("EmployeeEvaluation.DataAccess.Model.Department", null)
                        .WithMany("FormTemplates")
                        .HasForeignKey("DepartmentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("EmployeeEvaluation.DataAccess.Model.FormTemplateCriteria", b =>
                {
                    b.HasOne("EmployeeEvaluation.DataAccess.Model.FormTemplateSection", null)
                        .WithMany("TemplateCriteria")
                        .HasForeignKey("FormTemplateSectionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("EmployeeEvaluation.DataAccess.Model.FormTemplateSection", b =>
                {
                    b.HasOne("EmployeeEvaluation.DataAccess.Model.FormTemplate", null)
                        .WithMany("TemplateSections")
                        .HasForeignKey("FormTemplateId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("EmployeeEvaluation.DataAccess.Model.User", b =>
                {
                    b.HasOne("EmployeeEvaluation.DataAccess.Model.Department", null)
                        .WithMany("Users")
                        .HasForeignKey("DepartmentId");

                    b.HasOne("EmployeeEvaluation.DataAccess.Model.Project", null)
                        .WithMany("Users")
                        .HasForeignKey("ProjectId");
                });

            modelBuilder.Entity("EmployeeEvaluation.DataAccess.Model.Department", b =>
                {
                    b.Navigation("FormTemplates");

                    b.Navigation("Users");
                });

            modelBuilder.Entity("EmployeeEvaluation.DataAccess.Model.EvaluationForm", b =>
                {
                    b.Navigation("FormSections");
                });

            modelBuilder.Entity("EmployeeEvaluation.DataAccess.Model.FormCriteria", b =>
                {
                    b.Navigation("CriteriaComments");
                });

            modelBuilder.Entity("EmployeeEvaluation.DataAccess.Model.FormSection", b =>
                {
                    b.Navigation("FormCriteria");
                });

            modelBuilder.Entity("EmployeeEvaluation.DataAccess.Model.FormTemplate", b =>
                {
                    b.Navigation("TemplateSections");
                });

            modelBuilder.Entity("EmployeeEvaluation.DataAccess.Model.FormTemplateSection", b =>
                {
                    b.Navigation("TemplateCriteria");
                });

            modelBuilder.Entity("EmployeeEvaluation.DataAccess.Model.Project", b =>
                {
                    b.Navigation("Users");
                });

            modelBuilder.Entity("EmployeeEvaluation.DataAccess.Model.User", b =>
                {
                    b.Navigation("EvaluationForms");
                });
#pragma warning restore 612, 618
        }
    }
}
