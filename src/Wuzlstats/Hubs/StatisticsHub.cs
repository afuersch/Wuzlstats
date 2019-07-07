﻿using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Wuzlstats.ViewModels.Hubs;

namespace Wuzlstats.Hubs
{
    public partial class ApiHub
    {
        public async Task NotifyCallerToReloadStatistics(string league)
        {
            var viewModel = await _services.GetRequiredService<LeagueStatisticsViewModel>().Fill(await CheckAndLoadLeague(league));
            await Clients.Caller.SendCoreAsync("reloadStatistics", new[] { viewModel });
        }


        public async Task NotifyGroupToReloadStatistics(string league)
        {
            var viewModel = await _services.GetRequiredService<LeagueStatisticsViewModel>().Fill(await CheckAndLoadLeague(league));
            await Clients.Group(league).SendCoreAsync("reloadStatistics", new[] { viewModel });
        }
    }
}