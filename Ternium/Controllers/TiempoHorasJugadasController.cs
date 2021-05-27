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
    public class TiempoHorasJugadasController : ControllerBase
    {
        private string connectionString = "Server=127.0.0.1;Port=3308;Database=ternium;Uid=root;password=; Allow Zero Datetime=true;";
        private readonly ILogger<TiempoHorasJugadasController> _logger;

        public TiempoHorasJugadasController(ILogger<TiempoHorasJugadasController> logger)
        {
            _logger = logger;
        }
        
        public IList<Models.TiempoHorasJugadas> ListaUsuarios { get; set; }

        [HttpGet]
        public IEnumerable<Models.TiempoHorasJugadas> Get(string user)
        {
            try{
                MySqlConnection conexion = new MySqlConnection(connectionString);
                conexion.Open();

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conexion;
                cmd.CommandText = "SELECT SUM(TIMESTAMPDIFF(MINUTE,juego.startTime,juego.endTime)) as total FROM juego WHERE user = \""+user+"\" " ;

                
                Models.TiempoHorasJugadas usr1 = new Models.TiempoHorasJugadas();
                ListaUsuarios = new List<Models.TiempoHorasJugadas>();
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        usr1 = new Models.TiempoHorasJugadas();
                        usr1.tiempoHorasJugadas = int.Parse(reader["total"].ToString());

                        ListaUsuarios.Add(usr1);
                    }
                }
                conexion.Dispose();
                return ListaUsuarios;
            }catch(Exception e){
                Console.WriteLine(e);
                return Enumerable.Range(1,1).Select(index => new Models.TiempoHorasJugadas
                {
                    
                    
                }).ToArray();
            }
            
        }

    }
}
