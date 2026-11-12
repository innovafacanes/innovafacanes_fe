// Includes the /api suffix, e.g. https://strapi.innovafacanes.cat/api
const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;

function getRecaptchaToken(siteKey, grecaptcha) {
  return new Promise((resolve, reject) => {
    grecaptcha.ready(() => {
      grecaptcha.execute(siteKey, { action: "contact" }).then(resolve, reject);
    });
  });
}

export async function submitContactForm({
  formData,
  siteKey,
  grecaptcha,
  fetchImpl = fetch,
  baseUrl = BASE_URL,
}) {
  const body = { formData };
  if (siteKey) {
    body.token = await getRecaptchaToken(siteKey, grecaptcha);
  }

  const response = await fetchImpl(`${baseUrl}/ezforms/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`Ezforms submit ${response.status}`);
  return response;
}
