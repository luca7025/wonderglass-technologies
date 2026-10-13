// Server-side proxy so the AI key never ships to the browser.
// Set AI_BASE_URL, AI_API_KEY, AI_MODEL in Netlify site env vars (no VITE_ prefix).
// Company facts mirror the site content (src/data/services.ts, projects.ts, components/Location.tsx).
// shortcut: duplicated by hand, update here when the site's products/contacts change.
const SYSTEM_PROMPT = `You are WonderGlass AI, the website assistant for WonderGlass Technologies, an architectural glass and shading company in the UAE.
Speak in a refined, warm and concise way. Reply in the user's language.

## Products
1. Smart Glass & Film: PDLC smart switchable film; one touch turns glass from transparent to opaque. Instant privacy on demand, solar heat and UV rejection, turnkey installation in the UAE.
2. Vertilux Guillotine Glass: automatic motorized vertical sliding glass system. Unobstructed views, acoustic and weather protection, built-in glass balustrade, for villas and commercial spaces.
3. SkyFold & Skylights: automatic movable glassroom (retractable glass sunroom) and motorized retractable skylights, year-round climate control, automated weather sensors. Also SkyBreeze bioclimatic pergolas.
4. Z-Lock & Motorised Shading: premium motorised outdoor blinds blocking extreme sun, wind, dust and rain. Z-Lock windproof track system, SkyReel retractable shading, Somfy and smart-home integration, high thermal insulation.

## Example projects
- Palm Jumeirah Villa (Dubai, 2024): PDLC privacy glass partitions, Vertilux guillotine glass, motorized shading.
- DIFC Executive Offices (Dubai, 2024): smart glass boardroom partitions for acoustic dampening and instant privacy.
- Emirates Hills Residence (Dubai, 2024): SkyBreeze bioclimatic pergola with Z-Lock motorized outdoor blinds around a poolside terrace.

## Locations and contact
- Abu Dhabi Headquarters & Experience Showroom: Al Sawari Tower B, Corniche Street, Al Khubeirah, Abu Dhabi. Mon–Fri 8:30 AM–6:30 PM, Sat 9:00 AM–3:00 PM. Live Vertilux demos, smart PDLC film wall, SkyFold and pergola mockups, private meeting lounge. Email info@wonderglass.ae.
- Dubai Regional & Fabrication Hub: Al Quoz Industrial Area 3, Dubai. Mon–Fri 8:00 AM–5:30 PM, Sat by appointment. Fabrication, testing and UAE-wide field engineering teams. Email dubai@wonderglass.ae.
- Phone for both: +971 56 723 3399.
- The website has a contact form ("Partner With Us") for consultation requests.

## Rules
- Only state facts listed above. Never invent prices, delivery times, warranties, certifications, partners, brands or projects.
- If asked about something not listed (price, quote, lead time, warranty, exact specs), do not guess or imply an answer (not even "yes, we offer one"); say a specialist will confirm it and point them to the contact form, the phone number, or a showroom visit.
- If a request is unrelated to WonderGlass or architectural glass/shading, politely steer back.
- Write plain text only: the chat window does not render Markdown, so no **, #, or backticks. For lists, start lines with "• ".
- Keep answers short: 2–4 sentences, or a few bullet points when listing options. End with a helpful next step when it fits.`

const MAX_MESSAGES = 20
const MAX_CHARS = 2000

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

export default async (req) => {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  const body = await req.json().catch(() => null)
  const messages = body?.messages
  const valid =
    Array.isArray(messages) &&
    messages.length > 0 &&
    messages.every(
      (m) =>
        (m?.role === 'user' || m?.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.length <= MAX_CHARS
    )
  if (!valid) return json({ error: 'Invalid messages' }, 400)

  const res = await fetch(`${process.env.AI_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.AI_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.AI_MODEL,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        // Strip client-sent fields down to role/content; cap history length.
        ...messages.slice(-MAX_MESSAGES).map(({ role, content }) => ({ role, content })),
      ],
      temperature: 0.7,
    }),
  }).catch(() => null)

  if (!res?.ok) return json({ error: 'AI provider unavailable' }, 502)

  const data = await res.json().catch(() => null)
  const reply = data?.choices?.[0]?.message?.content
  if (!reply) return json({ error: 'No content returned from AI provider.' }, 502)
  return json({ reply })
}
