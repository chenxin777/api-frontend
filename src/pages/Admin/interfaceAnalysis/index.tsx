import {
  PageContainer,
} from '@ant-design/pro-components';
import '@umijs/max';
import React, {useEffect, useState} from 'react';
import ReactECharts from 'echarts-for-react';
import {listTopInvokeInterfaceInfoUsingGet} from '@/services/api-backend/analysisController';
import {message} from 'antd';

/**
 * 接口分析
 */
const interfaceAnalysis: React.FC = () => {
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [data, setData] = useState<API.InterfaceInfoRankVO[]>([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loading, setLoading] = useState(false);
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // 获取数据
    try {
      listTopInvokeInterfaceInfoUsingGet().then(res => {
        if (res.data) {
          setData(res.data);
        }
      })
    } catch (error: any) {
      message.error(error.message);
    }
    
  }, [])
  
  /**
   * 映射
   */
  const chartData = data.map(item => {
    return {
      value: item.totalNum,
      name: item.name,
    }
  })
  
  const option = {
    title: {
      text: '调用次数最多的接口Top3 ',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: chartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  
  return (
      <PageContainer>
        <ReactECharts loadingOption={{
          showLoading: loading
        }} option={option} />
      </PageContainer>
  );
};
export default interfaceAnalysis;
