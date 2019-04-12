<template lang="pug">
    div#home
        ChartBox
        TableBox

</template>

<script>
import ChartBox from '@/components/Home/ChartBox.vue'
import TableBox from '@/components/Home/TableBox.vue'

export default {
    name: 'home',
    components: { ChartBox, TableBox }
}
</script>


<style lang="stylus" scoped>
@import '~@/style/palette'
</style>
