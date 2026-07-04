import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import db from '../../database/db.js';
import { EmployeeRepository } from '../employee/employee.repository.js';

export const AuthService = {
  login: async (email, password) => {
    const employee = await EmployeeRepository.findByEmail(email);
    if (!employee) {
      const error = new Error('Incorrect credentials.');
      error.status = 401;
      error.code = 'UNAUTHORIZED';
      throw error;
    }

    if (employee.status !== 'Active') {
      const error = new Error('Your user profile is inactive or suspended.');
      error.status = 403;
      error.code = 'ACCOUNT_DISABLED';
      throw error;
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      const error = new Error('Incorrect credentials.');
      error.status = 401;
      error.code = 'UNAUTHORIZED';
      throw error;
    }

    // Generate Bearer Access Token
    const accessToken = jwt.sign(
      {
        id: employee.id,
        email: employee.email,
        role: employee.role,
        firstName: employee.first_name,
        lastName: employee.last_name,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_ACCESS_EXPIRATION || '15m' }
    );

    // Generate Refresh Token
    const refreshToken = jwt.sign(
      { id: employee.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRATION || '7d' }
    );

    // Compute Expires At (7 days standard)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Save refresh token record in DB
    const tokenId = crypto.randomUUID();
    await db('refresh_tokens').insert({
      id: tokenId,
      token: refreshToken,
      employee_id: employee.id,
      expires_at: expiresAt,
    });

    const userPayload = {
      id: employee.id,
      email: employee.email,
      role: employee.role,
      firstName: employee.first_name,
      lastName: employee.last_name,
      department: employee.department,
    };

    return { accessToken, refreshToken, user: userPayload };
  },

  refreshToken: async (token) => {
    const record = await db('refresh_tokens').where({ token }).first();
    if (!record) {
      const error = new Error('Invalid or revoked session refresh token.');
      error.status = 401;
      error.code = 'REFRESH_TOKEN_INVALID';
      throw error;
    }

    if (new Date() > new Date(record.expires_at)) {
      await db('refresh_tokens').where({ id: record.id }).delete();
      const error = new Error('Refresh token session has expired.');
      error.status = 401;
      error.code = 'REFRESH_TOKEN_EXPIRED';
      throw error;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const employee = await EmployeeRepository.findById(decoded.id);

      if (!employee || employee.status !== 'Active') {
        const error = new Error('Employee account is inactive or missing.');
        error.status = 401;
        error.code = 'UNAUTHORIZED';
        throw error;
      }

      const accessToken = jwt.sign(
        {
          id: employee.id,
          email: employee.email,
          role: employee.role,
          firstName: employee.first_name,
          lastName: employee.last_name,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_ACCESS_EXPIRATION || '15m' }
      );

      return { accessToken };
    } catch (err) {
      const error = new Error('Session refresh verification signature mismatch.');
      error.status = 401;
      error.code = 'REFRESH_TOKEN_INVALID';
      throw error;
    }
  },

  logout: async (token) => {
    await db('refresh_tokens').where({ token }).delete();
  },

  getMe: async (userId) => {
    const employee = await EmployeeRepository.findById(userId);
    if (!employee) {
      const error = new Error('Logged-in profile record not found.');
      error.status = 404;
      error.code = 'NOT_FOUND';
      throw error;
    }

    return {
      id: employee.id,
      email: employee.email,
      role: employee.role,
      firstName: employee.first_name,
      lastName: employee.last_name,
      department: employee.department,
      status: employee.status,
    };
  },
};
