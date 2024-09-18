import {
  TypeEquipmentBasic,
  TypeEquipmentDetailed,
} from "@/types/equipmentTypes";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useEffect, useState } from "react";
import { compareThreeDates, formatDate } from "@/helpers/dateFormatter";
import { Button } from "../ui/button";

type TableStatusProps = {
  equipmentData: TypeEquipmentDetailed;
  setState: React.Dispatch<React.SetStateAction<TypeEquipmentBasic[]>>;
};

type TypeRow = {
  statusName: string;
  date: string;
  equipmentId: string;
  statusColor: string;
  statesIndex: number;
};

const TableStatus = ({ equipmentData, setState }: TableStatusProps) => {
  const [row, setRow] = useState<TypeRow[]>([]);

  const createRow = async () => {
    try {
      equipmentData.states.forEach((state, index) => {
        const date = formatDate(state.date);

        const newRow: TypeRow = {
          date: date,
          equipmentId: state.equipmentStateId,
          statusName: state.name!,
          statusColor: state.color!,
          statesIndex: index,
        };

        setRow((prevState) => [...prevState, newRow]);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const changeMarkerPosition = (statesIndex: number) => {
    let positionIndex = -1; // Inicialize com -1 para indicar que ainda não foi encontrado
    const positions = equipmentData.positions;

    for (let i = 0; i < positions.length; i++) {
      const position = positions[i];

      // Verifica se existe a próxima posição (i + 1)
      if (i + 1 >= positions.length) {
        // Se não existe a próxima posição, compara a data do estado com a data da posição atual
        positionIndex = compareThreeDates(
          equipmentData.states[statesIndex].date,
          position.date,
          position.date, // Sem próxima data, então compara com a própria posição
          [i, i]
        );
      } else {
        // Se existe a próxima posição, faça a comparação normal
        positionIndex = compareThreeDates(
          equipmentData.states[statesIndex].date,
          position.date,
          positions[i + 1].date,
          [i, i + 1]
        );
      }

      // Se positionIndex foi definido e não é -1, significa que encontramos uma posição correspondente
      if (positionIndex !== -1) {
        break; // Interrompe o loop
      }
    }

    setState((prevState) => {
      if (prevState.length === 0) {
        return prevState; // Retorna o estado atual se o array estiver vazio
      }

      console.log(positionIndex);

      // Presumindo que prevState sempre tem um único item
      const updatedEquipment = {
        ...prevState[0], // Desestrutura o único equipamento no array
        lastPosition:
          positionIndex !== -1
            ? equipmentData.positions[positionIndex]
            : undefined, // Atualiza a última posição
      };
      return [updatedEquipment]; // Retorna o array com o equipamento atualizado
    });
  };

  useEffect(() => {
    createRow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [equipmentData]);

  return (
    <div>
      <div>
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead className="w-44">Status</TableHead>
              <TableHead className="w-96 ">Data e Hora</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      </div>
      <div className="overflow-auto max-h-[380px]">
        <Table>
          <TableBody>
            {row.map((r, index) => (
              <TableRow key={index}>
                <TableCell className="w-60">{r.statusName}</TableCell>
                <TableCell>{r.date}</TableCell>
                <TableCell className="w-32">
                  <Button
                    onClick={() => {
                      changeMarkerPosition(r.statesIndex);
                    }}
                  >
                    Ver localização
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <p className="text-center">Tabela histórico de status</p>
      </div>
    </div>
  );
};

export default TableStatus;
