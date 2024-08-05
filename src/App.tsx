import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';

const LineChartPage = lazy(() => import('./pages/LineChartPage'));
const BarChartPage = lazy(() => import('./pages/BarChartPage'));
const PieChartPage = lazy(() => import('./pages/PieChartPage'));
const BarChartPlaygroundPage = lazy(() => import('./pages/BarChartPlaygroundPage'));
const LineChartPlaygroundPage = lazy(() => import('./pages/LineChartPlaygroundPage'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

function App() {
  return (
    <Layout>
      <Suspense>
        <Routes>
          <Route path='/index.html' element={<LineChartPage />} />
          <Route path='/' element={<LineChartPage />} />
          <Route path='/line-chart' element={<LineChartPage />} />
          <Route path='/bar-chart' element={<BarChartPage />} />
          <Route path='/pie-chart' element={<PieChartPage />} />
          <Route path='/bar-chart-playground' element={<BarChartPlaygroundPage />} />
          <Route path='/line-chart-playground' element={<LineChartPlaygroundPage />} />
          {/* <Route path='/list' element={<ListPage />} /> */}
          {/* <Route path='/list/:id' element={<SinlgeItemPage />} /> */}

          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
