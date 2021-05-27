using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ternium.Models
{
    public class RankingPractica
    {
        public int ranking {get;set;}
        public string user { get; set; }   
        public string tipo { get; set; }
        public string categoria { get; set; }
        public float metrica { get; set; }
        public float puntaje { get; set; }
    }
}
