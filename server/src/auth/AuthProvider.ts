import { IAuthProvider, IAuthProviderConstructor } from './IAuthProvider';
import { FrameworkError, FrameworkErrors } from '../util';
import * as _ from 'lodash';

export class AuthProvider {
  private providers: Array<IAuthProviderConstructor> = [];
  private providerInUse: IAuthProvider;

  public register(provider: IAuthProviderConstructor) {
    if (provider) {
      this.providers.concat([provider]);
    } else {
      throw new FrameworkError({ code: FrameworkErrors.INVALID_AUTH_PROVIDER, message: 'unable to register! invalid auth provider' });
    }
  }

  public unregister(provider: IAuthProviderConstructor) {
    if (provider) {
      _.remove(this.providers, p => p === provider);
    } else {
      throw new FrameworkError({ code: FrameworkErrors.INVALID_AUTH_PROVIDER, message: 'unable to unregister, invalid auth provider' });
    }
  }

  public getDefault(): IAuthProvider {
    return this.providerInUse;
  }

  public use(provider: IAuthProvider) {
    if (this.providerInUse) {
      throw new FrameworkError({ code: FrameworkErrors.AUTH_PROVIDER_ALREADY_CONFIGURED , message: 'auth provider is already configured with a provider! unable to reconfigure' });
    }
    const registeredProvider: IAuthProviderConstructor = this.providers.find(x => provider instanceof x); 
    if (registeredProvider) {
      this.providerInUse = provider;
      console.log('====> Auth Provider is configured with ', provider.constructor.name);
    } else {
      throw new FrameworkError({ code: FrameworkErrors.INVALID_AUTH_PROVIDER , message: 'supplied provider is not registered to use!' });
    }
  }
}

export const authProvider = new AuthProvider()