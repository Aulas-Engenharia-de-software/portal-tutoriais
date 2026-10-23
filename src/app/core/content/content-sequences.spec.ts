import { CONTENT_INDEX } from './generated-content-index';
import { getContentSequences, getSequenceNavigation } from './content-sequences';

describe('Content sequences', () => {
  it('orders steps independently of global catalog order and isolates other assignments', () => {
    const eda = CONTENT_INDEX.filter((entry) => entry.sequence === 'trabalho-pratico-eda');
    const other = eda.slice(0, 2).map((entry) => ({
      ...entry,
      slug: `other-${entry.slug}`,
      sequence: 'outro-trabalho',
      sequenceTitle: 'Outro trabalho',
    }));
    const entries = [...other, ...eda].reverse();
    expect(getContentSequences(entries)).toHaveLength(2);
    const navigation = getSequenceNavigation(entries, eda[1]);
    expect(navigation?.entries.map((entry) => entry.step)).toEqual([1, 2, 3, 4, 5]);
    expect(navigation?.previous?.slug).toBe('criando-iam');
    expect(navigation?.next?.slug).toBe('criando-sqs');
  });

  it('has no previous step at the beginning or next required step at the end', () => {
    const first = CONTENT_INDEX.find((entry) => entry.slug === 'criando-iam');
    const last = CONTENT_INDEX.find((entry) => entry.slug === 'consumer-sqs');
    expect(getSequenceNavigation(CONTENT_INDEX, first)?.previous).toBeUndefined();
    expect(getSequenceNavigation(CONTENT_INDEX, last)?.next).toBeUndefined();
    expect(getSequenceNavigation(CONTENT_INDEX, last)?.current).toBe(5);
    expect(
      getSequenceNavigation(
        CONTENT_INDEX,
        CONTENT_INDEX.find((entry) => entry.slug === 'dlq'),
      ),
    ).toBeNull();
  });
});
