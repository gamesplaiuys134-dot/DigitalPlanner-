export default async function handler(req: any, res: any) {
  try {
    const OFFER_API_KEY =
      process.env.OFFER_API_KEY ||
      "49810|31oMfTqUg0GOqy7HpGfXhrFGXq3zRXStCSDeHrfb2d04de10";
    const OFFER_API_ENDPOINT = "https://appcomplete.org/api/v2";

    const forwarded = req.headers["x-forwarded-for"];
    let clientIp =
      (typeof forwarded === "string" ? forwarded.split(",")[0].trim() : "") ||
      req.socket?.remoteAddress ||
      "";

    // If local or internal, provide a valid fallback IP for campaign geo-targeting
    if (
      !clientIp ||
      clientIp === "::1" ||
      clientIp === "127.0.0.1" ||
      clientIp.startsWith("10.") ||
      clientIp.startsWith("192.168.")
    ) {
      clientIp = (req.query?.ip as string) || "104.28.19.12";
    }

    const userAgent =
      (req.headers["user-agent"] as string) ||
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
    const lang = (req.headers["accept-language"] as string) || "en-US,en;q=0.9";
    const site = req.headers.host
      ? `https://${req.headers.host}${req.url}`
      : "https://digitalplanner2027.com";

    const queryParams = new URLSearchParams();
    queryParams.append("ip", clientIp);
    queryParams.append("user_agent", userAgent);
    queryParams.append("lang", lang);
    queryParams.append("site", site);
    if (req.query?.ctype) queryParams.append("ctype", String(req.query.ctype));
    if (req.query?.max) queryParams.append("max", String(req.query.max));

    const apiUrl = `${OFFER_API_ENDPOINT}?${queryParams.toString()}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${OFFER_API_KEY}`,
      },
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error: any) {
    console.error("Error fetching offers from Offer API:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to fetch offers",
      offers: [],
    });
  }
}
