using System.Collections.Generic;

namespace aiko.Models
{
    public class EquipmentPositionHistory
    {
        public string EquipmentId { get; set; }
        public List<Position> Positions { get; set; }
    }

    public class Position
    {
        public DateTime Date { get; set; }
        public double Lat { get; set; }
        public double Lon { get; set; }
    }
}
