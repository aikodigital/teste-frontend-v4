using Microsoft.AspNetCore.Mvc;
using aiko.Services;
using aiko.Models;
using System.Diagnostics;

namespace aiko.Controllers
{
    public class HomeController : Controller
    {
        private readonly DataService _dataService;

        public HomeController(DataService dataService)
        {
            _dataService = dataService;
        }

        public IActionResult Index()
        {
            var equipments = _dataService.GetEquipments();
            var equipmentPositionHistories = _dataService.GetEquipmentPositionHistories();
            var equipmentStates = _dataService.GetEquipmentStates();
            var equipmentStateHistories = _dataService.GetEquipmentStateHistories();

            ViewBag.Equipments = equipments;
            ViewBag.EquipmentPositionHistories = equipmentPositionHistories;
            ViewBag.EquipmentStates = equipmentStates;
            ViewBag.EquipmentStateHistories = equipmentStateHistories;

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
