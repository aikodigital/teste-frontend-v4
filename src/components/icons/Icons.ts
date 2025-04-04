export type IconKeys = 'Caminhão de carga' | 'Harvester' | 'Garra traçadora'

export const Icons: Record<IconKeys, string> = {
  'Caminhão de carga': `
    <svg version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve">
    <style type="text/css">
      .st0{fill:none;stroke:#3F292C;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
      .st1{fill:none;stroke:#3F292C;stroke-width:2;stroke-linejoin:round;stroke-miterlimit:10;}
      .st2{fill:none;stroke:#3F292C;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;}
    </style>
    <circle class="st0" cx="7" cy="25" r="4"/>
    <circle class="st0" cx="21" cy="25" r="4"/>
    <polyline class="st0" points="20,21.1 20,15 20,12 20,9 26,8 26,6 17,6 14,12 3,12 3,17 7,21 "/>
    <line class="st0" x1="10.5" y1="23" x2="17.5" y2="23"/>
    <polyline class="st0" points="24.9,24 29,24 29,18 25,12 20,12 20,21.1 "/>
    <line class="st0" x1="7" y1="17" x2="17" y2="17"/>
    <path class="st0" d="M20,16h3l0,0c0.6,1.2,1.9,2,3.2,2H29"/>
    </svg>
  `,
  Harvester: `
    <svg version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve">
      <style type="text/css">
        .st0{fill:none;stroke:#3F292C;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
        .st1{fill:none;stroke:#3F292C;stroke-width:2;stroke-linejoin:round;stroke-miterlimit:10;}
        .st2{fill:none;stroke:#3F292C;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;}
      </style>
      <path class="st0" d="M18,29H6c-1.6,0-3-1.3-3-3v0c0-1.6,1.3-3,3-3h12c1.6,0,3,1.3,3,3v0C21,27.7,19.7,29,18,29z"/>
      <path class="st0" d="M15,11h-4v5H8c-2.2,0-4,1.8-4,4v0h7h8v-2v-2L15,11z"/>
      <line class="st0" x1="7" y1="26" x2="7" y2="26"/>
      <line class="st0" x1="17" y1="26" x2="17" y2="26"/>
      <line class="st0" x1="12" y1="26" x2="12" y2="26"/>
      <path class="st0" d="M22,16l7-2l-0.5,2.6C28.2,18,27,19,25.6,19h0c-1,0-1.9-0.5-2.5-1.3L22,16z"/>
      <polyline class="st0" points="29,14 24,3 17,3 11,11 15,11 17,3 "/>
      <line class="st0" x1="26" y1="14" x2="21" y2="3"/>
      <line class="st0" x1="22" y1="14" x2="22" y2="16"/>
      <path class="st0" d="M11,14h2.7l0,0c0.5,1.2,1.7,2,2.9,2H19"/>
    </svg>
  `,
  'Garra traçadora': `
    <svg fill="#3F292C" height="800px" width="800px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
      viewBox="0 0 512.002 512.002" xml:space="preserve">
    <g>
      <g>
        <path d="M426.605,149.217l-47.16-47.161c-6.511-6.511-17.068-6.511-23.58,0c-6.512,6.511-6.512,17.068,0,23.58l47.161,47.161
          c3.256,3.256,7.523,4.884,11.789,4.884s8.535-1.628,11.789-4.884C433.117,166.286,433.117,155.728,426.605,149.217z"/>
      </g>
    </g>
    <g>
      <g>
        <path d="M497.35,125.638l-94.323-94.324c-9.447-9.447-22.009-14.652-35.371-14.652s-25.922,5.203-35.37,14.652
          c-8.518,8.518-309.492,309.492-317.658,317.659c-19.504,19.504-19.504,51.237,0,70.741l70.741,70.741
          c3.127,3.127,7.369,4.884,11.791,4.884l47.165-0.004c4.423,0,8.664-1.757,11.789-4.885c3.126-3.128,4.883-7.369,4.883-11.789
          l-0.003-30.482l30.487-0.001c9.208,0,16.673-7.464,16.674-16.673l0.003-30.493l30.49-0.001c4.423,0,8.664-1.757,11.791-4.885
          s4.884-7.369,4.883-11.791l-0.004-30.477h30.484c4.423,0,8.664-1.756,11.789-4.884c3.127-3.127,4.884-7.369,4.884-11.791
          l-0.001-30.482l30.482,0.002h0.001c4.423,0,8.663-1.756,11.789-4.883c3.127-3.127,4.884-7.369,4.884-11.789l0.001-33.371
          l37.136-7.084c8.437,5.719,18.241,8.59,28.052,8.59c12.809,0,25.619-4.877,35.37-14.627l47.161-47.161
          c9.448-9.447,14.652-22.009,14.652-35.37C512.002,147.645,506.797,135.084,497.35,125.638z M329.832,226.486
          c-7.862,1.501-13.549,8.374-13.549,16.377l-0.001,30.491l-30.484-0.002c0,0,0,0-0.001,0c-4.422,0-8.664,1.756-11.789,4.884
          c-3.127,3.127-4.884,7.369-4.884,11.791l0.001,30.483h-30.485c-4.423,0-8.664,1.757-11.791,4.885
          c-3.127,3.128-4.884,7.369-4.883,11.791l0.004,30.477l-30.486,0.001c-9.208,0-16.673,7.464-16.674,16.673l-0.003,30.493
          l-30.49,0.001c-4.423,0-8.664,1.757-11.791,4.884c-3.127,3.127-4.883,7.37-4.883,11.791l0.003,30.483l-23.583,0.002
          l-65.857-65.856c-6.502-6.502-6.502-17.079,0-23.581l235.128-235.128c8.77,8.77,70.093,70.094,83.843,83.845L329.832,226.486z
          M473.767,172.795l-47.161,47.161c-6.503,6.503-17.078,6.501-23.581,0L296.913,113.845l58.951-58.951
          c3.149-3.149,7.338-4.884,11.789-4.884c4.454,0,8.64,1.735,11.789,4.884l94.322,94.322c3.149,3.148,4.884,7.335,4.884,11.788
          C478.651,165.459,476.916,169.646,473.767,172.795z"/>
      </g>
    </g>
    </svg>
  `,
}
