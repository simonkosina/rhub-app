import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import api from '@services/api';

import rootSaga from '@ducks/rootSaga';
import * as actions from '@ducks/lab/policy/actions';
import * as mocks from '@mocks/labPolicy';

describe('policy saga', () => {
  test('loads all policies', () => {
    const apiResponse = {
      data: { data: [mocks.policyExample] },
    };

    return expectSaga(rootSaga)
      .dispatch(actions.loadRequest('all'))
      .provide([[matchers.call.fn(api.get), apiResponse]])
      .put(actions.loadSuccess('all', apiResponse.data.data))
      .silentRun();
  });

  test('loads a single policy', () => {
    const apiResponse = {
      data: mocks.policyExample,
    };

    return expectSaga(rootSaga)
      .dispatch(actions.loadRequest(1))
      .provide([[matchers.call.fn(api.get), apiResponse]])
      .put(actions.loadSuccess(1, apiResponse.data))
      .silentRun();
  });

  test('creates policy', () => {
    return expectSaga(rootSaga)
      .dispatch(actions.createRequest(mocks.policyExample))
      .provide([[matchers.call.fn(api.post), {}]])
      .put(actions.createSuccess())
      .silentRun();
  });

  test('updates policy', () => {
    return expectSaga(rootSaga)
      .dispatch(actions.updateRequest(1, mocks.policyExample))
      .provide([[matchers.call.fn(api.patch), {}]])
      .put(actions.updateSuccess())
      .silentRun();
  });

  test('deletes policy', () => {
    return expectSaga(rootSaga)
      .dispatch(actions.deleteRequest(1))
      .provide([[matchers.call.fn(api.delete), {}]])
      .put(actions.deleteSuccess(1))
      .silentRun();
  });
});
