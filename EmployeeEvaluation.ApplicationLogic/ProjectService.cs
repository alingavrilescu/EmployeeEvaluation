﻿using EmployeeEvaluation.DataAccess.Abstractions;
using EmployeeEvaluation.DataAccess.Model;

namespace EmployeeEvaluation.ApplicationLogic
{
    public class ProjectService
    {
        private readonly IProjectRepository _projectRepository;

        public ProjectService(IProjectRepository projectRepository)
        {
            this._projectRepository = projectRepository;
        }

        public IEnumerable<Project> GetProjects()
        {
            return this._projectRepository.GetAll();
        }
        public IEnumerable<Project> GetProjectsOfDepartment(Guid depId)
        {
            return this._projectRepository.GetProjectsOfDepartment(depId);
        }

        public Project GetProjectById(Guid id)
        {
            return this._projectRepository.GetById(id);
        }

        public Project AddUsersToProject(Guid proId, List<User> users)
        {
            return this._projectRepository.AddUsersToProject(proId, users);
        }
        public Project RemoveUserFromProject(Guid proId, User user)
        {
            return this._projectRepository.RemoveUserFromProject(proId,user);
        }
        public Project AddProject(Project toAdd)
        {
            return _projectRepository.Add(toAdd);
        }
        public Project UpdateProject(Project project)
        {
            return _projectRepository.Update(project);
        }

        public void DeleteProject(Guid id)
        {
            this._projectRepository.DeleteById(id);
        }

    }
}