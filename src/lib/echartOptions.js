module.exports = {
    backgroundColor: "#FFF",
    title: {
        text: '广元堂连锁数据表',
        left: '50%',
        textAlign: 'center'
    },
    grid: {
        top: 100,
        bottom: 100,
        left: 60,
        right: 50
    },
    tooltip: {
        trigger: "axis",
        label: {
            show: true
        }
    },
    legend: {
        data: ['金额', '笔数'],
        right: 20
    },
    xAxis: {
        boundaryGap: true, //默认，坐标轴留白策略
        axisLine: {
            show: false
        },
        splitLine: {
            show: false
        },
        axisTick: {
            show: false,
            alignWithLabel: true
        },
        data: ['2020-05-01', '2020-05-02', '2020-05-03', '2020-05-04', '2020-05-05', '2020-05-06', '2020-05-07', '2020-05-08', '2020-05-09', '2020-05-10', '2020-05-11', '2020-05-12', '2020-05-13', '2020-05-14']
    },
    yAxis: [{
            type: 'value',
            name: '（元）',
            min: 0,
            max: 5000,
            position: 'left',
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    color: 'rgba(33,148,246,0.2)'
                }
            },
            axisLabel: {
                formatter: '{value}'
            }
        },
        {
            type: 'value',
            name: '（笔）',
            min: 0,
            max: 5000,
            position: 'right',
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    color: 'rgba(33,148,246,0.2)'
                }
            },
            axisLabel: {
                formatter: '{value}'
            }
        },
    ],
    series: [{
        name: '金额',
        type: "line",
        smooth: false,
        symbol: "circle",
        symbolSize: 7,
        lineStyle: {
            color: "rgb(33,148,246)",
            shadowBlur: 12,
            shadowColor: "rgb(33,148,246,0.9)",
            shadowOffsetX: 1,
            shadowOffsetY: 1
        },
        itemStyle: {
            color: "rgb(33,148,246)",
            borderWidth: 1,
            borderColor: "#FFF"
        },
        label: {
            show: false,
            distance: 1,
            emphasis: {
                show: false,
                offset: [25, -2],
                //borderWidth:1,
                // borderColor:'rgb(33,148,246)',
                //formatter:'{bg|{b}\n数据量:{c}}',
                backgroundColor: 'rgb(33,148,246)',
                color: "#ccc",
                padding: [8, 20, 8, 6],
                //width:60,
                height: 36,
                formatter: function (params) {
                    var name = params.name;
                    var value = params.data;
                    var str = name + "\n数据量：" + value;
                    return str;
                },
                rich: {
                    bg: {
                        backgroundColor: '#FFF',
                        width: 78,
                        //height:42,
                        color: "#ccc",
                        padding: [20, 0, 20, 10]
                    },
                    br: {
                        width: "100%",
                        height: "100%"
                    }
                }
            }
        },
        data: [
            ['2020-05-01', 1000],
            ['2020-05-02', 1788],
            ['2020-05-06', 1238],
            ['2020-05-08', 2226],
            ['2020-05-09', 2212],
            ['2020-05-11', 1229]
        ]

    }, {
        name: '笔数',
        type: "line",
        smooth: false,
        symbol: "circle",
        symbolSize: 7,
        lineStyle: {
            color: "#c72e39",
            shadowBlur: 12,
            shadowColor: "rgb(199,46,57,0.9)",
            shadowOffsetX: 1,
            shadowOffsetY: 1
        },
        itemStyle: {
            color: "#c72e39",
            borderWidth: 1,
            borderColor: "#FFF"
        },
        label: {
            show: false,
            distance: 1,
            emphasis: {
                show: false,
                offset: [25, -2],
                //borderWidth:1,
                // borderColor:'rgb(33,148,246)',
                //formatter:'{bg|{b}\n数据量:{c}}',
                backgroundColor: 'rgb(33,148,246)',
                color: "#FFF",
                padding: [8, 20, 8, 6],
                //width:60,
                height: 36,
                formatter: function (params) {
                    var name = params.name;
                    var value = params.data;
                    var str = name + "\n数据量：" + value;
                    return str;
                },
                rich: {
                    bg: {
                        backgroundColor: 'rgb(33,148,246)',
                        width: 78,
                        //height:42,
                        color: "#FFF",
                        padding: [20, 0, 20, 10]
                    },
                    br: {
                        width: "100%",
                        height: "100%"
                    }
                }
            }
        },
        data: [
            ['2020-05-02', 1788],
            ['2020-05-05', 1000],
            ['2020-05-08', 2226],
            ['2020-05-09', 2212],
            ['2020-05-11', 1229],
            ['2020-05-14', 1238],
        ]
    }]
}