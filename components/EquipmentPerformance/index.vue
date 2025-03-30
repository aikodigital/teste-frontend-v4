<template>
  <div>
    <template v-if="performance">
      <v-row>
        <v-col cols="12" md="6" sm="12" class="d-flex align-center justify-center flex-column ">
          <v-progress-circular
            :model-value="performance.allProductivity"
            :rotate="150"
            :size="100"
            :width="15"
            color="primary"
          >
            {{ performance.allProductivity }}%
          </v-progress-circular>
          <span class="pt-3">Produtividade Geral</span>
        </v-col>
        <v-col cols="12" md="6" sm="12" class="d-flex align-center justify-center flex-column">
          <v-progress-circular
            :model-value="performance.lastWeekProductivity"
            :rotate="150"
            :size="100"
            :width="15"
            color="secondary"
          >
            {{ performance.lastWeekProductivity }}%
          </v-progress-circular>
          <span class="pt-3">Produtividade na última semana</span>
        </v-col>
      </v-row>
    </template>
  </div>
</template>
<script lang="ts">
import type { IEquipmentStatusHistory } from "@/interfaces/IEquipament"
import type { IActivity, IPerformance, IProductivity } from "@/interfaces/IActivity";
import { Status } from "@/enums/Status"
import { TimeConstants } from "@/enums/TimeConstants";

export default {
  nmame: 'EquipmentPerformence',

  props: {
    equipmentActivies: {
      type: Array as () => IEquipmentStatusHistory[],
      required: true
    }
  },

  data () {
    return {
      performance: {} as IPerformance | null
    }
  },

  mounted () {
    const performanceByDay: IProductivity = this.calculateHoursPerformanceByDay()
    this.performance = this.getAllProductivity(performanceByDay)
  },

  methods: {
    calculateHoursNotPerformedByDay(data: IActivity[]): IProductivity {
      const notProductiveHours: IProductivity = {};
      let lastStatus: string = Status.OPERATING;

      for (let i = 0; i < data.length; i++) {
        const current = data[i];
        const next = data[i + 1];
        const day = current.day;

        if (!notProductiveHours[day]) {
          notProductiveHours[day] = 0;

          if (lastStatus !== Status.OPERATING) {
            const startOfDay = new Date(day).setUTCHours(0, 0, 0, 0);
            const diffHours = (new Date(current.date).getTime() - startOfDay) / TimeConstants.MILLISECONDS_IN_AN_HOUR;
            notProductiveHours[day] += diffHours;
          }
        }

        if (next) {
          const diffHours = (new Date(next.date).getTime() - new Date(current.date).getTime()) / TimeConstants.MILLISECONDS_IN_AN_HOUR;
          if (current.status === Status.STOPED || current.status === Status.MANUTENING) {
              notProductiveHours[day] += diffHours;
          }
        } else {
          if (current.status === Status.STOPED || current.status === Status.MANUTENING) {
              const endOfDay = new Date(day).setUTCHours(24, 0, 0, 0);
              const diffHours = (endOfDay - new Date(current.date).getTime()) / TimeConstants.MILLISECONDS_IN_AN_HOUR;
              notProductiveHours[day] += diffHours;
          }
        }

        lastStatus = current.status;
      }

      return notProductiveHours;
    },

    calculateHoursPerformanceByDay(): IProductivity {
      const activitiesFormatted: IActivity[] = this.equipmentActivies.map(activity => {
        const day = activity.date.split('T')[0]

        return {
          ...activity,
          day
        }
      })
      const hoursNotPerformedByDay = this.calculateHoursNotPerformedByDay(activitiesFormatted)
      const productiveHours: IProductivity = {};

      for (let day in hoursNotPerformedByDay) {
        productiveHours[day] = (24 - hoursNotPerformedByDay[day])
      }

      return productiveHours
    },

    getAllProductivity(performanceByDay: IProductivity): IPerformance {
      const allHours: number = (Object.entries(performanceByDay).length * 24)
      const productiveHours: number = Object.values(performanceByDay).reduce((sum, hours) => sum + hours, 0);
      const AllTimeProductivity: number = (productiveHours / allHours) * 100;

      const lastWeekHours: number = 7 * 24
      const lastWeekDays: string[] = Object.keys(performanceByDay).slice(-7); 
      const lastWeekProductivityHours: number = lastWeekDays.reduce((sum, day) => sum + performanceByDay[day], 0);
      const lastWeekProductivity: number = (lastWeekProductivityHours / lastWeekHours) * 100

      return {
        allProductivity: AllTimeProductivity.toFixed(1),
        lastWeekProductivity: lastWeekProductivity.toFixed(1)
      }
    }
  }
}
</script>