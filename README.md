# LINK PARA VÍDEO DEMONSTRATIVO
https://drive.google.com/file/d/1LNn9Gp3nOQtpQTsO1tHbvzqNlzvqlM8F/view?usp=sharing


# Aiko - Case Técnico Frontend

Este projeto foi desenvolvido como parte do processo seletivo da Aiko. A proposta consiste em construir uma aplicação web capaz de exibir, em um mapa, a posição e o histórico de estados de equipamentos, além de apresentar informações adicionais como produtividade e lucro por tipo de equipamento.

## 🚀 Tecnologias utilizadas

- **ReactJS**
- **Vite**
- **TailwindCSS**
- **React Leaflet**
- **date-fns**
- **lucide-react**

## 🎯 Objetivo da aplicação

A aplicação tem como objetivo:

- Visualizar em um mapa os equipamentos com base em seus dados de localização.
- Visualizar histórico de estados por equipamento.
- Calcular produtividade por equipamento com base nas horas operando no último dia disponível.
- Calcular lucro por equipamento com base em sua produtividade e nos valores de ganho/perda por hora em cada estado.
- Diferenciar visualmente os equipamentos por tipo, utilizando ícones distintos.
- Filtrar por modelo e estado do equipamento.

## 🧠 Decisões de implementação

- **Mapeamento por ícones**: foi criada uma associação entre o modelo do equipamento e uma cor para facilitar a visualização no mapa.
- **Cálculo de produtividade**: considera as horas no estado “Operando” no último dia disponível. Fórmula:  
  \[
  \text{Produtividade} = \left(\frac{\text{Horas operando}}{24}\right) \times 100
  \]
- **Cálculo de lucro**: para cada hora em determinado estado, multiplica-se pela taxa (positiva ou negativa) associada ao modelo de equipamento e ao estado.

## 🧩 Componentes principais

- **MapView**: renderiza o mapa com os marcadores dos equipamentos.
- **EquipmentMarker**: marcador individual com ícone por modelo e popup com dados detalhados.
- **useEquipmentStore**: gerencia estado global com dados de equipamentos, posições, estados e configurações.
- **PopupContent**: exibe o conteúdo do popup com produtividade, lucro e histórico.

## ▶️ Como rodar localmente

1. Clone o repositório:

```bash
git clone https://git@github.com:Mayra-Almeida/teste-mayra-almeida.git
cd teste-mayra-almeida
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

4. Acesse a aplicação via `http://localhost:5173`.
```

## ✅ Funcionalidades implementadas

- [x] Exibir equipamentos no mapa com ícones personalizados
- [x] Exibir popups com histórico, produtividade e lucro
- [x] Calcular produtividade com base nas horas operando no último dia
- [x] Calcular lucro com base no modelo e estado
- [x] Organização modular e código limpo
- [x] Filtrar equipamentos por modelo e estado

## 📝 Considerações finais

Este projeto foi desenvolvido com foco em clareza, manutenibilidade e uma boa experiência visual. O uso de tecnologias modernas e leves permite fácil escalabilidade e manutenção. Fico à disposição para qualquer esclarecimento adicional ou melhorias.

---

Desenvolvido por Mayra Almeida.