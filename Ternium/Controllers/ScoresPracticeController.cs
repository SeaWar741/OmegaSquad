using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using MySql.Data.MySqlClient;

namespace Ternium.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ScoresPracticeController : ControllerBase
    {
        private string connectionString = "Server=127.0.0.1;Port=3308;Database=ternium;Uid=root;password=; Allow Zero Datetime=true;";
        private readonly ILogger<ScoresPracticeController> _logger;

        public ScoresPracticeController(ILogger<ScoresPracticeController> logger)
        {
            _logger = logger;
        }

        public IList<Models.RankingPractica> ListaUsuarios { get; set; }

        [HttpGet]
        public IEnumerable<Models.RankingPractica> Get()
        {
            try{
                MySqlConnection conexion = new MySqlConnection(connectionString);
                conexion.Open();

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conexion;
                cmd.CommandText = "SELECT                juego.user,    tipopregunta.Categoria,    tipopregunta.tipo,	ROUND((SUM(case when pregunta.isCorrecta = 1 then 1 else 0 end) + 0.0 ) / (0.0 + SUM(case when pregunta.isCorrecta <> 1 then 1 else 0 end) + 		SUM(case when pregunta.isCorrecta = 1 then 1 else 0 end)), 2) AS metrica,    SUM(case when pregunta.isCorrecta = 1 then 1 else 0 end) AS puntaje FROM    pregunta INNER JOIN juego ON pregunta.idJuego = juego.id INNER JOIN tipopregunta ON tipopregunta.id = pregunta.tipo WHERE    (        tipopregunta.categoria = \"Chatarra\" AND YEARWEEK(DATE(pregunta.startTime),        1) = YEARWEEK(CURDATE(), 1))    GROUP BY        USER  ORDER BY `metrica`  DESC";

                Models.RankingPractica usr1 = new Models.RankingPractica();
                ListaUsuarios = new List<Models.RankingPractica>();
                int rank = 1;
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        usr1 = new Models.RankingPractica();
                        if(rank == 1){
                            usr1.ranking = "🥇";
                        }
                        if(rank == 2){
                            usr1.ranking = "🥈";
                        }
                        if(rank == 3){
                            usr1.ranking = "🥉";
                        }
                        if(rank >3){
                            usr1.ranking = rank.ToString();
                        }
                        usr1.user = reader["user"].ToString();
                        usr1.tipo = reader["tipo"].ToString();
                        usr1.categoria = reader["Categoria"].ToString();
                        usr1.metrica = float.Parse(reader["metrica"].ToString())*100;
                        usr1.puntaje = float.Parse(reader["puntaje"].ToString());

                        ListaUsuarios.Add(usr1);
                        rank++;
                    }
                }
                conexion.Dispose();
                return ListaUsuarios;
            }catch(Exception e){
                return Enumerable.Range(1,1).Select(index => new Models.RankingPractica
                {
                    user = "Bad Request: "+e.ToString(),

                }).ToArray();
            }

        }

    }
}