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
    public class ImagesController : ControllerBase
    {
        private string connectionString = "https://chatarrap-api.herokuapp.com/Images";
        private readonly ILogger<ImagesController> _logger;

        public ImagesController(ILogger<ImagesController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public String Get()
        {
            try  {

                var httpWebRequest = (HttpWebRequest)WebRequest.Create(connectionString);
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
