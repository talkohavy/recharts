import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';

const HomePage = lazy(() => import('./pages/Home'));
const BarChartPage = lazy(() => import('./pages/BarChartPage'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

function App() {
  return (
    <Layout>
      <Suspense>
        <Routes>
          <Route path='/index.html' element={<HomePage />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/bar-chart' element={<BarChartPage />} />
          {/* <Route path='/list' element={<ListPage />} /> */}
          {/* <Route path='/list/:id' element={<SinlgeItemPage />} /> */}

          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
