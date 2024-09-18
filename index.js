const jsonServer = require('json-server');
const path = require('path');
const router = jsonServer.router({
  equipment: require(path.join(__dirname, 'data', 'equipment.json')),
  equipmentModel: require(path.join(__dirname, 'data', 'equipmentModel.json')),
  equipmentState: require(path.join(__dirname, 'data', 'equipmentState.json')),
  equipmentStateHistory: require(path.join(__dirname, 'data', 'equipmentStateHistory.json')),
  equipmentPositionHistory: require(path.join(__dirname, 'data', 'equipmentPositionHistory.json')),
});
const middlewares = jsonServer.defaults();
const server = jsonServer.create();

server.use(middlewares);
server.use(router);
server.listen(3001, () => {
  console.log('JSON Server is running on port 3001');
});
