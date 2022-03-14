import { LabPolicyData } from '@ducks/lab/policy/types';

import { Error } from '@ducks/lab/types';

// TODO: Ask which format is right? OpenAPI spec vs Definition in types
// export const policyExample: LabPolicyData = {
//   constraint: {
//     cost: 0,
//     density: 'string',
//     limit: {},
//     location: 'string',
//     sched_avail: ['2022-03-14T10:10:18.674Z'],
//     serv_avail: 0,
//     tag: ['string'],
//   },
//   department: 'string',
//   id: 1,
//   name: 'string',
// };

export const policyExample: LabPolicyData = {
  constraint: {
    cost: 'string',
    density: 'string',
    limit: 'string',
    location: 'string',
    sched_avail: '2022-03-14T10:10:18.674Z',
    serv_avail: 'string',
    tag: 'string',
  },
  department: 'string',
  id: 1,
  name: 'string',
};

export const errorExample: Error = {
  detail: 'Invalid token',
  status: 401,
  title: 'Unauthorized',
  type: 'about:blank',
};
