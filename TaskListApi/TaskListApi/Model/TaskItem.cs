using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TaskListApi.Model
{
    public class TaskItem
    {
        [Key]
        public string TaskKey { get; set; }
        public string TaskName { get; set; }
        public string TaskDescription { get; set; }
        public string AssignedTo { get; set; }
        public bool Completed { get; set; }
    }
}