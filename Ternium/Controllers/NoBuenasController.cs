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
    public class NoBuenasController : ControllerBase
    {
        private string connectionString = "Server=127.0.0.1;Port=3308;Database=ternium;Uid=root;password=; Allow Zero Datetime=true;";
        private readonly ILogger<NoBuenasController> _logger;

        public NoBuenasController(ILogger<NoBuenasController> logger)
        {
            _logger = logger;
        }
        
        public IList<Models.NoBuenas> ListaUsuarios { get; set; }

        [HttpGet]
        public IEnumerable<Models.NoBuenas> Get(string tipo,string user,string categoria)
        {
            try{
                MySqlConnection conexion = new MySqlConnection(connectionString);
                conexion.Open();

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conexion;
                cmd.CommandText = "SELECT COUNT(*) as totales FROM pregunta INNER JOIN juego ON pregunta.idJuego = juego.id INNER JOIN tipopregunta ON tipopregunta.id = pregunta.tipo WHERE ( tipopregunta.tipo = \""+tipo+"\" AND USER = \""+user+"\" AND pregunta.isCorrecta = 0 AND tipopregunta.Categoria = \""+categoria+"\" )";

                
                Models.NoBuenas usr1 = new Models.NoBuenas();
                ListaUsuarios = new List<Models.NoBuenas>();
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        usr1 = new Models.NoBuenas();
                        usr1.noBuenas = int.Parse(reader["totales"].ToString());

                        ListaUsuarios.Add(usr1);
                    }
                }
                conexion.Dispose();
                return ListaUsuarios;
            }catch(Exception e){
                Console.WriteLine(e);
                return Enumerable.Range(1,1).Select(index => new Models.NoBuenas
                {
                    
                    
                }).ToArray();
            }
            
        }

    }
}
