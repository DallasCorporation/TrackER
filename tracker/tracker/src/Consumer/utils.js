export const statebar = (name) => ({
    series: [{
        name: name,
        data: [2.3, 3.1, 4.0, 2.8],
    }],
    options: {
        colors: ['#26f8c9'],
        grid: { show: false },
        chart: {
            animations: {
                enabled: true,
                easing: "easein",
                dynamicAnimation: {
                    speed: 1000
                }
            },
            type: 'bar',
            toolbar: { show: false }
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    position: 'top',
                },
            }
        },
        dataLabels: {
            enabled: false,
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
            }
        },
    },
});

export const stateradial = (color) => ({
    series: [40],
    options: {
        colors: [color, "#000000"],
        chart: {
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: "70%"
                },
                dataLabels: {
                    showOn: "always",
                    name: {
                        show: false,
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
});

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
        colors: ['#26f8c9', '#1be7ff', '#022cf7',],
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
                formatter: function (val) {
                    return val + "%";
                }
            }
        },
        tooltip: {
            y: {
                formatter: function (val) {
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

export const linear = (text, unit) => ({
    options: {
        chart: {
            type: 'line',
            zoom: {
                enabled: true
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        title: {
            text: text,
            align: 'center'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        xaxis: {
            type: 'datetime',
            tooltip: {
                enabled: false
            }

        },
        tooltip: {
            enabled: true,
            followCursor: true,
            theme: "light",
            x: {
                show: true,
                format: "dd-MM-yyyy HH:mm"
            },
            y:{
                formatter: (val)=> val + " "+unit
            }
        }

    }
});