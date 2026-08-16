const prisma = require('../config/prisma');
const { parseUserAgent } = require('../utils/helpers');

const trackVisitor = async (req, res, next) => {
  // Only track GET requests to public API endpoints or frontend routes
  if (req.method !== 'GET' || req.path.startsWith('/api/v1/admin') || req.path.startsWith('/api/v1/analytics')) {
    return next();
  }

  try {
    const rawIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const ip = rawIp.split(',')[0].trim();
    const userAgent = req.headers['user-agent'] || '';
    const visitorId = req.headers['x-visitor-id'] || req.cookies?.visitorId || `vis_${Buffer.from(ip + userAgent).toString('hex').slice(0, 16)}`;
    const referrer = req.headers['referer'] || req.headers['referrer'] || 'Direct';
    const { browser, os, device } = parseUserAgent(userAgent);
    const path = req.path;

    // Async record event without blocking response
    setImmediate(async () => {
      try {
        await prisma.analyticsEvent.create({
          data: {
            type: 'pageview',
            target: path,
            page: path,
            visitorId,
            ip,
            device,
            browser,
            os,
            country: 'United States', // Mock location fallback for privacy & standard demo analytics
            city: 'Seattle',
            referrer
          }
        });

        // Upsert visitor log session
        const existingLog = await prisma.visitorLog.findUnique({ where: { visitorId } });
        if (existingLog) {
          const pages = JSON.parse(existingLog.pagesVisited || '[]');
          if (!pages.includes(path)) pages.push(path);
          await prisma.visitorLog.update({
            where: { visitorId },
            data: {
              pagesVisited: JSON.stringify(pages),
              sessionEnd: new Date(),
              duration: Math.floor((new Date() - new Date(existingLog.sessionStart)) / 1000)
            }
          });
        } else {
          await prisma.visitorLog.create({
            data: {
              visitorId,
              ip,
              country: 'United States',
              city: 'Seattle',
              browser,
              os,
              device,
              pagesVisited: JSON.stringify([path]),
              referrer,
              duration: 1
            }
          });
        }
      } catch (err) {
        // Silent analytics error handler
      }
    });

  } catch (err) {
    // Ignore analytics log failure to prevent affecting main response
  }

  next();
};

module.exports = { trackVisitor };
