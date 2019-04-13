<template lang="pug">
    div#block
        label( class='label' )
            i( class='fa fa-search' )
            input( class='input' placeholder='Поиск' v-model='nameFilter' @keyup='$forceUpdate()' )

        button( class='add button' @click='modal = true, edit = {}, form = "add"' ) Добавить сотрудника

        div(
            v-for="empl in office"
            :class='{ table: true, hide: isHidden(empl) }'
        )
            span( class='data id' ) {{ empl.id }}
            div( class='data avatar-container' )
                img( class='avatar' :src='empl.photo' )
            span( class='data name' ) {{ empl.name }}
            span( class='data hash' ) {{ empl.hash }}
            div( class='controls' )
                i( class='edit fa fa-pen' @click='editor(empl)' )
                i( class='remove fa fa-trash-alt' @click='remove(empl)' )

        div#modal( v-if='modal' @click='close' )
            form#form( @submit='submit' )
                h3( class='title' ) Заполните данные
                input( class='input' type='text' name='id' placeholder='ID' :value='edit.id || ""' )
                input( class='input' type='text' name='name' placeholder='Имя сотрудника' :value='edit.name || ""' )
                input( class='input' type='text' name='photo' placeholder='Ссылка на фото' :value='edit.photo || ""' )
                input( class='input' type='text' name='hash' placeholder='Уникальный хэш-идентификатор' :value='edit.hash || ""' )

                button( class='button' ) Добавить


</template>

<script>
export default {
    methods: { isHidden, close, remove, editor, submit },
    data:  function () {
        var self = this;
        fetch('/api/office/list').then(async function (response){
            var office = await response.json();
            self.office = office.sort((a, b) => { return a.id - b.id });
            self.$forceUpdate();
        });

        return {
            modal: false,
            office: [],
            edit: {}
        }
    }
}

function isHidden (empl) {
    if ( empl.name && this.nameFilter && this.nameFilter.length > 0 ) {
        if ( empl.name.toLowerCase().search(this.nameFilter) >= 0 )
            return false;
        else return true;
    }
}

function close (event) {
    if ( event.target.id === 'modal' )
        this.modal = false;
}

function remove (empl) {
    var confirmed = confirm(`Вы действительно хотите удалить сотрудника\n${empl.name}?`)
    if ( !confirmed )
        return;

    fetch('/api/office/remove', {
        method: 'POST',
        body: `hash=${empl.hash}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    }).then(async function (response) {
        var self = this;
        var data = await response.json();

        self.office.forEach(function (empl2, id) {
            if (empl2.hash === empl.hash)
                delete self.office[id];
        });

        self.office = self.office.sort((a, b) => { return a.id - b.id });
        self.$forceUpdate();
    });
}

function editor (empl) {
    this.edit = empl;
    this.modal = true;
    this.form = 'edit';
}

function submit (event) {
    var self = this;
    var form = {};
    var inputs = event.target.querySelectorAll('.input');

    event.preventDefault();
    inputs.forEach(value => form[value.name] = value.value);

    fetch(`/api/office/${ this.form }`, {
        method: 'POST',
        body: require('querystring').stringify(form),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    }).then(async function (response) {
        var data = await response.json();

        self.office.push(data);
        self.office = self.office.sort((a, b) => { return a.id - b.id });

        self.modal = false;
        self.$forceUpdate();
    });
}
</script>


<style lang="stylus" scoped>
@import '~@/style/palette'

#block
    border-radius 2px
    margin-bottom 16px

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

    .table
        align-items center
        background $white
        border-bottom 1px solid $cloud
        display grid
        grid-template-columns 52px 64px auto 370px 80px
        overflow hidden
        max-height 60px
        &.hide
            border-bottom none
            max-height 0


    .data
        border-right 1px solid $cloud
        padding 8px
        &.id
            color $concrete
            font-weight 600
            text-align center
        &.name
            padding-left 16px
        &.hash
            text-align center
        &.avatar-container
            margin 4px 0
            text-align center

            .avatar
                border-radius 50%
                max-height 50px
                max-width 50px

    .controls
        text-align center

    .edit
        color $turquoise
        cursor pointer
        display inline-block
        margin 0 6px

    .remove
        color $alizarin
        cursor pointer
        display inline-block
        margin 0 6px


#modal
    background RGBA(0, 0, 0, .5)
    position fixed
    bottom 0
    top 0
    left 0
    right 0

#form
    background $white
    border-radius 5px
    box-shadow 0 0 100px RGBA(0, 0, 0, .5)
    margin 0 auto
    margin-top 120px
    padding 16px 0
    text-align center
    width 420px

    .title
        font-size 18px
        font-weight 600
        margin 4px auto
        padding 0 4px
        text-align left
        width 360px

    .input
        background $white
        border 1px solid $cloud
        border-radius 3px
        font-size 16px
        outline none
        margin 8px auto
        padding 6px 12px
        width 360px
        &:focus
            border-color $silver

.button
    background $turquoise
    border none
    border-radius 5px
    color $cloud
    cursor pointer
    font-size 16px
    margin 8px auto
    outline none
    padding 8px 0
    vertical-align middle
    width 360px
    &:hover
        background lighten($turquoise, 5)
    &.add
        font-size 14px
        padding 7px 0
        width 200px
        
</style>
