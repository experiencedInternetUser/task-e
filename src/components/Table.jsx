import React, { useState, useMemo } from 'react';
import TableRow from './TableRow';
import { buildTree, filterTree, sortTree } from '../utils/dataUtils';

const Table = ({ data, filterActive, sortConfig, onSort }) => {
  const [expandedRows, setExpandedRows] = useState(new Set());

  const processedData = useMemo(() => {
    let tree = buildTree(data);
    
    if (filterActive !== 'all') {
      tree = filterTree(tree, filterActive);
    }
    
    if (sortConfig.key) {
      tree = sortTree(tree, sortConfig.key, sortConfig.direction);
    }
    
    return tree;
  }, [data, filterActive, sortConfig]);

  const toggleRow = (id) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const handleSortClick = (key) => {
    onSort(key);
  };

  const renderSortIndicator = (key) => {
    if (sortConfig.key !== key) return '↕';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th className="expand-col"></th>
            <th>ID</th>
            <th>Имя</th>
            <th className="sortable" onClick={() => handleSortClick('email')}>
              Email {renderSortIndicator('email')}
            </th>
            <th className="sortable" onClick={() => handleSortClick('balance')}>
              Баланс {renderSortIndicator('balance')}
            </th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          {processedData.map(item => (
            <TableRow
              key={item.id}
              item={item}
              level={0}
              expandedRows={expandedRows}
              onToggle={toggleRow}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;