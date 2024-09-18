import jsonServer from "json-server";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

const equipmentPath = join(__dirname, "data", "equipment.json");
const equipmentModelPath = join(__dirname, "data", "equipmentModel.json");
const equipmentStatePath = join(__dirname, "data", "equipmentState.json");
const equipmentStateHistoryPath = join(
  __dirname,
  "data",
  "equipmentStateHistory.json"
);
const equipmentPositionHistoryPath = join(
  __dirname,
  "data",
  "equipmentPositionHistory.json"
);

let equipments = JSON.parse(readFileSync(equipmentPath, "utf-8"));
let equipmentsModel = JSON.parse(readFileSync(equipmentModelPath, "utf-8"));
let equipmentsState = JSON.parse(readFileSync(equipmentStatePath, "utf-8"));
let equipmentsStateHistory = JSON.parse(
  readFileSync(equipmentStateHistoryPath, "utf-8")
);
let equipmentsPositionHistory = JSON.parse(
  readFileSync(equipmentPositionHistoryPath, "utf-8")
);

// Middlewares padrão
server.use(middlewares);
server.use(jsonServer.bodyParser); // Para parsing de requisições POST

// GET: Retorna todos os equipamentos
server.get("/equipment", (req, res) => {
  if (Array.isArray(equipments) && Array.isArray(equipmentsModel)) {
    equipments.map((equip) => {
      const equipModel = equipmentsModel.find(
        (model) => model.id === equip.equipmentModelId
      );

      if (equipModel) {
        equip.model = equipModel;
      }

      const equipHistory = equipmentsPositionHistory.find(
        (history) => history.equipmentId === equip.id
      );

      if (equipHistory && Array.isArray(equipHistory.positions)) {
        const lastIndex = equipHistory.positions.length - 1;
        equip.lastHistory = equipHistory.positions[lastIndex];
      }

      const equipState = equipmentsStateHistory.find(
        (history) => history.equipmentId === equip.id
      );

      if (equipState && Array.isArray(equipState.states)) {
        const lastStatesIndex = equipState.states.length - 1;
        equip.lastStates = equipState.states[lastStatesIndex];

        if (equip.lastStates.equipmentStateId) {
          const equipLastState = equipmentsState.find(
            (state) => state.id === equip.lastStates.equipmentStateId
          );

          equip.lastStates.name = equipLastState.name;
          equip.lastStates.color = equipLastState.color;
        }
      }

      return equip;
    });
  }
  res.json(equipments);
});

server.get("/equipment/:id", (req, res) => {
  const equipmentId = req.params.id;
  const equipment = equipments.find((e) => e.id === equipmentId);

  if (equipment) {
    const equipModel = equipmentsModel.find(
      (model) => model.id === equipment.equipmentModelId
    );

    if (equipModel) {
      if (Array.isArray(equipModel.hourlyEarnings)) {
        equipModel.hourlyEarnings = equipModel.hourlyEarnings.map((erning) => {
          if (erning && erning.equipmentStateId) {
            const equipState = equipmentsState.find(
              (state) => state.id === erning.equipmentStateId
            );

            erning.name = equipState.name;
            erning.color = equipState.color;
          }
          return erning;
        });
      }
      equipment.model = equipModel;
    }

    const equipHistory = equipmentsPositionHistory.find(
      (history) => history.equipmentId === equipment.id
    );

    if (equipHistory && Array.isArray(equipHistory.positions)) {
      const lastIndex = equipHistory.positions.length - 1;
      equipment.lastHistory = equipHistory.positions[lastIndex];
    }

    const equipState = equipmentsStateHistory.find(
      (history) => history.equipmentId === equipment.id
    );

    if (equipState && Array.isArray(equipState.states)) {
      equipState.states.sort((a, b) => new Date(a.date) - new Date(b.date));

      equipment.states = equipState.states.map((history) => {
        const equipLastState = equipmentsState.find(
          (state) => state.id === history.equipmentStateId
        );

        history.name = equipLastState.name;
        history.color = equipLastState.color;
        return history;
      });
    }

    res.json(equipment);
  } else {
    res.status(404).json({ error: "Equipments not found" });
  }
});

// Inicia o servidor na porta 9000
server.listen(9000, () => {
  console.log("JSON Server is running on port 9000");
});
