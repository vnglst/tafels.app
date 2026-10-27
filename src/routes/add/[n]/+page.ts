import { error } from '@sveltejs/kit';
import { adds } from '../addQuestions';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  const challenge = adds.challenges[params.n];
  if (!challenge) error(404, 'Not found');
  return { challenge };
};
