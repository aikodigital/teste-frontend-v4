using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json;
using aiko.Models; // Certifique-se de que este namespace está correto

namespace aiko.Services
{
    public class DataService
    {
        private readonly string _dataFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "data");

        public List<Equipment> GetEquipments()
        {
            var filePath = Path.Combine(_dataFolderPath, "equipment.json");
            return ReadJsonFile<List<Equipment>>(filePath);
        }

        public List<EquipmentPositionHistory> GetEquipmentPositionHistories()
        {
            var filePath = Path.Combine(_dataFolderPath, "equipmentPositionHistory.json");
            return ReadJsonFile<List<EquipmentPositionHistory>>(filePath);
        }

        public List<EquipmentState> GetEquipmentStates()
        {
            var filePath = Path.Combine(_dataFolderPath, "equipmentState.json");
            return ReadJsonFile<List<EquipmentState>>(filePath);
        }

        public List<EquipmentStateHistory> GetEquipmentStateHistories()
        {
            var filePath = Path.Combine(_dataFolderPath, "equipmentStateHistory.json");
            return ReadJsonFile<List<EquipmentStateHistory>>(filePath);
        }

        // Corrigido para retornar EquipmentState, não State
        // Se precisar de um método separado para EquipmentState, use GetEquipmentStates
        // public List<EquipmentState> GetStates()
        // {
        //     var filePath = Path.Combine(_dataFolderPath, "equipmentState.json");
        //     return ReadJsonFile<List<EquipmentState>>(filePath);
        // }

        private T ReadJsonFile<T>(string filePath)
        {
            if (!File.Exists(filePath))
            {
                return default;
            }

            var json = File.ReadAllText(filePath);
            return JsonConvert.DeserializeObject<T>(json);
        }
    }
}
