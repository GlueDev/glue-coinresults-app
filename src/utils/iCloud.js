import iCloudStore from 'react-native-icloudstore';

/**
 * Get the store from iCloud.
 * TODO: Error handling.
 */
export const loadStore = async (key) => {
  const response = await iCloudStore.getItem(key);

  if (response === undefined) {
    return false;
  }

  return JSON.parse(response);
};

/**
 * Save the store to iCloud.
 * TODO: Error handling.
 */
export const saveStore = async (key, value) => {
  await iCloudStore.setItem(key, JSON.stringify(value));
};
