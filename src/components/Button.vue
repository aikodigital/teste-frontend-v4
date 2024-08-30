<script lang="ts" setup>

interface IProps {
  type?: 'button' | 'reset' | 'submit'
  bgColor?: string
  textColor?: string
  borderColor?: string
  classWidth?: string
  theme?: 'primary' | 'error' | 'gray' | 'black' | 'white'
  rounded?: 'sm' | 'md' | 'lg' | 'full'
  variant?: 'outlined' | 'contained'
  size?: 'sm' | 'md' | 'lg' | 'none'
  loading?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  bgColor: 'bg-primary',
  borderColor: 'bg-primary',
  classWidth: 'w-fit',
  size: 'md',
  rounded: 'md',
  theme: 'primary',
  variant: 'contained',
  loading: false,
  type: 'submit'
})


const styles = {
  base: 'relative flex items-center justify-center focus:outline-none transition-all',
  loading: '!text-transparent',
  disabled: {
    outlined: 'border bg-transparent border-gray-400 text-gray-400 cursor-not-allowed',
    contained: 'bg-gray-300 text-gray-800 opacity-70 cursor-not-allowed'
  },
  size: {
    sm: 'px-3 py-2 text-sm h-6 rounded-[3px]',
    md: 'px-6 py-4 h-[30px] rounded-[3px]',
    lg: 'px-8 py-6 h-9 rounded',
    none: 'rounded'
  },
  rounded: {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  },
  variants: {
    primary: {
      outlined: {
        base: 'border bg-transparent',
        hover: 'hover:bg-primary-m/[0.12]'
      },
      contained: {
        base: 'bg-primary text-white border',
        hover: 'hover:shadow-md hover:shadow-primary-m/40'
      },
    },
    error: {
      outlined: {
        base: 'border border-solid bg-transparent border-red-400 text-red-400',
        hover: 'hover:bg-tomato-400/[0.12]'
      },
      contained: {
        base: 'bg-tomato-400 text-white border border-tomato-400',
        hover: 'hover:shadow-md hover:shadow-tomato-400/40'
      }
    },
    gray: {
      outlined: {
        base: 'border border-solid bg-transparent border-gray-400 text-gray-400',
        hover: 'hover:bg-gray-400/[0.12]'
      },
      contained: {
        base: 'bg-gray-400 text-white border border-gray-400',
        hover: 'hover:shadow-md hover:shadow-gray-400/40'
      }
    },
    black: {
      outlined: {
        base: 'border border-solid bg-transparent border-gray-900 text-gray-900',
        hover: 'hover:bg-gray-900/[0.12]'
      },
      contained: {
        base: 'bg-gray-900 text-white border border-gray-900',
        hover: 'hover:shadow-md hover:shadow-gray-900/40'
      }
    },
    white: {
      outlined: {
        base: 'border border-solid bg-transparent border-white text-white',
        hover: 'hover:bg-white/[0.12]'
      },
      contained: {
        base: 'bg-white text-gray-900 border border-white',
        hover: 'hover:shadow-md hover:shadow-white/40'
      }
    }
  }
} as any

const emit = defineEmits(['click'])
</script>

<template>
  <button :type="type" :disabled="disabled" :class="[
    styles.base,
    styles.size[props.size],
    styles.rounded[props.rounded],
    props.disabled ? styles.disabled[props.variant] : '',
    (loading && !disabled) ? styles.loading : '',
    !disabled ? styles.variants[props.theme][props.variant].base : '',
    !disabled && !loading ? styles.variants[props.theme][props.variant].hover : '',
    props.classWidth,
    props.bgColor,
    props.textColor,
    props.borderColor,
  ]" @click="emit('click')">
    <spinner v-if="loading" />
    <slot />
  </button>
</template>