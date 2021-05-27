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
    public class TiempoPromedioController : ControllerBase
    {
        private string connectionString = "Server=127.0.0.1;Port=3306;Database=ternium;Uid=root;password=; Allow Zero Datetime=true;";
        private readonly ILogger<TiempoPromedioController> _logger;

        public TiempoPromedioController(ILogger<TiempoPromedioController> logger)
        {
            _logger = logger;
        }
        
        public IList<Models.TiempoPromedio> ListaUsuarios { get; set; }

        [HttpGet]
        public IEnumerable<Models.TiempoPromedio> Get(string user)
        {
            try{
                MySqlConnection conexion = new MySqlConnection(connectionString);
                conexion.Open();

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conexion;
                cmd.CommandText = "SELECT AVG(TIMESTAMPDIFF(MINUTE,pregunta.startTime,pregunta.endTime)) as averageTime FROM `juego` INNER JOIN pregunta ON juego.id = pregunta.idJuego WHERE juego.user = \""+user+"\" ";

                
                Models.TiempoPromedio usr1 = new Models.TiempoPromedio();
                ListaUsuarios = new List<Models.TiempoPromedio>();
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        usr1 = new Models.TiempoPromedio();
                        usr1.tiempoPromedio = float.Parse(reader["averageTime"].ToString());

                        ListaUsuarios.Add(usr1);
                    }
                }
                conexion.Dispose();
                return ListaUsuarios;
            }catch(Exception e){
                Console.WriteLine(e);
                return Enumerable.Range(1,1).Select(index => new Models.TiempoPromedio
                {
                    
                    
                }).ToArray();
            }
            
        }

    }
}
