<template lang="pug">
    div#left
        div( class='date' )
            button( :class='{"date-toggle": true, active: datepicker}' @click='datepicker = !datepicker' )
                i( class='fa fa-sort-down' )

            span( class='day' ) 8
            div( class='details' )
                span( class='mo-ye' ) Январь 2017,
                span( class='week-day' ) Четверг

        div( class='chart' )
            canvas#canvas
            div( class='legend' )
                span( class='row green' ) Пришедшие вовремя
                span( class='row yellow' ) Опоздавшие
                span( class='row red' ) Не пришедшие

        div#datepicker( :class='{active: datepicker}' )
            div( class="datepicker-here" data-language='en' )
</template>

<script>
import Chart from 'chart.js'
import ChartConfig from '@/script/chart-config'

export default {
    methods: { getDate },
    mounted: function () {
        var self = this;
        var date = this.$el.querySelector('.datepicker');
        var canvas = this.$el.querySelector('#canvas');
        var context = canvas.getContext('2d');

        // $(this.$el).datepicker({});
        // $(this.$el).data('datepicker');

        this.$root.canvas = canvas;
        this.$root.chart = new Chart(context, ChartConfig(Chart));
        this.$root.chart.generateLegend();

        setTimeout(function () {
            self.$root.chart.resize();
        }, 500);
        this.$el.onbeforeprint = function (event) {
            self.$root.chart.resize();
        }
    },

    data: function () {
        return {
            datepicker: false
        };
    }
}

function getDate () {

}
</script>


<style lang="stylus" scoped>
@import '~@/style/palette'

#canvas
    position relative
    left -90px

#left
    display flex
    flex-direction column
    overflow hidden
    position relative
    justify-content center

    .date
        align-items center
        background $white
        border-bottom 1px solid $cloud
        display flex
        color $midnightblue
        font-size 20px
        justify-content center
        padding 8px 0
        position relative

        .date-toggle
            background transparent
            border none
            color $silver
            cursor pointer
            font-size 36px
            outline none
            position absolute
            top 0
            left 0
            bottom 0
            width 64px
            &:hover, &.active
                background darken($white, 7.5)

            .fa
                position relative
                top -8px

        .day
            display inline-block
            font-size 46px
            line-height 46px
            margin 0 8px

        .details
            display inline-block
            font-size 14px

            .mo-ye
                display block
                font-size 16px
                font-weight 300

            .week-day
                color $silver
                font-weight 400

    .chart
        background $white
        display block
        padding 32px 0
        position relative
        width 500px

    .legend
        display flex
        flex-direction column
        margin 24px auto 0 auto
        justify-content center
        width 400px

        .row
            align-items center
            cursor default
            display flex
            width 300px
            &:before
                background $wetasphalt
                content ' '
                display inline-block
                margin-right 8px
                height 12px
                width 12px

            &.red:before
                background $alizarin
            &.green:before
                background $turquoise
            &.yellow:before
                background $sunflower

#datepicker
    background $white
    border-radius 3px
    box-shadow 0 0 0 $concrete
    overflow hidden
    max-height 0
    position absolute
    top 75px
    left 5px
    z-index 5
    &.active
        box-shadow 0 0 5px $concrete
        max-height 400px

</style>
