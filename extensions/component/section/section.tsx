import { RouteProps } from 'react-router-dom';
import { NavLinkProps } from '@bit/bit.core.react-router';

export interface Section {
  route: RouteProps;
  navigationLink: NavLinkProps;
}
