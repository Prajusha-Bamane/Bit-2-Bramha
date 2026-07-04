import { AuthService } from './auth.service.js';

const parseCookies = (cookieHeader) => {
  if (!cookieHeader) return {};
  const cookies = {};
  cookieHeader.split(';').forEach((cookie) => {
    const parts = cookie.split('=');
    const name = parts[0].trim();
    const value = parts.slice(1).join('=');
    cookies[name] = decodeURIComponent(value);
  });
  return cookies;
};

export const AuthController = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken, user } = await AuthService.login(email, password);

      // Set Refresh Token as an HttpOnly, Secure cookie
      const isProduction = process.env.NODE_ENV === 'production';
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      });

      // Also support sending refresh token in request headers for clients that don't support cookies well
      // But cookie is the primary security standard.
      return res.status(200).json({
        status: 'success',
        data: {
          accessToken,
          user,
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      });
    } catch (err) {
      next(err);
    }
  },

  refresh: async (req, res, next) => {
    try {
      // Manually parse the cookie to avoid dependency on cookie-parser
      const cookies = parseCookies(req.headers.cookie);
      const token = cookies.refreshToken || req.body.refreshToken;

      if (!token) {
        return res.status(401).json({
          status: 'error',
          error: {
            code: 'REFRESH_TOKEN_REQUIRED',
            message: 'Refresh token is missing from the request cookies.',
          },
          meta: {
            timestamp: new Date().toISOString(),
          },
        });
      }

      const { accessToken } = await AuthService.refreshToken(token);

      return res.status(200).json({
        status: 'success',
        data: {
          accessToken,
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      });
    } catch (err) {
      next(err);
    }
  },

  logout: async (req, res, next) => {
    try {
      const cookies = parseCookies(req.headers.cookie);
      const token = cookies.refreshToken || req.body.refreshToken;

      if (token) {
        await AuthService.logout(token);
      }

      // Clear the cookie
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      return res.status(200).json({
        status: 'success',
        data: {
          message: 'Successfully logged out and session revoked.',
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      });
    } catch (err) {
      next(err);
    }
  },

  me: async (req, res, next) => {
    try {
      const user = await AuthService.getMe(req.user.id);
      return res.status(200).json({
        status: 'success',
        data: {
          user,
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      });
    } catch (err) {
      next(err);
    }
  },
};
