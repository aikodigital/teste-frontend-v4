

export function orderBydateObject(arrayList: any) {
    let aux = arrayList.map(equipment => {
        if (equipment.positions && equipment.positions.length > 0) {
            // Ordena as posições por data (da mais recente para a mais antiga)
            equipment.positions.sort((a, b) => 
                new Date(b.date).getTime() - new Date(a.date).getTime())
        
        }
        return equipment
    });
    return aux;
}

export function orderBydate(arrayList:any){
    let aux = arrayList.map(equipment => {
        if (equipment.states && equipment.states.length > 0) {
            // Ordena as posições por data (da mais recente para a mais antiga)
            equipment.states.sort((a, b) => 
                new Date(b.date).getTime() - new Date(a.date).getTime())
        
        }
        return equipment
    });
    return aux;
}