export const formDataToObject = (formData: FormData) => {
    const object: { [key: string]: any } = {};

    formData.forEach((value, key) => {
      // Keyが `[]` で終わっている場合、配列として扱う
      if (key.endsWith('[]')) {
        const cleanKey = key.slice(0, -2); // `[]` を削除
        if (!object[cleanKey]) {
          object[cleanKey] = [];
        }
        object[cleanKey].push(value);
      } else {
        if (object[key]) {
          if (Array.isArray(object[key])) {
            object[key].push(value);
          } else {
            object[key] = [object[key], value];
          }
        } else {
          object[key] = value;
        }
      }
    });
  
    return object;
}