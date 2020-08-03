import gql from 'graphql-tag';
import { Schema } from '@bit/bit.core.graphql';
import { CompositionsExtension } from './compositions.extension';
import { Component } from '@bit/bit.core.component';

export function compositionsSchema(compositions: CompositionsExtension): Schema {
  return {
    typeDefs: gql`
      extend type Component {
        compositions: [Composition]
      }

      type Subscription {
        compositionAdded: Composition
      }

      type Composition {
        filepath: String
        identifier: String
      }
    `,
    resolvers: {
      Component: {
        compositions: (component: Component) => {
          return compositions.getCompositions(component);
        },
      },
    },
  };
}
