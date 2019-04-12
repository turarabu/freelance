<template lang="pug">
    div#app
        NavBar
        div#view( class='adaptive' )
            router-view
</template>

<script>
import '@/script/datepicker.js'
import '@/script/datepicker.en.js'

import NavBar from '@/components/NavBar.vue'

export default {
    components: { NavBar }
}
</script>


<style lang="stylus">
@import url('https://use.fontawesome.com/releases/v5.8.1/css/all.css');
@import url('https://fonts.googleapis.com/css?family=Lobster|Open+Sans:300,400,600&subset=cyrillic')

@import '~@/style/base'
@import '~@/style/datepicker.css'

#view
    margin 32px auto

#home, #employees
    display grid
    grid-template-columns 320px 940px
    justify-content space-between

#left
    align-self start
    background $white
    border-top 2px solid $turquoise
</style>
