import React, { useState } from 'react';
import './App.css';
import Table from './components/Table';
import { data } from './data/data';

function App() {
  const [filterActive, setFilterActive] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleFilterChange = (value) => {
    setFilterActive(value);
  };

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  return (
    <div className="App">
      <main>
        <div className="controls">
          <div className="filter-control">
            <label>Фильтр по активности: </label>
            <select 
              value={filterActive} 
              onChange={(e) => handleFilterChange(e.target.value)}
            >
              <option value="all">Все</option>
              <option value="active">Активные</option>
              <option value="inactive">Неактивные</option>
            </select>
          </div>
        </div>
        <Table 
          data={data}
          filterActive={filterActive}
          sortConfig={sortConfig}
          onSort={handleSort}
        />
      </main>
    </div>
  );
}

export default App;