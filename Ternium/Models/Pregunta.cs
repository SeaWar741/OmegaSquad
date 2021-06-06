using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ternium.Models
{
    public class Pregunta
    {
        public string tipo {get;set;}
        public string startTime {get;set;}
        public string endTime {get;set;}
        public int isCorrecta {get;set;}
        public int idJuego {get;set;}

    }
}