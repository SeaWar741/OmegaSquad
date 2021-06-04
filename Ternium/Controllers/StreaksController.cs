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
    public class StreaksController : ControllerBase
    {
        private string connectionString = "https://chatarrap-api.herokuapp.com/users/getStreak/";
        private readonly ILogger<StreaksController> _logger;

        public StreaksController(ILogger<StreaksController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public String Get(string userid)
        {
            try  {
                string connection = connectionString+userid;
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(connection);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "GET";
                httpWebRequest.Headers["auth_key"] = "eyJhbGciOiJIUzI1NiJ9.VGVjRXF1aXBvNA.mcsN6gZZIGrggkL_i2lNgaUPo5JdInNC7_SDsLv6Fek";


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
