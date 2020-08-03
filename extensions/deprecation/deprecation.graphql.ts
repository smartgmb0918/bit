import gql from 'graphql-tag';
import { Schema } from '@bit/bit.core.graphql';
import { DeprecationExtension } from './deprecation.extension';
import { Component } from '@bit/bit.core.component';

export function deprecationSchema(deprecation: DeprecationExtension): Schema {
  return {
    typeDefs: gql`
      extend type Component {
        deprecation: DeprecationInfo
      }

      type DeprecationInfo {
        isDeprecate: Boolean
      }
    `,
    resolvers: {
      Component: {
        deprecation: (component: Component) => {
          return deprecation.getDeprecationInfo(component);
        },
      },
    },
  };
}
