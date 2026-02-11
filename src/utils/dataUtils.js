// Построение древовидной структуры из плоского массива
export const buildTree = (data) => {
  const map = new Map();
  const roots = [];
  
  data.forEach(item => {
    map.set(item.id, { ...item, children: [] });
  });
  
  data.forEach(item => {
    const node = map.get(item.id);
    
    if (item.parentId === 0) {
      roots.push(node);
    } else {
      const parent = map.get(item.parentId);
      if (parent) {
        parent.children.push(node);
      }
    }
  });
  
  return roots;
};

// Фильтрация дерева
export const filterTree = (tree, filterType) => {
  const filterFunction = (nodes) => {
    return nodes
      .map(node => ({ ...node }))
      .filter(node => {
        if (filterType === 'active') return node.isActive;
        if (filterType === 'inactive') return !node.isActive;
        return true;
      })
      .map(node => {
        if (node.children && node.children.length > 0) {
          const filteredChildren = filterFunction(node.children);
          return { ...node, children: filteredChildren };
        }
        return node;
      });
  };
  
  return filterFunction(tree);
};

// Сортировка дерева
export const sortTree = (tree, sortBy, direction) => {
  const sortFunction = (nodes) => {
    return [...nodes]
      .sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];
        
        if (sortBy === 'balance') {
          aValue = parseFloat(aValue.replace(/[^0-9.-]+/g, ''));
          bValue = parseFloat(bValue.replace(/[^0-9.-]+/g, ''));
        }
        
        if (aValue < bValue) return direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return direction === 'asc' ? 1 : -1;
        return 0;
      })
      .map(node => {
        if (node.children && node.children.length > 0) {
          return {
            ...node,
            children: sortFunction(node.children)
          };
        }
        return node;
      });
  };
  
  return sortFunction(tree);
};

// Рекурсивный поиск узла в дереве
export const findNode = (tree, id) => {
  for (const node of tree) {
    if (node.id === id) return node;
    if (node.children && node.children.length > 0) {
      const found = findNode(node.children, id);
      if (found) return found;
    }
  }
  return null;
};