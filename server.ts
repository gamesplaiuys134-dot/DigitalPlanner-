import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const OFFER_API_KEY =
  process.env.OFFER_API_KEY ||
  "49810|31oMfTqUg0GOqy7HpGfXhrFGXq3zRXStCSDeHrfb2d04de10";
const OFFER_API_ENDPOINT = "https://appcomplete.org/api/v2";

app.get("/api/offers", async (req, res) => {
  try {
    const forwarded = req.headers["x-forwarded-for"];
    let clientIp =
      (typeof forwarded === "string" ? forwarded.split(",")[0].trim() : "") ||
      req.socket.remoteAddress ||
      "";

    // If local or internal, provide a valid fallback IP for campaign geo-targeting
    if (
      !clientIp ||
      clientIp === "::1" ||
      clientIp === "127.0.0.1" ||
      clientIp.startsWith("10.") ||
      clientIp.startsWith("192.168.")
    ) {
      clientIp = (req.query.ip as string) || "104.28.19.12";
    }

    const userAgent =
      (req.headers["user-agent"] as string) ||
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
    const lang = (req.headers["accept-language"] as string) || "en-US,en;q=0.9";
    const site = req.headers.host
      ? `https://${req.headers.host}${req.originalUrl}`
      : "https://digitalplanner2027.com";

    const queryParams = new URLSearchParams();
    queryParams.append("ip", clientIp);
    queryParams.append("user_agent", userAgent);
    queryParams.append("lang", lang);
    queryParams.append("site", site);
    if (req.query.ctype) queryParams.append("ctype", String(req.query.ctype));
    if (req.query.max) queryParams.append("max", String(req.query.max));

    const apiUrl = `${OFFER_API_ENDPOINT}?${queryParams.toString()}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${OFFER_API_KEY}`,
      },
    });

    const data = await response.json();
    return res.json(data);
  } catch (error: any) {
    console.error("Error fetching offers from Offer API:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to fetch offers",
      offers: [],
    });
  }
});

const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
  app.use(express.static(path.resolve(__dirname, "dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist", "index.html"));
  });
} else {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);
}

app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`Server listening on http://0.0.0.0:${PORT}`);
});
