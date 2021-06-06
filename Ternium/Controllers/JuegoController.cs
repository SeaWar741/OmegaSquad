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
    public class JuegoController : ControllerBase
    {
        private string connectionString = "Server=127.0.0.1;Port=3308;Database=ternium;Uid=root;password=; Allow Zero Datetime=true;";
        private readonly ILogger<JuegoController> _logger;

        public JuegoController(ILogger<JuegoController> logger)
        {
            _logger = logger;
        }
        

        [HttpPost]
        public IEnumerable<Models.Juego> Post(string user, string startTime, string endTime)
        {
            try  {

                string Query ="INSERT INTO `juego` (`id`, `user`, `startTime`, `endTime`) VALUES (NULL, '" + user + "','" + startTime + "','" + endTime + "')"; 

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
                
                return Enumerable.Range(1,1).Select(index => new Models.Juego
                {
                    user = "Inserted Successfully"
                    
                }).ToArray();  
                
            }  
            catch (Exception e)  
            {   
                return Enumerable.Range(1,1).Select(index => new Models.Juego
                {
                    user = "Bad Request "+e.ToString(),
                    
                }).ToArray();
            }  
        }

    }
}
