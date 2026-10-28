import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { clearNotice } from "../features/ui/uiSlice";

export default function Notice() {
  const notice = useAppSelector((state) => state.ui.notice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => dispatch(clearNotice()), 4500);
    return () => window.clearTimeout(timeout);
  }, [dispatch, notice]);

  if (!notice) return null;
  return (
    <div className={`notice notice--${notice.kind}`} role="status">
      <span>{notice.message}</span>
      <button type="button" aria-label="Cerrar aviso" onClick={() => dispatch(clearNotice())}>
        ×
      </button>
    </div>
  );
}
