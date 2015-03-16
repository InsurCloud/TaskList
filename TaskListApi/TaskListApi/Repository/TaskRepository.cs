using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Data.Entity;
using TaskListApi.Context;
using TaskListApi.Model;

namespace TaskListApi.Repository
{
    public class TaskRepository : IDisposable
    {
        private TaskContext _ctx;

        public TaskRepository()
        {
            _ctx = new TaskContext();
        }

        public async Task<TaskItem> GetTaskByKey(string taskKey)
        {
            TaskItem task;
            task = await _ctx.Tasks.Where(c => c.TaskKey == taskKey).FirstOrDefaultAsync();
            return task;
        }
        public async Task<List<TaskItem>> GetTasks(bool includeCompleted)
        {
            List<TaskItem> tasks;
            if (includeCompleted)
            {
                tasks = await _ctx.Tasks.ToListAsync();
            }
            else
            {
                tasks = _ctx.Tasks.Where(c => !c.Completed).ToList();
            }

            return tasks;
        }

        public async Task<List<TaskItem>> GetTasksAssignedTo(string assignedToName, bool includeCompleted)
        {
            List<TaskItem> tasks;
            tasks = await GetTasks(includeCompleted);
            if (String.IsNullOrEmpty(assignedToName) || String.IsNullOrWhiteSpace(assignedToName))
            {
                return tasks;
            }
            return tasks.Where(c => c.AssignedTo == assignedToName).ToList();
        }

        public async Task<TaskItem> SaveTask(TaskViewItem task)
        {
            bool newTask = false;
            TaskItem nTask;
            if (string.IsNullOrWhiteSpace(task.TaskKey) || string.IsNullOrEmpty(task.TaskKey))
            {   
                nTask = new TaskItem();
                nTask.TaskKey = Guid.NewGuid().ToString();
                newTask = true;
                nTask.Completed = false;
            }
            else
            {
                nTask = await _ctx.Tasks.Where(c => c.TaskKey == task.TaskKey).FirstOrDefaultAsync();
                nTask.Completed = task.Completed;
            }            
            nTask.AssignedTo = task.AssignedTo;            
            nTask.TaskName = task.TaskName;
            nTask.TaskDescription = task.TaskDescription;

            if (newTask)
            {
                nTask = _ctx.Tasks.Add(nTask);
            }
            
            int countRows = await _ctx.SaveChangesAsync();
            if (newTask && countRows == 0)
            {
                throw new ApplicationException("Attempted to save new task, but no new rows were added to the database");
            }
            return nTask;
        }

        public async Task<int> UpdateTask(TaskItem task)
        {
            TaskItem utask = _ctx.Tasks.Where(c => c.TaskKey == task.TaskKey).FirstOrDefault();
            if (utask != null)
            {
                utask.AssignedTo = task.AssignedTo;
                utask.Completed = task.Completed;
                utask.TaskDescription = task.TaskDescription;
                utask.TaskName = task.TaskName;
            }
            int countRows = await _ctx.SaveChangesAsync();
            return countRows;
        }

        public async Task<int> CompleteTask(string taskKey)
        {
            TaskItem utask = _ctx.Tasks.Where(c => c.TaskKey == taskKey).FirstOrDefault();
            if (utask != null)
            {
                utask.Completed = true;                
            }
            int countRows = await _ctx.SaveChangesAsync();
            return countRows;
        }

        public void Dispose()
        {
            _ctx.Dispose();
        }
    }
}