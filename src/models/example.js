import * as service_example from 'services/example';

export default {
  namespace: 'example',
  state: {
    loading: false,
  },
  subscriptions: {
    setup({ dispatch, history }) { },
  },
  effects: {
    *service({ payload, onSuccess, onComplete }, { select, call, put }) {
      const { service, params, data } = payload;
      yield put({ type: 'save', payload: { loading: true } });
      const response = yield call(service_example[service], params, data);
      if (response) {
        if (onSuccess) yield onSuccess(response);
        yield put({ type: 'save', payload: { loading: false} });
      }
      if (onComplete) yield onComplete();
    },
  },
  reducers: {
    save(state, action) {
      console.log(123,'dispatch-save')
      return { ...state, ...action.payload };
    },
  },
};
