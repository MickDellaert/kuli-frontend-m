import { ORIGIN } from "../config";

export const update = async (category = "", id = 0, value = "") => {
  const path = `${category}/${id}`;
  const body = {
    data: {
      isLoggedIn: value,
    },
  };
  const url = encodeURI(`${ORIGIN}${path}`);
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
  const result = await response.json();
  // console.log("update", result);
  return result;
};
