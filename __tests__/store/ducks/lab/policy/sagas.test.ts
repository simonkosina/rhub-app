import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import api from '@services/api';

import rootSaga from '@ducks/rootSaga';
import * as actions from '@ducks/lab/policy/actions';
import * as mocks from '@mocks/labPolicy';
import { throwError } from 'redux-saga-test-plan/providers';

describe('policy saga', () => {
  const error = {
    response: {
      data: mocks.errorExample,
    },
  } as any;

  test('loads all policies', () => {
    const apiResponse = {
      data: { data: [mocks.labPolicyExample] },
    };

    return expectSaga(rootSaga)
      .dispatch(actions.loadRequest('all'))
      .provide([[matchers.call.fn(api.get), apiResponse]])
      .put(actions.loadSuccess('all', apiResponse.data.data))
      .silentRun();
  });

  test('loads a single policy', () => {
    const apiResponse = {
      data: mocks.labPolicyExample,
    };

    return expectSaga(rootSaga)
      .dispatch(actions.loadRequest(1))
      .provide([[matchers.call.fn(api.get), apiResponse]])
      .put(actions.loadSuccess(1, apiResponse.data))
      .silentRun();
  });

  test('load failure', () => {
    return expectSaga(rootSaga)
      .dispatch(actions.loadRequest(1))
      .provide([[matchers.call.fn(api.get), throwError(error)]])
      .put(actions.loadFailure(mocks.errorExample))
      .silentRun();
  });

  test('creates policy', () => {
    return expectSaga(rootSaga)
      .dispatch(actions.createRequest(mocks.labPolicyExample))
      .provide([[matchers.call.fn(api.post), {}]])
      .put(actions.createSuccess())
      .silentRun();
  });

  test('create failure', () => {
    return expectSaga(rootSaga)
      .dispatch(actions.createRequest(mocks.labPolicyExample))
      .provide([[matchers.call.fn(api.post), throwError(error)]])
      .put(actions.createFailure(mocks.errorExample))
      .silentRun();
  });

  test('updates policy', () => {
    return expectSaga(rootSaga)
      .dispatch(actions.updateRequest(1, mocks.labPolicyExample))
      .provide([[matchers.call.fn(api.patch), {}]])
      .put(actions.updateSuccess())
      .silentRun();
  });

  test('update failure', () => {
    return expectSaga(rootSaga)
      .dispatch(actions.updateRequest(1, mocks.labPolicyExample))
      .provide([[matchers.call.fn(api.patch), throwError(error)]])
      .put(actions.updateFailure(mocks.errorExample))
      .silentRun();
  });

  test('deletes policy', () => {
    return expectSaga(rootSaga)
      .dispatch(actions.deleteRequest(1))
      .provide([[matchers.call.fn(api.delete), {}]])
      .put(actions.deleteSuccess(1))
      .silentRun();
  });

  test('delete failure', () => {
    return expectSaga(rootSaga)
      .dispatch(actions.deleteRequest(1))
      .provide([[matchers.call.fn(api.delete), throwError(error)]])
      .put(actions.deleteFailure(mocks.errorExample))
      .silentRun();
  });
});
