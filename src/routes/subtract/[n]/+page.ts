import { error } from '@sveltejs/kit';
import { subtracts } from '../subtractQuestions';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  const challenge = subtracts.challenges[params.n];
  if (!challenge) error(404, 'Not found');
  return { challenge };
};
