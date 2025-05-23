/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { GENERAL_CASES_OWNER } from '../../../common/constants';
import { waitFor, renderHook } from '@testing-library/react';
import { useToasts } from '../../common/lib/kibana';

import * as api from './api';
import { useSuggestUserProfiles } from './use_suggest_user_profiles';
import { TestProviders } from '../../common/mock';

jest.mock('../../common/lib/kibana');
jest.mock('./api');

describe('useSuggestUserProfiles', () => {
  const props = {
    name: 'elastic',
    owners: [GENERAL_CASES_OWNER],
  };

  const addSuccess = jest.fn();
  (useToasts as jest.Mock).mockReturnValue({ addSuccess, addError: jest.fn() });

  it('calls suggestUserProfiles with correct arguments', async () => {
    const spyOnSuggestUserProfiles = jest.spyOn(api, 'suggestUserProfiles');

    const { result } = renderHook(() => useSuggestUserProfiles(props), {
      wrapper: TestProviders,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeDefined();
      expect(spyOnSuggestUserProfiles).toBeCalledWith({
        ...props,
        size: 10,
        http: expect.anything(),
        signal: expect.anything(),
      });
    });
  });

  it('shows a toast error message when an error occurs in the response', async () => {
    const spyOnSuggestUserProfiles = jest.spyOn(api, 'suggestUserProfiles');

    spyOnSuggestUserProfiles.mockImplementation(() => {
      throw new Error('Something went wrong');
    });

    const addError = jest.fn();
    (useToasts as jest.Mock).mockReturnValue({ addSuccess, addError });

    const { result } = renderHook(() => useSuggestUserProfiles(props), {
      wrapper: TestProviders,
    });

    await waitFor(() => {
      expect(result.current.isError).toBeDefined();
      expect(addError).toHaveBeenCalled();
    });
  });
});
