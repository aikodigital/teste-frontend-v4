using System;
using System.Collections.Generic;

namespace aiko.Models
{
    public class EquipmentStateHistory
    {
        public string EquipmentId { get; set; }
        public List<StateHistory> States { get; set; }
    }

    public class StateHistory
    {
        public DateTime Date { get; set; }
        public string EquipmentStateId { get; set; }
    }
}
