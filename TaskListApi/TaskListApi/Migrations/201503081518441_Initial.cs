namespace TaskListApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.TaskItems",
                c => new
                    {
                        TaskKey = c.String(nullable: false, maxLength: 128),
                        TaskName = c.String(),
                        TaskDescription = c.String(),
                        AssignedTo = c.String(),
                        Completed = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.TaskKey);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.TaskItems");
        }
    }
}
