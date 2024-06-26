import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import SideBarLinkItem from './SideBarLinkItem';

const routesRaw = [
  {
    to: '/line-chart',
    text: 'LineChart',
    activeNames: ['/line-chart', '/'],
  },
  {
    to: '/bar-chart',
    text: 'BarChart',
    activeNames: ['/bar-chart'],
  },
  {
    to: '/pie-chart',
    text: 'PieChart',
    activeNames: ['/pie-chart'],
  },
  {
    to: '/bar-chart-playground',
    text: 'Playground for BarChart',
    activeNames: ['/bar-chart-playground'],
  },
  {
    to: '/line-chart-playground',
    text: 'Playground for LineChart',
    activeNames: ['/line-chart-playground'],
  },
  {
    to: '/about',
    text: 'About',
    activeNames: ['/about'],
  },
];

export default function SideBarLinkList() {
  const { pathname } = useLocation();

  const routes = useMemo(
    () =>
      routesRaw.map(({ to, text, activeNames }) => ({
        to,
        text,
        isActive: activeNames.some((name) => name === pathname),
      })),
    [pathname],
  );

  return (
    <div className='flex animate-appear flex-col items-start justify-start text-sm font-thin'>
      {routes.map(({ to, text, isActive }) => (
        <SideBarLinkItem key={text} to={to} text={text} isActive={isActive} />
      ))}
    </div>
  );
}
