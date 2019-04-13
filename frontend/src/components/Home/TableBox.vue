<template lang="pug">
    div#box
        div( class='header' )
            h3( class='title' ) Все сотрудники
            label( class='label' )
                i( class='fa fa-search' )
                input( class='input' placeholder='Поиск' v-model='nameFilter' @keyup='$forceUpdate()' )

        div( class='grid' )
            span( class='head' ) Сотрудники
            span( class='head' ) Пришёл
            span( class='head' ) Ушёл
            span( class='head' ) Опоздание
            span( class='head' ) Ранний уход

        div(
            :class='{grid: true, hide: isHidden(empl.user) }'
            v-if='$root.table' v-for='empl in $root.table'
        ) 
            img( class='data avatar' :src=' getPhoto(empl) ' )
            span( class='data name' ) {{ empl.user ? empl.user.name : 'Сотрудник не найден' }}
            span( class='data' ) {{ empl.enter ? getTime(empl.enter) : '-' }}
            span( class='data' ) {{ empl.exit ? getTime(empl.exit) : '-' }}
            span( class='data orange' ) {{ empl.enter ? getEnterDifference(empl.enter, 7) : '-' }}
            span( class='data red' ) {{ empl.exit ? getExitDifference(empl.exit, 18) : '-' }}
</template>

<script>
export default {
    methods: { isHidden, getPhoto, getTime, getEnterDifference, getExitDifference },
    created: function () {
        this.$root.TableBox = this;
    }
}

function isHidden (empl) {
    if ( empl && empl.name && this.nameFilter && this.nameFilter.length > 0 ) {
        if ( empl.name.toLowerCase().search(this.nameFilter) >= 0 )
            return false;
        else return true;
    }

    return false;
}

function getPhoto (empl) {
    if ( !empl.enter ) {
        this.$root.none += 1;
    }

    if ( empl.user )
        return empl.user.photo;
    else return '';
}

function getTime (date) {
    var temp = new Date(date);
    return `${ temp.getUTCHours() }:${ temp.getUTCMinutes() < 10 ? '0' + temp.getUTCMinutes() : temp.getUTCMinutes() }`;
}

function getEnterDifference (date, check) {
    var temp = new Date(date);
    var difference = temp.getUTCHours() - check;


    if ( difference > 0 ) {
        this.$root.later += 1;
        return `на ${difference} часа`;
    }

    else if ( difference === 0 ) {
        this.$root.later += 1;
        return `на ${ temp.getUTCMinutes() } минут `;
    }

    else return '-';
}

function getExitDifference (date, check) {
    var temp = new Date(date);
    var difference = check - temp.getUTCHours();

    if ( difference > 0 ) {
        this.$root.early += 1;
        return `на ${difference} часа`;
    }

    else if ( difference === 0 ) {
        this.$root.early += 1;
        return `на ${ temp.getUTCMinutes() } минут `
    }

    else return '-';
}
</script>


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
            display inline-block
            position relative

            .fa
                color $silver
                position absolute
                font-size 14px
                left 12px
                top 10px

        .input
            border 1px solid $silver
            border-radius 4px
            font-size 14px
            outline none
            margin-right 8px
            padding 6px 12px 6px 32px
            vertical-align middle
            width 300px
            &:focus, &:not(:empty)
                border-color $concrete


    .grid
        align-items center
        display grid
        border-bottom 1px solid $cloud
        grid-template-columns 72px auto 160px 140px 160px 180px
        &.hide
            display none

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
            &.orange
                color $sunflower
            &.red
                color $alizarin

</style>
