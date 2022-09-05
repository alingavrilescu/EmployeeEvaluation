using EmployeeEvaluation.DataAccess.Abstractions;
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

        public Project GetProjectById(Guid id)
        {
            return this._projectRepository.GetById(id);
        }

        public IEnumerable<Project> GetProjects()
        {
            return this._projectRepository.GetAll();
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