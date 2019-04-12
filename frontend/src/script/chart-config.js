function randomScalingFactor () {
    return Math.round(Math.random() * 100);
}

export default function (Chart) {
    return {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [ 0, 0, 0 ],
                backgroundColor: [ '#1AAC9C', '#F1C40F', '#E74C3C' ],
                label: ''
            }],
            
            labels: [ 'Пришедшие вовремя', 'Опоздавшие', 'Не пришедшие' ]
        },
        
        options: {
            responsive: true,
            title: { display: false },
            legend: { display: false },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        },

        plugins: [{
            beforeDatasetsDraw: function(chart) {
                chart.ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
                chart.ctx.shadowBlur = 3;
            },

            afterDatasetsDraw: function(chart) {
                chart.ctx.shadowColor = 'rgba(0, 0, 0, 0)';
                chart.ctx.shadowBlur = 0;
            }
        }]
    };
}