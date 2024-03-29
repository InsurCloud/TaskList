﻿using Microsoft.Owin;
using Microsoft.Owin.Security.OAuth;
using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using TaskListApi.App_Startup;

[assembly: OwinStartup(typeof(TaskListApi.Startup))]
namespace TaskListApi
{
    public class Startup
    {

        public void Configuration(IAppBuilder app)
        {

            HttpConfiguration config = new HttpConfiguration();

            ConfigureOAuth(app);

            WebApiConfig.Register(config);

            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);

            app.UseWebApi(config);



        }

        private void ConfigureOAuth(IAppBuilder app)
        {

            //Token Consumption

            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions
            {

            });

        }

    }
}