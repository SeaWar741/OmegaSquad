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
        public int lunes {get;set;}

        public int martes {get;set;}

        public int miercoles {get;set;}

        public int jueves {get;set;}

        public int viernes {get;set;}

        public int sabado {get;set;}

        public int domingo {get;set;}
    }
}
