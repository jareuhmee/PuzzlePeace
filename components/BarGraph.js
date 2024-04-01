import { useState, useRef, useEffect } from "react"
import { View, StyleSheet, Text } from "react-native"
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { SVGRenderer, SkiaChart } from '@wuba/react-native-echarts';
import Colors from "../constants/Colors";
echarts.use([SVGRenderer, BarChart, GridComponent])
function BarGraph(){
    const skiaRef = useRef(null);
    const [data, setData] = useState(barData);
    useEffect(() => {
        const option = {
            tooltip: {
                trigger: 'item',
                position: [10,250],
                borderColor: Colors.primary,
                textStyle: {
                  fontFamily: "sans-serif",
                  fontSize: 12
                },
              },
            xAxis: {
                type: 'category',
                data: data.timeEndPoints
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [2, 3, 1, 1, 3],
                    type: 'bar',
                    color: Colors.tint
                }
            ]
        };
        let chart;
        if(skiaRef.current){
            chart = echarts.init(skiaRef.current, 'light', {
                renderer: 'svg',
                width: 250,
                height: 300
            });
            chart.setOption(option)
        }
        return () => chart?.dispose();
    }, [])
    //
    //

    return(
        <View style={styles_barGraph.graphContainer}>
            <Text style={styles_barGraph.header}>Meltdown Occurences from {data.startDate} to {data.endDate}</Text>
            <SkiaChart ref={skiaRef}></SkiaChart>
        </View>
    )
}

const styles_barGraph = StyleSheet.create({
    graphContainer: {
        backgroundColor: Colors.grey,
        borderWidth: 2,
        borderColor: Colors.primary,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
        width: 300,
        height: 400
    },
    header: {
        fontSize: 22,
        fontFamily: "DMSans",
        fontWeight: 'bold',
        color: Colors.primary,
        marginHorizontal: 20,
        marginTop: 20
    }

})
export default BarGraph

//mock data for bar graph

var barData = {
    startDate: 'Feb 25',
    endDate: 'Mar 24',
    timeEndPoints: ['Wk1', 'Wk2', 'Wk3', 'Wk4', 'Wk5'],
}