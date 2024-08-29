# Componente `DailyPercentage`

O componente `DailyPercentage` é responsável por exibir o percentual de produtividade diária dos equipamentos. Ele apresenta uma lista de dias com estados e suas respectivas horas trabalhadas e porcentagens, além de uma barra de progresso visual para cada estado.

## Estrutura do Template

```vue
<template>
  /** Container principal */
  <aside>
    /** Cabeçalho da lista */
    <div>
      /** Botão para voltar a exibição de equipamentos */
      <button @click="handleShowEquipmentList">
        <Icon />
      </button>

      <h2>
        Produtividade diária
      </h2>

      /** Elemento invisível para centralizar o título e manter o ícone de voltar na esquerda */
      <div class="invisible" />
    </div>

    /** Card para exibir o equipamento selecionado */
    <div>
      <span>
        Equipamento selecionado:
      </span>

      <EquipmentDetails :equipment="selectedEquipment!" :hide-action="true" />
    </div>

    /** Cointainer da lista de dias */
    <ul>
      /** Itera cada dia */
      <li v-for="(dailyReport, index) in dailyReports" :key="index">
        <div>
          /** Data do relatório */
          <span>
            <span>
              Data:
            </span>

            {{ dayjs(dailyReport.date).utc().format('DD/MM/YYYY') }}
          </span>

          /** Saldo de ganhos do dia */
          <span>
            <span>
              Ganhos:
            </span>

            {{ dailyReport.totalEarnings }}
          </span>
        </div>

        /** Container com as porcentagens dos estados */
        <div>
          /** Itera cada estado em porcentagens e horas */
          <span v-for="(percentages, j) in dailyReport.percentages" :key="j">
            <span>
              {{ percentages.stateName }}:
            </span>

            <span>
              {{ dailyReports[index].hours[j].hour }}h - {{ `${percentages.percentage}%` }}
            </span>

            /** Componente de barra de progresso */
            <ProgressRoot v-model="percentages.percentage">
              <ProgressIndicator :class="getProgressIndicatorClass(percentages.stateName)"
                :style="`transform: translateX(-${100 - percentages.percentage}%)`" />
            </ProgressRoot>
          </span>
        </div>
      </li>
    </ul>
  </aside>
</template>
```

## Exemplo de uso

```vue
<template>
  <DailyPercentage>
</template>
```
