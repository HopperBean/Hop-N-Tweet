const root =
  // @ts-ignore
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:3000/";

export function get(url) {
  return fetch(root + url, {
    credentials: "include",
  }).then((response) => response.json());
}

export function post(url, body) {
  const opts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  if (body) {
    opts.body = JSON.stringify(body);
  }

  return fetch(root + url, opts).then((response) => response.json());
}
