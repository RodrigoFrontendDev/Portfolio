const API_BASE = "https://api.indec.gob.ar/v1/";

const ALLOWED_ENDPOINTS = new Set([
  "ipi_manufacturero",
  "ipi_minero",
  "estimaciones_poblacion_departamento_2022_2035",
  "proyecciones_poblacion_jurisdiccion_2022_2040",
  "proyecciones_poblacion_nacional_2022_2040",
  "ipc_nacional",
  "valorizacion_canastas_cba_cbt",
  "indice_salarios",
  "icc_precios_construccion",
  "redeterminacion_precios_contratos_obras_publicas",
  "sipm_precios_mayoristas",
  "estimador-mensual-de-actividad-economica-nivel-general",
  "estimador-mensual-de-actividad-economica-sectores",
  "pobreza_eph",
  "mercado_trabajo_eph",
  "canasta-crianza",
  "comercio_exterior_nomenclaturas",
  "comercio_exterior_exportacion_bienes",
  "comercio_exterior_importacion_bienes"
]);

function json(body, status, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "X-INDEC-Proxy": "active",
      ...extraHeaders
    }
  });
}

export async function onRequest({ request, params }) {
  if (request.method !== "GET") {
    return json({ error: "Método no permitido. Este proxy solo admite GET." }, 405, {
      Allow: "GET"
    });
  }

  const incomingUrl = new URL(request.url);
  const origin = request.headers.get("Origin");
  if (origin && origin !== incomingUrl.origin) {
    return json({ error: "Origen no permitido." }, 403);
  }

  const segments = Array.isArray(params.path)
    ? params.path
    : [params.path].filter(Boolean);

  if (segments.length === 1 && segments[0] === "health") {
    return json({
      ok: true,
      service: "INDEC API proxy",
      upstream: "https://api.indec.gob.ar/v1/",
      endpoints: ALLOWED_ENDPOINTS.size
    }, 200);
  }

  if (segments.length !== 1 || !ALLOWED_ENDPOINTS.has(segments[0])) {
    return json({ error: "El servicio solicitado no forma parte del catálogo habilitado." }, 404);
  }

  const authorization = request.headers.get("Authorization") || "";
  if (!/^Bearer\s+\S+$/i.test(authorization)) {
    return json({ error: "Falta un token Bearer válido en el encabezado Authorization." }, 401);
  }

  const upstreamUrl = new URL(segments[0], API_BASE);
  for (const [key, value] of incomingUrl.searchParams) {
    upstreamUrl.searchParams.append(key, value);
  }

  const upstreamHeaders = new Headers({
    Accept: "application/json",
    Authorization: authorization
  });
  if (request.headers.get("Prefer") === "count=exact") {
    upstreamHeaders.set("Prefer", "count=exact");
  }

  try {
    // Cloudflare Workers no admite redirect: "error". Seguimos manualmente
    // y solo aceptamos destinos HTTPS dentro del /v1/ oficial del INDEC.
    const trustedOrigin = new URL(API_BASE).origin;
    let currentUrl = upstreamUrl;
    let upstream;

    for (let redirects = 0; redirects <= 3; redirects++) {
      upstream = await fetch(currentUrl.toString(), {
        method: "GET",
        headers: upstreamHeaders,
        redirect: "manual"
      });

      const isRedirect = [301, 302, 303, 307, 308].includes(upstream.status);
      if (!isRedirect) break;

      const location = upstream.headers.get("Location");
      if (!location) {
        throw new Error("El INDEC respondió con una redirección sin encabezado Location.");
      }

      const nextUrl = new URL(location, currentUrl);
      if (
        nextUrl.protocol !== "https:" ||
        nextUrl.origin !== trustedOrigin ||
        !nextUrl.pathname.startsWith("/v1/") ||
        nextUrl.username ||
        nextUrl.password
      ) {
        throw new Error("Se bloqueó una redirección fuera de https://api.indec.gob.ar/v1/.");
      }

      if (redirects === 3) {
        throw new Error("La API del INDEC superó el máximo de 3 redirecciones.");
      }

      currentUrl = nextUrl;
    }

    const responseHeaders = new Headers({
      "Content-Type": upstream.headers.get("Content-Type") || "application/json",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "X-INDEC-Proxy": "active"
    });

    for (const name of ["Content-Range", "Preference-Applied", "Retry-After"]) {
      const value = upstream.headers.get(name);
      if (value) responseHeaders.set(name, value);
    }

    return new Response(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: responseHeaders
    });
  } catch (error) {
    return json({
      error: "No se pudo establecer conexión con la API oficial del INDEC.",
      details: error instanceof Error ? error.message : "El proxy no recibió una respuesta del servidor de INDEC."
    }, 502);
  }
}
