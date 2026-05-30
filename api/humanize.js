export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { text, tone, level } = req.body;
  if (!text) return res.status(400).json({ error: 'No text provided' });

  const levelDesc = {
    suave: 'pequeños ajustes, mantén la mayor parte del texto original',
    moderado: 'cambios significativos en estructura y vocabulario',
    intenso: 'reescritura profunda, cambia completamente la forma pero mantén el significado'
  }[level] || 'cambios significativos';

  const toneDesc = {
    conversacional: 'natural y fluida, como si una persona real lo escribiera en un chat o blog',
    academico: 'formal y estructurada, propia de un estudiante universitario real',
    profesional: 'clara y directa, propia de un profesional en su área',
    creativo: 'expresiva y con personalidad propia, con metáforas y variedad de estructuras',
    informal: 'relajada y coloquial, con contracciones y expresiones del habla cotidiana'
  }[tone] || 'natural y fluida';

  const prompt = `Eres un experto en reescritura de textos. Tu tarea es humanizar el siguiente texto para que NO sea detectado como IA por herramientas como GPTZero, Turnitin, Winston AI u otras similares.

REGLAS ESTRICTAS:
1. Usa variación natural en la longitud de oraciones (mezcla cortas y largas)
2. Introduce imperfecciones humanas sutiles: pensamientos un poco informales, conectores variados
3. Evita frases perfectamente paralelas y estructuras repetitivas
4. Usa sinónimos menos comunes, palabras del habla real
5. Añade opiniones implícitas o dudas leves cuando sea apropiado
6. Rompe la monotonía del ritmo típico de IA
7. Usa contracciones y expresiones naturales según el tono
8. Nivel de cambio: ${levelDesc}
9. Tono: escritura ${toneDesc}
10. NO menciones que eres IA ni que estás reescribiendo
11. Devuelve SOLO el texto humanizado, sin explicaciones ni comentarios previos

TEXTO A HUMANIZAR:
${text}`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://humanizador-u14h.vercel.app',
        'X-Title': 'Humanizador de Texto'
      },
      body: JSON.stringify({
        model: 'google/gemma-3-4b-it:free',
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: data.error?.message || 'API error' });
    }

    const result = data.choices?.[0]?.message?.content?.trim();
    return res.status(200).json({ result });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
