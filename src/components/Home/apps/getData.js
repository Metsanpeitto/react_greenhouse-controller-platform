// Get Data is used by every component who needs to retrieve from an URL
export const getData = url => fetch(url).then(response => response.json());
