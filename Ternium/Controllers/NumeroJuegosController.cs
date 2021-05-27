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
    public class NumeroJuegosController : ControllerBase
    {
        private string connectionString = "Server=127.0.0.1;Port=3306;Database=ternium;Uid=root;password=; Allow Zero Datetime=true;";
        private readonly ILogger<NumeroJuegosController> _logger;

        public NumeroJuegosController(ILogger<NumeroJuegosController> logger)
        {
            _logger = logger;
        }
        
        public IList<Models.NumeroJuegos> ListaUsuarios { get; set; }

        [HttpGet]
        public IEnumerable<Models.NumeroJuegos> Get(string user)
        {
            try{
                MySqlConnection conexion = new MySqlConnection(connectionString);
                conexion.Open();

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conexion;
                cmd.CommandText = "SELECT COUNT(*) as juegos FROM `juego` WHERE juego.user = \""+user+"\"  ";

                
                Models.NumeroJuegos usr1 = new Models.NumeroJuegos();
                ListaUsuarios = new List<Models.NumeroJuegos>();
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        usr1 = new Models.NumeroJuegos();
                        usr1.numeroJuegos = int.Parse(reader["juegos"].ToString());

                        ListaUsuarios.Add(usr1);
                    }
                }
                conexion.Dispose();
                return ListaUsuarios;
            }catch(Exception e){
                Console.WriteLine(e);
                return Enumerable.Range(1,1).Select(index => new Models.NumeroJuegos
                {
                    
                    
                }).ToArray();
            }
            
        }

    }
}
