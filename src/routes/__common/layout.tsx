import { Outlet } from '@modern-js/runtime/router';

export default function Layout() {
  return (
    <div>
      <header style={{ height: 60, backgroundColor: 'red' }}>header</header>
      <div style={{ display: 'flex' }}>
        <main style={{ flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
