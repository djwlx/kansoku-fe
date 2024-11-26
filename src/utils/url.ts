export function getURLParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const params: any = {};
  for (const [key, value] of urlParams.entries()) {
    params[key] = value;
  }
  return params;
}
