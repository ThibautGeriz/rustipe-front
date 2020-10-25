let db: { [key: string]: any } = {};

const getItem = async (key: string) => db[key];

const setItem = async (key: string, value: any) => {
  db[key] = value;
};

const getAllKeys = async () => Object.keys(db);

const clear = async () => {
  db = {};
};

const removeItem = async (key: string) => {
  delete db[key];
};

export default { getItem, setItem, getAllKeys, clear, removeItem };
