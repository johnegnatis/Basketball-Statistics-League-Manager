Player Improvement
```sql
create view player_improvement as
select ssn, sum(if((half = 1), -rating, rating)) as 'improvement' from
(select ssn, avg(rating) as 'rating', tile_nr as 'half' from
(select pgs.ssn, ntile(2) over(order by pgs.Game_date) as tile_nr, (pgs.fg_made/pgs.fg_attempt) as 'rating', g.Game_date 
from game g, player_game_statistics pgs 
where (pgs.Home_team = 'Alpha' or pgs.Away_team = 'Alpha') and pgs.Home_team = g.Home_team 
and pgs.Away_team = G.Away_team and pgs.Game_date = g.Game_date) as tbl
group by tile_nr, ssn) as tbl
group by ssn
```

Overall Preformance
```sql
create view OVERALL_PREFORMANCE
as select game.year as year, Fname, Lname, avg(minutes) as average_minutes, sum(fg_made)
as fg_total, avg(fg_made / fg_attempt) as fg_percentage, sum(three_pt_made) as three_pt_total,
avg(three_pt_made / three_pt_attempt) as three_pt_percentage, sum(ft_made) as ft_total,
avg(ft_made / ft_attempt) as ft_percentage, avg(plus_minus) as plus_minus_avg
from player_game_statistics, player, game
where player.SSN = player_game_statistics.SSN AND
game.home_team = player_game_statistics.home_team AND
game.away_team = player_game_statistics.away_team AND
game.game_date = player_game_statistics.game_date
group by player_game_statistics.SSN, game.year
```