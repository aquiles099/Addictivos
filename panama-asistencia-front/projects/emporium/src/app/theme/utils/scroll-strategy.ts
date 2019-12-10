import { MAT_MENU_SCROLL_STRATEGY } from '@angular/material';
import { Overlay, BlockScrollStrategy, CloseScrollStrategy } from '@angular/cdk/overlay';

export function menuScrollStrategy(overlay: Overlay): () => CloseScrollStrategy {
  return () => overlay.scrollStrategies.close();
}