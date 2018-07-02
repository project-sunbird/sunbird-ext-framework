import { IAuthProvider, IAuthProviderConstructor } from './IAuthProvider';
import * as Keycloak from 'keycloak-connect';
import { NextFunction } from 'express';
import { authProvider } from './AuthProvider';
import * as _ from 'lodash';
import { Request, Response } from 'express-serve-static-core';

export interface IKeycloakConfig {
  'store': any;
  'realm': string;
  'resource': string;
  'realm-public-key'?: string;
  'auth-server-url': string;
  'ssl-required'?: string;
  'use-resource-role-mappings'?: Boolean;
  'enable-cors'?: Boolean;
  'cors-max-age'?: Number;
  'cors-allowed-methods'?: string;
  'cors-exposed-headers'?: string;
  'bearer-only'?: Boolean;
  'enable-basic-auth'?: Boolean;
  'expose-token': Boolean;
  'credentials'?: any;
  'connection-pool-size'?: Number;
  'disable-trust-manager'?: Boolean;
  'allow-any-hostname'?: Boolean;
  'truststore'?: string;
  'truststore-password'?: string;
  'client-keystore'?: string;
  'client-keystore-password'?: string;
  'client-key-password'?: string;
  'token-minimum-time-to-live'?: Number;
  'min-time-between-jwks-requests'?: Number;
  'public-key-cache-ttl'?: Number;
  'redirect-rewrite-rules'?: any;
  'middleware-options': any; // options for keycloak middleware method
}

export class KeycloakAuthProvider implements IAuthProvider {

  private connection: Keycloak;
  private options: IKeycloakConfig;

  configure(options: IKeycloakConfig): void {
    this.options = _.cloneDeep(options);
    this.connection = new Keycloak({ store: this.options.store}, this.options)
  }

  authenticate(req: Request, res: Response, next: NextFunction): void {
    this.connection.middleware(this.options['middleware-options'])(...arguments);
  }

  protect(req: Request, res: Response, next: NextFunction): void {
    this.connection.protect()(...arguments);
  }
}

authProvider.register(KeycloakAuthProvider);