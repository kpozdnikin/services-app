import { EndpointQuery } from '@getsquire/handyman/api';

export abstract class AuthenticatedEndpointQuery<
  ClientModel,
  PayloadModel = void
> extends EndpointQuery<ClientModel, PayloadModel> {
  protected authenticated = true;
}
