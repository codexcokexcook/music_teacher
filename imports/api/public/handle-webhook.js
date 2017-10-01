
/* eslint-disable consistent-return */
import { apiai_handler } from './providers/apiai';

let module;

const providers = {
  apiai: apiai_handler,
};

const handler = ({ provider, request }, promise) => {
  try {
    module = promise;
    const targetProvider = providers[provider];
    if (targetProvider) targetProvider({ body: request.body });
    module.resolve('Webhook received!');
  } catch (exception) {
    module.reject(`[handleWebhook.handler] ${exception}`);
  }
};

export const handleWebhook = (options) =>
new Promise((resolve, reject) =>
handler(options, { resolve, reject }));
