import { View, Text, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LineChart, ProgressChart } from 'react-native-chart-kit'

const DashboardTodayChart = (props) => {
  const screenWidth = Dimensions.get("window").width;

  // const [datasource, setDatasource] = useState([])
  // useEffect(() => {
  //   setDatasource([props.rates.import, props.rates.export, props.rates.move])
  // }, [props.rates])


  const chartConfig = {
    // backgroundColor: "#ffffff",
    backgroundGradientFrom: "#6E85B7",
    backgroundGradientTo: "#B2C8DF",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => "#2c3e50",
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "6",
      strokeWidth: "4",
      stroke: "#ffa726"
    }
  }
  return (
    <View>
      <ProgressChart
        data={{
          labels: ["입고", "출고", "창고이동"],
          datasets: {
            data: Object.entries(props.rates).map(([key, value], index) => {
              return (value)
            })
          }
        }}
        width={screenWidth}
        height={220}
        strokeWidth={16}
        radius={32}
        chartConfig={chartConfig}
        hideLegend={false}
      />
    </View>
  )
}

export default DashboardTodayChart