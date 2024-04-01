import { useState, useRef, useEffect } from "react"
import { View, StyleSheet, Text } from "react-native"
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { SVGRenderer, SkiaChart } from '@wuba/react-native-echarts';
import Colors from "../constants/Colors";

echarts.use([SVGRenderer, PieChart, GridComponent, TooltipComponent, LegendComponent])

function PieGraph({pieData}){
    const skiaRef = useRef(null);
    const [data, setData] = useState(pieData)
    useEffect(() => {
        const option = {
            tooltip: {
              trigger: 'item',
              position: [10,300],
              textStyle: {
                fontFamily: "DMSans",
                fontSize: 10,
              },
              borderWidth: 1,
              borderColor: Colors.primary 
            },
            series: [
              {
                name: data.name,
                type: 'pie',
                radius: ['35%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: 12,
                    fontWeight: 'bold',
                    fontFamily: "DMSans"
                  }
                },
                data: data.pieData,
              }
            ]
          };
        let chart;
        if(skiaRef.current){
            chart = echarts.init(skiaRef.current, 'light', {
                renderer: 'svg',
                width: 300,
                height: 370
            });
            chart.setOption(option);
        }
        return () => chart?.dispose();
    })

    return(
        <View style={styles_pieChart.graphContainer}>
          <Text style={styles_pieChart.header}>{data.childName}'s Triggers</Text>
            <SkiaChart ref={skiaRef}></SkiaChart>
        </View>
    )
    
    
}

export default PieGraph;
const styles_pieChart = StyleSheet.create({
    graphContainer: {
      backgroundColor: Colors.grey,
      borderWidth: 2,
      borderColor: Colors.primary,
      borderRadius: 10,
      display: 'flex',
      justifyContent: 'top',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: 30,
      width: 300,
      height: 450,
    },
    header: {
      fontSize: 22,
      fontFamily: "DMSans",
      fontWeight: 'bold',
      color: Colors.primary,
      marginHorizontal: 24,
      marginTop: 20
    }
})
const mockData = {
    name: "Trigger Occurrences",
    childName: "Jenna",
    pieData: [
        {value: 8, name: 'Loud Noises'},
        {value: 6, name: 'Routine change'},
        {value: 4, name: 'Waiting in line'},
        {value: 4, name: 'Scolding'},
        {value: 2, name: 'Too many options'}
    ]
    
}
