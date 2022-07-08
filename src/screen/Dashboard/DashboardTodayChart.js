import { View, Text, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LineChart, ProgressChart } from 'react-native-chart-kit'
import axios from 'axios'
import moment from 'moment'

const DashboardTodayChart = (props) => {
  const screenWidth = Dimensions.get("window").width;
  const [importData, setImportData] = useState([])
  const [exportData, setExportData] = useState([])
  const [moveData, setMoveData] = useState([])
  const [importDataMother, setImportDataMother] = useState(1)
  const [exportDataMother, setExportDataMother] = useState(1)
  const [moveDataMother, setMoveDataMother] = useState(1)

  useEffect(() => {
    axios.defaults.baseURL = "http://35.77.20.236:8080/import"
    axios.get('/search', {
      params: {
        instruction_no: "전체보기",
        status: "전체보기",
        lot_no: "전체보기",
        item_code: "전체보기",
        item_name: "전체보기",
        min_order_amount: -1,
        max_order_amount: 10000000,
        min_im_amount: -1,
        max_im_amount: 10000000,
        unit: "전체보기",
        min_weight: -1,
        max_weight: 10000000,
        min_thickness: -1,
        max_thickness: 10000000,
        min_height: -1,
        max_height: 10000000,
        min_width: -1,
        max_width: 10000000,
        industry_family: "전체보기",
        product_family: "전체보기",
        location: "전체보기",
        to_warehouse: "전체보기",
        customer: "전체보기",
        order_date: "전체보기",
        inst_reg_date: "전체보기",
        inst_deadline: '2022-12-31',
        // inst_deadline: moment().format("YY-MM-DD"),
        done_date: "전체보기",
      }
    })
      .then((res) => {
        setImportData(res.data)
        if (res.data.length) {
          setImportDataMother(res.data.length)
        }
      })
      .catch((err) => { })
  }, [])
  useEffect(() => {
    axios.defaults.baseURL = "http://13.230.30.203:8080/export"
    axios.get('/search', {
      params: {
        instruction_no: "전체보기",
        status: "전체보기",
        lot_no: "전체보기",
        item_code: "전체보기",
        item_name: "전체보기",
        min_order_amount: 0,
        max_order_amount: 10000000,
        min_ex_amount: 0,
        max_ex_amount: 10000000,
        ex_remain: "전체보기",
        unit: "전체보기",
        min_width: 0,
        max_width: 10000000,
        min_weight: 0,
        max_weight: 10000000,
        min_thickness: 0,
        max_thickness: 10000000,
        min_height: 0,
        max_height: 10000000,
        product_family: "전체보기",
        location: "전체보기",
        from_warehouse: "전체보기",
        customer: "전체보기",
        order_date: "전체보기",
        inst_reg_date: "전체보기",
        inst_deadline: '2022-07-01',
        // inst_deadline: moment().format("YY-MM-DD"),
        done_date: "전체보기",
      }
    })
      .then((res) => {
        setExportData(res.data)
        if (res.data.length) {
          setExportDataMother(res.data.length)
        }
      })
      .catch((err) => { })
  }, [])
  useEffect(() => {
    axios.defaults.baseURL = "http://35.77.44.58:8080/move"
    axios.get('/search', {
      params: {
        instruction_no: "전체보기",
        status: "전체보기",
        lot_no: "전체보기",
        item_code: "전체보기",
        item_name: "전체보기",
        min_move_amount: 0,
        max_move_amount: 10000000,
        unit: "전체보기",
        min_weight: 0,
        max_weight: 10000000,
        min_width: 0,
        max_width: 10000000,
        min_thickness: 0,
        max_thickness: 10000000,
        min_height: 0,
        max_height: 10000000,
        location: "전체보기",
        from_warehouse: "전체보기",
        to_warehouse: "전체보기",
        inst_reg_date: "전체보기",
        inst_deadline: '2022-06-27',
        // inst_deadline: moment().format("YY-MM-DD"),
        done_date: "전체보기",
      }
    })
      .then((res) => {
        setMoveData(res.data)
        if (res.data.length) {
          setMoveDataMother(res.data.length)
        }
      })
      .catch((err) => { })
  }, [])


  const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fad6d6",
    backgroundGradientTo: "#4584a9",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726"
    }
  }
  return (
    <View>
      <ProgressChart
        data={{
          labels: ["이동", "출고", "입고", "전체"],
          data: [
            (moveData.filter((schedule) => schedule.status.includes("완료")).length) / moveDataMother,
            (exportData.filter((schedule) => schedule.status.includes("완료")).length) / exportDataMother,
            (importData.filter((schedule) => schedule.status.includes("완료")).length) / importDataMother,
            ((importData.filter((schedule) => schedule.status.includes("완료")).length)
              + (exportData.filter((schedule) => schedule.status.includes("완료")).length)
              + (moveData.filter((schedule) => schedule.status.includes("완료")).length))
            / (importDataMother + exportDataMother + moveDataMother),
          ]
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