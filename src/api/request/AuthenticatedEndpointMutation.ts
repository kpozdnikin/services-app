import { EndpointMutation } from '@getsquire/handyman/api';

export abstract class AuthenticatedEndpointMutation<
  ClientModel,
  PayloadModel = void
> extends EndpointMutation<ClientModel, PayloadModel> {
  constructor() {
    super();

    this.request = this.request.bind(this);
  }

  protected authenticated = true;
}
