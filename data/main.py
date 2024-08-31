import requests
import json

BASE_URL = 'http://localhost:5000'

def register_equipment_state():
    with open('equipmentState.json', 'r') as file:
        equipment_states = json.load(file)

    for state in equipment_states:
        response = requests.post(f'{BASE_URL}/equipment-state', json=state)
        if response.status_code == 201:
            print(f"Registered equipment state {state['name']}")
        else:
            print(f"Failed to register equipment state {state['name']}: {response.text}")
    return {state['id']: state for state in equipment_states}

def register_hourly_earnings(equipment_states):
    with open('equipmentModel.json', 'r') as file:
        equipment_models = json.load(file)

    hourly_earnings_map = {}

    for model in equipment_models:
        for earning in model['hourlyEarnings']:
            if earning['equipmentStateId'] in equipment_states:
                response = requests.post(f'{BASE_URL}/hourly-earning', json=earning)
                if response.status_code == 201:
                    print(f"Registered hourly earning for state {earning['equipmentStateId']}")
                    hourly_earnings_map[earning['equipmentStateId']] = earning
                else:
                    print(f"Failed to register hourly earning: {response.text}")

    return hourly_earnings_map

def register_equipment_model(hourly_earnings):
    with open('equipmentModel.json', 'r') as file:
        equipment_models = json.load(file)

    for model in equipment_models:
        for earning in model['hourlyEarnings']:
            earning['value'] = hourly_earnings[earning['equipmentStateId']]['value']
        response = requests.post(f'{BASE_URL}/equipment-model', json=model)
        if response.status_code == 201:
            print(f"Registered equipment model {model['name']}")
        else:
            print(f"Failed to register equipment model {model['name']}: {response.text}")

    return {model['id']: model for model in equipment_models}

def register_equipment(equipment_models):
    with open('equipment.json', 'r') as file:
        equipments = json.load(file)

    for equipment in equipments:
        if equipment['equipmentModelId'] in equipment_models:
            response = requests.post(f'{BASE_URL}/equipment', json=equipment)
            if response.status_code == 201:
                print(f"Registered equipment {equipment['name']}")
            else:
                print(f"Failed to register equipment {equipment['name']}: {response.text}")

    return {equipment['id']: equipment for equipment in equipments}

def register_equipment_position_history(equipments):
    with open('equipmentPositionHistory.json', 'r') as file:
        position_histories = json.load(file)

    for history in position_histories:
        if history['equipmentId'] in equipments:
            response = requests.post(f'{BASE_URL}/equipment-position-history', json=history)
            if response.status_code == 201:
                print(f"Registered position history for equipment {history['equipmentId']}")
            else:
                print(f"Failed to register position history: {response.text}")

def register_equipment_state_history(equipments, equipment_states):
    with open('equipmentStateHistory.json', 'r') as file:
        state_histories = json.load(file)

    for history in state_histories:
        if history['equipmentId'] in equipments:
            for state in history['states']:
                if state['equipmentStateId'] not in equipment_states:
                    print(f"Equipment state {state['equipmentStateId']} not found")
                    continue
            response = requests.post(f'{BASE_URL}/equipment-state-history', json=history)
            if response.status_code == 201:
                print(f"Registered state history for equipment {history['equipmentId']}")
            else:
                print(f"Failed to register state history: {response.text}")

if __name__ == "__main__":
    equipment_states = register_equipment_state()
    hourly_earnings = register_hourly_earnings(equipment_states)
    equipment_models = register_equipment_model(hourly_earnings)
    equipments = register_equipment(equipment_models)
    register_equipment_position_history(equipments)
    register_equipment_state_history(equipments, equipment_states)
