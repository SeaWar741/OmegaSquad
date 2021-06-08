using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ternium.Models
{
    public class Dia
    {
        public string day {get;set;}
        public int hours {get;set;}        
    }
    public class TiempoDiaSemanaActual
    {
        public float lunes {get;set;}

        public float martes {get;set;}

        public float miercoles {get;set;}

        public float jueves {get;set;}

        public float viernes {get;set;}

        public float sabado {get;set;}

        public float domingo {get;set;}
    }
}
