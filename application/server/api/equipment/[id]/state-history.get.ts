import type StateHistory from '~/interfaces/admin/equipment/StateHistory'
import find from 'lodash/find'

export default defineEventHandler((event) => {
    const id =  getRouterParam(event, 'id')

    const equipments = [
     {
         "equipmentId": "a7c53eb1-4f5e-4eba-9764-ad205d0891f9",
         "states": [
             {
                 "date": "2021-02-01T03:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-01T07:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-01T12:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-01T15:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-01T17:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-02T10:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-02T11:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-02T19:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-02T20:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-02T22:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-03T02:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-03T17:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-03T19:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-03T23:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-04T17:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-04T21:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-05T02:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-05T04:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-05T13:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-05T17:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-06T05:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-06T09:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-06T15:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-06T19:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-06T23:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-07T00:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-07T08:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-07T11:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-07T17:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-07T20:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-08T09:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-08T11:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-08T21:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-09T00:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-09T15:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-09T19:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-09T22:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-10T00:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-10T06:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-10T10:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-10T20:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-10T22:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-11T02:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-11T03:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-11T05:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-11T13:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-11T15:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-12T02:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-12T06:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-12T09:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-12T16:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-12T20:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-13T11:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-13T12:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-14T04:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-14T10:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-14T14:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-14T22:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-14T23:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-15T08:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-15T12:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-15T18:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-16T06:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-16T07:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-17T00:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-17T03:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-17T18:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-18T00:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-18T09:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-18T11:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-18T19:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-18T23:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-19T00:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-19T03:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-19T15:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-19T19:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-20T03:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-20T07:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-20T12:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-21T04:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-21T10:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-21T22:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-22T04:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-22T05:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-22T11:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-22T17:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-23T05:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-23T07:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-23T14:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-23T17:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-23T21:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-24T06:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-24T07:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-24T11:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-24T15:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-24T21:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-25T03:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-25T15:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-25T21:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-25T23:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-26T03:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-26T05:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-26T16:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-26T19:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-27T01:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-27T17:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-27T18:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-27T22:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-28T03:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-28T06:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-28T18:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-28T20:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             }
         ]
     },
     {
         "equipmentId": "1c7e9615-cc1c-4d72-8496-190fe5791c8b",
         "states": [
             {
                 "date": "2021-02-01T03:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-01T06:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-01T22:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-01T23:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-02T01:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-02T05:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-02T18:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-02T21:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-03T02:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-03T06:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-03T17:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-03T18:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-04T10:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-04T13:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-04T16:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-05T02:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-05T06:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-05T07:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-05T12:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-05T16:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-05T20:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-05T23:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-06T08:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-06T12:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-06T16:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-07T04:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-07T08:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-08T02:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-08T06:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-08T11:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-08T16:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-08T17:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-08T21:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-09T00:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-09T04:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-09T09:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-09T14:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-10T01:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-10T05:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-10T12:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-10T14:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-10T16:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-11T06:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-11T10:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-11T13:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-11T19:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-11T22:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-12T12:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-12T16:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-12T18:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-13T12:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-13T13:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-13T18:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-13T19:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-14T07:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-14T09:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-14T12:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-15T05:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-15T10:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-15T11:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-15T12:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-16T00:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-16T03:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-16T08:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-16T11:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-16T15:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-16T17:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-17T05:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-17T11:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-17T16:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-17T17:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-18T00:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-18T01:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-18T07:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-18T08:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-18T23:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-19T02:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-19T18:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-19T20:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-19T21:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-20T03:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-20T05:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-20T09:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-20T13:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-20T14:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-20T18:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-20T20:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-20T21:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-20T22:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-21T02:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-21T08:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-21T15:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-21T16:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-22T04:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-22T05:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-22T11:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-22T12:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-22T22:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-23T00:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-23T18:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-23T22:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-24T05:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-24T06:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-24T12:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-24T14:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-25T02:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-25T06:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-25T12:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-25T15:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-25T20:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-26T08:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-26T12:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-27T00:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-27T04:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-27T09:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-27T15:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-27T19:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-28T10:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-28T16:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-28T18:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             }
         ]
     },
     {
         "equipmentId": "2b5796cb-21c1-480e-8886-4498ea593a65",
         "states": [
             {
                 "date": "2021-02-01T03:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-01T05:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-01T07:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-01T15:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-01T16:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-01T17:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-01T21:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-01T23:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-02T02:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-02T13:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-02T16:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-02T17:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-02T19:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-02T21:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-03T00:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-03T18:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-03T20:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-04T11:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-04T15:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-05T02:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-05T08:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-05T09:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-05T13:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-05T17:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-06T02:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-06T08:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-06T09:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-06T11:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-06T20:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-06T22:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-07T01:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-07T07:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-07T11:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-07T22:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-08T00:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-08T06:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-08T09:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-09T01:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-09T03:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-09T19:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-09T20:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-10T14:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-10T15:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-10T21:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-11T07:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-11T11:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-11T14:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-11T20:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-12T08:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-12T09:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-13T03:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-13T07:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-13T13:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-13T16:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-13T19:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-13T22:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-14T00:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-14T18:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-14T23:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-15T13:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-15T19:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-15T20:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-15T23:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-16T00:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-16T14:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-16T16:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-17T05:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-17T11:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-17T14:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-18T04:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-18T06:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-18T14:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-18T18:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-19T05:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-19T06:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-19T15:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-19T21:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-19T22:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-20T02:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-20T11:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-20T13:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-21T06:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-21T09:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-21T14:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-21T19:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-21T22:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-22T03:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-22T12:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-22T13:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-22T22:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-22T23:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-23T09:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-23T15:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-23T16:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-24T08:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-24T11:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-24T14:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-24T23:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-25T00:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-25T03:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-25T06:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-25T15:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-25T17:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-26T00:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-26T05:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-26T17:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-26T18:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-26T20:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-27T02:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-27T17:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-27T21:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-28T02:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-28T05:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-28T11:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-28T14:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-28T20:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             }
         ]
     },
     {
         "equipmentId": "1d222cdc-01dd-4caa-8934-5351d3995cfb",
         "states": [
             {
                 "date": "2021-02-01T03:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-01T09:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-01T13:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-01T16:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-01T21:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-02T01:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-02T13:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-02T15:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-02T18:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-02T22:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-03T01:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-03T19:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-03T22:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-04T03:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-04T11:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-04T15:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-05T04:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-05T06:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-05T07:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-05T13:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-05T15:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-05T18:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-06T05:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-06T08:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-06T11:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-06T19:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-06T21:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-07T05:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-07T07:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-07T10:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-08T01:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-08T02:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-08T03:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-08T17:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-08T18:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-09T12:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-09T18:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-09T22:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-10T03:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-10T07:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-10T10:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-11T00:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-11T05:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-11T07:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-11T13:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-11T15:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-12T00:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-12T03:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-12T07:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-12T08:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-12T11:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-12T17:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-12T19:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-12T20:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-13T02:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-13T20:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-14T02:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-14T14:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-14T16:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-14T21:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-15T01:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-15T05:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-15T08:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-15T10:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-15T18:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-15T21:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-16T02:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-16T05:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-16T12:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-16T15:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-17T07:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-17T10:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-17T22:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-18T02:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-18T14:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-18T20:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-18T23:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-19T05:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-19T21:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-19T23:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-20T14:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-20T17:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-20T18:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-20T20:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-20T22:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-21T03:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-21T13:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-21T15:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-21T21:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-21T23:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-22T04:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-22T06:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-22T10:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-22T12:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-22T17:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-22T20:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-23T09:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-23T12:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-23T19:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-23T23:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-24T11:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-24T15:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-24T21:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-25T01:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-25T02:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-25T04:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-25T11:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-25T12:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-25T16:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-25T20:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-26T10:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-26T13:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-27T01:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-27T04:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-27T06:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-27T08:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-27T12:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-27T19:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-27T23:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-28T05:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-28T06:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-28T11:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-28T15:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-28T18:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             }
         ]
     },
     {
         "equipmentId": "491b983b-950c-4a88-942d-487e99b92540",
         "states": [
             {
                 "date": "2021-02-01T03:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-01T07:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-01T14:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-01T15:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-01T19:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-01T21:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-02T01:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-02T02:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-02T05:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-02T18:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-02T21:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-02T23:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-03T07:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-03T09:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-04T03:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-04T04:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-04T08:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-04T20:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-04T22:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-05T01:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-05T17:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-05T21:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-06T04:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-06T07:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-06T10:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-06T18:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-06T23:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-07T04:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-07T07:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-07T10:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-07T12:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-07T17:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-08T08:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-08T14:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-08T23:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-09T02:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-09T07:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-09T08:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-09T14:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-10T04:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-10T10:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-10T14:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-11T01:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-11T04:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-11T15:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-11T18:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-12T12:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-12T14:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-13T04:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-13T05:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-13T13:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-13T16:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-13T21:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-14T00:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-14T04:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-14T09:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-15T03:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-15T05:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-15T07:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-15T11:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-15T22:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-15T23:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-16T11:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-16T14:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-16T17:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-16T20:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-17T07:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-17T10:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-17T19:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-17T21:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-17T23:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-18T12:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-18T18:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-19T11:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-19T15:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-19T20:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-19T21:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-20T12:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-20T16:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-20T20:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-20T23:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-21T09:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-21T10:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-21T16:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-21T19:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-22T09:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-22T10:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-23T02:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-23T04:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-23T08:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-23T12:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-23T13:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-23T19:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-23T22:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-24T02:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-24T10:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-24T14:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-24T17:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-24T19:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-25T00:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-25T13:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-25T15:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-25T20:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-25T21:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-26T05:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-26T09:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-26T13:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-26T18:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-26T22:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-27T02:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-27T04:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-27T06:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-27T09:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-27T22:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-27T23:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-28T01:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-28T05:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-28T12:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-28T14:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-28T22:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-03-01T01:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             }
         ]
     },
     {
         "equipmentId": "39317fcb-79e7-4e7e-83dc-723a9b63633c",
         "states": [
             {
                 "date": "2021-02-01T03:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-01T07:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-01T12:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-01T14:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-01T15:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-01T19:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-01T23:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-02T01:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-02T14:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-02T19:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-03T09:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-03T11:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-03T12:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-04T00:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-04T04:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-04T18:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-04T19:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-04T23:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-05T02:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-05T16:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-05T19:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-06T03:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-06T07:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-06T16:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-06T19:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-07T06:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-07T09:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-07T20:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-07T23:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-08T05:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-08T07:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-08T08:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-08T23:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-09T02:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-09T18:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-09T20:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-10T08:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-10T12:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-10T14:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-10T18:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-10T21:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-11T00:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-11T10:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-11T11:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-11T13:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-11T16:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-12T09:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-12T12:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-12T22:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-13T04:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-13T18:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-13T19:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-14T01:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-14T02:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-14T08:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-14T20:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-15T00:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-15T04:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-15T06:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-15T08:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-15T09:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-16T02:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-16T07:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-16T23:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-17T00:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-17T04:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-17T05:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-17T13:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-17T19:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-18T12:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-18T17:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-18T19:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-19T04:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-19T07:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-19T09:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-19T13:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-19T18:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-19T22:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-20T04:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-20T05:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-20T15:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-20T18:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-21T11:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-21T13:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-21T19:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-22T01:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-22T05:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-22T09:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-22T14:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-22T15:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-22T18:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-22T20:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-23T12:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-23T14:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-24T07:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-24T11:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-24T19:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-24T20:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-25T04:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-25T07:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-25T11:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-26T05:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-26T06:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-26T09:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-26T21:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-27T00:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-27T05:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-27T06:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-27T11:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-27T13:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-27T18:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-28T06:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-28T10:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-28T21:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-03-01T00:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             }
         ]
     },
     {
         "equipmentId": "c79ef1de-92f3-4edd-bd55-553056640449",
         "states": [
             {
                 "date": "2021-02-01T03:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-01T08:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-01T11:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-01T22:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-02T01:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-02T05:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-02T10:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-02T13:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-02T20:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-02T23:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-03T08:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-03T14:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-04T03:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-04T06:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-04T12:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-04T18:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-04T19:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-05T00:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-05T11:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-05T17:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-05T19:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-06T00:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-06T09:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-06T11:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-06T13:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-06T14:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-07T02:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-07T08:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-07T16:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-07T20:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-08T07:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-08T13:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-08T16:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-09T04:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-09T05:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-09T21:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-09T22:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-10T13:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-10T17:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-10T19:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-11T10:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-11T14:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-11T16:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-11T18:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-11T22:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-12T00:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-12T01:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-12T17:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-12T18:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-12T23:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-13T01:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-13T05:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-13T07:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-13T13:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-13T20:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-13T23:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-14T05:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-14T08:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-14T13:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-14T19:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-15T10:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-15T13:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-16T03:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-16T07:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-16T14:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-16T19:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-16T20:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-17T02:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-17T11:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-17T12:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-17T13:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-17T16:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-17T19:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-17T21:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-18T03:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-18T08:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-18T20:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-18T22:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-19T01:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-19T12:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-19T14:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-19T18:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-19T22:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-20T06:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-20T08:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-20T09:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-20T11:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-20T16:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-20T20:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-21T02:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-21T15:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-21T19:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-22T10:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-22T13:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-22T16:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-23T10:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-23T12:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-24T00:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-24T02:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-24T16:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-24T17:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-25T03:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-25T04:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-25T22:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-26T00:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-26T03:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-26T04:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-26T05:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-26T17:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-26T20:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-26T23:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-27T06:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-27T07:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-27T18:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-27T20:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-28T14:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-28T15:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             }
         ]
     },
     {
         "equipmentId": "b7aaba00-13f7-44a0-8bf1-bc163afcf9d8",
         "states": [
             {
                 "date": "2021-02-01T03:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-01T05:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-01T06:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-01T11:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-01T17:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-01T21:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-02T02:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-02T18:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-02T19:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-03T04:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-03T06:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-03T14:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-03T16:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-04T08:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-04T10:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-04T15:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-04T17:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-04T18:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-05T03:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-05T04:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-05T10:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-06T01:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-06T03:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-06T07:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-06T16:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-06T17:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-07T11:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-07T12:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-07T18:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-07T22:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-08T13:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-08T16:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-08T23:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-09T03:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-09T08:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-09T13:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-09T23:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-10T00:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-10T12:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-10T14:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-10T20:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-11T03:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-11T07:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-11T09:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-11T11:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-11T13:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-11T17:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-11T20:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-12T00:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-12T06:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-12T08:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-12T23:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-13T03:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-13T10:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-13T12:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-13T14:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-13T17:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-13T19:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-14T09:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-14T11:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-14T19:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-14T21:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-14T22:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-15T01:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-15T07:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-15T10:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-15T15:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-15T17:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-16T03:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-16T05:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-16T11:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-16T14:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-16T21:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-17T01:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-17T04:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-17T11:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-17T13:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-18T05:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-18T07:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-18T09:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-18T11:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-18T13:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-18T14:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-18T16:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-18T23:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-19T02:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-19T17:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-19T22:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-20T04:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-20T06:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-20T07:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-20T13:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-20T14:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-20T16:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-21T07:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-21T13:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-21T15:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-21T19:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-21T20:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-22T02:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-22T17:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-22T20:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-23T12:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-23T15:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-23T19:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-23T23:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-24T05:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-24T09:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-24T12:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-24T16:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-25T02:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-25T03:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-25T13:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-25T18:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-25T22:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-26T03:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-26T18:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-26T21:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-26T22:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-27T04:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-27T08:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-27T09:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-27T13:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-27T16:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-27T22:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-28T01:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-28T08:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-28T09:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-28T12:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-28T15:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-28T20:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-28T23:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             }
         ]
     },
     {
         "equipmentId": "fe2a2e11-bfa6-46b6-990b-fd8175946b7e",
         "states": [
             {
                 "date": "2021-02-01T03:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-01T08:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-01T11:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-01T15:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-02T01:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-02T02:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-02T05:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-02T19:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-02T23:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-03T15:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-03T17:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-03T18:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-03T20:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-04T02:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-04T03:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-04T07:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-04T10:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-04T16:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-04T22:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-05T09:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-05T12:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-06T00:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-06T02:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-06T17:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-06T19:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-06T23:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-07T03:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-07T16:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-07T17:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-08T11:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-08T13:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-09T02:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-09T07:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-09T23:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-10T03:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-10T18:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-10T21:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-11T13:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-11T14:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-11T21:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-12T00:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-12T04:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-12T20:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-13T02:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-13T05:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-13T23:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-14T04:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-14T08:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-14T13:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-14T17:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-15T09:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-15T13:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-16T06:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-16T10:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-16T20:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-17T01:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-17T03:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-17T05:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-17T12:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-17T14:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-18T04:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-18T07:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-18T09:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-18T15:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-18T17:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-18T20:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-19T14:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-19T16:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-19T20:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-20T11:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-20T15:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-20T20:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-20T22:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-21T09:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-21T12:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-21T20:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-22T00:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-22T06:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-22T10:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-22T22:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-23T01:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-23T05:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-23T21:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-24T00:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-24T05:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-24T09:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-24T10:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-24T22:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-24T23:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-25T04:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-25T08:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-25T14:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-25T16:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-25T20:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-26T04:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-26T06:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-26T21:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-26T22:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-27T01:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-27T09:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-02-27T10:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-27T16:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-27T19:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-28T04:00:00.000Z",
                 "equipmentStateId": "baff9783-84e8-4e01-874b-6fd743b875ad"
             },
             {
                 "date": "2021-02-28T08:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             },
             {
                 "date": "2021-02-28T23:00:00.000Z",
                 "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
             },
             {
                 "date": "2021-03-01T01:00:00.000Z",
                 "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57"
             }
         ]
     }
    ]

    const res = find(equipments, e => e.equipmentId === id)
   
    const states: StateHistory[] = res?.states.map(s => {
        const state: StateHistory = {
            date: s.date,
            equipmentStateId: s.equipmentStateId
        }
        return state
    }) || []
   
   return states
})