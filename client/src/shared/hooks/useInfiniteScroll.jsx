import { useCallback, useRef } from "react";

const useInfiniteScroll = (onIntersect, { enabled = true } = {}) => {
  const observerRef = useRef(null);
  const sentinelRef = useCallback(
    (node) => {
      if (observerRef.current) observerRef.current.disconnect();
      if (!node || !enabled) return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) onIntersect();
        },
        { rootMargin: "200px" },
      );

      observerRef.current.observe(node);
    },
    [onIntersect, enabled],
  );

  return sentinelRef;
};
export default useInfiniteScroll;
