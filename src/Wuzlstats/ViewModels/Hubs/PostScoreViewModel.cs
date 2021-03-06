﻿using System;
using System.Linq;
using System.Threading.Tasks;
using Wuzlstats.Extensions;
using Wuzlstats.Models;
using Microsoft.EntityFrameworkCore;

namespace Wuzlstats.ViewModels.Hubs
{
    public class PostScoreViewModel
    {
        //TODO: All these methods should move to a dedicated service
        public async Task<PostScoreViewModel> Save(League league, Db db)
        {
            if (!BluePlayer.IsNullOrEmpty() && !RedPlayer.IsNullOrEmpty())
            {
                await SavePlayerScore(league, db);
            }
            else
            {
                await SaveTeamScore(league, db);
            }
            return this;
        }


        private async Task SavePlayerScore(League league, Db db)
        {
            ValidateScore(BluePlayerScore, RedPlayerScore);
            if (BluePlayer.IsNullOrWhiteSpace() || RedPlayer.IsNullOrWhiteSpace())
            {
                throw new Exception("One or more player names are empty.");
            }

            var bluePlayer = await GetOrCreatePlayer(BluePlayer, league, db);
            var redPlayer = await GetOrCreatePlayer(RedPlayer, league, db);
            var game = await CreateGame(RedPlayerScore, BluePlayerScore, league, db);

            await CreatePosition(game, redPlayer, PlayerPositionTypes.Red, db);
            await CreatePosition(game, bluePlayer, PlayerPositionTypes.Blue, db);
        }


        private async Task SaveTeamScore(League league, Db db)
        {
            ValidateScore(BlueTeamScore, RedTeamScore);
            if (BlueTeamOffense.IsNullOrWhiteSpace() || BlueTeamDefense.IsNullOrWhiteSpace() || RedTeamOffense.IsNullOrWhiteSpace() || RedTeamDefense.IsNullOrWhiteSpace())
            {
                throw new Exception("One or more player names are empty.");
            }

            var blueOffense = await GetOrCreatePlayer(BlueTeamOffense, league, db);
            var blueDefense = await GetOrCreatePlayer(BlueTeamDefense, league, db);
            var redOffense = await GetOrCreatePlayer(RedTeamOffense, league, db);
            var redDefense = await GetOrCreatePlayer(RedTeamDefense, league, db);
            var game = await CreateGame(RedTeamScore, BlueTeamScore, league, db);

            await CreatePosition(game, blueOffense, PlayerPositionTypes.BlueOffense, db);
            await CreatePosition(game, blueDefense, PlayerPositionTypes.BlueDefense, db);
            await CreatePosition(game, redOffense, PlayerPositionTypes.RedOffense, db);
            await CreatePosition(game, redDefense, PlayerPositionTypes.RedDefense, db);
        }


        /// <summary>
        /// A score must be greater than or equal to zero. Both scores can't be zero.
        /// </summary>
        private static void ValidateScore(int blueScore, int redScore)
        {
            //both scores must not be negative
            if (blueScore < 0 || redScore < 0)
            {
                throw new ArgumentException("Invalid score, a score must be greater than or equal to zero.");
            }
            //Both scores can't be zero
            if (blueScore <= 0 && redScore <= 0)
            {
                throw new ArgumentException("Invalid scores, both can't be zero.");
            }
        }


        private async Task<Models.Player> GetOrCreatePlayer(string name, League league, Db db)
        {
            name = name.Trim();
            var playerQuery = db.Players.Where(x => x.LeagueId == league.Id);
            var player = await playerQuery.FirstOrDefaultAsync(x => x.Name.ToLower() == name.ToLower());
            if (player != null)
            {
                return player;
            }
            player = new Models.Player
            {
                LeagueId = league.Id,
                Name = name
            };
            db.Players.Add(player);
            await db.SaveChangesAsync();
            return player;
        }


        private async Task<Game> CreateGame(int redScore, int blueScore, League league, Db db)
        {
            var game = new Game
            {
                BlueScore = blueScore,
                RedScore = redScore,
                Date = DateTime.UtcNow,
                LeagueId = league.Id
            };
            db.Games.Add(game);
            await db.SaveChangesAsync();
            return game;
        }


        private async Task CreatePosition(Game game, Models.Player player, PlayerPositionTypes position, Db db)
        {
            db.PlayerPositions.Add(new PlayerPosition
            {
                GameId = game.Id,
                PlayerId = player.Id,
                Position = position
            });
            await db.SaveChangesAsync();
        }


        public string BluePlayer { get; set; }
        public string RedPlayer { get; set; }
        public int RedPlayerScore { get; set; }
        public int BluePlayerScore { get; set; }

        public string BlueTeamOffense { get; set; }
        public string RedTeamOffense { get; set; }
        public string BlueTeamDefense { get; set; }
        public string RedTeamDefense { get; set; }
        public int RedTeamScore { get; set; }
        public int BlueTeamScore { get; set; }
    }
}
