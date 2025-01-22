import { toast } from 'react-toastify';
export default function wrapPromiseWithToast(promise, options) {
  if (!(promise instanceof Promise) && !(promise instanceof Function)) {
    throw new Error(
      'wrapPromiseWithToast: promise is not a Promise nor a function that returns a Promise'
    );
  }
  const id = toast.loading(options.pending);
  if (promise instanceof Function) {
    promise = promise();
  }
  if (!(promise instanceof Promise)) {
    throw new Error(
      'wrapPromiseWithToast: promise is not a Promise nor a function that returns a Promise'
    );
  }
  return promise.then(
    (data) => {
      toast.update(id, {
        render: options.success,
        type: toast.TYPE.SUCCESS,
        isLoading: false,
        autoClose: 2000
      });
      return data;
    },
    (error) => {
      toast.update(id, {
        render:
          typeof options.error === 'function'
            ? options.error(error)
            : options.error,
        type: toast.TYPE.ERROR,
        isLoading: false,
        autoClose: 2000
      });
      return Promise.reject(error);
    }
  );
}
