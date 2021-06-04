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
    public class LogrosUsuarioController : ControllerBase
    {
        private string connectionString = "Server=127.0.0.1;Port=3308;Database=ternium;Uid=root;password=; Allow Zero Datetime=true;";
        private readonly ILogger<LogrosUsuarioController> _logger;

        public LogrosUsuarioController(ILogger<LogrosUsuarioController> logger)
        {
            _logger = logger;
        }
        
        public IList<Models.LogrosUsuario> ListaUsuarios { get; set; }

        [HttpGet]
        public IEnumerable<Models.LogrosUsuario> Get(string user)
        {
            try{
                MySqlConnection conexion = new MySqlConnection(connectionString);
                conexion.Open();

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conexion;
                cmd.CommandText = "SELECT tipologro.id as idDeLogro, tipologro.name, logros.earnTime, tipologro.imageLink FROM `logros` INNER JOIN tipologro ON logros.type = tipologro.id WHERE logros.user = \""+user+"\" ";

                
                Models.LogrosUsuario usr1 = new Models.LogrosUsuario();
                ListaUsuarios = new List<Models.LogrosUsuario>();
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        usr1 = new Models.LogrosUsuario();
                        usr1.idTipoLogro = int.Parse(reader["idDeLogro"].ToString());
                        usr1.nombre = reader["name"].ToString();
                        usr1.earnTime = reader["earnTime"].ToString();
                        usr1.imageLink = reader["imageLink"].ToString();


                        ListaUsuarios.Add(usr1);
                    }
                }
                conexion.Dispose();
                return ListaUsuarios;
            }catch(Exception e){
                Console.WriteLine(e);
                return Enumerable.Range(1,1).Select(index => new Models.LogrosUsuario
                {
                    
                    
                }).ToArray();
            }
            
        }

    }
}
