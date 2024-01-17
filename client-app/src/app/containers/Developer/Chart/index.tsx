/* eslint-disable @typescript-eslint/ban-types */
import { Container } from '@mui/system';
import ReactApexChart from 'react-apexcharts';
import { schema, state } from './schema';

const Chart: React.FC<Props> = () => {
  return (
    <Container>
      <ReactApexChart
        series={schema.series}
        type="line"
        options={schema.options}
        height={300}
        width={500}
      />
      <ReactApexChart series={state.series} type="pie" options={state.options} width={380} />
    </Container>
  );
};

type Props = {};

export default Chart;
