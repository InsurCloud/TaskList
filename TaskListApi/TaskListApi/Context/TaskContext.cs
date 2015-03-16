using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using TaskListApi.Model;

namespace TaskListApi.Context
{
    public class TaskContext : DbContext
    {
        public TaskContext()
            : base("TaskContext")
        {

        }

        public DbSet<TaskItem> Tasks { get; set; }    
    }
}