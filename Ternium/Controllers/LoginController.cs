using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using MySql.Data.MySqlClient;

using System.Net;
using System.IO;

namespace Ternium.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private string connectionString = "https://chatarrap-api.herokuapp.com/users/login";
        private readonly ILogger<LoginController> _logger;

        public LoginController(ILogger<LoginController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public String Post(string user,string password)
        {
            try  {

                var httpWebRequest = (HttpWebRequest)WebRequest.Create(connectionString);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";

                using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    string json ="{\"username\":\""+ user +"\"," + "\"password\":\""+ password + "\"}";

                    streamWriter.Write(json);
                }

                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream())){
                    var result = streamReader.ReadToEnd();

                    return result;
                }
                
            }  
            catch (Exception e)  
            {   
                Console.WriteLine(e);
                return "{\"token\":\"Bad Request\", " + "\"user\":\"Bad Request\"}";
            }  
        }

    }
}
