using EmployeeEvaluation.DataAccess.Abstractions;
using EmployeeEvaluation.DataAccess.Model;


namespace EmployeeEvaluation.ApplicationLogic
{
    public class UserService
    {

        private readonly IUserRepository _userRepository;

        public UserService (IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public User GetUserById(Guid id)
        {
            return this._userRepository.GetUserById(id);
        }

        public IEnumerable<User> GetUsers()
        {
            return this._userRepository.GetAll();
        }
        
        public IEnumerable<User> GetUsersOfDepartment(Guid depId)
        {
            return this._userRepository.GetUsersOfDepartment(depId);
        }
        public IEnumerable<User> GetUsersOfProject(Guid proId)
        {
            return this._userRepository.GetUsersOfProject(proId);
        }
        public IEnumerable<User> GetUsersWithoutDepartment()
        {
            return this._userRepository.GetUsersWithoutDepartment();
        }
        public IEnumerable<User> GetUsersWithoutProject(Guid depId)
        {
            return this._userRepository.GetUsersWithoutProject(depId);
        }
        public IEnumerable<User> GetDevs(Guid depId)
        {
            return this._userRepository.GetDevs(depId);
        }
        public IEnumerable<User> GetHODepsWithoutDep()
        {
            return this._userRepository.GetHODepsWithoutDep();
        }
        public IEnumerable<User> GetProjectManagers(Guid depId) 
        { 
            return this._userRepository.GetProjectManagers(depId);
        }
        public IEnumerable<User> GetTeamLeads(Guid depId)
        {
            return this._userRepository.GetTeamLeads(depId);
        }
        public IEnumerable<User> GetProjectManagersWithoutProject(Guid depId)
        {
            return this._userRepository.GetProjectManagersWithoutProject(depId);
        }
        public IEnumerable<User> GetTeamLeadsWithoutProject(Guid depId)
        {
            return this._userRepository.GetTeamLeadsWithoutProject(depId);
        }

        public User AddUser(User toAdd)
        {
            return _userRepository.Add(toAdd);
        }
        public User EditUser(User toEdit)
        {
            return _userRepository.Update(toEdit);
        }

        public void DeleteUser(Guid id)
        {
            this._userRepository.DeleteById(id);
        }

    }
}
