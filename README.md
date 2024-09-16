# Gestão de Equipamentos

## Overview

This application is designed for managing and monitoring equipment with functionalities like displaying equipment on a map, filtering equipment data, and calculating operational metrics like productivity and earnings.

## Features

- **Map Visualization**: Displays equipment on an interactive map using `react-leaflet`.
- **Filtering**: Equipment can be filtered based on state, model, and operational date range.
- **Equipment Details**: Provides detailed information about each equipment, including its operational state and historical data.
- **Productivity and Earnings Calculation**: Displays productivity percentage and earnings based on the operational state of the equipment.

## Technologies Used

- **React**: For building the user interface.
- **React-Leaflet**: For map visualization.
- **Material-UI**: For UI components like buttons and inputs.
- **SCSS**: For styling.
- **Jest**: For testing (though tests aren't implemented).
- **JSON**: For data storage.

## Project Structure

- `App.js`: The main application component. Initializes states, handles data fetching, and controls the layout of the app.
- `components/`: Contains reusable React components like `EquipmentMap`, `EquipmentList`, `EquipmentDetails`, `Filters`, and `SearchBar`.
- `data/`: Contains JSON files used to populate the application with equipment data.
- `utils/`: Utility functions for calculations like `calculateProductivity` and `calculateEarnings`.
- `styles/`: Contains SCSS styles for the application.

## Installation and Setup

1. **Clone the Repository**:
    ```bash
    git clone <repository_url>
    cd <project_directory>
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Run the Application**:
    ```bash
    npm start
    ```

    The application will be available at `http://localhost:3000`.

## Usage

1. **Map Interaction**: The map displays equipment as markers. Clicking on a marker shows a popup with detailed information about the equipment, including its operational state and productivity.
2. **Search**: Use the search bar to find equipment by name.
3. **Filters**: Filter equipment based on state, model, and date range.
4. **Clear Filters**: Use the "Limpar Pesquisa" button to reset all filters.
5. **View Details**: Click on "Ver Histórico Completo" to see detailed information about the selected equipment.

## Components

### `App.js`
- Initializes and manages the application's state.
- Renders child components like `EquipmentMap`, `EquipmentList`, `EquipmentDetails`, and `Filters`.
- Implements functions to handle user interactions, such as filtering and searching equipment.

### `EquipmentMap.js`
- Uses `react-leaflet` to render a map with equipment markers.
- Displays tooltips for each equipment with its current state, productivity, and earnings.
- Draws polylines to show the equipment's movement history.

### `EquipmentList.js`
- Renders a list of equipment.
- Calls `onEquipmentClick` to handle user clicks on equipment items.

### `EquipmentDetails.js`
- Shows detailed information about the selected equipment, including its state history.

### `Filters.js`
- Provides filtering options for state, model, and date range.
- Calls `onFilterChange` to update the filter criteria.

### `SearchBar.js`
- Contains an input field for searching equipment by name.

## Utilities

### `calculateProductivity.js`
- Calculates the productivity percentage based on the equipment's operational state.

### `calculateEarnings.js`
- Calculates earnings based on the equipment model's hourly earnings and the equipment's operational state history.

### `formatBRL.js`
- Formats numbers into the Brazilian Real (R$) currency format.

## Data Structure

- `equipment.json`: Contains details about each equipment.
- `equipmentModel.json`: Defines the models for the equipment and includes hourly earnings information.
- `equipmentPositionHistory.json`: Stores historical positional data for each equipment.
- `equipmentState.json`: Defines the possible states for equipment.
- `equipmentStateHistory.json`: Tracks the state history of each equipment.

## Future Improvements

- **Performance Optimization**: Enhance filtering and map rendering for large datasets.
- **Accessibility**: Improve accessibility features for better usability.
- **Error Handling**: Add comprehensive error handling and validation for robust application behavior.

## License

This project is licensed under the MIT License.

## Contact

For questions or suggestions, please reach out to [Luiz Felipe Apolinário](mailto:lfelipeapo@gmail.com).