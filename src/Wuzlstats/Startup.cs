﻿using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.Data.Entity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.PlatformAbstractions;
using Wuzlstats.Models;
using Wuzlstats.ViewModels.Hubs;

namespace Wuzlstats
{
    public class Startup
    {
        // ReSharper disable once UnusedParameter.Local
        public Startup(IHostingEnvironment env, IApplicationEnvironment appEnv)
        {
            Configuration = new ConfigurationBuilder()
                .SetBasePath(appEnv.ApplicationBasePath)
                .AddJsonFile("config.json")
                .AddEnvironmentVariables("Wuzlstats.")
                .Build();
        }


        public IConfiguration Configuration { get; set; }


        public void ConfigureServices(IServiceCollection services)
        {
            var settings = new AppSettings(Configuration);
            services.AddSingleton(x => settings);
            services.AddTransient<ReloadPlayersViewModel>();

            services
                .AddEntityFramework()
                .AddSqlServer()
                .AddDbContext<Db>(options => { options.UseSqlServer(settings.DatabaseConnectionString); });

            services.AddSignalR(options => { options.Hubs.EnableDetailedErrors = true; });
            services.AddMvc();
        }


        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerfactory)
        {
            app.ApplicationServices
                .GetService<Db>()
                .Database
                .EnsureCreated();

            loggerfactory.AddConsole();

            //app.UseExceptionHandler("/Home/Error");
            app.UseDeveloperExceptionPage();

            app.UseIISPlatformHandler();

            app.UseStaticFiles();

            app.UseSignalR();

            app.UseMvc(routes => { routes.MapRoute("default", "{controller=Home}/{action=Index}/{id?}"); });
        }
    }
}