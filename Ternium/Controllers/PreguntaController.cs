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
    public class PreguntaController : ControllerBase
    {
        private string connectionString = "Server=127.0.0.1;Port=3308;Database=ternium;Uid=root;password=; Allow Zero Datetime=true;";
        private readonly ILogger<PreguntaController> _logger;

        public PreguntaController(ILogger<PreguntaController> logger)
        {
            _logger = logger;
        }
        

        [HttpPost]
        public IEnumerable<Models.Pregunta> Post(string tipo, string startTime, string endTime, int isCorrecta, int idJuego)
        {
            try  {

                string Query ="INSERT INTO `pregunta` (`id`, `tipo`, `startTime`, `endTime`, `isCorrecta`, `idJuego`) VALUES (NULL, '"+tipo+"', '"+startTime+"', '"+endTime+"', '"+isCorrecta+"', '"+idJuego+"')"; 

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
                
                return Enumerable.Range(1,1).Select(index => new Models.Pregunta
                {
                    tipo = "Inserted Successfully"
                    
                }).ToArray();  
                
            }  
            catch (Exception e)  
            {   
                return Enumerable.Range(1,1).Select(index => new Models.Pregunta
                {
                    tipo = "Bad Request "+e.ToString(),
                    
                }).ToArray();
            }  
        }

    }
}
