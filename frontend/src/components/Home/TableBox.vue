<template lang="pug">
    div#box
        div( class='header' )
            h3( class='title' ) Все сотрудники
            label( class='label' )
                i( class='fa fa-timers' )
                input( class='input' placeholder='Поиск' )

        div( class='grid' )
            span( class='head' ) Сотрудники
            span( class='head' ) Пришёл
            span( class='head' ) Ушёл
            span( class='head' ) Опоздание
            span( class='head' ) Ранний уход

        div( class='grid' v-for='item in Array(20)' ) 
            img( class='data avatar' src='https://pp.userapi.com/c854416/v854416952/bbc6/eKdqpk72n8o.jpg?ava=1' )
            span( class='data name' ) Саня Воробколаева
            span( class='data' ) 8:53
            span( class='data' ) 14:55
            span( class='data' ) на 15 минут
            span( class='data' ) на 2 часа
</template>

<style lang="stylus" scoped>
@import '~@/style/palette'

#box
    background $white
    border-radius 5px

    .header
        align-items center
        display flex
        justify-content space-between
        padding 10px 12px

        .title
            font-size 16px
            font-weight 600
            margin 0 8px

        .label
            position relative

        .input
            border 1px solid $silver
            border-radius 4px
            font-size 14px
            outline none
            padding 6px 12px
            width 300px
            &:focus, &:not(:empty)
                border-color $concrete


    .grid
        align-items center
        display grid
        border-bottom 1px solid $cloud
        grid-template-columns 72px auto 160px 140px 160px 180px

        .head
            background #F3F3F3
            border-left 1px solid $silver
            color $asbestos
            text-align center
            padding 12px 0
            width 100%
            &:first-child
                border-left none
                grid-column 1 / span 2
                padding-left 20px
                text-align left


        .data
            color $asbestos
            font-weight 300
            padding 4px 0
            text-align center
            &.avatar
                border-radius 50%
                margin 4px 12px
            &.name
                color $wetasphalt
                font-weight 400
                text-align left

</style>
