<template lang="pug">
    div#nav
        div( class='adaptive' )
            span( class='logo' ) Table

            router-link( class='link active' to='/' ) Главная
            router-link( class='link' to='/employees' ) Сотрудники
</template>

<script>
export default {
    name: 'NavBar'
}
</script>


<style lang="stylus" scoped>
@import '~@/style/palette'

#nav
    background $turquoise
    padding 8px 0

    .adaptive
        align-items center
        display flex

    .logo
        color $wetasphalt
        display inline-block
        font-family 'Lobster', cursive
        font-size 32px
        // letter-spacing 2px
        margin-right 64px

    .link
        color $cloud
        cursor pointer
        display inline-block
        font-size 16px
        margin-right 14px
        &:hover
            text-decoration underline
        &.active
            cursor default
            font-size 16px
            font-weight 600
            text-decoration none
</style>
