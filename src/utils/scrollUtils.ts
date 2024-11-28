import { UIEvent } from 'react';

interface ScrollIntoViewParams {
  scrollToId: string;
  event?: UIEvent<HTMLElement>;
  scrollIntoViewOptions?: ScrollIntoViewOptions;
}

export const scrollTo = ({
  scrollToId,
  event,
  scrollIntoViewOptions = {
    block: 'center',
    behavior: 'smooth',
  },
}: ScrollIntoViewParams) => {
  const anchor = (
    (event?.target as HTMLDivElement)?.ownerDocument || document
  ).querySelector(`#${scrollToId}`);

  if (anchor) {
    anchor.scrollIntoView(scrollIntoViewOptions);
  }
};
