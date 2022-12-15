import { createFromIconfontCN } from "@ant-design/icons";

export const stateBar = (type, color) => ({
    options: {
        noData: {
            text: "No data to show...",
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0,
            style: {
                color: "blue",
                fontSize: '12px',
            }
        },
        title: {
            text: type,
            align: "center",
            offsetY: 10
        },
        style: {
            fontSize: '14px',
            fontWeight: '300',
            fontFamily: 'Manrope',
            fontVariant: "tabular-nums",
            fontFeatureSettings: "tnum",
            color: '#263238'
        },
        colors: [color],
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
                show: false,
                formatter: function () {
                    return "";
                }
            },
            categories: [type, type, type],
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
    options: {
        noData: {
            text: "No data to show...",
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0,
            style: {
                color: "blue",
                fontSize: '12px',
            }
        },
        colors: ['#ffcf45', '#022cf7', '#00cbff', '#26f8c9'],
        grid: {
            show: false
        },
        chart: {
            type: 'bar',
            height: 360,
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
                formatter: function () {
                    return "";
                }
            }
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return (val / 1000).toFixed(2) + "kW"
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


export const linear = (text, unit, color) => ({
    options: {
        noData: {
            text: "No data to show...",
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0,
            style: {
                color: "blue",
                fontSize: '12px',
            }
        },
        chart: {
            id: text,
            group: 'social',
        },
        colors: [color],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 1
        },
        title: {
            text: text,
            align: 'center'
        },
        xaxis: {
            type: 'datetime',
            tooltip: {
                enabled: false
            }

        },
        tooltip: {
            enabled: true,
            theme: "light",
            x: {
                show: true,
                format: "dd-MM-yyyy HH:mm"
            },
            y: {
                formatter: (val) => val + " " + unit
            }
        },
    }
});

export const invoices = {
    options: {
        chart: {
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        title: {
            text: 'Product Trends by Month',
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        xaxis: {

            categories: [],
        }
    }
};

export const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/c/font_3378177_50drx8euoam.js',
});
