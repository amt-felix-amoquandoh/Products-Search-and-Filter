import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { createRefreshToken } from '../utils/auth'; // Assuming you have implemented the createRefreshToken function

interface User {
  id: string;
  isAdmin: boolean;
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { accessToken } = req.cookies;
  const { refreshToken } = req.cookies;

  if (!accessToken && !refreshToken) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
    return;
  }

  // Function to issue a new access token using the refresh token
  const issueNewAccessToken = async () => {
    try {
      const decoded = jwt.verify(refreshToken, process.env.SECRET as Secret);
      const { userId, isAdmin } = decoded as { userId: string, isAdmin:boolean };

      // Here, you should implement a function to validate the refresh token and ensure it is still valid.
      // For example, check if it exists in a database and hasn't expired.

      // Create a new access token
      const accessExpiresIn = 12 * 60 * 60; // 12 hours in seconds
      const newAccessToken = jwt.sign({ id: userId, isAdmin:isAdmin }, process.env.SECRET as Secret, { expiresIn: accessExpiresIn });

      // Set and send the new access token in the response
      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        expires: new Date(Date.now() + accessExpiresIn * 1000),
      });

      // Assign the user to the request object for other middlewares/routes to use
      req.user = { id: userId, isAdmin: isAdmin };

      return true;
    } catch (error) {
      // The refresh token is either invalid or expired
      return false;
    }
  };

  if (accessToken) {
    // Verify the access token
    jwt.verify(accessToken, process.env.SECRET as Secret, async (err: any, user: any) => {
      if (err) {
        // If the access token is invalid or expired, try using the refresh token to get a new access token
        const refreshed = await issueNewAccessToken();
        if (!refreshed) {
          res.status(401).json({ success: false, message: 'Unauthorized' });
          return;
        }
        next();
      } else {
        // Access token is valid, assign the user to the request object and proceed
        req.user = user as User;
        next();
      }
    });
  } else if (refreshToken) {
    // Use the refresh token to issue a new access token
    const refreshed = await issueNewAccessToken();
    if (!refreshed) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }
    next();
  }
};

export const verifyUser = (req: Request, res: Response, next: NextFunction): void => {
  verifyToken(req,res,()=>{
    if(req.user?.id || req.user?.isAdmin){
      next();
    }else {
      res.status(401).json({ success: false, message: 'Not authorized'});
    }
  })
};

export const verifyAdmin = (req: Request, res: Response, next: NextFunction): void => {
  verifyToken(req,res,()=>{
    if(req.user?.isAdmin){
      next();
    }else {
      res.status(401).json({ success: false, message: 'Not Admin'});
    }
  })
};
