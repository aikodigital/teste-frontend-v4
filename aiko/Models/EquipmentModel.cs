using System.Collections.Generic;

namespace aiko.Models
{
    public class EquipmentModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public List<HourlyEarnings> HourlyEarnings { get; set; }
    }

    public class HourlyEarnings
    {
        public string EquipmentStateId { get; set; }
        public decimal Value { get; set; }
    }
}
