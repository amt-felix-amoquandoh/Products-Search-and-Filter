// utils/auth.ts

import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response } from 'express';
import { SECRET } from '../config';

export const createRefreshToken = (userId: number, isAdmin:boolean) => {
  // Create a refresh token with an expiration time (e.g., 30 days)
  const refreshExpiresIn = 30 * 24 * 60 * 60; // 30 days in seconds
  const refreshToken = jwt.sign({ userId, isAdmin }, SECRET as Secret, { expiresIn: refreshExpiresIn });
  return refreshToken;
};

export const refreshAccessToken = (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ success: false, message: 'No refresh token provided' });
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, SECRET as Secret);
    const { userId, isAdmin } = decoded as { userId: number, isAdmin:boolean };

    // If the refresh token is valid, issue a new access token
    const accessExpiresIn = 5; // 12 hours in seconds
    const accessToken = jwt.sign({ id: userId, isAdmin:isAdmin }, SECRET as Secret, { expiresIn: accessExpiresIn });

    // Set and send the new access token in the response
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + accessExpiresIn * 1000),
    });

    res.status(200).json({ success: true, accessToken });
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: 'Invalid or expired refresh token' });
  }
};
