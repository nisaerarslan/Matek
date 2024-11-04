using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Matek.Model
{
    public class AllViewModel
    {
        public required LoginViewModel LoginViewModel { get; set; }
        public required RegisterViewModel RegisterViewModel { get; set; }
    }
}