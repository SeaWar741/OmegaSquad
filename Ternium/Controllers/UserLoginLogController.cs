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
    public class UserLoginLogController : ControllerBase
    {
        private string connectionString = "Server=127.0.0.1;Port=3308;Database=ternium;Uid=root;password=;";
        private readonly ILogger<UserLoginLogController> _logger;

        public UserLoginLogController(ILogger<UserLoginLogController> logger)
        {
            _logger = logger;
        }
        
        public IList<Models.LoginLog> ListaUsuarios { get; set; }

        [HttpGet]
        public IEnumerable<Models.LoginLog> Get(string user)
        {
            try{
                MySqlConnection conexion = new MySqlConnection(connectionString);
                conexion.Open();

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conexion;
                cmd.CommandText = "Select * from bitacora where user='"+user+"'";


                Models.LoginLog usr1 = new Models.LoginLog();
                ListaUsuarios = new List<Models.LoginLog>();
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        usr1 = new Models.LoginLog();
                        usr1.user = reader["user"].ToString();
                        usr1.timestamp = reader["date"].ToString();

                        ListaUsuarios.Add(usr1);
                    }
                }
                conexion.Dispose();
                return ListaUsuarios;
            }catch(Exception e){
                return Enumerable.Range(1,1).Select(index => new Models.LoginLog
                {
                    user = "Bad Request: "+e.ToString(),
                    
                }).ToArray();
            }
            
        }

    }
}
