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
    public class TiempoDiaSemanaPasadaController : ControllerBase
    {
        private string connectionString = "Server=127.0.0.1;Port=3308;Database=ternium;Uid=root;password=; Allow Zero Datetime=true;";
        private readonly ILogger<TiempoDiaSemanaPasadaController> _logger;

        public TiempoDiaSemanaPasadaController(ILogger<TiempoDiaSemanaPasadaController> logger)
        {
            _logger = logger;
        }
        
        public IList<Models.TiempoDiaSemanaActual> ListaUsuarios { get; set; }

        [HttpGet]
        public IEnumerable<Models.TiempoDiaSemanaActual> Get(string user)
        {
            try{
                MySqlConnection conexion = new MySqlConnection(connectionString);
                conexion.Open();

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conexion;
                cmd.CommandText = "SELECT SUM( CASE WHEN(DAYOFWEEK(juego.startTime) +5) % 7 +1 = 1 THEN TIMESTAMPDIFF( MINUTE, juego.startTime, juego.endTime ) ELSE 0 END ) AS lunes, SUM( CASE WHEN(DAYOFWEEK(juego.startTime) +5) % 7 +1 = 2 THEN TIMESTAMPDIFF( MINUTE, juego.startTime, juego.endTime ) ELSE 0 END ) AS martes, SUM( CASE WHEN(DAYOFWEEK(juego.startTime) +5) % 7 +1 = 3 THEN TIMESTAMPDIFF( MINUTE, juego.startTime, juego.endTime ) ELSE 0 END ) AS miercoles, SUM( CASE WHEN(DAYOFWEEK(juego.startTime) +5) % 7 +1 = 4 THEN TIMESTAMPDIFF( MINUTE, juego.startTime, juego.endTime ) ELSE 0 END ) AS jueves, SUM( CASE WHEN(DAYOFWEEK(juego.startTime) +5) % 7 +1 = 5 THEN TIMESTAMPDIFF( MINUTE, juego.startTime, juego.endTime ) ELSE 0 END ) AS viernes, SUM( CASE WHEN(DAYOFWEEK(juego.startTime) +5) % 7 +1 = 6 THEN TIMESTAMPDIFF( MINUTE, juego.startTime, juego.endTime ) ELSE 0 END ) AS sabado, SUM( CASE WHEN(DAYOFWEEK(juego.startTime) +5) % 7 +1 = 7 THEN TIMESTAMPDIFF( MINUTE, juego.startTime, juego.endTime ) ELSE 0 END ) AS domingo FROM `juego` WHERE ( juego.user = \""+user+"\" AND YEARWEEK(DATE(juego.startTime), 1) = YEARWEEK(CURDATE()- INTERVAL 1 WEEK, 1) ) ";

                
                Models.TiempoDiaSemanaActual usr1 = new Models.TiempoDiaSemanaActual();
                ListaUsuarios = new List<Models.TiempoDiaSemanaActual>();
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        usr1 = new Models.TiempoDiaSemanaActual();
                        usr1.lunes = int.Parse(reader["lunes"].ToString())/60;
                        usr1.martes = int.Parse(reader["martes"].ToString())/60;
                        usr1.miercoles = int.Parse(reader["miercoles"].ToString())/60;
                        usr1.jueves = int.Parse(reader["jueves"].ToString())/60;
                        usr1.viernes = int.Parse(reader["viernes"].ToString())/60;
                        usr1.sabado = int.Parse(reader["sabado"].ToString())/60;
                        usr1.domingo = int.Parse(reader["domingo"].ToString())/60;

                        ListaUsuarios.Add(usr1);
                    }
                }
                conexion.Dispose();
                return ListaUsuarios;
            }catch(Exception e){
                Console.WriteLine(e);
                return Enumerable.Range(1,1).Select(index => new Models.TiempoDiaSemanaActual
                {
                    
                    
                }).ToArray();
            }
            
        }

    }
}
