import { error } from '@sveltejs/kit';
import { tables } from '../tableQuestions';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  const challenge = tables.challenges[params.n];
  if (!challenge) error(404, 'Not found');
  return { challenge };
};
