using System.Threading.Tasks;
using Wuzlstats.ViewModels.Hubs;

namespace Wuzlstats.Hubs
{
    public partial class ApiHub
    {
        public async Task NotifyCallerToReloadPlayers(string league)
        {
            await Clients.Caller.SendCoreAsync("reloadPlayers", new[] { await new ReloadPlayersViewModel(_db).Fill(league) });
        }


        public async Task NotifyGroupToReloadPlayers(string league)
        {
            await Clients.Group(league).SendCoreAsync("reloadPlayers", new[] { await new ReloadPlayersViewModel(_db).Fill(league) });
        }
    }
}
