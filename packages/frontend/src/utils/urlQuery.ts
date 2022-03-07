export const replaceUrlQuery = (query: Record<string, string>) => {
  // get current url query
  const currentQuery = new URLSearchParams(window.location.search);
  // update query
  Object.entries(query).forEach(([key, value]) => {
    if (!value) {
      currentQuery.delete(key);
    } else {
      currentQuery.set(key, value);
    }
  });

  const queryString = currentQuery.toString();
  const newUrl = `${window.location.origin}${window.location.pathname}${
    queryString ? `?${queryString}` : ''
  }`;

  // update url
  window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
};

export const clearUrlQuery = (key: string | string[]) => {
  // get current url query
  const currentQuery = new URLSearchParams(window.location.search);
  // update query
  if (Array.isArray(key)) {
    key.forEach(k => currentQuery.delete(k));
  } else {
    currentQuery.delete(key);
  }

  const queryString = currentQuery.toString();
  const newUrl = `${window.location.origin}${window.location.pathname}${
    queryString ? `?${queryString}` : ''
  }`;

  // update url
  window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
};
