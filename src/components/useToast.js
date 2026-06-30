import { useState, useCallback } from 'react';

export function useToast() {
  const [msg, setMsg] = useState('');
  const [show, setShow] = useState(false);
  let timer = null;

  const showToast = useCallback((message) => {
    setMsg(message);
    setShow(true);
    clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    timer = setTimeout(() => setShow(false), 2200);
  }, []);

  return { msg, show, showToast };
}
