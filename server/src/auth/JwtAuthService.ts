import { sign, verify, SignOptions, VerifyOptions } from 'jsonwebtoken';
import { FrameworkError, FrameworkErrors } from '../util';
export * from 'jsonwebtoken';

export interface jwtOptions extends SignOptions {
  issuer: string;
  expiresIn: string;
}

export class JwtAuthService {
  public static generateToken(payload: string | object, options: jwtOptions, secret?: string) : Promise<string> {
    return new Promise((resolve, reject) => {
      secret = secret || process.env._JWT_AUTH_PRIVATE;
      //TODO: log issuer details for audit purpose
      if (!payload) throw new FrameworkError({message: 'not a valid payload!', code: FrameworkErrors.INVALID_JWT_PAYLOAD });
      if (!secret) throw new FrameworkError({message: 'cannot sign token without secret!', code: FrameworkErrors.INVALID_JWT_SECRET });
      sign(payload, secret, options, (error, response) => {
        if(response) resolve(response);
        if(error) reject(new FrameworkError({message: 'error while signing token!', code: FrameworkErrors.JWT_ERROR }))
      });
    })
  }

  public static verifyToken(token: string, secret?: string, options?: VerifyOptions): Promise<string | object> {
    return new Promise((resolve, reject) => {
      secret = secret || process.env._JWT_AUTH_PRIVATE;
      if (!token) throw new FrameworkError({message: 'token cannot be empty to verify!', code: FrameworkErrors.INVALID_JWT_TOKEN });
      if (!secret) throw new FrameworkError({message: 'cannot verify token without secret!', code: FrameworkErrors.INVALID_JWT_SECRET });
      verify(token, secret, options, (error, response) => {
        if(response) resolve(response);
        if(error) reject(new FrameworkError({message: 'token expired or invalid!', code: FrameworkErrors.INVALID_JWT_TOKEN }))
      });
    })
  }
}