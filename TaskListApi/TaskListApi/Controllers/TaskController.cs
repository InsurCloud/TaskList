using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using TaskListApi.Model;
using TaskListApi.Repository;

namespace TaskListApi.Controllers
{
    [AllowAnonymous]
    [RoutePrefix("api/tasks")]
    public class TaskController : ApiController
    {
        TaskRepository _repo;
       
        public TaskController()
        {
            _repo = new TaskRepository();
            
        }
        
        [HttpGet]
        [Route("v1/task/{userName}", Name = "GetTasks")]
        public async Task<IHttpActionResult> GetTasks(string userName, bool includeCompleted)
        {
            try
            {
                List<TaskItem> tasks = await _repo.GetTasksAssignedTo(userName, includeCompleted);
                return Ok(tasks);
            }
            catch
            {
                return InternalServerError();
            }
            
        }

        [HttpGet]
        [Route("v1/task", Name = "GetAllTasks")]
        public async Task<IHttpActionResult> GetTasks(bool includeCompleted)
        {
            try
            {
                List<TaskItem> tasks = await _repo.GetTasks(includeCompleted);
                return Ok(tasks);
            }
            catch
            {
                return InternalServerError();
            }

        }

        [HttpGet]
        [Route("v1/task/{taskKey}", Name = "GetTaskByKey")]
        public async Task<IHttpActionResult> GetTaskByKey(string taskKey)
        {
            try
            {
                TaskItem task = await _repo.GetTaskByKey(taskKey);
                TaskViewItem vTask = new TaskViewItem();
                vTask.AssignedTo = task.AssignedTo;
                vTask.Completed = task.Completed;
                vTask.TaskDescription = task.TaskDescription;
                vTask.TaskKey = task.TaskKey;
                vTask.TaskName = task.TaskName;

                return Ok(vTask);
            }
            catch
            {
                return InternalServerError();
            }

        }

        [HttpPost]
        [Route("v1/task", Name = "SaveTask")]
        public async Task<IHttpActionResult> SaveTask(TaskViewItem task)
        {
            try
            {
                TaskItem nTask = await _repo.SaveTask(task);
                task.TaskKey = nTask.TaskKey;
                task.Completed = nTask.Completed;
                return Ok(nTask);
            }
            catch
            {
                return InternalServerError();
            }

        }

        [HttpPost]
        [Route("v1/completeTask", Name= "CompleteTask")]
        public async Task<IHttpActionResult> CompleteTasks(TaskViewItem task)
        {
            try
            {
                int count = await _repo.CompleteTask(task.TaskKey);
                if (count > 0)
                {
                    task.Completed = true;
                    return Ok(task);
                }
                else
                {
                    return BadRequest("Unable to update task. Please try again");
                }                                
            }
            catch
            {
                return InternalServerError();
            }

        }
    }
}
