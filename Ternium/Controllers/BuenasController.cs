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
    public class BuenasController : ControllerBase
    {
        private string connectionString = "Server=127.0.0.1;Port=3308;Database=ternium;Uid=root;password=; Allow Zero Datetime=true;";
        private readonly ILogger<BuenasController> _logger;

        public BuenasController(ILogger<BuenasController> logger)
        {
            _logger = logger;
        }
        
        public IList<Models.Buenas> ListaBuenas { get; set; }

        [HttpGet]
        public IEnumerable<Models.Buenas> Get(string user,string tipo,string categoria)
        {
            try{
                MySqlConnection conexion = new MySqlConnection(connectionString);
                conexion.Open();

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conexion;
                cmd.CommandText = "SELECT    COUNT(*) as totales FROM    pregunta INNER JOIN juego ON pregunta.idJuego = juego.id INNER JOIN tipopregunta ON tipopregunta.id = pregunta.tipo WHERE    (         tipopregunta.tipo = \""+tipo+"\" AND USER = \""+user+"\" AND pregunta.isCorrecta = 1 AND tipopregunta.Categoria = \""+categoria+"\"    )";

                
                Models.Buenas usr1 = new Models.Buenas();
                ListaBuenas = new List<Models.Buenas>();
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        usr1 = new Models.Buenas();
                        usr1.buenas = int.Parse(reader["totales"].ToString());

                        ListaBuenas.Add(usr1);
                    }
                }
                conexion.Dispose();
                return ListaBuenas;
            }catch(Exception e){
                Console.WriteLine(e);
                return Enumerable.Range(1,1).Select(index => new Models.Buenas
                {
                    
                    
                }).ToArray();
            }
            
        }

    }
}
