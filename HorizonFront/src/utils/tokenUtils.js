function getTokenPayload(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

export function isTokenExpired(token) {
  if (!token) return true;
  const payload = getTokenPayload(token);
  if (!payload || !payload.exp) return true;
  return payload.exp < Date.now() / 1000;
}
