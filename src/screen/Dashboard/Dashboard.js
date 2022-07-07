import { View, Text } from 'react-native'
import React from 'react'
import DashboardTodoList from './DashboardTodoList'
import { ScrollView } from 'native-base'

const Dashboard = () => {
    return (
        <ScrollView>
            <View>
                <DashboardTodoList title="입고관리" subTitle="입고예정된 재고들을 바코드스캔" />
                <DashboardTodoList title="출고관리" subTitle="출고예정인 재고들을 바코드스캔" />
                <DashboardTodoList title="창고이동관리" subTitle="창고간 이동예정인 재고들을 바코드스캔" />
                <DashboardTodoList title="창고관리" subTitle="담당하는 창고의 재고현황들을 파악할 수 있음" />
            </View>
        </ScrollView>
    )
}

export default Dashboard