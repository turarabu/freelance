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
    components: { ChartBox, TableBox },
    created: function () {
        this.$root.table = [];
        this.$root.dateChange = dateChange;
    }
}

function dateChange(formattedDate, date, inst) {
    var self = this;

    fetch('/api/date', {
        method: 'POST',
        body: `date=${ date.toString() }`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    }).then(async function (result) {
        var table = [];
        var response = {};
        var data = await result.json();

        data.forEach(function (record) {
            if ( record.source.search('entrance') > 0 ) {
                if (!response[ record.idxid ])
                    response[ record.idxid ] = {
                        enter: new Date( record.detected ),
                        user: record.user
                    };

                else if( new Date(record.detected) < response[ record.idxid ].enter )
                    response[ record.idxid ].enter = new Date(record.detected);
            }

            if ( record.source.search('exit') > 0 ) {
                if( !response[ record.idxid ] ) {
                    response[ record.idxid ] = {
                        exit: new Date( record.detected ),
                        user: record.user
                    }
                }
                
                else {
                    if (!response[ record.idxid ].exit)
                        response[ record.idxid ].exit = new Date( record.detected );

                    else if( new Date(record.detected) > response[ record.idxid ].exit )
                        response[ record.idxid ].exit = new Date(record.detected);
                }
            }
        });

        for ( let hash in response ) {
            if ( response.hasOwnProperty(hash) )
                table.push( response[hash] );
        }

        self.$root.early = 0;
        self.$root.later = 0;
        self.$root.none = 0;
        self.$root.table = table;
        self.$root.$forceUpdate();
        self.$root.TableBox.$forceUpdate();

        self.$root.chartNew();
    });
}
</script>


<style lang="stylus" scoped>
@import '~@/style/palette'

#home
    display grid
    grid-template-columns 320px 940px
    justify-content space-between

#left
    align-self start
    background $white
    border-top 2px solid $turquoise
</style>
