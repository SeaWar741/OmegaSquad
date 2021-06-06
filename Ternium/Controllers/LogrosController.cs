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
    public class LogrosController : ControllerBase
    {
        private string connectionString = "Server=127.0.0.1;Port=3308;Database=ternium;Uid=root;password=; Allow Zero Datetime=true;";
        private readonly ILogger<LogrosController> _logger;

        public LogrosController(ILogger<LogrosController> logger)
        {
            _logger = logger;
        }
        
        public IList<Models.Logros> ListaUsuarios { get; set; }

        [HttpPost]
        public IEnumerable<Models.Logros> Post(string user, int type, string earnTime)
        {
            try{
            
                string Query = "INSERT INTO `logros` (`user`, `id`, `type`, `earnTime`) VALUES (' "+ user +" ', NULL, ' " + type + " ', ' " + earnTime + " ' )   ";
                
                Console.WriteLine(Query);

                MySqlConnection MyConn2 = new MySqlConnection(connectionString);  

                MySqlCommand MyCommand2 = new MySqlCommand(Query, MyConn2);  
                MySqlDataReader MyReader2;  

                MyConn2.Open();  
                
                MyReader2 = MyCommand2.ExecuteReader();     // Here our query will be executed and data saved into the database.  
                
                while (MyReader2.Read())  
                {                     
                }  
                
                MyConn2.Close();
                
                return Enumerable.Range(1,1).Select(index => new Models.Logros
                {
                    user = "Inserted Successfully"
                    
                }).ToArray();  
                
            }  
            catch (Exception e)  
            {   
                return Enumerable.Range(1,1).Select(index => new Models.Logros
                {
                    user = "Bad Request "+e.ToString(),
                    
                }).ToArray();
            }  
        }

    }
}