import ApexCharts from 'apexcharts';
export const statebar = {
    series: [{
        name: 'Inflation',
        data: [2.3, 3.1, 4.0, 2.8]
    }],
    options: {
        grid: {
            show: false
        },
        chart: {
            height: 150,
            type: 'bar',
            toolbar: { show: false }
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    position: 'top', // top, center, bottom
                },
            }
        },
        dataLabels: {
            enabled: false,
            formatter: function(val) {
                return val + "%";
            },
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ["#304758"]
            }
        },
        xaxis: {
            labels: {
                show: false
            },
            categories: [],
            position: 'top',
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            crosshairs: {},
            tooltip: {
                enabled: false,
            }
        },
        yaxis: {
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
                formatter: function(val) {
                    return val + "%";
                }
            }

        },
        title: {
            floating: true,
            align: 'center'
        }
    },


};

export const stateradial = {

    series: [40],
    options: {
        chart: {
            height: 350,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    margin: 15,
                    size: "70%"
                },

                dataLabels: {
                    showOn: "always",
                    name: {
                        offsetY: -10,
                        show: false,
                        color: "#888",
                        fontSize: "13px"
                    },
                    value: {
                        color: "#111",
                        fontSize: "30px",
                        show: true
                    }
                }
            }
        },
    },


};

export const stacked = {
    series: [{
        name: 'Marketing',
        data: [48]
    }, {
        name: 'Payments',
        data: [21]
    }, {
        name: 'Bill',
        data: [31]
    }],
    options: {
        grid: {
            show: false
        },
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            stackType: '100%',
            toolbar: { show: false }
        },
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        stroke: {
            width: 1,
            colors: ['#fff']
        },
        xaxis: {
            labels: {
                show: false
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
        },
        yaxis: {
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
                formatter: function(val) {
                    return val + "%";
                }
            }
        },
        tooltip: {
            y: {
                formatter: function(val) {
                    return val + "K"
                }
            }
        },
        fill: {
            opacity: 1

        },
        legend: {
            position: 'left',
            horizontalAlign: 'left',
            offsetY: 25,
            offsetX: -20
        }
    }
};