import reducer, { INITIAL_STATE } from '@ducks/lab/policy';
import * as actions from '@ducks/lab/policy/actions';

import * as mocks from '@mocks/labPolicy';

describe('policy reducer', () => {
  test('returns the initial state', () => {
    expect(reducer(undefined, { type: 'stub' })).toEqual(INITIAL_STATE);
  });

  test('handles load request', () => {
    expect(reducer(INITIAL_STATE, actions.loadRequest(1))).toEqual({
      ...INITIAL_STATE,
      loading: true,
      error: false,
    });
  });

  test('handles load success for single policy', () => {
    expect(
      reducer(
        {
          ...INITIAL_STATE,
          loading: true,
        },
        actions.loadSuccess(1, mocks.policyExample)
      )
    ).toEqual({
      ...INITIAL_STATE,
      loading: false,
      error: false,
      data: {
        [mocks.policyExample.id]: mocks.policyExample,
      },
    });
  });

  test('handles load success for all policies', () => {
    expect(
      reducer(
        {
          ...INITIAL_STATE,
          loading: true,
          error: false,
        },
        actions.loadSuccess('all', [mocks.policyExample])
      )
    ).toEqual({
      ...INITIAL_STATE,
      loading: false,
      error: false,
      data: {
        [mocks.policyExample.id]: mocks.policyExample,
      },
    });
  });

  test('handles load failure', () => {
    expect(
      reducer(
        { ...INITIAL_STATE, loading: true, error: false },
        actions.loadFailure(mocks.errorExample)
      )
    ).toEqual({
      ...INITIAL_STATE,
      loading: false,
      error: true,
      errMsg: mocks.errorExample,
    });
  });

  test('handles create request', () => {
    expect(
      reducer(INITIAL_STATE, actions.createRequest(mocks.policyExample))
    ).toEqual({
      ...INITIAL_STATE,
      loading: true,
      error: false,
    });
  });

  test('handles create success', () => {
    expect(
      reducer(
        {
          ...INITIAL_STATE,
          loading: true,
          error: false,
        },
        actions.createSuccess()
      )
    ).toEqual({
      ...INITIAL_STATE,
      loading: false,
      error: false,
    });
  });

  test('handles create failure', () => {
    expect(
      reducer(
        {
          ...INITIAL_STATE,
          loading: true,
          error: false,
        },
        actions.createFailure(mocks.errorExample)
      )
    ).toEqual({
      ...INITIAL_STATE,
      loading: false,
      error: true,
      errMsg: mocks.errorExample,
    });
  });

  test('handles update request', () => {
    expect(
      reducer(INITIAL_STATE, actions.updateRequest(1, mocks.policyExample))
    ).toEqual({
      ...INITIAL_STATE,
      loading: true,
      error: false,
    });
  });

  test('handles update success', () => {
    expect(
      reducer(
        { ...INITIAL_STATE, loading: true, error: false },
        actions.updateSuccess()
      )
    ).toEqual({
      ...INITIAL_STATE,
      loading: false,
      error: false,
    });
  });

  test('handles update failure', () => {
    expect(
      reducer(
        {
          ...INITIAL_STATE,
          loading: true,
          error: false,
        },
        actions.updateFailure(mocks.errorExample)
      )
    ).toEqual({
      ...INITIAL_STATE,
      loading: false,
      error: true,
      errMsg: mocks.errorExample,
    });
  });

  test('handles delete request', () => {
    expect(reducer(INITIAL_STATE, actions.deleteRequest(1))).toEqual({
      ...INITIAL_STATE,
      loading: true,
      error: false,
    });
  });

  test('handles delete success', () => {
    expect(
      reducer(
        {
          ...INITIAL_STATE,
          loading: true,
          error: false,
          data: { [mocks.policyExample.id]: mocks.policyExample },
        },
        actions.deleteSuccess(1)
      )
    ).toEqual({
      ...INITIAL_STATE,
      loading: false,
      error: false,
      data: {},
    });
  });

  test('handles delete failure', () => {
    expect(
      reducer(
        {
          ...INITIAL_STATE,
          loading: true,
          error: false,
          data: {
            [mocks.policyExample.id]: mocks.policyExample,
          },
        },
        actions.deleteFailure(mocks.errorExample)
      )
    ).toEqual({
      ...INITIAL_STATE,
      data: {
        [mocks.policyExample.id]: mocks.policyExample,
      },
      loading: false,
      error: true,
      errMsg: mocks.errorExample,
    });
  });
});
