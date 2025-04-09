import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root',
})
export class GeneratePdfService {
  constructor() {}
  generateTablePDF(
    nameEquipament: { name: string; modelo: string },
    title: string,
    columns: string[], // Ex: ['Horário', 'Latitude - Longitude', 'Estado']
    data: { [key: string]: any }[],
    fileName: string = 'relatorio.pdf'
  ): void {
    const doc: jsPDF | any = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4',
    });

    // Título
    doc.setFontSize(14);
    doc.text(title, 10, 15);

    doc.setFontSize(12);
    doc.text(`Equipamento: ${nameEquipament.name}`, 10, 35);
    doc.text(`Modelo: ${nameEquipament.modelo}`, 10, 45);

    doc.setFontSize(10);
    doc.text(`Documento gerado em: ${new Date().toLocaleString()}`, 10, 55);

    // Monta os dados da tabela
    const tableBody = data.map((row) => [
      this.formatDate(row['horario']),
      row['latLong'],
      row['estado'],
    ]);

    // Tabela
    autoTable(doc, {
      head: [columns],
      body: tableBody,
      startY: 70,
      margin: { top: 20, right: 10, left: 10 },
      styles: { overflow: 'linebreak', fontSize: 10 },
      pageBreak: 'auto',
      didDrawPage: (data: any) => {
        doc.setFontSize(12);
        doc.text(
          `pág: ${doc.internal.getNumberOfPages()}`,
          doc.internal.pageSize.getWidth() - 40,
          doc.internal.pageSize.getHeight() - 10
        );
      },
    });

    doc.save(fileName);
  }

  private formatDate(date: string | Date): string {
    const d = new Date(date);
    return d.toLocaleString('pt-BR');
  }
}
