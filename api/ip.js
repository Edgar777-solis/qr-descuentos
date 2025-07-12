export default async function handler(req, res) {
  try {
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.connection.remoteAddress;

    const geo = await fetch(`https://ipinfo.io/${ip}/json`);
    const data = await geo.json();

    const body = {
      email: "anonimo@qr.com",
      fecha: new Date().toLocaleString(),
      idioma: req.headers['accept-language'] || "desconocido",
      navegador: req.headers['user-agent'] || "desconocido",
      imagen_mostrada: req.query.imagen || "desconocida",
      ip: data.ip || "desconocida",
      ciudad: data.city || "desconocida",
      region: data.region || "desconocida",
      pais: data.country || "desconocida",
      ubicacion: data.loc || "desconocida",
      proveedor: data.org || "desconocida"
    };

    await fetch('https://script.google.com/macros/s/AKfycbzGouu6VPdnMZN-IEm6dxlQI2CWIiMRWEVRHRA-Cn4aavbMgPBP9AEq4nG27NkCZCYF/exec', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    res.status(200).json({ status: "enviado", datos: body });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
