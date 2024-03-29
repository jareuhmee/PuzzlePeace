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
            xAxis: {
                type: 'category',
                data: [data.startDate, '', '', '', data.endDate]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [2, 3, 1, 1, 3],
                    type: 'bar',
                    color: Colors.primary
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
            <Text>Meltdown Occurences from {data.startDate} to {data.endDate}</Text>
            <SkiaChart ref={skiaRef}></SkiaChart>
        </View>
    )
}

const styles_barGraph = StyleSheet.create({
    graphContainer: {
        backgroundColor: Colors.tint,
        borderWidth: 3,
        borderColor: Colors.primary,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
        width: '75%',
        height: '40%'
    },
    header: {
        fontFamily: "DMSans",
        fontWeight: "bold",
        color: Colors.primary,
    }

})
export default BarGraph

//mock data for bar graph

var barData = {
    startDate: 'Feb 25',
    endDate: 'Mar 24',
    timeEndPoints: ['2-25', '3-3', '3-10', '3-17', '3-24'],
}