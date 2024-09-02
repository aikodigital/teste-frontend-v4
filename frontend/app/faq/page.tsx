import React from 'react';
import { Accordion, AccordionItem, Box, Text } from '@mantine/core'; 

const faqData = [
  {
    question: 'O que é o GeoTrack Dashboard?',
    answer:
      'GeoTrack Dashboard é um aplicativo de monitoramento geoespacial que permite a visualização e filtragem de equipamentos em tempo real sobre um mapa interativo.',
  },
  {
    question: 'Como posso filtrar os equipamentos no mapa?',
    answer:
      'Você pode filtrar os equipamentos no mapa utilizando os filtros disponíveis à direita, como estado, modelo e nome do equipamento.',
  },
  {
    question: 'Quais informações são exibidas no popup dos marcadores?',
    answer:
      'O popup dos marcadores exibe informações como o nome do equipamento, modelo, status e a produtividade atual.',
  },
];

export default function FaqPage() {
  return (
    <Box style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Box>
        <Text size="xl" fw={700} ta="center" style={{ marginBottom: '20px' }}>
          Perguntas Frequentes
        </Text>
        <Accordion>
          {faqData.map((item, index) => (
            <AccordionItem value={item.question} key={index}>
              {item.answer}
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    </Box>
  );
}
