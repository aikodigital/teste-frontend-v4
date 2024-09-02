import requests
import json

BASE_URL = 'http://localhost:5000'

def register_equipment_state():
    with open('equipmentState.json', 'r') as file:
        equipment_states = json.load(file)

    equipment_state_ids = {}

    for state in equipment_states:
        response = requests.post(f'{BASE_URL}/equipment-state', json=state)
        if response.status_code == 201:
            print(f"Registered equipment state {state['name']}")
            equipment_state_ids[state['id']] = response.json()['id']
        else:
            print(f"Failed to register equipment state {state['name']}: {response.text}")

    return equipment_state_ids

def register_hourly_earnings(equipment_state_ids):
    with open('equipmentModel.json', 'r') as file:
        equipment_models = json.load(file)

    hourly_earnings_ids = {}

    for model in equipment_models:
        for earning in model['hourlyEarnings']:
            # Replace the equipmentStateId with the actual ID returned from the API
            earning['equipmentStateId'] = equipment_state_ids[earning['equipmentStateId']]
            response = requests.post(f'{BASE_URL}/hourly-earning', json=earning)
            if response.status_code == 201:
                print(f"Registered hourly earning for state {earning['equipmentStateId']}")
                hourly_earnings_ids[(model['id'], earning['equipmentStateId'])] = response.json()['id']
            else:
                print(f"Failed to register hourly earning: {response.text}")

    return hourly_earnings_ids

def register_equipment_model(hourly_earnings_ids):
    with open('equipmentModel.json', 'r') as file:
        equipment_models = json.load(file)

    equipment_model_ids = {}

    for model in equipment_models:
        for earning in model['hourlyEarnings']:
            # Replace the hourlyEarningId with the actual ID returned from the API
            earning['id'] = hourly_earnings_ids[(model['id'], earning['equipmentStateId'])]
        response = requests.post(f'{BASE_URL}/equipment-model', json=model)
        if response.status_code == 201:
            print(f"Registered equipment model {model['name']}")
            equipment_model_ids[model['id']] = response.json()['id']
        else:
            print(f"Failed to register equipment model {model['name']}: {response.text}")

    return equipment_model_ids

def register_equipment(equipment_model_ids):
    with open('equipment.json', 'r') as file:
        equipments = json.load(file)

    equipment_ids = {}

    for equipment in equipments:
        # Replace the equipmentModelId with the actual ID returned from the API
        equipment['equipmentModelId'] = equipment_model_ids[equipment['equipmentModelId']]
        response = requests.post(f'{BASE_URL}/equipment', json=equipment)
        if response.status_code == 201:
            print(f"Registered equipment {equipment['name']}")
            equipment_ids[equipment['id']] = response.json()['id']
        else:
            print(f"Failed to register equipment {equipment['name']}: {response.text}")

    return equipment_ids

def register_equipment_position_history(equipment_ids):
    with open('equipmentPositionHistory.json', 'r') as file:
        position_histories = json.load(file)

    for history in position_histories:
        # Replace the equipmentId with the actual ID returned from the API
        history['equipmentId'] = equipment_ids[history['equipmentId']]
        response = requests.post(f'{BASE_URL}/equipment-position-history', json=history)
        if response.status_code == 201:
            print(f"Registered position history for equipment {history['equipmentId']}")
        else:
            print(f"Failed to register position history: {response.text}")

def register_equipment_state_history(equipment_ids, equipment_state_ids):
    with open('equipmentStateHistory.json', 'r') as file:
        state_histories = json.load(file)

    for history in state_histories:
        # Replace the equipmentId with the actual ID returned from the API
        history['equipmentId'] = equipment_ids[history['equipmentId']]
        # Replace each equipmentStateId with the actual ID returned from the API
        for state in history['states']:
            state['equipmentStateId'] = equipment_state_ids[state['equipmentStateId']]
        response = requests.post(f'{BASE_URL}/equipment-state-history', json=history)
        if response.status_code == 201:
            print(f"Registered state history for equipment {history['equipmentId']}")
        else:
            print(f"Failed to register state history: {response.text}")

if __name__ == "__main__":
    # Step 1: Register Equipment States and save their IDs
    equipment_state_ids = register_equipment_state()

    # Step 2: Register Hourly Earnings and save their IDs
    hourly_earnings_ids = register_hourly_earnings(equipment_state_ids)

    # Step 3: Register Equipment Models and save their IDs
    equipment_model_ids = register_equipment_model(hourly_earnings_ids)

    # Step 4: Register Equipment and save their IDs
    equipment_ids = register_equipment(equipment_model_ids)

    # Step 5: Register Equipment Position History using Equipment IDs
    register_equipment_position_history(equipment_ids)

    # Step 6: Register Equipment State History using Equipment and Equipment State IDs
    register_equipment_state_history(equipment_ids, equipment_state_ids)
