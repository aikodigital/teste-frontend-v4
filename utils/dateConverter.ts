import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const formatDateTime = (date: string | undefined | null) => {
    if (!date) return "Data inválida";

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return "Data inválida";

    return format(parsedDate, "dd/MM/yyyy HH:mm:ss", { locale: ptBR });
};

export default formatDateTime;