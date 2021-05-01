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
    public class LoginLogController : ControllerBase
    {
        private string connectionString = "Server=127.0.0.1;Port=3308;Database=ternium;Uid=root;password=;";
        private readonly ILogger<LoginLogController> _logger;

        public LoginLogController(ILogger<LoginLogController> logger)
        {
            _logger = logger;
        }
        
        public IList<Models.LoginLog> ListaUsuarios { get; set; }

        [HttpGet]
        public IEnumerable<Models.LoginLog> Get()
        {
            try{
                MySqlConnection conexion = new MySqlConnection(connectionString);
                conexion.Open();

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conexion;
                cmd.CommandText = "Select * from bitacora";


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


        [HttpPost]
        public IEnumerable<Models.LoginLog> Post(string user,string date)
        {
            try  {

                string Query ="insert into bitacora(user,date) values ('" + user + "','" + date + "')"; 

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
                
                return Enumerable.Range(1,1).Select(index => new Models.LoginLog
                {
                    user = "Inserted Successfully"
                    
                }).ToArray();  
                
            }  
            catch (Exception e)  
            {   
                return Enumerable.Range(1,1).Select(index => new Models.LoginLog
                {
                    user = "Bad Request: "+e.ToString(),
                    
                }).ToArray();
            }  
        }

    }
}
