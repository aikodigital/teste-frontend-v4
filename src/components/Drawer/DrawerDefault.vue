<template>
    <Drawer :visible="isVisible" :position="position" :header="header" :baseZIndex="baseZIndex" :autoZIndex="autoZIndex"
        :dismissable="dismissable" :showCloseIcon="showCloseIcon" :modal="modal" :blockScroll="blockScroll"
        @update:visible="isVisible = $event" :height="height">
        <slot></slot>
    </Drawer>
</template>

<script>
export default {
    name: "DrawerDefault",
    props: {
        visible: Boolean,
        position: String,
        header: String,
        baseZIndex: Number,
        autoZIndex: Boolean,
        dismissable: Boolean,
        showCloseIcon: Boolean,
        closeButtonProps: Object,
        closeIcon: String,
        modal: Boolean,
        blockScroll: Boolean,
        height: {
            type: String,
            default: 'auto'
        }
    },
    data() {
        return {
            isVisible: this.visible,
        };
    },
    watch: {
        visible(newValue) {
            this.isVisible = newValue;
        },
        isVisible(newValue) {
            this.$emit("update:visible", newValue);
        },
    },
};
</script>